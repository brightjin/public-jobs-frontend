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
  // 사용자의 직무 적합성 프로파일
  jobProfile?: {
    // Big Five 성격 특성
    conscientiousness: number;
    openness: number;
    extraversion: number;
    agreeableness: number;
    emotional_stability: number;
    // 직무 역량
    technical_mastery: number;
    cognitive_problem_solving: number;
    interpersonal_influence: number;
    self_management: number;
    adaptability: number;
    // 학습 민첩성
    learning_speed: number;
    people_agility: number;
    result_agility: number;
    // EQ (감성지능)
    self_awareness: number;
    self_regulation: number;
    empathy_social: number;
  };
}

// Mock 사용자 데이터 (테스트용)
const mockUser: User = {
  id: 'user1',
  name: '김개발',
  email: 'kim@example.com',
  role: 'user',
  avatar: '/images/avatar.jpg',
  preferences: {
    location: '서울',
    salary: '4000만원 이상',
    jobType: 'IT/개발',
    notifications: true
  },
  // 사용자의 실제 능력치 (정보보안 개발자)
  jobProfile: {
    conscientiousness: 4, openness: 4, extraversion: 3, agreeableness: 4, emotional_stability: 3,
    technical_mastery: 4, cognitive_problem_solving: 4, interpersonal_influence: 3, self_management: 3, adaptability: 4,
    learning_speed: 5, people_agility: 3, result_agility: 3,
    self_awareness: 3, self_regulation: 3, empathy_social: 4,
  }
};

export const user = writable<User | null>(mockUser);

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
  // 직무 적합성 프로파일 (채용공고의 요구사항)
  jobProfile?: {
    conscientiousness: number;
    openness: number;
    extraversion: number;
    agreeableness: number;
    emotional_stability: number;
    technical_mastery: number;
    cognitive_problem_solving: number;
    interpersonal_influence: number;
    self_management: number;
    adaptability: number;
    learning_speed: number;
    people_agility: number;
    result_agility: number;
    self_awareness: number;
    self_regulation: number;
    empathy_social: number;
  };
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