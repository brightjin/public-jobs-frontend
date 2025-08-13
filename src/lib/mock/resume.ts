// 이력서 관련 Mock 데이터

export interface ResumeData {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    photo?: string;
  };
  education: Array<{
    school: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    status: 'graduated' | 'current' | 'dropout';
  }>;
  experience: Array<{
    company: string;
    position: string;
    department: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    isCurrent: boolean;
  }>;
  skills: Array<{
    category: string;
    items: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      description?: string;
    }>;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    score?: string;
  }>;
  languages: Array<{
    name: string;
    level: string;
    testName?: string;
    score?: string;
    testDate?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    role: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    achievements: string[];
    url?: string;
  }>;
  activities: Array<{
    type: 'volunteer' | 'club' | 'competition' | 'conference' | 'other';
    name: string;
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  awards: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
  portfolioUrls: string[];
  summary: string;
  coverLetter?: string;
}

// AI 파싱 결과 인터페이스
export interface ResumeParseResult {
  confidence: number; // 파싱 정확도 (0-100)
  extractedData: Partial<ResumeData>;
  issues: Array<{
    field: string;
    message: string;
    severity: 'warning' | 'error';
  }>;
  suggestions: Array<{
    field: string;
    message: string;
    action: string;
  }>;
}

// 샘플 이력서 데이터
export const mockResumeData: ResumeData = {
  id: 'resume-001',
  personalInfo: {
    name: '김공공',
    email: 'kim.public@email.com',
    phone: '010-1234-5678',
    address: '서울시 강남구 역삼동',
    birthDate: '1990-03-15',
    photo: '/placeholder-avatar.jpg'
  },
  education: [
    {
      school: '서울대학교',
      degree: '학사',
      major: '컴퓨터공학과',
      startDate: '2008-03',
      endDate: '2012-02',
      gpa: '3.8/4.5',
      status: 'graduated'
    },
    {
      school: '한국과학기술원(KAIST)',
      degree: '석사',
      major: '정보보안학과',
      startDate: '2012-03',
      endDate: '2014-02',
      gpa: '4.2/4.5',
      status: 'graduated'
    }
  ],
  experience: [
    {
      company: '삼성SDS',
      position: '선임연구원',
      department: '보안솔루션사업부',
      startDate: '2014-03',
      endDate: '2018-12',
      description: '금융권 보안솔루션 개발 및 구축',
      achievements: [
        '차세대 암호화 솔루션 개발 주도',
        '금융권 보안 컨설팅 50건 이상 수행',
        'ISO27001 인증 획득 프로젝트 리더'
      ],
      isCurrent: false
    },
    {
      company: 'LG CNS',
      position: '책임연구원',
      department: '사이버보안사업부',
      startDate: '2019-01',
      endDate: '2024-06',
      description: '공공기관 정보보안 시스템 구축 및 운영',
      achievements: [
        '정부기관 통합보안관제시스템 구축',
        '보안 취약점 진단 자동화 도구 개발',
        '정보보안 교육 프로그램 설계 및 운영'
      ],
      isCurrent: false
    }
  ],
  skills: [
    {
      category: '프로그래밍 언어',
      items: [
        { name: 'Python', level: 'expert', description: '8년 경력, 보안도구 개발' },
        { name: 'Java', level: 'advanced', description: '6년 경력, 엔터프라이즈 시스템' },
        { name: 'C++', level: 'intermediate', description: '4년 경력, 시스템 프로그래밍' },
        { name: 'JavaScript', level: 'intermediate', description: '3년 경력, 웹 개발' }
      ]
    },
    {
      category: '보안 기술',
      items: [
        { name: '침입탐지시스템(IDS)', level: 'expert' },
        { name: '방화벽 관리', level: 'expert' },
        { name: '취약점 진단', level: 'advanced' },
        { name: '암호화 기술', level: 'advanced' }
      ]
    },
    {
      category: '클라우드/인프라',
      items: [
        { name: 'AWS', level: 'advanced' },
        { name: 'Docker', level: 'intermediate' },
        { name: 'Kubernetes', level: 'intermediate' },
        { name: 'Linux 시스템 관리', level: 'advanced' }
      ]
    }
  ],
  certifications: [
    {
      name: '정보보안기사',
      issuer: '한국산업인력공단',
      issueDate: '2013-11-15',
      score: '합격'
    },
    {
      name: 'CISSP',
      issuer: '(ISC)²',
      issueDate: '2016-05-20',
      expiryDate: '2025-05-20'
    },
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2020-08-10',
      expiryDate: '2026-08-10'
    },
    {
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      issueDate: '2015-03-25',
      expiryDate: '2025-03-25'
    }
  ],
  languages: [
    {
      name: '영어',
      level: '상급',
      testName: 'TOEIC',
      score: '925점',
      testDate: '2023-06-15'
    },
    {
      name: '일본어',
      level: '중급',
      testName: 'JLPT',
      score: 'N2',
      testDate: '2022-12-04'
    }
  ],
  projects: [
    {
      name: '정부기관 통합보안관제센터 구축',
      description: '15개 정부기관을 대상으로 한 통합 보안관제 시스템 구축 프로젝트',
      role: 'PM/설계 책임자',
      startDate: '2020-01',
      endDate: '2021-12',
      technologies: ['Python', 'Elasticsearch', 'Kibana', 'Docker', 'Redis'],
      achievements: [
        '24/7 실시간 보안관제 체계 구축',
        '보안사고 대응시간 80% 단축',
        '연간 보안운영비용 30% 절감'
      ],
      url: 'https://example.com/project1'
    },
    {
      name: 'AI 기반 악성코드 탐지 시스템',
      description: '머신러닝을 활용한 실시간 악성코드 탐지 및 차단 시스템 개발',
      role: '기술 리더',
      startDate: '2021-06',
      endDate: '2023-03',
      technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Apache Kafka'],
      achievements: [
        '악성코드 탐지율 98.5% 달성',
        '오탐률 0.1% 이하 유지',
        '국내외 특허 3건 출원'
      ]
    }
  ],
  activities: [
    {
      type: 'conference',
      name: 'BlackHat USA 2022',
      organization: 'Black Hat',
      role: '참석자',
      startDate: '2022-08-06',
      endDate: '2022-08-11',
      description: '최신 보안 기술 트렌드 학습 및 네트워킹'
    },
    {
      type: 'volunteer',
      name: '정보보안 무료 교육',
      organization: '한국정보보호진흥원',
      role: '강사',
      startDate: '2019-01',
      endDate: '2023-12',
      description: '중소기업 대상 정보보안 인식 제고 교육 진행'
    },
    {
      type: 'club',
      name: 'KISA 보안 연구회',
      organization: '한국인터넷진흥원',
      role: '운영위원',
      startDate: '2016-01',
      endDate: '2020-12',
      description: '정보보안 연구 및 정책 제안 활동'
    }
  ],
  awards: [
    {
      name: '우수 정보보안 전문가상',
      issuer: '한국정보보호진흥원',
      date: '2021-10-15',
      description: '정부기관 보안강화에 기여한 공로 인정'
    },
    {
      name: '혁신 기술상',
      issuer: 'LG CNS',
      date: '2022-12-20',
      description: 'AI 기반 보안솔루션 개발 성과 인정'
    }
  ],
  portfolioUrls: [
    'https://github.com/kimgonggong',
    'https://linkedin.com/in/kimgonggong',
    'https://blog.kimgonggong.com'
  ],
  summary: '10년 이상의 정보보안 분야 경험을 보유한 전문가로, 공공기관 및 금융권의 보안시스템 구축과 운영에 특화되어 있습니다. 특히 AI/ML 기술을 활용한 차세대 보안솔루션 개발 경험이 풍부하며, 프로젝트 관리 및 팀 리더십 역량을 갖추고 있습니다.',
  coverLetter: '서울시 정보보안 담당자 직무에 지원하게 되어 영광입니다. 10년간의 정보보안 분야 경험과 공공기관 보안시스템 구축 노하우를 바탕으로, 서울시의 디지털 전환과 시민 데이터 보호에 기여하고자 합니다...'
};

// AI 파싱 시뮬레이션 결과
export const mockParseResults: ResumeParseResult[] = [
  {
    confidence: 95,
    extractedData: mockResumeData,
    issues: [
      {
        field: 'education.gpa',
        message: 'GPA 형식이 일관되지 않습니다',
        severity: 'warning'
      }
    ],
    suggestions: [
      {
        field: 'skills',
        message: '더 구체적인 기술 수준 설명을 추가하면 좋겠습니다',
        action: '각 기술별 프로젝트 경험 연수 추가'
      },
      {
        field: 'certifications',
        message: '최신 자격증 갱신 상태를 확인해주세요',
        action: '만료일이 임박한 자격증 갱신 계획 수립'
      }
    ]
  },
  {
    confidence: 78,
    extractedData: {
      personalInfo: {
        name: '이신입',
        email: 'lee.newbie@email.com',
        phone: '010-9876-5432',
        address: '부산시 해운대구',
        birthDate: '1995-07-22'
      },
      education: [
        {
          school: '부산대학교',
          degree: '학사',
          major: '행정학과',
          startDate: '2014-03',
          endDate: '2018-02',
          gpa: '3.5/4.5',
          status: 'graduated'
        }
      ],
      experience: [],
      skills: [
        {
          category: '사무',
          items: [
            { name: 'MS Office', level: 'advanced' },
            { name: '한글(HWP)', level: 'expert' }
          ]
        }
      ],
      certifications: [
        {
          name: '컴활 1급',
          issuer: '대한상공회의소',
          issueDate: '2017-11-15'
        }
      ],
      languages: [
        {
          name: '영어',
          level: '중급',
          testName: 'TOEIC',
          score: '750점',
          testDate: '2023-03-15'
        }
      ]
    },
    issues: [
      {
        field: 'experience',
        message: '경력 정보가 부족합니다',
        severity: 'warning'
      },
      {
        field: 'skills',
        message: '전문 기술 정보가 제한적입니다',
        severity: 'warning'
      }
    ],
    suggestions: [
      {
        field: 'experience',
        message: '인턴십, 아르바이트, 프로젝트 경험을 추가해보세요',
        action: '관련 경험 발굴 및 추가'
      },
      {
        field: 'activities',
        message: '대외활동, 동아리 활동을 추가하면 좋겠습니다',
        action: '학교/사회 활동 경험 정리'
      }
    ]
  }
];

// Mock API 함수들
export const mockResumeAPI = {
  // 이력서 파싱
  parseResume: async (file: File): Promise<ResumeParseResult> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // 파싱 시간 시뮬레이션
    
    // 파일명이나 크기에 따라 다른 결과 반환
    if (file.name.includes('senior') || file.size > 100000) {
      return mockParseResults[0]; // 경력직 데이터
    } else {
      return mockParseResults[1]; // 신입직 데이터
    }
  },
  
  // 이력서 저장
  saveResume: async (resumeData: Partial<ResumeData>): Promise<{ success: boolean; id: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      id: 'resume-' + Date.now()
    };
  },
  
  // 이력서 조회
  getResume: async (id: string): Promise<ResumeData | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockResumeData;
  },
  
  // 이력서 업데이트
  updateResume: async (id: string, resumeData: Partial<ResumeData>): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  },
  
  // 이력서 분석 (강점/약점 분석)
  analyzeResume: async (resumeData: ResumeData): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    overallScore: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      strengths: [
        '풍부한 정보보안 분야 실무 경험 (10년)',
        '관련 자격증 다수 보유 (정보보안기사, CISSP 등)',
        '대규모 프로젝트 리더십 경험',
        '최신 기술 트렌드 이해도 높음 (AI/ML)'
      ],
      weaknesses: [
        '공공기관 직무 경험 부족',
        '정책 기획 경험 제한적',
        '외국어 점수 개선 필요'
      ],
      recommendations: [
        '공공기관 인턴십 또는 프로젝트 참여 경험 추가',
        '정책 관련 교육 과정 이수',
        'TOEIC 950점 이상 목표로 영어 실력 향상',
        '정부 디지털 전환 정책 관련 자료 학습'
      ],
      overallScore: 85
    };
  }
};

// 이력서 항목별 가이드
export const resumeGuides = {
  personalInfo: {
    title: '인적사항',
    required: ['name', 'email', 'phone'],
    tips: [
      '정확하고 최신 연락처를 입력하세요',
      '이메일은 전문적인 주소를 사용하세요',
      '주소는 간단히 시/구 단위까지만 입력하세요'
    ]
  },
  education: {
    title: '학력사항',
    required: ['school', 'degree', 'major', 'startDate', 'endDate'],
    tips: [
      '최신 학력부터 시간순으로 작성하세요',
      'GPA는 3.0 이상인 경우에만 기입하세요',
      '관련 전공이나 부전공이 있다면 함께 기입하세요'
    ]
  },
  experience: {
    title: '경력사항',
    required: ['company', 'position', 'startDate', 'endDate', 'description'],
    tips: [
      '최근 경력부터 시간순으로 작성하세요',
      '구체적인 성과와 수치를 포함하세요',
      '지원 직무와 관련된 업무 중심으로 서술하세요'
    ]
  },
  skills: {
    title: '보유기술',
    tips: [
      '객관적으로 평가 가능한 수준으로 표시하세요',
      '지원 직무와 관련도가 높은 기술을 우선 배치하세요',
      '증빙 가능한 기술만 포함하세요'
    ]
  },
  certifications: {
    title: '자격증',
    required: ['name', 'issuer', 'issueDate'],
    tips: [
      '유효기간이 있는 자격증은 만료일을 확인하세요',
      '지원 직무와 관련된 자격증을 우선 배치하세요',
      '국가자격증을 민간자격증보다 우선하세요'
    ]
  }
};