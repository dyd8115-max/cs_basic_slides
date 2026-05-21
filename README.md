# 개발자의 AI 활용법

Generative AI(Gemini 2.0 Flash)를 실생활에 적용한 세 가지 스마트 웹 서비스 발표 프로젝트

---

## 필수 설치 항목

실행 전에 아래 프로그램이 컴퓨터에 설치되어 있어야 합니다.

### 1. Node.js (필수)

서버를 돌리기 위해 반드시 필요합니다.

- 다운로드: **https://nodejs.org**
- **LTS 버전** 선택 → 설치 마법사에서 전부 Next 클릭
- 설치 후 터미널(cmd / PowerShell)을 새로 열고 확인:

```
node -v    # v20.x.x 같은 버전 번호가 나오면 성공
npm -v     # 버전 번호가 나오면 성공
```

> Node.js를 설치하면 npm도 함께 설치됩니다.

---

### 2. Git (필수)

코드를 내려받기 위해 필요합니다.

- 다운로드: **https://git-scm.com/downloads**
- Windows → **"Git for Windows"** 선택 → 설치 마법사에서 전부 Next 클릭
- 설치 후 확인:

```
git --version    # git version 2.x.x 가 나오면 성공
```

> 이미 GitHub Desktop이 설치되어 있으면 Git도 같이 있을 수 있습니다.

---

### 3. 웹 브라우저

최신 버전의 아래 브라우저 중 하나를 사용하세요.

- **Chrome** (권장) — https://www.google.com/chrome
- Edge, Firefox, Safari 최신 버전도 가능

---

### 4. API 키 발급

#### Gemini API 키 (필수 — AI 기능 전체에 사용)

무료로 발급 가능합니다.

1. **https://aistudio.google.com/app/apikey** 접속 (Google 계정 로그인)
2. **"Create API key"** 버튼 클릭
3. 생성된 키(`AIzaSy...` 로 시작하는 문자열) 복사해서 저장

#### Naver API 키 (선택 — 지도·주소검색 기능에만 사용)

없어도 건강 분석기·생활비 분석기는 정상 작동합니다.  
네비게이션 기능까지 쓰려면 아래 절차대로 발급하세요.

1. **https://www.ncloud.com** 접속 → 회원가입 / 로그인
2. 콘솔 상단 **"AI·NAVER API"** 메뉴 클릭
3. **Maps → Web Dynamic Map** → "이용 신청" → 앱 이름 입력 후 생성  
   → **Client ID** 복사 (예: `abc123xyz`)
4. **마이페이지 → 인증키 관리** → "신규 API 인증키 생성"  
   → **Access Key ID** 와 **Secret Key** 복사
5. 생성한 앱 설정에서 **Geocoding**, **Directions 15** 도 사용 설정

---

## 설치 및 실행

### Step 1 — 코드 받기

```bash
git clone https://github.com/dyd8115-max/cs_basic_slides.git
cd cs_basic_slides
```

### Step 2 — 패키지 설치

```bash
npm install
```

> `node_modules` 폴더가 생기면 성공. 인터넷 연결 필요, 1~2분 소요.

### Step 3 — 설정 파일 만들기

**Windows (cmd / PowerShell):**

```
copy .env.example .env
copy config.example.js config.js
```

**Mac / Linux:**

```bash
cp .env.example .env
cp config.example.js config.js
```

### Step 4 — API 키 입력

`.env` 파일을 메모장으로 열어서 수정:

```
GEMINI_API_KEY=AIzaSy여기에_발급받은_키_붙여넣기
NCP_API_KEY_ID=여기에_Access_Key_붙여넣기
NCP_API_SECRET=여기에_Secret_Key_붙여넣기
```

`config.js` 파일을 메모장으로 열어서 수정:

```js
window.NAVER_CLIENT_ID = '여기에_Client_ID_붙여넣기';
// Naver 키 없으면 그냥 빈 문자열로 두세요 → ''
```

### Step 5 — 실행

```bash
node server.js
```

브라우저에서 → **http://localhost:3000**

> **Windows 한정:** `시작.bat` 파일을 더블클릭하면 서버 실행 + 브라우저 자동 오픈

---

## 자주 겪는 문제

| 증상 | 원인 | 해결 |
|------|------|------|
| `node: command not found` | Node.js 미설치 | nodejs.org 에서 설치 후 터미널 재시작 |
| `Cannot find module 'express'` | npm install 안 함 | `npm install` 실행 |
| AI 응답이 안 옴 | Gemini 키 오류 | `.env` 파일의 `GEMINI_API_KEY` 확인 |
| 지도가 안 뜸 | Naver 키 없음 | 정상 (건강·생활비는 동작) |
| 주소 검색이 안 됨 | Naver 키 없음 | `config.js` 의 Client ID 확인 |
| 포트 3000 이미 사용 중 | 다른 프로그램 충돌 | `node server.js` 종료 후 재실행 |

---

## 서비스 소개

| 서비스 | 설명 |
|--------|------|
| 🏥 AI 건강 증상 분석기 | 증상 선택 → AI가 가능성 높은 질병 3가지와 치료법 안내 |
| 📊 AI 생활비 분석기 | 지출 데이터 시각화 + 자연어로 절약 계획 생성 |
| 🗺️ AI 스마트 네비게이션 | 경로 계산 + 날씨·층수 조건을 AI가 반영해 소요시간 산출 |

---

## 파일 구조

```
cs_basic_slides/
│
├── index.html              # 메인 HTML (전체 슬라이드 + 기능 화면)
├── server.js               # Express 프록시 서버 (API 키 보호)
├── 시작.bat                # Windows 실행 스크립트
│
├── css/
│   └── styles.css          # 전체 스타일시트
│
├── js/
│   ├── main.js             # 화면 전환, 탭 네비게이션, 슬라이드 제어
│   ├── claude.js           # Gemini API 호출 + 모델 폴백(Flash → Flash-Lite)
│   ├── health.js           # 건강 증상 분석기 로직
│   ├── expense.js          # 생활비 분석기 + Chart.js 렌더링
│   ├── navigation.js       # 네비게이션 + Naver Maps + OSRM 경로 계산
│   ├── autocomplete.js     # 주소 검색 모달 (Naver Geocoding API)
│   └── chat.js             # 채팅 메시지 렌더링 유틸
│
├── .env.example            # 환경변수 템플릿 (복사해서 .env 로 사용)
├── config.example.js       # 클라이언트 설정 템플릿 (복사해서 config.js 로 사용)
└── package.json            # Node.js 의존성 목록
```

> **보안:** `.env`와 `config.js`는 gitignore 처리되어 있습니다.  
> API 키를 커밋하거나 채팅·메신저에 공유하지 마세요.

---

## 기술 스택

- **AI** — Gemini 2.0 Flash (Google), 멀티턴 대화, 모델 폴백 체인
- **백엔드** — Node.js + Express (API 프록시 서버)
- **지도** — Naver Maps SDK, Naver Directions API, OSRM(폴백)
- **차트** — Chart.js 4
- **프론트엔드** — Vanilla JS ES Modules (빌드 도구 없음)

---

## 팀

| 역할 | 이름 |
|------|------|
| 발표 | 박위찬 |
| PPT 제작 | 이용균, 장준수 |
| 자료 조사 | 김지훈, 배하은, 김주란, 정윤재 |
