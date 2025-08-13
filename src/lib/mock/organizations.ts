// 공공기관 정보 Mock 데이터

export interface Organization {
  id: string;
  name: string;
  type: 'central' | 'local' | 'education' | 'public-enterprise' | 'quasi-government' | 'other';
  category: string;
  description: string;
  website: string;
  location: string;
  establishedYear: number;
  employeeCount: number;
  budget?: string;
  mainBusiness: string[];
  vision: string;
  values: string[];
  logo?: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  welfare: {
    salary: {
      averageEntry: string;
      averageSenior: string;
      bonusSystem: boolean;
    };
    benefits: string[];
    workingHours: string;
    vacation: string;
    education: string[];
  };
  culture: {
    workLifeBalance: number; // 1-5 점수
    jobSecurity: number;
    growthOpportunity: number;
    innovation: number;
    teamwork: number;
  };
  recentNews: Array<{
    title: string;
    date: string;
    summary: string;
    url?: string;
  }>;
  recruitmentInfo: {
    annualRecruitment: number;
    majorDepartments: string[];
    preferredQualifications: string[];
    selectionProcess: string[];
    competitionRate: string;
  };
}

// Mock 공공기관 데이터
export const mockOrganizations: Organization[] = [
  {
    id: 'org-seoul',
    name: '서울특별시',
    type: 'local',
    category: '광역자치단체',
    description: '대한민국의 수도이자 최대 도시인 서울특별시의 지방정부',
    website: 'https://www.seoul.go.kr',
    location: '서울시 중구 세종대로 110',
    establishedYear: 1946,
    employeeCount: 25000,
    budget: '43조원 (2024년)',
    mainBusiness: [
      '시정 운영 및 관리',
      '도시계획 및 개발',
      '교통 및 인프라 관리',
      '복지 및 보건 서비스',
      '문화 및 관광 진흥',
      '환경 보전 및 관리'
    ],
    vision: '함께 만드는 서울, 더불어 사는 서울',
    values: ['소통', '혁신', '공정', '협력'],
    contact: {
      phone: '02-120',
      email: 'info@seoul.go.kr',
      address: '서울시 중구 세종대로 110 서울특별시청'
    },
    welfare: {
      salary: {
        averageEntry: '3,500만원',
        averageSenior: '5,500만원',
        bonusSystem: true
      },
      benefits: [
        '4대보험',
        '퇴직금',
        '연차휴가 (15일~25일)',
        '보건휴가',
        '경조휴가',
        '주택자금 대출',
        '자녀 학비 지원',
        '의료비 지원',
        '체육시설 이용'
      ],
      workingHours: '09:00-18:00 (주 40시간)',
      vacation: '연차 15~25일, 보건휴가 월 1일',
      education: [
        '공무원 교육원 연수',
        '해외연수 기회',
        '학위취득 지원',
        '전문교육 과정'
      ]
    },
    culture: {
      workLifeBalance: 4,
      jobSecurity: 5,
      growthOpportunity: 4,
      innovation: 4,
      teamwork: 4
    },
    recentNews: [
      {
        title: '서울시, 2025년 디지털 혁신 계획 발표',
        date: '2024-08-10',
        summary: '시민 서비스 디지털화와 스마트시티 구축을 위한 종합 계획 발표'
      },
      {
        title: '청년 일자리 창출 정책 확대',
        date: '2024-08-05',
        summary: '청년층 취업 지원을 위한 다양한 프로그램과 인센티브 도입'
      }
    ],
    recruitmentInfo: {
      annualRecruitment: 500,
      majorDepartments: [
        '정보통신담당관',
        '도시계획국',
        '교통정책과',
        '복지정책실',
        '환경정책과',
        '문화관광디자인본부'
      ],
      preferredQualifications: [
        '관련 학과 전공',
        '공무원 시험 합격',
        '전문 자격증',
        '외국어 능력',
        '정책 기획 경험'
      ],
      selectionProcess: [
        '서류전형',
        '필기시험',
        '면접전형',
        '신체검사',
        '신원조사'
      ],
      competitionRate: '15:1'
    }
  },
  {
    id: 'org-busan',
    name: '부산광역시',
    type: 'local',
    category: '광역자치단체',
    description: '대한민국 제2의 도시이자 최대 항구도시인 부산광역시의 지방정부',
    website: 'https://www.busan.go.kr',
    location: '부산시 연제구 중앙대로 1001',
    establishedYear: 1963,
    employeeCount: 18000,
    budget: '15조원 (2024년)',
    mainBusiness: [
      '항만 및 해양 정책',
      '관광 및 MICE 산업',
      '스마트시티 구축',
      '국제업무 및 교류',
      '지역경제 활성화'
    ],
    vision: '시민과 함께 만드는 글로벌 해양수도',
    values: ['혁신', '소통', '배려', '도전'],
    contact: {
      phone: '051-120',
      email: 'info@busan.go.kr',
      address: '부산시 연제구 중앙대로 1001 부산광역시청'
    },
    welfare: {
      salary: {
        averageEntry: '3,400만원',
        averageSenior: '5,300만원',
        bonusSystem: true
      },
      benefits: [
        '4대보험',
        '퇴직금',
        '연차휴가',
        '주택자금 대출',
        '의료비 지원',
        '휴양시설 이용'
      ],
      workingHours: '09:00-18:00',
      vacation: '연차 15~25일',
      education: [
        '부산인재개발원 연수',
        '전문교육 지원',
        '해외연수'
      ]
    },
    culture: {
      workLifeBalance: 4,
      jobSecurity: 5,
      growthOpportunity: 3,
      innovation: 4,
      teamwork: 4
    },
    recentNews: [
      {
        title: '글로벌 허브 도시 선포',
        date: '2024-08-08',
        summary: '동북아 경제 중심지로서의 위상 강화를 위한 종합 계획 발표'
      }
    ],
    recruitmentInfo: {
      annualRecruitment: 350,
      majorDepartments: [
        '스마트도시과',
        '해양수산과',
        '관광진흥과',
        '국제협력과'
      ],
      preferredQualifications: [
        '관련 전공',
        '외국어 능력',
        '정책 기획 경험'
      ],
      selectionProcess: [
        '서류전형',
        '필기시험',
        '면접전형'
      ],
      competitionRate: '12:1'
    }
  },
  {
    id: 'org-dgist-edu',
    name: '대구광역시교육청',
    type: 'education',
    category: '시도교육청',
    description: '대구광역시의 교육행정을 담당하는 기관',
    website: 'https://www.dge.go.kr',
    location: '대구시 중구 경상감영길 51',
    establishedYear: 1952,
    employeeCount: 8500,
    mainBusiness: [
      '초중등교육 관리',
      'AI 교육과정 개발',
      '교원 연수 및 지원',
      '교육정책 수립',
      '학교시설 관리'
    ],
    vision: 'AI 시대를 선도하는 창의융합 인재 육성',
    values: ['창의', '협력', '성장', '혁신'],
    contact: {
      phone: '053-231-0001',
      email: 'info@dge.go.kr',
      address: '대구시 중구 경상감영길 51'
    },
    welfare: {
      salary: {
        averageEntry: '3,600만원',
        averageSenior: '5,800만원',
        bonusSystem: true
      },
      benefits: [
        '4대보험',
        '퇴직금',
        '연구활동비',
        '학회참가비',
        '연수 지원'
      ],
      workingHours: '09:00-18:00',
      vacation: '여름/겨울 방학 중 휴가',
      education: [
        '교육연수원 프로그램',
        '해외교육연수',
        '학위취득 지원'
      ]
    },
    culture: {
      workLifeBalance: 4,
      jobSecurity: 5,
      growthOpportunity: 4,
      innovation: 5,
      teamwork: 4
    },
    recentNews: [
      {
        title: 'AI 교육과정 전국 최초 도입',
        date: '2024-08-07',
        summary: '초중고 AI 교육과정 체계적 운영을 위한 전담 조직 신설'
      }
    ],
    recruitmentInfo: {
      annualRecruitment: 150,
      majorDepartments: [
        'AI교육지원과',
        '교육과정과',
        '교원정책과',
        '학교지원과'
      ],
      preferredQualifications: [
        '교육학 전공',
        '교원 자격증',
        'AI 관련 자격증',
        '교육경력'
      ],
      selectionProcess: [
        '서류전형',
        '교육전문성 평가',
        '면접전형'
      ],
      competitionRate: '8:1'
    }
  },
  {
    id: 'org-incheon',
    name: '인천광역시',
    type: 'local',
    category: '광역자치단체',
    description: '국제도시이자 경제자유구역의 중심지인 인천광역시',
    website: 'https://www.incheon.go.kr',
    location: '인천시 남동구 정각로 29',
    establishedYear: 1981,
    employeeCount: 15000,
    budget: '12조원 (2024년)',
    mainBusiness: [
      '국제공항 연계 서비스',
      '스마트시티 구축',
      '경제자유구역 관리',
      '국제업무',
      '도시개발'
    ],
    vision: '시민이 행복한 글로벌 인천',
    values: ['소통', '혁신', '상생', '도전'],
    contact: {
      phone: '032-120',
      email: 'info@incheon.go.kr',
      address: '인천시 남동구 정각로 29'
    },
    welfare: {
      salary: {
        averageEntry: '3,500만원',
        averageSenior: '5,400만원',
        bonusSystem: true
      },
      benefits: [
        '4대보험',
        '퇴직금',
        '국제업무 수당',
        '주택자금 대출',
        '해외연수 기회'
      ],
      workingHours: '09:00-18:00',
      vacation: '연차 15~25일',
      education: [
        '인천인재개발원',
        '국제업무 연수',
        '어학교육 지원'
      ]
    },
    culture: {
      workLifeBalance: 4,
      jobSecurity: 5,
      growthOpportunity: 4,
      innovation: 5,
      teamwork: 4
    },
    recentNews: [
      {
        title: '스마트시티 통합플랫폼 구축',
        date: '2024-08-06',
        summary: 'IoT 기반 시민서비스 통합 플랫폼 구축 사업 착수'
      }
    ],
    recruitmentInfo: {
      annualRecruitment: 280,
      majorDepartments: [
        '스마트도시과',
        '국제협력담당관',
        '경제자유구역청',
        '정보통신과'
      ],
      preferredQualifications: [
        '컴퓨터공학 전공',
        '국제업무 경험',
        '외국어 능력',
        'IoT 기술'
      ],
      selectionProcess: [
        '서류전형',
        '기술면접',
        '인성면접'
      ],
      competitionRate: '10:1'
    }
  }
];

// 기관 유형별 분류
export const organizationTypes = [
  {
    type: 'central',
    name: '중앙정부',
    description: '중앙행정기관',
    icon: '🏛️'
  },
  {
    type: 'local',
    name: '지방자치단체',
    description: '시/도청, 시/군/구청',
    icon: '🏢'
  },
  {
    type: 'education',
    name: '교육기관',
    description: '교육청, 국립대학교 등',
    icon: '🎓'
  },
  {
    type: 'public-enterprise',
    name: '공기업',
    description: '한국전력, 가스공사 등',
    icon: '⚡'
  },
  {
    type: 'quasi-government',
    name: '준정부기관',
    description: 'KOTRA, 관광공사 등',
    icon: '🌐'
  },
  {
    type: 'other',
    name: '기타 공공기관',
    description: '연구원, 재단 등',
    icon: '🔬'
  }
];

// Mock API 함수들
export const mockOrganizationsAPI = {
  // 전체 기관 목록 조회
  getOrganizations: async (filters?: {
    type?: string;
    location?: string;
    size?: string;
  }): Promise<Organization[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = mockOrganizations;
    
    if (filters?.type && filters.type !== 'all') {
      filtered = filtered.filter(org => org.type === filters.type);
    }
    
    if (filters?.location && filters.location !== 'all') {
      filtered = filtered.filter(org => org.location.includes(filters.location));
    }
    
    return filtered;
  },
  
  // 특정 기관 상세 정보 조회
  getOrganization: async (id: string): Promise<Organization | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrganizations.find(org => org.id === id) || null;
  },
  
  // 기관 검색
  searchOrganizations: async (query: string): Promise<Organization[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return mockOrganizations.filter(org => 
      org.name.toLowerCase().includes(query.toLowerCase()) ||
      org.description.toLowerCase().includes(query.toLowerCase()) ||
      org.mainBusiness.some(business => 
        business.toLowerCase().includes(query.toLowerCase())
      )
    );
  },
  
  // 유사 기관 조회
  getSimilarOrganizations: async (orgId: string): Promise<Organization[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const currentOrg = mockOrganizations.find(org => org.id === orgId);
    if (!currentOrg) return [];
    
    return mockOrganizations
      .filter(org => org.id !== orgId && org.type === currentOrg.type)
      .slice(0, 3);
  },
  
  // 기관별 채용 현황
  getRecruitmentStatus: async (orgId: string): Promise<{
    activeJobs: number;
    averageCompetition: string;
    recentHires: number;
    popularDepartments: string[];
  }> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      activeJobs: Math.floor(Math.random() * 20) + 5,
      averageCompetition: `${Math.floor(Math.random() * 15) + 5}:1`,
      recentHires: Math.floor(Math.random() * 100) + 50,
      popularDepartments: [
        '정보통신과',
        '정책기획과',
        '인사과',
        '총무과'
      ]
    };
  }
};

// 기관 정보 헬퍼 함수들
export const organizationHelpers = {
  getTypeLabel: (type: string): string => {
    const typeInfo = organizationTypes.find(t => t.type === type);
    return typeInfo?.name || type;
  },
  
  getTypeIcon: (type: string): string => {
    const typeInfo = organizationTypes.find(t => t.type === type);
    return typeInfo?.icon || '🏢';
  },
  
  calculateCultureScore: (culture: Organization['culture']): number => {
    const scores = Object.values(culture);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 20);
  },
  
  getWelfareScore: (benefits: string[]): number => {
    // 복리후생 항목 수에 따른 점수 계산
    return Math.min(100, benefits.length * 10);
  },
  
  formatBudget: (budget?: string): string => {
    return budget || '정보 없음';
  },
  
  getLocationShort: (location: string): string => {
    // "서울시 중구 세종대로 110" -> "서울 중구"
    const parts = location.split(' ');
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0] || location;
  }
};