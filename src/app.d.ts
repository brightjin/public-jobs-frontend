// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// 환경 변수 타입 정의
interface ImportMetaEnv {
	readonly PUBLIC_SITE_NAME: string;
	readonly PUBLIC_SITE_DESCRIPTION: string;
	readonly PUBLIC_SITE_TAGLINE: string;
	readonly PUBLIC_SITE_URL: string;
	readonly PUBLIC_SITE_VERSION: string;
	readonly PUBLIC_AI_FEATURES_ENABLED: string;
	readonly PUBLIC_CHATBOT_ENABLED: string;
	readonly PUBLIC_THEME_MODE: string;
	readonly PUBLIC_ANALYTICS_ENABLED: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

export {};
