# 개발자의 AI 활용법

Gemini AI를 실생활에 적용한 건강 분석·생활비 관리·스마트 네비게이션 웹 서비스

---

## 빠른 시작

```bash
# 1. 코드 받기
git clone https://github.com/dyd8115-max/cs_basic_slides.git
cd cs_basic_slides

# 2. 패키지 설치
npm install

# 3. 설정 파일 생성
copy .env.example .env          # Windows
copy config.example.js config.js

# 4. .env 파일에 API 키 입력 후 실행
node server.js
```

→ 브라우저에서 **http://localhost:3000** 접속

> **Windows 한정:** `시작.bat` 더블클릭 시 서버 실행 + 브라우저 자동 오픈

---

## 설치 항목

### Node.js (필수)

서버 실행에 필요합니다.

- **https://nodejs.org** → LTS 버전 다운로드 → 설치 (Next만 누르면 됨)
- 설치 확인:
  ```
  node -v   # v20.x.x 가 나오면 성공
  npm -v    # 버전 번호가 나오면 성공
  ```

---

### Gemini API 키 (필수)

AI 기능(건강 분석·생활비 계획·네비 추가시간 계산) 전체에 사용됩니다.  
**무료**로 발급 가능합니다.

1. **https://aistudio.google.com/app/apikey** 접속 (Google 계정 로그인)
2. **"Create API key"** 클릭 → 키 복사 (`AIzaSy...` 로 시작)
3. `.env` 파일에 붙여넣기:
   ```
   GEMINI_API_KEY=AIzaSy여기에_발급받은_키_입력
   ```

---

### Naver API 키 (선택)

지도 표시·주소 검색·경로 계산에 사용됩니다.  
**없어도 건강 분석기·생활비 분석기는 정상 작동합니다.**  
네비게이션까지 쓰려면 아래 절차대로 발급하세요.

1. **https://www.ncloud.com** → 회원가입 / 로그인
2. 콘솔 → **AI·NAVER API → Maps → Web Dynamic Map** → "이용 신청" → 앱 생성
   - 생성된 **Client ID** 복사 → `config.js` 에 입력:
     ```js
     window.NAVER_CLIENT_ID = '여기에_Client_ID';
     ```
3. **마이페이지 → 인증키 관리** → "신규 API 인증키 생성"
   - **Access Key ID** 와 **Secret Key** 복사 → `.env` 에 입력:
     ```
     NCP_API_KEY_ID=여기에_Access_Key
     NCP_API_SECRET=여기에_Secret_Key
     ```
4. 앱 설정에서 **Geocoding**, **Directions 15** 사용 설정 추가

---

## 자주 겪는 문제

| 증상 | 원인 | 해결 |
|------|------|------|
| `node: command not found` | Node.js 미설치 | nodejs.org 에서 설치 후 터미널 재시작 |
| `Cannot find module 'express'` | npm install 안 함 | `npm install` 실행 |
| AI 응답이 안 옴 | Gemini 키 오류 | `.env` 의 `GEMINI_API_KEY` 확인 |
| 지도·주소검색이 안 됨 | Naver 키 없거나 오류 | `config.js` · `.env` 의 Naver 키 확인 |
| 포트 3000 이미 사용 중 | 서버가 이미 실행 중 | 기존 서버 종료 후 재실행 |

---

## 프로젝트 소개

### 개요

이 프로젝트는 **Generative AI(Gemini 2.0 Flash)** 를 실생활 문제 해결에 직접 적용해본  
웹 서비스 개발 실습입니다. 세 가지 독립적인 AI 서비스를 하나의 발표용 웹앱으로 구성했습니다.

API 키를 브라우저에 노출하지 않기 위해 **Node.js + Express 프록시 서버**를 두고,  
프론트엔드는 React·Vue 없이 **Vanilla JS ES Modules**만으로 구현했습니다.

---

### 서비스 1 — AI 건강 증상 분석기

기침·발열·두통 등 16가지 증상을 선택하거나 직접 텍스트로 입력하면  
AI가 가능성 높은 질병 3가지를 추론하고 각각의 치료법과 병원 방문 기준을 안내합니다.

- 증상 복수 선택 + 자유 텍스트 추가 입력 가능
- 응답 형식을 시스템 프롬프트로 강제해 일관된 결과 출력
- 의료 전문가 진단 대체가 아닌 참고용임을 명시

---

### 서비스 2 — AI 생활비 분석기

3명의 샘플 사용자 데이터(식비·쇼핑·여가 등 카테고리별 지출)를 차트로 시각화하고,  
"32만원으로 감량해줘"처럼 자연어로 목표를 입력하면  
AI가 과소비 카테고리를 우선순위에 따라 감량하는 절약 계획을 생성합니다.

- 막대·원형·꺾은선 차트 실시간 전환 (Chart.js 4)
- AI가 생성한 감량 계획을 차트에 오버레이로 시각화
- 대화를 이어가며 계획을 수정하는 멀티턴 대화 지원

---

### 서비스 3 — AI 스마트 네비게이션

출발지·도착지 주소를 입력하면 Naver Maps API로 실제 경로와 소요시간을 계산하고,  
이후 채팅으로 날씨나 층수 조건을 알려주면 AI가 추가 소요시간을 직접 계산해 반영합니다.

- 걷기 4km/h · 뛰기 10km/h · 층수 1층당 30초 기준으로 AI가 직접 연산
- 눈·비·흐림·교통체증 시 비율 가중치 적용 (예: 눈 +35%)
- Naver API 미설정 시 OSRM 오픈소스 엔진으로 자동 폴백

---

### 공통 기술 구조

```
사용자 입력 (증상 / 지출 목표 / 주소·날씨)
        ↓
  프론트엔드 (Vanilla JS)
        ↓
  Express 프록시 서버  ←── .env (API 키 보관)
        ↓
  Gemini 2.0 Flash API
        ↓
  결과 반환 (텍스트 / 차트 업데이트 / 지도 표시)
```

AI 동작은 코드가 아닌 **시스템 프롬프트**로 제어합니다.  
할당량 초과(429) 시 Flash → Flash-Lite 로 **자동 모델 폴백**되어 서비스가 중단되지 않습니다.

---

## 파일 구조

```
cs_basic_slides/
│
├── index.html              # 메인 HTML (전체 슬라이드 14개 + 기능 화면)
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
├── .env.example            # 환경변수 템플릿 → .env 로 복사해서 사용
├── config.example.js       # 클라이언트 설정 템플릿 → config.js 로 복사해서 사용
└── package.json            # Node.js 의존성 목록
```

> **보안:** `.env`와 `config.js`는 gitignore 처리되어 있습니다.  
> API 키를 커밋하거나 채팅·메신저에 공유하지 마세요.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| AI | Gemini 2.0 Flash, 프롬프트 엔지니어링, 모델 폴백 체인 |
| 백엔드 | Node.js, Express.js |
| 지도 | Naver Maps SDK, Naver Directions API, OSRM |
| 차트 | Chart.js 4 |
| 프론트엔드 | Vanilla JS ES Modules (빌드 도구 없음) |

---

## 팀

| 역할 | 이름 |
|------|------|
| 발표 | 박위찬 |
| PPT 제작 | 이용균, 장준수 |
| 자료 조사 | 김지훈, 배하은, 김주란, 정윤재 |
