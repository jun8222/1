-- =====================================================================
-- 내 기록 · 랭킹 · 활동 피드 · 친구 대결  (Supabase SQL Editor 에 통째로 붙여넣고 Run, 여러 번 실행해도 안전)
-- schema.sql 을 먼저 실행한 상태여야 합니다.
-- =====================================================================

-- 1. 랭킹/피드 공개 여부 (기본: 비공개 — 각자 켠 사람만 다른 사람에게 보임)
alter table public.profiles add column if not exists rank_public boolean not null default false;
alter table public.profiles add column if not exists avatar text;
alter table public.profiles drop constraint if exists profiles_avatar_check;
update public.profiles set avatar = null where avatar is not null and avatar !~ '^(P(0[1-9]|[1-3][0-9]|4[0-8])|M(0[1-9]|1[0-9]|2[0-4]))$';   -- 이전 캐릭터 번호 정리
alter table public.profiles add constraint profiles_avatar_check check (avatar is null or avatar ~ '^(P(0[1-9]|[1-3][0-9]|4[0-8])|M(0[1-9]|1[0-9]|2[0-4]))$');
grant update (display_name, daily_goal, daily_subjects, rank_public, avatar) on public.profiles to authenticated;

-- 2. 이번 주(월~일, 한국시간) 랭킹: 푼 문제 수 기준. 공개한 회원 + 나
--    캐릭터(전체 경험치 total_xp)·어워드(active_days, night_n)·응원(cheers) 정보 포함
create table if not exists public.cheers (
  week_start date not null,
  from_user  uuid not null references auth.users(id) on delete cascade,
  to_user    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (week_start, from_user, to_user)
);
alter table public.cheers enable row level security;
revoke all on public.cheers from anon, authenticated;     -- 직접 접근 불가, 아래 함수로만

drop function if exists public.weekly_ranking();
create or replace function public.weekly_ranking()
returns table (user_id uuid, display_name text, attempts bigint, rights bigint, total_xp bigint,
               active_days bigint, night_n bigint, cheers bigint, cheered_by_me boolean, is_me boolean, avatar text)
language sql stable security definer set search_path = public as $$
  select p.id, p.display_name,
         count(*) filter (where a.created_at >= ws.s),
         count(*) filter (where a.created_at >= ws.s and a.correct),
         count(*) + count(*) filter (where a.correct),
         count(distinct (a.created_at at time zone 'Asia/Seoul')::date) filter (where a.created_at >= ws.s),
         count(*) filter (where a.created_at >= ws.s and extract(hour from a.created_at at time zone 'Asia/Seoul') < 5),
         (select count(*) from public.cheers c
            where c.to_user = p.id and c.week_start = (date_trunc('week', now() at time zone 'Asia/Seoul'))::date),
         exists (select 1 from public.cheers c
            where c.to_user = p.id and c.from_user = auth.uid() and c.week_start = (date_trunc('week', now() at time zone 'Asia/Seoul'))::date),
         (p.id = auth.uid()),
         p.avatar
  from public.profiles p
  join public.attempts a on a.user_id = p.id
  cross join (select (date_trunc('week', now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul') as s) ws
  where public.is_approved()
    and p.status = 'approved'
    and (p.rank_public or p.id = auth.uid())
  group by p.id, p.display_name, p.avatar, ws.s
  having count(*) filter (where a.created_at >= ws.s) > 0
  order by 3 desc, 4 desc
  limit 50;
$$;

-- 응원 👏 (누르면 켜짐, 다시 누르면 취소). 이번 주 한 사람당 한 번
create or replace function public.toggle_cheer(target uuid)
returns boolean
language plpgsql security definer set search_path = public as $$
declare wk date := (date_trunc('week', now() at time zone 'Asia/Seoul'))::date;
begin
  if not public.is_approved() then raise exception 'forbidden' using errcode = '42501'; end if;
  if target = auth.uid() then raise exception 'cannot cheer yourself' using errcode = '22023'; end if;
  if not exists (select 1 from public.profiles where id = target and status = 'approved' and rank_public) then
    raise exception 'not public' using errcode = '22023';
  end if;
  if exists (select 1 from public.cheers where week_start = wk and from_user = auth.uid() and to_user = target) then
    delete from public.cheers where week_start = wk and from_user = auth.uid() and to_user = target;
    return false;
  end if;
  insert into public.cheers (week_start, from_user, to_user) values (wk, auth.uid(), target);
  return true;
end;
$$;
revoke all on function public.toggle_cheer(uuid) from public, anon;
grant execute on function public.toggle_cheer(uuid) to authenticated;

-- 3. 최근 24시간 활동 피드 (본인 것만), 과목별 묶음
create or replace function public.recent_activity()
returns table (display_name text, subject_key text, n bigint, last_at timestamptz, is_me boolean)
language sql stable security definer set search_path = public as $$
  select p.display_name, a.subject_key, count(*), max(a.created_at), (p.id = auth.uid())
  from public.profiles p
  join public.attempts a on a.user_id = p.id
  where public.is_approved()
    and p.status = 'approved'
    and p.id = auth.uid()
    and a.created_at >= now() - interval '24 hours'
  group by p.id, p.display_name, a.subject_key
  order by max(a.created_at) desc
  limit 30;
$$;

-- 4. 친구 대결
create table if not exists public.duels (
  id         uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  items      jsonb not null,                 -- [{s: 과목키, id: 문항번호}, ...]
  created_at timestamptz not null default now()
);
create table if not exists public.duel_results (
  duel_id    uuid not null references public.duels(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  correct    int  not null,
  total      int  not null,
  created_at timestamptz not null default now(),
  primary key (duel_id, user_id)
);

alter table public.duels        enable row level security;
alter table public.duel_results enable row level security;
revoke all on public.duels, public.duel_results from anon, authenticated;
grant select, insert, delete on public.duels to authenticated;
grant select, insert on public.duel_results to authenticated;

drop policy if exists duels_select on public.duels;
create policy duels_select on public.duels for select to authenticated using (public.is_approved());
drop policy if exists duels_insert on public.duels;
create policy duels_insert on public.duels for insert to authenticated
  with check (creator_id = auth.uid() and public.is_approved());

drop policy if exists duels_delete on public.duels;
create policy duels_delete on public.duels for delete to authenticated
  using (creator_id = auth.uid());

drop policy if exists duel_results_select on public.duel_results;
create policy duel_results_select on public.duel_results for select to authenticated using (user_id = auth.uid());
drop policy if exists duel_results_insert on public.duel_results;
create policy duel_results_insert on public.duel_results for insert to authenticated
  with check (user_id = auth.uid() and public.is_approved());

-- 대결 점수판 (이름·점수만 공개)
create or replace function public.duel_board(d uuid)
returns table (display_name text, correct int, total int, is_me boolean)
language sql stable security definer set search_path = public as $$
  select p.display_name, r.correct, r.total, (r.user_id = auth.uid())
  from public.duel_results r join public.profiles p on p.id = r.user_id
  where public.is_approved() and r.duel_id = d
  order by r.correct desc, r.created_at;
$$;

-- 내가 만들었거나 참가한 대결 목록 (is_mine: 내가 만든 대결 → 취소 가능)
drop function if exists public.my_duels();
create or replace function public.my_duels()
returns table (id uuid, created_at timestamptz, creator_name text, total int, my_correct int, players bigint, is_mine boolean)
language sql stable security definer set search_path = public as $$
  select d.id, d.created_at, c.display_name, jsonb_array_length(d.items),
         (select r.correct from public.duel_results r where r.duel_id = d.id and r.user_id = auth.uid()),
         (select count(*) from public.duel_results r where r.duel_id = d.id),
         (d.creator_id = auth.uid())
  from public.duels d join public.profiles c on c.id = d.creator_id
  where public.is_approved()
    and (d.creator_id = auth.uid()
         or exists (select 1 from public.duel_results r where r.duel_id = d.id and r.user_id = auth.uid()))
  order by d.created_at desc
  limit 15;
$$;

revoke all on function public.weekly_ranking(), public.recent_activity(), public.duel_board(uuid), public.my_duels() from public, anon;
grant execute on function public.weekly_ranking(), public.recent_activity(), public.duel_board(uuid), public.my_duels() to authenticated;

-- 5. 내 기록 초기화 (본인 풀이 기록만 삭제)
create or replace function public.reset_my_records()
returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'unauthorized' using errcode = '42501'; end if;
  delete from public.attempts   where user_id = auth.uid();
  delete from public.sessions   where user_id = auth.uid();
  delete from public.daily_sets where user_id = auth.uid();
  if to_regclass('public.note_clears') is not null then
    execute 'delete from public.note_clears where user_id = $1' using auth.uid();
  end if;
  delete from public.cheers where to_user = auth.uid();
end;
$$;
revoke all on function public.reset_my_records() from public, anon;
grant execute on function public.reset_my_records() to authenticated;

-- 6. 기간별 랭킹: period = 'day'(오늘) | 'two'(어제+오늘, 이틀 모두 푼 사람만) | 'week'(이번 주)
create or replace function public.ranking(period text default 'week')
returns table (user_id uuid, display_name text, attempts bigint, rights bigint, total_xp bigint,
               active_days bigint, night_n bigint, cheers bigint, cheered_by_me boolean, is_me boolean, avatar text)
language sql stable security definer set search_path = public as $$
  select p.id, p.display_name,
         count(*) filter (where a.created_at >= ws.s),
         count(*) filter (where a.created_at >= ws.s and a.correct),
         count(*) + count(*) filter (where a.correct),
         count(distinct (a.created_at at time zone 'Asia/Seoul')::date) filter (where a.created_at >= ws.s),
         count(*) filter (where a.created_at >= ws.s and extract(hour from a.created_at at time zone 'Asia/Seoul') < 5),
         (select count(*) from public.cheers c
            where c.to_user = p.id and c.week_start = (date_trunc('week', now() at time zone 'Asia/Seoul'))::date),
         exists (select 1 from public.cheers c
            where c.to_user = p.id and c.from_user = auth.uid() and c.week_start = (date_trunc('week', now() at time zone 'Asia/Seoul'))::date),
         (p.id = auth.uid()),
         p.avatar
  from public.profiles p
  join public.attempts a on a.user_id = p.id
  cross join (select case coalesce(period, 'week')
      when 'day' then date_trunc('day', now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul'
      when 'two' then (date_trunc('day', now() at time zone 'Asia/Seoul') - interval '1 day') at time zone 'Asia/Seoul'
      else date_trunc('week', now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul' end as s) ws
  where public.is_approved()
    and p.status = 'approved'
    and (p.rank_public or p.id = auth.uid())
  group by p.id, p.display_name, p.avatar, ws.s
  having count(*) filter (where a.created_at >= ws.s) > 0
     and (coalesce(period, 'week') <> 'two'
          or count(distinct (a.created_at at time zone 'Asia/Seoul')::date) filter (where a.created_at >= ws.s) = 2)
  order by 3 desc, 4 desc
  limit 50;
$$;
revoke all on function public.ranking(text) from public, anon;
grant execute on function public.ranking(text) to authenticated;

-- 7. 뱃지용 내 통계 (대결 참가·승리, 받은 응원, 보낸 신고)
create or replace function public.my_badge_stats()
returns table (duels_played bigint, duel_wins bigint, cheers_got bigint, reports_sent bigint)
language sql stable security definer set search_path = public as $$
  select
    (select count(*) from public.duel_results r where r.user_id = auth.uid()),
    (select count(*) from public.duel_results r
       where r.user_id = auth.uid()
         and (select count(*) from public.duel_results o where o.duel_id = r.duel_id) >= 2
         and r.correct > coalesce((select max(o.correct) from public.duel_results o where o.duel_id = r.duel_id and o.user_id <> r.user_id), -1)),
    (select count(*) from public.cheers c where c.to_user = auth.uid()),
    (select count(*) from public.reports p where p.user_id = auth.uid());
$$;
revoke all on function public.my_badge_stats() from public, anon;
grant execute on function public.my_badge_stats() to authenticated;

-- 8. 헤더 레이스: 참여 여부 + 오늘 푼 문제 수 (공개 안 한 사람은 이름·캐릭터 없이 익명)
alter table public.profiles add column if not exists race_join boolean not null default true;
grant update (race_join) on public.profiles to authenticated;

create or replace function public.race_today()
returns table (k text, name text, avatar text, n bigint, is_me boolean)
language sql stable security definer set search_path = public as $$
  select md5(p.id::text || (now() at time zone 'Asia/Seoul')::date::text),
         case when p.rank_public or p.id = auth.uid() then p.display_name end,
         case when p.rank_public or p.id = auth.uid() then p.avatar end,
         count(*),
         (p.id = auth.uid())
  from public.profiles p
  join public.attempts a on a.user_id = p.id
  where public.is_approved()
    and p.status = 'approved'
    and p.race_join
    and a.created_at >= date_trunc('day', now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul'
  group by p.id, p.display_name, p.avatar, p.rank_public
  order by 4 desc
  limit 30;
$$;
revoke all on function public.race_today() from public, anon;
grant execute on function public.race_today() to authenticated;

-- 9. 헤더 레이스 솔로 모드: 모드·목표·어제의 나·페이스메이커 설정 + '어제의 나' 수
alter table public.profiles add column if not exists race_mode text not null default 'compete';
alter table public.profiles add column if not exists race_goal integer not null default 80;
alter table public.profiles add column if not exists race_ghost boolean not null default true;
alter table public.profiles add column if not exists race_pace boolean not null default true;
do $$ begin
  alter table public.profiles add constraint profiles_race_mode_chk check (race_mode in ('compete','solo'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.profiles add constraint profiles_race_goal_chk check (race_goal between 10 and 500);
exception when duplicate_object then null; end $$;
grant update (race_mode, race_goal, race_ghost, race_pace) on public.profiles to authenticated;

create or replace function public.race_ghost()
returns bigint
language sql stable security definer set search_path = public as $$
  select count(*) from public.attempts a
  where a.user_id = auth.uid()
    and a.created_at >= (date_trunc('day', now() at time zone 'Asia/Seoul') - interval '1 day') at time zone 'Asia/Seoul'
    and a.created_at < now() - interval '1 day';
$$;
revoke all on function public.race_ghost() from public, anon;
grant execute on function public.race_ghost() to authenticated;
