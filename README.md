# Gem Excuse (반응형 웹 변명 생성기)

Google Gemini AI를 활용하여 다양한 상황에 맞는 변명을 생성해주는 웹 애플리케이션입니다. 사용자는 상황을 선택하거나 입력하고, 원하는 톤(유머러스, 절박함, 정중함)을 설정하여 맞춤형 변명을 생성할 수 있습니다.

![App Screenshot](public/sample.png)

## 주요 기능

- **상황 배지 선택**: 자주 발생하는 상황(지각, 회식 불참, 과제 미제출 등)을 배지로 제공하여 빠른 선택 가능
- **직접 입력**: 구체적이고 특수한 상황을 직접 텍스트로 입력 가능
- **3가지 생성 모드**:
  - 🤣 **유머러스**: 재치 있고 웃음을 유발하는 변명
  - 🥺 **절박함**: 동정심을 유발하는 애절한 변명
  - 🎩 **정중함**: 예의 바르고 격식 있는 변명
- **AI 기반 생성**: Google Gemini 2.5 Flash 모델을 사용하여 자연스럽고 창의적인 텍스트 생성
- **반응형 디자인**: 모바일과 데스크톱 환경 모두에 최적화된 UI

## 기술 스택

- **Frontend**: React, Vite
- **Styling**: CSS (Vanilla)
- **AI Integration**: Google Generative AI SDK (@google/generative-ai)
- **Icons**: Lucide React

## 시작하기

이 프로젝트를 로컬 환경에서 실행하기 위한 단계입니다.

### 필수 조건 (Prerequisites)

- Node.js (v18.0.0 이상 권장)
- npm (Node.js 설치 시 포함됨)
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/)에서 발급 가능)

### 설치 (Installation)

1. 프로젝트 디렉토리로 이동합니다.
2. 패키지 의존성을 설치합니다.

```bash
npm install
```

### 환경 변수 설정 (Configuration)

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, 발급받은 Gemini API 키를 입력합니다.

1. `.env` 파일 생성
2. 아래 내용 추가

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

> **주의**: `.env` 파일은 git에 커밋되지 않도록 주의하세요 (이미 `.gitignore`에 포함되어 있습니다).

### 실행 (Running the App)

개발 서버를 실행합니다.

```bash
npm run dev
```

터미널에 표시된 로컬 주소(보통 `http://localhost:5173`)를 브라우저에서 열어 애플리케이션을 확인합니다.

## 프로젝트 구조

```
gem-excuse/
├── public/             # 정적 파일
├── src/
│   ├── components/     # React 컴포넌트
│   ├── App.jsx         # 메인 애플리케이션 컴포넌트
│   ├── main.jsx        # 진입점 (Entry point)
│   └── index.css       # 전역 스타일
├── .env                # 환경 변수 (API 키 등)
├── index.html          # HTML 템플릿
├── package.json        # 프로젝트 의존성 및 스크립트
└── vite.config.js      # Vite 설정
```
