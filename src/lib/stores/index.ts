import { writable } from 'svelte/store';

// 사용자 상태 관리
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export const user = writable<User | null>(null);

// 이력서 상태 관리
export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string[];
  skills: string[];
  education: string[];
}

export const resume = writable<Resume | null>(null);

// 채용공고 상태 관리
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
}

export const jobs = writable<Job[]>([]);
export const selectedJob = writable<Job | null>(null);

// AI 추천 상태
export interface MatchRecommendation {
  jobId: string;
  score: number;
  reasons: string[];
}

export const recommendations = writable<MatchRecommendation[]>([]);

// UI 상태
export const isLoading = writable(false);
export const chatOpen = writable(false);
export const darkMode = writable(false);