// 챗봇 관련 Mock 데이터

// 채팅 메시지 인터페이스
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    sources?: string[]; // 참조 문서/링크
    confidence?: number; // 답변 신뢰도 (0-100)
    category?: string; // 질문 카테고리
    followUp?: string[]; // 추천 후속 질문
  };
}

// 채팅 세션
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  category: 'general' | 'job-search' | 'resume' | 'interview' | 'career';
}

// 자주 묻는 질문 카테고리
export interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  popularity: number;
}

// 미리 정의된 질문 템플릿
export const quickQuestions = [
  "이 공고의 지원 자격은 무엇인가요?",
  "면접에서 자주 나오는 질문은?",
  "자기소개서 작성 팁을 알려주세요",
  "이 직무의 향후 전망은 어떤가요?",
  "필요한 추가 자격증이 있나요?",
  "급여 및 복리후생은 어떻게 되나요?",
  "근무환경과 조직문화는?",
  "경력 개발 기회는 있나요?"
];

// FAQ 데이터
export const faqCategories: FAQCategory[] = [
  {
    id: 'application',
    name: '지원 관련',
    icon: '📝',
    description: '지원서 작성, 서류 제출 등',
    questions: [
      {
        id: 'app-1',
        question: '공공기관 지원 시 필요한 서류는 무엇인가요?',
        answer: '일반적으로 다음 서류들이 필요합니다:\n\n1. **이력서** - 정해진 양식 또는 자유양식\n2. **자기소개서** - 기관별 문항에 따라 작성\n3. **졸업증명서** - 최종학력 증명\n4. **성적증명서** - 학부/대학원 성적\n5. **자격증 사본** - 관련 자격증 및 면허\n6. **경력증명서** - 재직/경력 증명서\n7. **기타 증빙서류** - 어학성적, 수상경력 등\n\n각 기관마다 요구사항이 다를 수 있으니 모집공고를 꼼꼼히 확인하세요.',
        tags: ['지원서류', '서류준비', '필수서류'],
        popularity: 95
      },
      {
        id: 'app-2',
        question: '자기소개서 작성 시 주의사항은?',
        answer: '효과적인 자기소개서 작성을 위한 주요 포인트:\n\n**구조적 작성**\n- STAR 기법 활용 (Situation, Task, Action, Result)\n- 구체적인 사례와 수치 제시\n- 논리적 흐름 유지\n\n**내용적 요소**\n- 지원동기와 포부 명확히 제시\n- 해당 기관/직무와의 연관성 강조\n- 개인의 강점과 차별화 요소 부각\n\n**작성 주의사항**\n- 글자수 제한 준수\n- 맞춤법과 띄어쓰기 검토\n- 추상적 표현보다 구체적 서술\n- 과장이나 허위 내용 금지',
        tags: ['자기소개서', '작성팁', 'STAR기법'],
        popularity: 88
      }
    ]
  },
  {
    id: 'interview',
    name: '면접 준비',
    icon: '🎤',
    description: '면접 준비, 예상 질문 등',
    questions: [
      {
        id: 'int-1',
        question: '공공기관 면접에서 자주 나오는 질문은?',
        answer: '공공기관 면접 단골 질문들:\n\n**기본 질문**\n- 자기소개 및 지원동기\n- 우리 기관을 선택한 이유\n- 10년 후 본인의 모습\n- 장점과 단점\n\n**직무 관련**\n- 해당 직무에 대한 이해도\n- 관련 경험과 역량\n- 업무 수행 시 어려움과 해결방안\n- 최신 동향과 이슈에 대한 견해\n\n**공공기관 특화**\n- 공직자로서의 가치관\n- 국민을 위한 봉사 의지\n- 기관의 비전과 정책에 대한 이해\n- 윤리의식과 청렴성\n\n**상황 대처**\n- 갈등 상황 해결 경험\n- 팀워크와 협업 경험\n- 스트레스 관리 방법',
        tags: ['면접질문', '예상질문', '공공기관면접'],
        popularity: 92
      }
    ]
  },
  {
    id: 'career',
    name: '커리어',
    icon: '🚀',
    description: '진로, 경력 개발, 승진 등',
    questions: [
      {
        id: 'car-1',
        question: '공공기관에서의 승진 체계는 어떻게 되나요?',
        answer: '공공기관 승진 체계 개요:\n\n**기본 승진 체계**\n- 9급 → 8급 → 7급 → 6급 → 5급 → 4급 → 3급\n- 각 급별 최소 재직 기간 존재\n- 근무평정과 승진시험 통과 필요\n\n**승진 요건**\n- 근무성적 평정점수\n- 교육훈련 이수시간\n- 자격증 및 학위\n- 근무연수\n\n**빠른 승진 방법**\n- 우수 평가 유지\n- 전문자격증 취득\n- 석/박사 학위 취득\n- 특별승진 기회 활용\n\n**기관별 차이**\n- 공기업: 성과급 및 인센티브 제도\n- 준정부기관: 전문성 중심 평가\n- 정부기관: 공정성과 투명성 강조',
        tags: ['승진', '승진체계', '공무원승진'],
        popularity: 75
      }
    ]
  },
  {
    id: 'welfare',
    name: '복리후생',
    icon: '🏥',
    description: '급여, 휴가, 복지 혜택 등',
    questions: [
      {
        id: 'wel-1',
        question: '공공기관의 복리후생은 어떤가요?',
        answer: '공공기관 주요 복리후생:\n\n**기본 혜택**\n- 4대보험 (국민연금, 건강보험, 고용보험, 산재보험)\n- 퇴직금/퇴직연금\n- 정기 건강검진\n\n**휴가 제도**\n- 연차휴가: 15일~25일 (근속연수별)\n- 보건휴가: 여성 월 1일\n- 경조휴가: 결혼, 출산, 상시 등\n- 병가: 연 60일 이내\n\n**주거 지원**\n- 주택자금 대출\n- 전세자금 대출\n- 기숙사/사택 제공 (일부 기관)\n\n**교육/자기계발**\n- 교육훈련비 지원\n- 학위취득 지원\n- 어학연수 기회\n- 도서구입비\n\n**기타 혜택**\n- 가족수당\n- 자녀 학비 지원\n- 의료비 지원\n- 체육시설 이용\n- 경조사비 지원',
        tags: ['복리후생', '급여', '휴가제도'],
        popularity: 85
      }
    ]
  }
];

// 샘플 채팅 세션들
export const mockChatSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: '서울시청 정보보안 담당자 문의',
    category: 'job-search',
    createdAt: new Date('2024-08-10T09:00:00'),
    updatedAt: new Date('2024-08-10T09:15:00'),
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: '서울시청 정보보안 담당자 공고에 대해 궁금한 점이 있어요.',
        timestamp: new Date('2024-08-10T09:00:00')
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: '안녕하세요! 서울시청 정보보안 담당자 공고에 대해 도움드리겠습니다. 구체적으로 어떤 부분이 궁금하신가요?\n\n다음과 같은 정보를 안내해드릴 수 있습니다:\n- 지원 자격 요건\n- 주요 업무 내용\n- 급여 및 처우\n- 면접 준비 방법\n- 필요한 자격증이나 경험',
        timestamp: new Date('2024-08-10T09:00:30'),
        metadata: {
          confidence: 95,
          category: 'job-inquiry',
          followUp: [
            '이 공고의 지원 자격은 무엇인가요?',
            '주요 업무는 어떤 것들인가요?',
            '필요한 자격증이 있나요?'
          ]
        }
      },
      {
        id: 'msg-3',
        role: 'user',
        content: '정보보안기사 자격증이 필수인가요? 그리고 실무 경력은 얼마나 필요한가요?',
        timestamp: new Date('2024-08-10T09:02:00')
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: '네, 해당 공고의 자격 요건을 확인해드리겠습니다.\n\n**정보보안기사 자격증**\n- ✅ **필수 요건**입니다\n- 지원 시점에 취득 완료되어 있어야 함\n- 자격증 사본 제출 필요\n\n**실무 경력**\n- ✅ **3년 이상 경력** 필수\n- 정보보안 관련 실무 경력\n- 경력증명서로 입증 가능해야 함\n\n**추가 우대사항**\n- CISSP, CISA 등 국제 자격증\n- 공공기관 정보보안 업무 경험\n- 관련 학과 전공 (컴퓨터공학, 정보보안 등)\n\n현재 자격증이나 경력이 부족하시다면, 다른 유사 공고도 함께 확인해보시는 것을 추천드립니다.',
        timestamp: new Date('2024-08-10T09:03:00'),
        metadata: {
          sources: ['서울시청 채용공고 2025-08-001'],
          confidence: 98,
          category: 'requirements',
          followUp: [
            '다른 유사한 공고는 어떤 것들이 있나요?',
            '면접에서는 어떤 질문이 나올까요?',
            '자기소개서 작성 팁을 알려주세요'
          ]
        }
      }
    ]
  }
];

// 컨텍스트별 응답 템플릿
export const responseTemplates = {
  greeting: [
    "안녕하세요! 공공기관 채용 전문 AI 어시스턴트입니다. 어떤 도움이 필요하신가요?",
    "반갑습니다! 채용 정보부터 면접 준비까지 무엇이든 물어보세요.",
    "안녕하세요! 당신의 공공기관 취업을 도와드리겠습니다."
  ],
  jobInquiry: [
    "해당 공고에 대해 자세히 안내해드리겠습니다.",
    "공고의 세부 사항을 확인해보겠습니다.",
    "관련 정보를 찾아서 알려드릴게요."
  ],
  resumeHelp: [
    "이력서 작성에 도움이 되는 조언을 드리겠습니다.",
    "효과적인 이력서 작성법을 안내해드릴게요.",
    "경쟁력 있는 이력서를 위한 팁을 알려드리겠습니다."
  ],
  interviewPrep: [
    "면접 준비에 필요한 정보를 제공해드리겠습니다.",
    "예상 질문과 답변 방향을 안내해드릴게요.",
    "성공적인 면접을 위한 준비 방법을 알려드리겠습니다."
  ]
};

// Mock API 함수들
export const mockChatAPI = {
  // 채팅 메시지 전송
  sendMessage: async (sessionId: string, message: string): Promise<ChatMessage> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000)); // 응답 지연 시뮬레이션
    
    // 간단한 키워드 기반 응답 생성
    let response = '';
    let metadata: any = {
      confidence: 85 + Math.random() * 15,
      category: 'general'
    };

    if (message.includes('자격') || message.includes('요건')) {
      response = '해당 공고의 지원 자격 요건을 확인해드리겠습니다.\n\n주요 자격 요건:\n- 학력: 학사 이상\n- 경력: 관련 분야 3년 이상\n- 자격증: 해당 분야 전문 자격증\n- 기타: 우대사항 및 가점 요소\n\n더 구체적인 정보가 필요하시면 공고번호를 알려주세요.';
      metadata.category = 'requirements';
      metadata.sources = ['채용공고 상세 정보'];
    } else if (message.includes('면접')) {
      response = '면접 준비에 도움을 드리겠습니다.\n\n공공기관 면접 특징:\n- 인성면접과 직무면접으로 구성\n- 공직 가치관과 윤리의식 중요\n- 해당 기관과 직무에 대한 이해 필수\n\n예상 질문과 준비 방법에 대해 더 자세히 알려드릴까요?';
      metadata.category = 'interview';
      metadata.followUp = [
        '예상 면접 질문을 알려주세요',
        '면접 복장은 어떻게 해야 하나요?',
        '면접 당일 유의사항은?'
      ];
    } else if (message.includes('급여') || message.includes('연봉') || message.includes('복리후생')) {
      response = '급여 및 복리후생 정보를 안내해드리겠습니다.\n\n일반적인 처우:\n- 급여: 직급별 기본급 + 각종 수당\n- 복리후생: 4대보험, 퇴직금, 연차 등\n- 추가 혜택: 교육지원, 주거지원 등\n\n구체적인 급여표는 각 기관의 규정에 따라 다를 수 있습니다.';
      metadata.category = 'welfare';
    } else {
      response = '궁금한 점에 대해 도움을 드리겠습니다.\n\n다음과 같은 분야의 질문을 받을 수 있습니다:\n- 채용 공고 관련 문의\n- 지원서류 작성 도움\n- 면접 준비 조언\n- 경력 개발 상담\n\n구체적으로 어떤 부분이 궁금하신지 말씀해 주세요.';
    }

    return {
      id: 'msg-' + Date.now(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      metadata
    };
  },
  
  // 새 채팅 세션 생성
  createSession: async (title?: string): Promise<ChatSession> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      id: 'session-' + Date.now(),
      title: title || '새 채팅',
      category: 'general',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },
  
  // 채팅 세션 목록 조회
  getSessions: async (): Promise<ChatSession[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockChatSessions;
  },
  
  // 특정 세션 조회
  getSession: async (sessionId: string): Promise<ChatSession | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockChatSessions.find(s => s.id === sessionId) || null;
  },
  
  // 문서 기반 질답 (채용담당자용)
  queryDocuments: async (query: string, documentIds: string[]): Promise<{
    answer: string;
    sources: Array<{
      documentId: string;
      documentName: string;
      relevantSection: string;
      confidence: number;
    }>;
    relatedQuestions: string[];
  }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      answer: '업로드하신 문서를 기반으로 답변드리겠습니다.\n\n해당 질문에 대한 답변은 다음과 같습니다:\n\n[문서 내용 기반 상세 답변]\n\n추가로 궁금한 점이 있으시면 언제든 문의해 주세요.',
      sources: [
        {
          documentId: 'doc-1',
          documentName: '2025년 채용 계획서.pdf',
          relevantSection: '3장. 채용 절차 및 방법',
          confidence: 92
        }
      ],
      relatedQuestions: [
        '선발 과정은 어떻게 진행되나요?',
        '제출 서류는 무엇인가요?',
        '면접 일정은 언제인가요?'
      ]
    };
  },
  
  // FAQ 검색
  searchFAQ: async (query: string): Promise<FAQItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allFAQs = faqCategories.flatMap(cat => cat.questions);
    return allFAQs
      .filter(faq => 
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
  }
};

// 채팅 도우미 함수들
export const chatHelpers = {
  formatTimestamp: (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  },
  
  getConfidenceColor: (confidence: number): string => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  },
  
  generateSessionTitle: (firstMessage: string): string => {
    const keywords = ['채용', '면접', '이력서', '자격증', '급여', '복리후생'];
    const foundKeyword = keywords.find(k => firstMessage.includes(k));
    
    if (foundKeyword) {
      return `${foundKeyword} 관련 문의`;
    }
    
    return firstMessage.length > 20 
      ? firstMessage.substring(0, 20) + '...'
      : firstMessage;
  }
};