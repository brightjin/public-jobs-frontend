// AI 매칭 관련 Mock 데이터
import type { Job } from '$lib/stores';
import type { ResumeData } from './resume';

// 매칭 결과 인터페이스
export interface MatchResult {
  jobId: string;
  score: number; // 0-100
  reasons: MatchReason[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  salaryMatch: boolean;
  locationMatch: boolean;
  skillsMatch: SkillMatch[];
  experienceMatch: ExperienceMatch;
  requirementsMatch: RequirementMatch[];
}

// 매칭 이유
export interface MatchReason {
  category: 'skills' | 'experience' | 'education' | 'certifications' | 'location' | 'salary';
  message: string;
  weight: number; // 가중치 (0-1)
  positive: boolean; // 긍정적/부정적 요소
}

// 스킬 매칭
export interface SkillMatch {
  skillName: string;
  userLevel: string;
  requiredLevel: string;
  match: boolean;
  importance: 'high' | 'medium' | 'low';
}

// 경력 매칭
export interface ExperienceMatch {
  userYears: number;
  requiredYears: number;
  match: boolean;
  relevantExperience: boolean;
  industryMatch: boolean;
}

// 요구사항 매칭
export interface RequirementMatch {
  requirement: string;
  userHas: boolean;
  importance: 'must' | 'preferred' | 'optional';
  evidence?: string; // 증빙 정보
}

// 전체 매칭 분석 결과
export interface MatchingAnalysis {
  userId: string;
  totalMatches: number;
  averageScore: number;
  topMatches: MatchResult[];
  recommendations: string[];
  skillGaps: string[];
  careerAdvice: string[];
  nextSteps: string[];
}

// Mock 매칭 결과들
export const mockMatchResults: MatchResult[] = [
  {
    jobId: '1', // 서울시청 정보보안 담당자
    score: 92,
    reasons: [
      {
        category: 'skills',
        message: '정보보안 전문 기술이 요구사항과 95% 일치합니다',
        weight: 0.4,
        positive: true
      },
      {
        category: 'experience',
        message: '10년의 정보보안 분야 경력이 요구사항(3년 이상)을 크게 상회합니다',
        weight: 0.3,
        positive: true
      },
      {
        category: 'certifications',
        message: '정보보안기사, CISSP 등 핵심 자격증을 보유하고 있습니다',
        weight: 0.2,
        positive: true
      },
      {
        category: 'education',
        message: '컴퓨터공학 전공으로 직무 적합성이 높습니다',
        weight: 0.1,
        positive: true
      }
    ],
    strengths: [
      '정보보안 분야 10년 경력',
      '정보보안기사, CISSP 등 전문 자격증 다수 보유',
      '대규모 보안시스템 구축 경험',
      '공공기관 보안 프로젝트 참여 경험',
      'AI/ML 기반 보안솔루션 개발 경험'
    ],
    weaknesses: [
      '공공기관 직무 경험 부족',
      '정책 업무 경험 제한적'
    ],
    recommendations: [
      '공공기관 정보보안 정책 관련 사전 학습',
      '정부 디지털 전환 정책 이해도 향상',
      '공공부문 보안 규정 및 가이드라인 숙지'
    ],
    salaryMatch: true,
    locationMatch: true,
    skillsMatch: [
      {
        skillName: '정보보안',
        userLevel: 'expert',
        requiredLevel: 'advanced',
        match: true,
        importance: 'high'
      },
      {
        skillName: '시스템 관리',
        userLevel: 'advanced',
        requiredLevel: 'intermediate',
        match: true,
        importance: 'medium'
      },
      {
        skillName: '정책 기획',
        userLevel: 'beginner',
        requiredLevel: 'intermediate',
        match: false,
        importance: 'medium'
      }
    ],
    experienceMatch: {
      userYears: 10,
      requiredYears: 3,
      match: true,
      relevantExperience: true,
      industryMatch: true
    },
    requirementsMatch: [
      {
        requirement: '정보보안기사',
        userHas: true,
        importance: 'must',
        evidence: '2013년 취득'
      },
      {
        requirement: '3년 이상 경력',
        userHas: true,
        importance: 'must',
        evidence: '10년 경력'
      },
      {
        requirement: '컴퓨터공학 전공',
        userHas: true,
        importance: 'must',
        evidence: '서울대학교 컴퓨터공학과 졸업'
      }
    ]
  },
  {
    jobId: '4', // 인천시 스마트시티 개발자
    score: 88,
    reasons: [
      {
        category: 'skills',
        message: 'Python 전문 기술과 IoT 경험이 매우 적합합니다',
        weight: 0.4,
        positive: true
      },
      {
        category: 'experience',
        message: '시스템 개발 및 운영 경험이 풍부합니다',
        weight: 0.3,
        positive: true
      },
      {
        category: 'education',
        message: '컴퓨터공학 전공으로 기술적 배경이 우수합니다',
        weight: 0.2,
        positive: true
      },
      {
        category: 'location',
        message: '서울 거주로 인천 근무 가능합니다',
        weight: 0.1,
        positive: true
      }
    ],
    strengths: [
      'Python 전문가 수준의 개발 능력',
      '대규모 시스템 구축 및 운영 경험',
      'IoT 관련 프로젝트 참여 경험',
      '클라우드 인프라 구축 경험',
      '보안 관점에서의 시스템 설계 능력'
    ],
    weaknesses: [
      '스마트시티 특화 경험 부족',
      '시민서비스 개발 경험 제한적'
    ],
    recommendations: [
      '스마트시티 관련 사례 연구',
      '시민 중심 서비스 설계 방법론 학습',
      '지자체 디지털 서비스 현황 파악'
    ],
    salaryMatch: true,
    locationMatch: true,
    skillsMatch: [
      {
        skillName: 'Python',
        userLevel: 'expert',
        requiredLevel: 'advanced',
        match: true,
        importance: 'high'
      },
      {
        skillName: 'IoT',
        userLevel: 'intermediate',
        requiredLevel: 'intermediate',
        match: true,
        importance: 'high'
      },
      {
        skillName: '모바일 앱 개발',
        userLevel: 'beginner',
        requiredLevel: 'intermediate',
        match: false,
        importance: 'medium'
      }
    ],
    experienceMatch: {
      userYears: 10,
      requiredYears: 3,
      match: true,
      relevantExperience: true,
      industryMatch: false
    },
    requirementsMatch: [
      {
        requirement: '컴퓨터공학 전공',
        userHas: true,
        importance: 'must',
        evidence: '서울대학교 컴퓨터공학과 졸업'
      },
      {
        requirement: 'Python 능숙',
        userHas: true,
        importance: 'must',
        evidence: '8년 경력, 다수 프로젝트 수행'
      },
      {
        requirement: 'IoT 경험',
        userHas: true,
        importance: 'preferred',
        evidence: '보안관제시스템에서 IoT 센서 데이터 처리 경험'
      }
    ]
  },
  {
    jobId: '3', // 대구시교육청 AI교육 전문관
    score: 75,
    reasons: [
      {
        category: 'skills',
        message: 'AI/ML 기술 경험이 직무와 매우 관련성이 높습니다',
        weight: 0.3,
        positive: true
      },
      {
        category: 'experience',
        message: '기술 교육 및 트레이닝 경험이 있습니다',
        weight: 0.3,
        positive: true
      },
      {
        category: 'education',
        message: '교육학 전공이 아닌 점이 아쉽습니다',
        weight: 0.2,
        positive: false
      },
      {
        category: 'certifications',
        message: '교육 관련 자격증이 부족합니다',
        weight: 0.2,
        positive: false
      }
    ],
    strengths: [
      'AI/ML 기반 보안솔루션 개발 경험',
      '정보보안 교육 프로그램 운영 경험',
      '기술 멘토링 및 컨설팅 경험',
      '최신 기술 트렌드 이해도'
    ],
    weaknesses: [
      '교육학 전공 배경 부족',
      '정규 교육과정 설계 경험 부족',
      '교육효과 측정 및 평가 경험 제한적',
      '필수 교육경력 5년 미충족'
    ],
    recommendations: [
      '교육학 관련 추가 학습 또는 학위 취득',
      '교육 방법론 및 커리큘럼 설계 교육 이수',
      '교육효과 측정 도구 및 방법론 학습',
      '교육 분야 경력 쌓기 (강의, 멘토링 등)'
    ],
    salaryMatch: true,
    locationMatch: false,
    skillsMatch: [
      {
        skillName: 'AI/ML',
        userLevel: 'advanced',
        requiredLevel: 'advanced',
        match: true,
        importance: 'high'
      },
      {
        skillName: '교육과정 설계',
        userLevel: 'beginner',
        requiredLevel: 'advanced',
        match: false,
        importance: 'high'
      },
      {
        skillName: '강의 및 발표',
        userLevel: 'intermediate',
        requiredLevel: 'advanced',
        match: false,
        importance: 'medium'
      }
    ],
    experienceMatch: {
      userYears: 0, // 교육 분야 경력
      requiredYears: 5,
      match: false,
      relevantExperience: false,
      industryMatch: false
    },
    requirementsMatch: [
      {
        requirement: '교육학 전공',
        userHas: false,
        importance: 'must',
        evidence: '컴퓨터공학 전공'
      },
      {
        requirement: 'AI 관련 자격증',
        userHas: false,
        importance: 'preferred'
      },
      {
        requirement: '교육경력 5년',
        userHas: false,
        importance: 'must',
        evidence: '보안 교육 프로그램 운영 경험 있으나 정규 교육경력 부족'
      }
    ]
  }
];

// 전체 매칭 분석
export const mockMatchingAnalysis: MatchingAnalysis = {
  userId: 'user-001',
  totalMatches: 8,
  averageScore: 78.5,
  topMatches: mockMatchResults,
  recommendations: [
    '정보보안 분야에서 매우 강한 경쟁력을 보유하고 있습니다',
    '공공기관 정책 업무 경험을 보완하면 더 높은 매칭률을 기대할 수 있습니다',
    'AI/ML 기술 경험을 활용한 기술직 공고들이 매우 적합합니다',
    '서울/경기 지역의 6-7급 공무원 또는 연구직 공고를 집중 공략하세요'
  ],
  skillGaps: [
    '공공정책 기획 및 수립 경험',
    '교육과정 설계 및 운영 경험',
    '예산 관리 및 행정업무 경험',
    '대민업무 및 커뮤니케이션 스킬'
  ],
  careerAdvice: [
    '현재 보유한 정보보안 전문성을 공공부문에 특화시키는 방향으로 발전시키세요',
    '정부 디지털 전환 정책 및 스마트 정부 구현 관련 지식을 쌓으세요',
    '공공기관에서 인턴십이나 프로젝트 참여 기회를 찾아보세요',
    '정책연구원이나 공공기관 세미나 참여를 통해 공공부문 이해도를 높이세요'
  ],
  nextSteps: [
    '관심 있는 공고 3-5개를 선별하여 맞춤형 지원서류 준비',
    '각 기관의 최근 정책 동향 및 추진 사업 조사',
    '정보보안 분야 공공정책 관련 자료 수집 및 학습',
    '면접 대비 공공기관 특화 답변 준비'
  ]
};

// 매칭 알고리즘 가중치
export const matchingWeights = {
  skills: 0.35,
  experience: 0.25,
  education: 0.15,
  certifications: 0.15,
  location: 0.05,
  salary: 0.05
};

// Mock API 함수들
export const mockMatchingAPI = {
  // AI 매칭 분석
  analyzeMatching: async (resumeData: ResumeData, jobs: Job[]): Promise<MatchingAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // AI 분석 시간 시뮬레이션
    return mockMatchingAnalysis;
  },
  
  // 특정 공고와의 매칭 분석
  matchJob: async (resumeData: ResumeData, jobId: string): Promise<MatchResult> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = mockMatchResults.find(r => r.jobId === jobId);
    return result || mockMatchResults[0];
  },
  
  // 추천 공고 조회
  getRecommendedJobs: async (resumeData: ResumeData, limit: number = 10): Promise<MatchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockMatchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  },
  
  // 매칭 스코어 재계산
  recalculateMatching: async (resumeData: ResumeData, preferences: any): Promise<MatchingAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return {
      ...mockMatchingAnalysis,
      averageScore: mockMatchingAnalysis.averageScore + Math.random() * 10 - 5 // 약간의 변동
    };
  },
  
  // 스킬 갭 분석
  analyzeSkillGaps: async (resumeData: ResumeData, targetJobs: string[]): Promise<{
    missingSkills: string[];
    skillRecommendations: Array<{
      skill: string;
      importance: number;
      learningResources: string[];
    }>;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      missingSkills: [
        '정책기획',
        '예산관리',
        '공공행정',
        '프로젝트관리',
        '대민업무'
      ],
      skillRecommendations: [
        {
          skill: '정책기획',
          importance: 85,
          learningResources: [
            '정책학 개론 강의',
            '정책분석론 도서',
            '공공정책 사례 연구'
          ]
        },
        {
          skill: '예산관리',
          importance: 70,
          learningResources: [
            '공공예산론 강의',
            '예산편성 실무 교육',
            'PMP 자격증 취득'
          ]
        }
      ]
    };
  }
};

// 매칭 점수 계산 헬퍼 함수들
export const matchingHelpers = {
  calculateSkillMatch: (userSkills: any[], requiredSkills: string[]): number => {
    // 실제 구현에서는 더 복잡한 알고리즘 사용
    const matchCount = requiredSkills.filter(req => 
      userSkills.some(skill => 
        skill.name.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(skill.name.toLowerCase())
      )
    ).length;
    
    return (matchCount / requiredSkills.length) * 100;
  },
  
  calculateExperienceMatch: (userExp: number, requiredExp: number): number => {
    if (userExp >= requiredExp) {
      return Math.min(100, 80 + (userExp - requiredExp) * 2);
    } else {
      return (userExp / requiredExp) * 80;
    }
  },
  
  getMatchLevel: (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 55) return 'fair';
    return 'poor';
  },
  
  getMatchColor: (score: number): string => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 55) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }
};