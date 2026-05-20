# 개발자의 AI 활용법

Generative AI(Gemini 2.0 Flash)를 실생활에 적용한 세 가지 스마트 웹 서비스 발표 프로젝트

---

## 빠른 시작

### 1. 환경 설정

```bash
# 의존성 설치
npm install

# API 키 설정
cp .env.example .env        # .env 파일 생성
cp config.example.js config.js  # config.js 파일 생성
# .env와 config.js에 발급받은 키 입력
```

### 2. 서버 실행

```bash
node server.js
# 또는
시작.bat  # Windows — 서버 자동 시작 후 브라우저 오픈
```

브라우저에서 → **http://localhost:3000**

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
ai-assignment/
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
├── .env.example            # 환경변수 템플릿 (Gemini API 키)
├── config.example.js       # 클라이언트 설정 템플릿 (Naver 키)
└── package.json            # Node.js 의존성
```

> **보안 주의:** `.env`와 `config.js`는 gitignore 처리되어 있습니다.  
> 절대 API 키를 커밋하거나 채팅에 공유하지 마세요.

---

## 기술 스택

- **AI** — Gemini 2.0 Flash (Google), 멀티턴 대화, 모델 폴백 체인
- **백엔드** — Node.js + Express (API 프록시)
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
