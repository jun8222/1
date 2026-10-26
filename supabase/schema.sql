-- =====================================================================
-- 치과기공사 국가시험 퀴즈 · 1단계 DB 스키마 (Supabase / PostgreSQL)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run 하세요. (여러 번 실행해도 안전)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. 프로필 (구글 로그인 한 명당 1행)
--    status: pending(가입 대기) → approved(승인) / blocked(차단)
--    role  : user / admin
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  email          text,
  display_name   text        not null default '',
  role           text        not null default 'user'    check (role in ('user', 'admin')),
  status         text        not null default 'pending' check (status in ('pending', 'approved', 'blocked')),
  daily_goal     int         not null default 30        check (daily_goal between 5 and 200),
  daily_subjects text[]      not null default '{}',     -- 빈 배열 = 전체 과목
  created_at     timestamptz not null default now()
);

-- 신규 로그인 시 프로필 자동 생성 (기본: 승인 대기)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(coalesce(new.email, ''), '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 이 SQL 실행 전에 이미 로그인한 계정이 있다면 프로필을 채워 넣음
insert into public.profiles (id, email, display_name)
select u.id,
       u.email,
       coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', split_part(coalesce(u.email, ''), '@', 1))
from auth.users u
on conflict (id) do nothing;

-- 권한 확인 헬퍼 (RLS 안에서 profiles 를 재귀 없이 읽기 위해 security definer)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and status = 'approved'
  );
$$;

create or replace function public.is_approved()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and status = 'approved'
  );
$$;

-- ---------------------------------------------------------------------
-- 2. 문항별 풀이 기록 (한 문제 풀 때마다 1행)
--    picked: 사용자가 고른 "원본 보기 번호"(보기 섞기 해도 원본 기준), -1 = 모르겠어요
-- ---------------------------------------------------------------------
create table if not exists public.attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  client_id   uuid        not null default gen_random_uuid(),  -- 재전송 시 중복 방지
  subject_key text        not null,
  question_id int         not null,
  picked      int         not null check (picked between -1 and 5),
  correct     boolean     not null,
  source      text        not null default 'free' check (source in ('free', 'retry', 'daily')),
  session_id  uuid,
  created_at  timestamptz not null default now(),
  unique (user_id, client_id)
);
create index if not exists attempts_user_time on public.attempts (user_id, created_at desc);
create index if not exists attempts_user_question on public.attempts (user_id, subject_key, question_id);

-- ---------------------------------------------------------------------
-- 3. 풀이 회차 (과목 화면의 "회차별 이력", 오답 다시 풀기용)
--    wrong_items: [{"s":"anatomy","id":3}, ...]
-- ---------------------------------------------------------------------
create table if not exists public.sessions (
  id          uuid        primary key,
  user_id     uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  subject_key text        not null,                 -- 과목 key 또는 'daily'
  mode        text        not null check (mode in ('free', 'retry', 'daily')),
  total       int         not null check (total >= 0),
  correct     int         not null check (correct >= 0),
  wrong_items jsonb       not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists sessions_user_time on public.sessions (user_id, created_at desc);

-- ---------------------------------------------------------------------
-- 4. 오늘의 문제 (하루 1세트, 기기를 바꿔도 같은 구성 유지)
--    items: [{"s":"anatomy","id":3,"why":"review|new|refresh"}, ...]
-- ---------------------------------------------------------------------
create table if not exists public.daily_sets (
  user_id    uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  day        date        not null,
  goal       int         not null check (goal between 1 and 200),
  items      jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

-- ---------------------------------------------------------------------
-- 5. 오류 검토 요청 (문제 오류 신고)
-- ---------------------------------------------------------------------
create table if not exists public.reports (
  id            bigint generated always as identity primary key,
  user_id       uuid        not null default auth.uid() references auth.users(id) on delete cascade,
  reporter_name text        not null default '',
  subject_key   text        not null,
  question_id   int         not null,
  question_text text        not null default '',
  content       text        not null check (char_length(content) between 1 and 2000),
  status        text        not null default 'open' check (status in ('open', 'resolved')),
  created_at    timestamptz not null default now()
);
create index if not exists reports_time on public.reports (created_at desc);

-- ---------------------------------------------------------------------
-- 6. 문항별 누적 통계 뷰 (오늘의 문제 구성·2단계 AI 분석에서 사용)
--    security_invoker: 호출한 사용자의 RLS 가 그대로 적용됨
-- ---------------------------------------------------------------------
create or replace view public.question_stats
with (security_invoker = true) as
select
  user_id,
  subject_key,
  question_id,
  count(*)                                              as tries,
  count(*) filter (where correct)                       as rights,
  max(created_at)                                       as last_at,
  (array_agg(correct order by created_at desc, id desc))[1] as last_correct
from public.attempts
group by user_id, subject_key, question_id;

-- ---------------------------------------------------------------------
-- 7. 권한 (RLS) — 로그인한 승인 회원은 "자기 기록만", 관리자는 전체 조회
-- ---------------------------------------------------------------------
alter table public.profiles   enable row level security;
alter table public.attempts   enable row level security;
alter table public.sessions   enable row level security;
alter table public.daily_sets enable row level security;
alter table public.reports    enable row level security;

revoke all on public.profiles, public.attempts, public.sessions, public.daily_sets, public.reports, public.question_stats
  from anon, authenticated;

-- profiles: 본인 또는 관리자만 조회. 본인은 이름·목표·과목만 수정(역할/승인은 관리 함수로만)
grant select on public.profiles to authenticated;
grant update (display_name, daily_goal, daily_subjects) on public.profiles to authenticated;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- attempts: 추가/조회만 (수정·삭제 불가 → 기록 위변조 방지)
grant select, insert on public.attempts to authenticated;

drop policy if exists attempts_select on public.attempts;
create policy attempts_select on public.attempts
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists attempts_insert on public.attempts;
create policy attempts_insert on public.attempts
  for insert to authenticated
  with check (user_id = auth.uid() and public.is_approved());

-- sessions
grant select, insert on public.sessions to authenticated;

drop policy if exists sessions_select on public.sessions;
create policy sessions_select on public.sessions
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists sessions_insert on public.sessions;
create policy sessions_insert on public.sessions
  for insert to authenticated
  with check (user_id = auth.uid() and public.is_approved());

-- daily_sets
grant select, insert, update on public.daily_sets to authenticated;

drop policy if exists daily_sets_select on public.daily_sets;
create policy daily_sets_select on public.daily_sets
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists daily_sets_insert on public.daily_sets;
create policy daily_sets_insert on public.daily_sets
  for insert to authenticated
  with check (user_id = auth.uid() and public.is_approved());

drop policy if exists daily_sets_update on public.daily_sets;
create policy daily_sets_update on public.daily_sets
  for update to authenticated
  using (user_id = auth.uid() and public.is_approved())
  with check (user_id = auth.uid() and public.is_approved());

-- reports: 일반 회원은 본인 신고만 조회, 관리자는 전체 조회·처리·삭제
grant select, insert, delete on public.reports to authenticated;
grant update (status) on public.reports to authenticated;

drop policy if exists reports_select on public.reports;
create policy reports_select on public.reports
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists reports_insert on public.reports;
create policy reports_insert on public.reports
  for insert to authenticated
  with check (user_id = auth.uid() and public.is_approved());

drop policy if exists reports_update_admin on public.reports;
create policy reports_update_admin on public.reports
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists reports_delete_admin on public.reports;
create policy reports_delete_admin on public.reports
  for delete to authenticated
  using (public.is_admin());

grant select on public.question_stats to authenticated;

-- ---------------------------------------------------------------------
-- 8. 관리자 전용 함수 (회원 목록 / 승인·차단·권한 / 기록 초기화)
-- ---------------------------------------------------------------------
create or replace function public.admin_list_members()
returns table (
  id uuid,
  email text,
  display_name text,
  role text,
  status text,
  daily_goal int,
  created_at timestamptz,
  total_attempts bigint,
  correct_attempts bigint,
  last_active timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  return query
  select
    p.id, p.email, p.display_name, p.role, p.status, p.daily_goal, p.created_at,
    coalesce(a.total, 0), coalesce(a.rights, 0), a.last_at
  from public.profiles p
  left join (
    select t.user_id,
           count(*)                          as total,
           count(*) filter (where t.correct) as rights,
           max(t.created_at)                 as last_at
    from public.attempts t
    group by t.user_id
  ) a on a.user_id = p.id
  order by (p.status = 'pending') desc, p.created_at;
end;
$$;

create or replace function public.admin_set_member(target uuid, new_role text, new_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if new_role not in ('user', 'admin') or new_status not in ('pending', 'approved', 'blocked') then
    raise exception 'invalid value' using errcode = '22023';
  end if;
  if target = auth.uid() and (new_role <> 'admin' or new_status <> 'approved') then
    raise exception 'cannot demote yourself' using errcode = '42501';
  end if;

  update public.profiles set role = new_role, status = new_status where id = target;
end;
$$;

create or replace function public.admin_reset_member(target uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  delete from public.attempts   where user_id = target;
  delete from public.sessions   where user_id = target;
  delete from public.daily_sets where user_id = target;
end;
$$;

revoke all on function public.admin_list_members()                  from public, anon;
revoke all on function public.admin_set_member(uuid, text, text)    from public, anon;
revoke all on function public.admin_reset_member(uuid)              from public, anon;
grant execute on function public.admin_list_members()               to authenticated;
grant execute on function public.admin_set_member(uuid, text, text) to authenticated;
grant execute on function public.admin_reset_member(uuid)           to authenticated;

-- ---------------------------------------------------------------------
-- 9. 첫 관리자 지정 (구글 로그인을 한 번 한 뒤, 아래 줄의 이메일을 본인 것으로 바꿔 실행)
-- ---------------------------------------------------------------------
-- update public.profiles set role = 'admin', status = 'approved' where email = '내이메일@gmail.com';
