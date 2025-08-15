# 🏛️ 공공기관 채용정보 플랫폼 Frontend

[![Watch the video](https://github.com/syschat0/public-jobs-frontend/blob/main/screenshot.gif?raw=true)](https://github.com/syschat0/public-jobs-frontend/raw/refs/heads/main/screenshot.mp4)

> **이력서 분석, 채용 매칭, 24시간 채팅응대 × AI 기반 신개념 공공 채용 포털**

공공기관 채용 정보를 신속·정확·친근하게 제공하고, **사용자의 이력서를 AI가 자동 분석하거나 AI상담을 통하여 최적의 구직 매칭을 추천**하며,  
**채용 담당자는 문서만 올려도 AI 챗봇이 24시간 응답**할 수 있도록 지원하는 **지능형 채용 플랫폼**입니다.

## ✨ 주요 기능

- **AI 이력서 변환**: Word/PDF 이력서를 업로드하면 LLM이 자동으로 입력 필드에 채움
- **AI 맞춤 추천**: 이력서 기반으로 "이 공고가 당신과 92% 일치합니다" 방식의 정확한 매칭 제공
- **채용담당자 AI 챗봇**: 업로드한 PDF/DOCX 문서를 기반으로 LLM이 응답 – 인간 개입 최소화 
- **접근성 우선**: 화면 리더, 키보드 네비게이션, 고대비 테마 지원 (WCAG 준수)

## 🛠️ 기술 스택

- **프레임워크**: SvelteKit (SSR, SSG, API route)
- **스타일링**: Tailwind CSS + UnoCSS
- **상태 관리**: Svelte Stores
- **애니메이션**: Svelte Morph DOM, GSAP
- **접근성**: ARIA 속성, axe-core, Playwright E2E 테스트
- **PWA**: 서비스 워커, 캐싱 전략

## 🚀 시작하기

### 의존성 설치

```bash
npm install
# 또는
pnpm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev

# 또는 브라우저에서 자동으로 열기
npm run dev -- --open
```

### 빌드

프로덕션 버전을 빌드하려면:

```bash
npm run build
```

빌드된 앱을 미리보기:

```bash
npm run preview
```
### 오류발생시
```bsah
npm install -D tailwindcss postcss autoprefixer
```


## 📁 프로젝트 구조

```
src/
├── routes/              # 페이지 라우트
│   ├── +page.svelte    # 메인 페이지
│   ├── jobs/           # 채용공고 관련
│   ├── resume/         # 이력서 관련
│   ├── chat/           # AI 챗봇
│   └── admin/          # 관리자 페이지
├── lib/
│   ├── components/     # 재사용 컴포넌트
│   ├── stores.js       # 상태 관리
│   └── utils/          # 유틸리티 함수
└── app.html            # HTML 템플릿
```

## 🎯 주요 페이지

- **메인 화면** (`/`): 인기 채용 공고, 필터 검색, 맞춤 추천
- **채용 공고** (`/jobs`): 조건별 필터링 및 상세 정보
- **이력서 관리** (`/resume`): AI 파싱 및 편집 기능
- **AI 매칭** (`/match`): 개인화된 구직 추천
- **AI 챗봇** (`/chat`): 실시간 채용 상담

## 🔒 보안 및 개인정보

- 프론트엔드에서 민감 정보 표시 최소화
- 파일 업로드 후 즉시 로컬/세션 삭제
- AI 처리 데이터는 토큰화 및 암호화
- GDPR/개인정보보호법 준수

## 📄 라이센스

이 프로젝트는 공공성을 목적으로 하며, 자세한 라이센스 정보는 추후 업데이트 예정입니다.
