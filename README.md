# 개발자의 AI 활용법

Gemini 2.0 Flash AI를 활용해 만든 세 가지 실생활 웹 서비스입니다.

- **AI 건강 증상 분석기** — 증상을 선택하면 AI가 질병과 치료법을 추론
- **AI 생활비 분석기** — 지출 데이터 시각화 + 자연어로 절약 계획 생성
- **AI 스마트 네비게이션** — 경로 계산 + 날씨·층수 조건을 AI가 반영해 소요시간 산출

AI 기능은 Node.js 프록시 서버를 통해 동작하므로 **반드시 `node server.js`를 실행한 뒤** 브라우저로 접속해야 합니다.  
(VSCode 라이브 서버로 열면 AI 기능이 작동하지 않습니다)

---

## 실행 방법

### 1. Node.js 설치

아직 없으면 먼저 설치하세요.

> **https://nodejs.org** → LTS 버전 다운로드 → 설치

설치 확인:
```
node -v
```

### 2. 코드 받고 패키지 설치

```bash
git clone https://github.com/dyd8115-max/cs_basic_slides.git
cd cs_basic_slides
npm install
```

### 3. API 키 설정

```
copy .env.example .env
copy config.example.js config.js
```

`.env` 파일을 메모장으로 열어서 Gemini API 키 입력:

```
GEMINI_API_KEY=여기에_키_입력
```

> Gemini 키 무료 발급 → **https://aistudio.google.com/app/apikey**

### 4. 서버 실행

```bash
node server.js
```

브라우저에서 → **http://localhost:3000**

> Windows라면 `시작.bat` 더블클릭으로 자동 실행 가능
