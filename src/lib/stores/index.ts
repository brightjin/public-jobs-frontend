import { writable } from 'svelte/store';

// Mock 데이터 가져오기
export * from '../mock';

// 사용자 상태 관리
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  preferences?: {
    location?: string;
    salary?: string;
    jobType?: string;
    notifications?: boolean;
  };
}

export const user = writable<User | null>(null);

// 채용공고 상태 관리 (확장된 인터페이스)
export interface Job {
  id: string;
  title: string;
  organization: string;
  location: string;
  salary: string;
  requirements: string[];
  deadline: string;
  description: string;
  matchScore?: number;
  // 추가 필드들
  category?: string;
  workType?: string;
  experience?: string;
  education?: string;
  benefits?: string[];
  tags?: string[];
  department?: string;
  recruitCount?: number;
  applicationCount?: number;
  viewCount?: number;
  isHot?: boolean;
  isNew?: boolean;
  isUrgent?: boolean;
}

export const jobs = writable<Job[]>([]);
export const selectedJob = writable<Job | null>(null);
export const jobFilters = writable({
  category: 'all',
  location: 'all',
  salary: 'all',
  experience: 'all',
  search: ''
});

// AI 추천 상태
export interface MatchRecommendation {
  jobId: string;
  score: number;
  reasons: string[];
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
}

export const recommendations = writable<MatchRecommendation[]>([]);
export const matchingAnalysis = writable<any>(null);

// 이력서 상태 (ResumeData 인터페이스 사용)
export const resume = writable<any>(null);
export const resumeParseResult = writable<any>(null);

// 채팅 상태
export const chatSessions = writable<any[]>([]);
export const currentChatSession = writable<any>(null);
export const chatMessages = writable<any[]>([]);

// 공공기관 정보 상태
export const organizations = writable<any[]>([]);
export const selectedOrganization = writable<any>(null);

// UI 상태
export const isLoading = writable(false);
export const chatOpen = writable(false);
export const darkMode = writable(false);
export const sidebarOpen = writable(false);
export const notifications = writable<Array<{
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}>>([]);

// 앱 전역 상태
export const appState = writable({
  currentPage: '',
  breadcrumbs: [],
  isOnline: true,
  lastSync: new Date()
});

// 로그인 모달 상태
export const navigationState = writable({
  showLoginModal: false,
  email: ''
});

// 질문 인터페이스
export interface Question {
  id: string;
  subject: string;
  text: string;
  options: number[];
  answer?: string;
}

export const questions = writable<Question[]>([]);