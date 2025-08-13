import type { Job } from '$lib/stores';

// 채용공고 Mock 데이터
export const mockJobs: Job[] = [
  {
    id: '1',
    title: '서울시청 정보보안 담당자',
    organization: '서울특별시',
    location: '서울시 중구',
    salary: '6급 상당 (연봉 4,500만원)',
    requirements: ['정보보안기사', '3년 이상 경력', '컴퓨터공학 전공'],
    deadline: '2025-08-25',
    description: '서울시 정보보안 업무 담당\n\n주요 업무:\n- 정보보안 정책 수립 및 운영\n- 보안시스템 구축 및 관리\n- 개인정보보호 업무\n- 정보보안 교육 및 훈련',
    matchScore: 92,
    category: 'IT/정보보안',
    workType: '정규직',
    experience: '3년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연차/보건휴가', '복리후생비'],
    tags: ['정보보안', '공공기관', '서울', '6급'],
    department: '정보통신담당관',
    recruitCount: 2,
    applicationCount: 45,
    viewCount: 1250,
    isHot: true,
    isNew: false,
    isUrgent: true
  },
  {
    id: '2',
    title: '부산광역시 디지털정책 기획자',
    organization: '부산광역시',
    location: '부산시 연제구',
    salary: '7급 상당 (연봉 3,800만원)',
    requirements: ['행정학 전공', '정책기획 경험', '영어 중급'],
    deadline: '2025-08-20',
    description: '디지털 전환 정책 수립 및 추진\n\n주요 업무:\n- 디지털정책 기획 및 추진\n- 스마트시티 사업 기획\n- 정책연구 및 분석\n- 관련 부서 업무 협조',
    matchScore: 78,
    category: '정책/기획',
    workType: '정규직',
    experience: '2년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연차/보건휴가', '성과급'],
    tags: ['정책기획', '디지털', '부산', '7급'],
    department: '정보통신과',
    recruitCount: 1,
    applicationCount: 32,
    viewCount: 890,
    isHot: false,
    isNew: true,
    isUrgent: false
  },
  {
    id: '3',
    title: '대구시교육청 AI교육 전문관',
    organization: '대구광역시교육청',
    location: '대구시 중구',
    salary: '연구관 상당 (연봉 5,200만원)',
    requirements: ['교육학 전공', 'AI 관련 자격증', '교육경력 5년'],
    deadline: '2025-08-30',
    description: 'AI 교육과정 개발 및 운영\n\n주요 업무:\n- AI 교육과정 개발\n- 교원 연수 프로그램 기획\n- AI 교육 콘텐츠 제작\n- 교육효과 분석 및 평가',
    matchScore: 85,
    category: '교육/연구',
    workType: '정규직',
    experience: '5년 이상',
    education: '석사 이상',
    benefits: ['4대보험', '퇴직금', '연구활동비', '학회참가비'],
    tags: ['AI교육', '교육청', '대구', '연구관'],
    department: 'AI교육지원과',
    recruitCount: 1,
    applicationCount: 18,
    viewCount: 650,
    isHot: true,
    isNew: true,
    isUrgent: false
  },
  {
    id: '4',
    title: '인천시 스마트시티 개발자',
    organization: '인천광역시',
    location: '인천시 연수구',
    salary: '6급 상당 (연봉 4,200만원)',
    requirements: ['컴퓨터공학 전공', 'Python 능숙', 'IoT 경험'],
    deadline: '2025-09-05',
    description: '스마트시티 플랫폼 개발 및 운영\n\n주요 업무:\n- 스마트시티 플랫폼 개발\n- IoT 데이터 수집 및 분석\n- 시민서비스 앱 개발\n- 시스템 유지보수',
    matchScore: 88,
    category: 'IT/개발',
    workType: '정규직',
    experience: '3년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연차/보건휴가', '교육비 지원'],
    tags: ['스마트시티', 'IoT', '인천', '개발자'],
    department: '스마트도시과',
    recruitCount: 3,
    applicationCount: 67,
    viewCount: 1450,
    isHot: true,
    isNew: false,
    isUrgent: false
  },
  {
    id: '5',
    title: '경기도청 데이터분석 전문가',
    organization: '경기도',
    location: '경기도 수원시',
    salary: '7급 상당 (연봉 3,900만원)',
    requirements: ['통계학 전공', 'R/Python', '빅데이터 분석 경험'],
    deadline: '2025-08-28',
    description: '도정 데이터 분석 및 정책 수립 지원\n\n주요 업무:\n- 빅데이터 수집 및 분석\n- 정책효과 분석\n- 데이터 시각화\n- 분석 보고서 작성',
    matchScore: 76,
    category: '데이터/분석',
    workType: '정규직',
    experience: '2년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연차/보건휴가', '인센티브'],
    tags: ['데이터분석', '빅데이터', '경기도', '통계'],
    department: '빅데이터담당관',
    recruitCount: 2,
    applicationCount: 28,
    viewCount: 720,
    isHot: false,
    isNew: false,
    isUrgent: false
  },
  {
    id: '6',
    title: '강원도 관광정책 기획자',
    organization: '강원도',
    location: '강원도 춘천시',
    salary: '7급 상당 (연봉 3,700만원)',
    requirements: ['관광학 전공', '기획 경험', '영어/중국어'],
    deadline: '2025-09-10',
    description: '강원도 관광 활성화 정책 기획 및 추진\n\n주요 업무:\n- 관광정책 기획 및 수립\n- 관광상품 개발 기획\n- 관광마케팅 전략 수립\n- 국제관광 협력업무',
    matchScore: 72,
    category: '정책/기획',
    workType: '정규직',
    experience: '2년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연차/보건휴가', '관광지 할인'],
    tags: ['관광정책', '기획', '강원도', '국제업무'],
    department: '관광과',
    recruitCount: 1,
    applicationCount: 15,
    viewCount: 380,
    isHot: false,
    isNew: true,
    isUrgent: false
  },
  {
    id: '7',
    title: '울산시 환경정책 연구원',
    organization: '울산광역시',
    location: '울산시 남구',
    salary: '7급 상당 (연봉 3,800만원)',
    requirements: ['환경공학 전공', '환경영향평가사', '연구경험 3년'],
    deadline: '2025-08-22',
    description: '환경정책 연구 및 환경영향평가\n\n주요 업무:\n- 환경정책 연구\n- 환경영향평가 검토\n- 환경모니터링 계획 수립\n- 환경개선 방안 연구',
    matchScore: 68,
    category: '환경/안전',
    workType: '정규직',
    experience: '3년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연구활동비', '학술활동 지원'],
    tags: ['환경정책', '연구', '울산', '환경영향평가'],
    department: '환경정책과',
    recruitCount: 1,
    applicationCount: 22,
    viewCount: 560,
    isHot: false,
    isNew: false,
    isUrgent: true
  },
  {
    id: '8',
    title: '대전시 과학기술 기획관',
    organization: '대전광역시',
    location: '대전시 서구',
    salary: '6급 상당 (연봉 4,300만원)',
    requirements: ['과학기술 관련 전공', '기획업무 경험', '영어 가능'],
    deadline: '2025-09-15',
    description: '과학기술 정책 기획 및 지원사업 관리\n\n주요 업무:\n- 과학기술정책 기획\n- R&D 지원사업 관리\n- 산학연 협력 기획\n- 기술이전 및 사업화 지원',
    matchScore: 82,
    category: '과학기술',
    workType: '정규직',
    experience: '3년 이상',
    education: '학사 이상',
    benefits: ['4대보험', '퇴직금', '연구개발비', '특허출원 지원'],
    tags: ['과학기술', '기획', '대전', 'R&D'],
    department: '과학기술정책과',
    recruitCount: 2,
    applicationCount: 41,
    viewCount: 920,
    isHot: true,
    isNew: true,
    isUrgent: false
  }
];

// 채용공고 카테고리
export const jobCategories = [
  '전체',
  'IT/정보보안',
  '정책/기획',
  '교육/연구',
  '데이터/분석',
  '환경/안전',
  '과학기술',
  '행정',
  '경영/관리',
  '기타'
];

// 지역 목록
export const jobLocations = [
  '전체',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주'
];

// 기관 유형
export const organizationTypes = [
  '전체',
  '중앙정부',
  '시/도청',
  '시/군/구청',
  '교육청',
  '공기업',
  '준정부기관',
  '기타 공공기관'
];

// 정렬 옵션
export const sortOptions = [
  { value: 'deadline', label: '마감일순' },
  { value: 'matchScore', label: '매칭도순' },
  { value: 'salary', label: '급여순' },
  { value: 'recent', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'applicationCount', label: '지원자수순' }
];

// 급여 범위
export const salaryRanges = [
  { value: 'all', label: '전체' },
  { value: '3000-4000', label: '3,000만원 - 4,000만원' },
  { value: '4000-5000', label: '4,000만원 - 5,000만원' },
  { value: '5000+', label: '5,000만원 이상' }
];

// 경력 요구사항
export const experienceRequirements = [
  { value: 'all', label: '전체' },
  { value: 'entry', label: '신입' },
  { value: '1-3', label: '1-3년' },
  { value: '3-5', label: '3-5년' },
  { value: '5+', label: '5년 이상' }
];

// Mock API 함수들
export const mockJobsAPI = {
  // 전체 채용공고 조회
  getJobs: async (filters?: any): Promise<Job[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // API 지연 시뮬레이션
    return mockJobs;
  },
  
  // 특정 채용공고 조회
  getJob: async (id: string): Promise<Job | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockJobs.find(job => job.id === id) || null;
  },
  
  // 인기 채용공고 조회
  getPopularJobs: async (limit: number = 3): Promise<Job[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockJobs
      .filter(job => job.isHot)
      .slice(0, limit);
  },
  
  // 새로운 채용공고 조회
  getNewJobs: async (limit: number = 5): Promise<Job[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockJobs
      .filter(job => job.isNew)
      .slice(0, limit);
  },
  
  // 마감임박 채용공고 조회
  getUrgentJobs: async (limit: number = 5): Promise<Job[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockJobs
      .filter(job => job.isUrgent)
      .slice(0, limit);
  }
};