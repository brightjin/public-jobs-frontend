import { writable } from 'svelte/store';

// 질문 인터페이스
export interface Question {
  id: string;
  subject: string;
  text: string;
  options: number[];
  answer?: string;
}

export const questions = writable<Question[]>([
  {
    id: '1',
    subject: '성실성',
    text: '주어진 업무를 마감일 전에 완료하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '2',
    subject: '성실성',
    text: '업무 중 실수를 발견했을 때, 즉시 보고하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '3',
    subject: '개방성',
    text: '새로운 아이디어나 방법을 시도하는 것을 선호하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '4',
    subject: '개방성',
    text: '다른 사람의 의견을 듣고 수용하는 데 열려 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '5',
    subject: '외향성',
    text: '새로운 사람들과 쉽게 대화할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '6',
    subject: '외향성',
    text: '팀 활동에서 주도적으로 참여하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '7',
    subject: '우호성',
    text: '동료와의 협업을 즐기는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '8',
    subject: '우호성',
    text: '다른 사람의 감정을 이해하고 배려하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '9',
    subject: '정서안정성',
    text: '스트레스 상황에서도 침착함을 유지할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '10',
    subject: '정서안정성',
    text: '비판을 받을 때 감정적으로 반응하지 않나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '11',
    subject: '기술전문성',
    text: '자신의 전문 분야에 대한 지식이 충분하다고 생각하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '12',
    subject: '기술전문성',
    text: '새로운 기술을 배우는 데 어려움이 없나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '13',
    subject: '인지문제해결',
    text: '문제를 해결하기 위해 다양한 접근 방식을 시도하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기화
  },
  {
    id: '14',
    subject: '인지문제해결',
    text: '복잡한 문제를 쉽게 분석하고 해결할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '', // 빈 값으로 초기
  },
  {
    id: '15',
    subject: '대인영향력',
    text: '다른 사람에게 긍정적인 영향을 미치는 것을 중요하게 생각하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '16',
    subject: '대인영향력',
    text: '자신의 의견을 효과적으로 전달하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '17',
    subject: '자기관리',
    text: '일정을 잘 관리하고 우선순위를 정하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '18',
    subject: '자기관리',
    text: '목표를 설정하고 이를 달성하기 위해 노력하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '19',
    subject: '적응력',
    text: '변화하는 상황에 빠르게 적응할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '20',
    subject: '적응력',
    text: '새로운 환경에서 편안함을 느끼는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '21',
    subject: '학습속도',
    text: '새로운 정보를 빠르게 이해하고 적용할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '22',
    subject: '학습속도',
    text: '스스로 학습하는 것을 즐기는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '23',
    subject: '대인민첩성',
    text: '다양한 사람들과 쉽게 관계를 형성할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '24',
    subject: '대인민첩성',
    text: '갈등 상황에서 중재 역할을 잘 수행하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '25',
    subject: '성과민첩성',
    text: '목표 달성을 위해 신속하게 행동하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '26',
    subject: '성과민첩성',
    text: '성과를 내기 위해 필요한 조치를 즉시 취하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '27',
    subject: '자기인식',
    text: '자신의 강점과 약점을 잘 알고 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '28',
    subject: '자기인식',
    text: '피드백을 통해 자신을 개선하려고 노력하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '29',
    subject: '자기조절',
    text: '감정을 잘 조절하고 상황에 맞게 행동할 수 있나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '30',
    subject: '자기조절',
    text: '스트레스 상황에서도 긍정적인 태도를 유지하려고 하나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '31',
    subject: '공감사회기술',
    text: '다른 사람의 감정을 이해하고 그에 맞게 반응하는 편인가요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
  {
    id: '32',
    subject: '공감사회기술',
    text: '팀원이나 동료의 어려움을 듣고 도와주려는 노력을 기울이나요?',
    options: [1, 2, 3, 4, 5],
    answer: '',
  },
]);