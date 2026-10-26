# 치과기공사 국가시험 퀴즈

과목별 5지선다 문제를 풀고, 풀이 기록을 클라우드에 저장하는 웹앱입니다.
(구글 로그인 · 관리자 승인제 · 하루 목표에 맞춘 "오늘의 문제" 자동 구성)

## 1단계 기능
- 구글 로그인, 가입 후 **관리자 승인**을 받아야 사용 가능
- 문제를 풀 때마다 정오답이 클라우드에 저장 (끊겨도 기기에 보관했다가 자동 재전송)
- 선택지별 해설 + 5번 아래 공통 해설
- **오늘의 문제**: 하루 목표 문항 수만 정하면 오답 복습 → 안 푼 문제 → 오래된 정답 순으로 자동 구성
- 오류 검토 요청(신고), 관리자 화면(회원 승인·차단·기록 초기화, 신고 처리)

## 설정 순서 (처음 한 번)

1. **Supabase 프로젝트 만들기** — https://supabase.com → New project
2. **DB 만들기** — SQL Editor에 `supabase/schema.sql` 전체를 붙여넣고 Run
3. **구글 로그인 켜기**
   - Google Cloud Console → API 및 서비스 → 사용자 인증 정보 → OAuth 클라이언트 ID(웹 애플리케이션) 만들기
   - 승인된 리디렉션 URI: Supabase의 Authentication → Providers → Google 화면에 적힌 `https://<프로젝트>.supabase.co/auth/v1/callback`
   - 발급된 Client ID / Secret을 Supabase Google 설정에 입력하고 Enable
4. **주소 등록** — Supabase Authentication → URL Configuration
   - Site URL: 배포 주소 (예: `https://jun8222.github.io/1/`)
   - Redirect URLs: 같은 주소 (로컬 테스트용 `http://localhost:8000/` 도 추가 가능)
5. **연결 정보 입력** — Supabase Project Settings → API 의 `Project URL`, `anon public` 키를 `js/config.js` 에 입력
   (`service_role` 키는 절대 넣지 마세요)
6. **첫 관리자 지정** — 앱에서 구글 로그인을 한 번 한 뒤, SQL Editor에서 실행
   ```sql
   update public.profiles set role = 'admin', status = 'approved' where email = '내이메일@gmail.com';
   ```
7. **배포** — 저장소를 GitHub에 올리고 Settings → Pages 에서 `main` 브랜치 배포

이후 친구들이 로그인하면 `회원 관리`에 "승인 대기"로 뜨고, 승인해 주면 사용할 수 있습니다.

## 폴더 구조
| 경로 | 설명 |
|---|---|
| `index.html` | 화면과 스타일 |
| `js/app.js` | 앱 로직 (화면, 풀이, 설정, 관리자) |
| `js/cloud.js` | Supabase 연동 (로그인, 기록 저장, 재전송 대기열) |
| `js/daily.js` | 오늘의 문제 구성 규칙 |
| `js/config.js` | Supabase 주소·키 |
| `data/*.js` | 과목별 문제 데이터 |
| `supabase/schema.sql` | DB 테이블·권한(RLS) |
| `tests/daily.test.js` | 오늘의 문제 구성 테스트 (`node tests/daily.test.js`) |

## 보안 메모
- 모든 테이블에 RLS가 켜져 있어 회원은 **자기 기록만** 읽고 쓸 수 있고, 기록은 추가만 가능합니다(수정·삭제 불가).
- 역할/승인 상태는 본인이 바꿀 수 없고 관리자 전용 함수로만 바뀝니다.
- `anon` 키는 공개되어도 되는 키입니다. 데이터 보호는 RLS가 담당합니다.

## 다음 단계 (예정)
2단계: 문제별 개념 태그 + 약점 분석 · 3단계: PDF 소스 기반 개념 정리(RAG, Gemini) · 주간 리포트 · 푸시 알림
