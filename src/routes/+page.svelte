<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Button from '$lib/components/Button.svelte';
  import JobCard from '$lib/components/JobCard.svelte';
  import { jobs, type Job } from '$lib/stores';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  
  // 샘플 데이터
  const sampleJobs: Job[] = [
    {
      id: '1',
      title: '서울시청 정보보안 담당자',
      organization: '서울특별시',
      location: '서울시 중구',
      salary: '6급 상당 (연봉 4,500만원)',
      requirements: ['정보보안기사', '3년 이상 경력', '컴퓨터공학 전공'],
      deadline: '2025-08-25',
      description: '서울시 정보보안 업무 담당',
      matchScore: 92
    },
    {
      id: '2',
      title: '부산광역시 디지털정책 기획자',
      organization: '부산광역시',
      location: '부산시 연제구',
      salary: '7급 상당 (연봉 3,800만원)',
      requirements: ['행정학 전공', '정책기획 경험', '영어 중급'],
      deadline: '2025-08-20',
      description: '디지털 전환 정책 수립 및 추진',
      matchScore: 78
    },
    {
      id: '3',
      title: '대구시교육청 AI교육 전문관',
      organization: '대구광역시교육청',
      location: '대구시 중구',
      salary: '연구관 상당 (연봉 5,200만원)',
      requirements: ['교육학 전공', 'AI 관련 자격증', '교육경력 5년'],
      deadline: '2025-08-30',
      description: 'AI 교육과정 개발 및 운영',
      matchScore: 85
    }
  ];
  
  onMount(() => {
    jobs.set(sampleJobs);
  });
</script>

<svelte:head>
  <title>{env.PUBLIC_SITE_NAME} - {env.PUBLIC_SITE_DESCRIPTION}</title>
  <meta name="description" content="AI가 추천하는 맞춤형 공공기관 채용정보를 확인하세요. 이력서를 업로드하면 최적의 공고를 매칭해드립니다.">
</svelte:head>

<Header />

<main>
  <!-- 히어로 섹션 - Apple 스타일 -->
  <section class="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
    <!-- 배경 그라데이션 -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
    
    <!-- 콘텐츠 -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
      <div class="space-y-8">
        <!-- 메인 헤드라인 -->
        <h1 class="text-display text-5xl md:text-7xl lg:text-8xl font-semibold text-black tracking-tight">
          AI가 찾아주는
          <br />
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            맞춤형 공공기관 채용
          </span>
        </h1>
        
        <!-- 서브 헤드라인 -->
        <p class="text-body text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          이력서를 업로드하면 AI가 당신에게 최적화된 채용공고를 추천합니다.<br />
          Apple 수준의 디자인과 최첨단 기술로 새로운 채용 경험을 만나보세요.
        </p>
        
        <!-- CTA 버튼 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button variant="primary" size="lg" class="px-8 py-4 text-lg">
            이력서 업로드하기
          </Button>
          <Button variant="secondary" size="lg" class="px-8 py-4 text-lg">
            내게 딱 맞는 포지션은?
          </Button>
        </div>
        
        <!-- 부가 정보 -->
        <div class="pt-12">
          <p class="text-fine text-gray-500">
            지금 시작하세요. 1분이 이면 충분합니다.
          </p>
        </div>
      </div>
    </div>
    
    <!-- 부유하는 요소들 -->
    <div class="absolute top-20 left-20 w-20 h-20 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
    <div class="absolute bottom-32 right-16 w-12 h-12 bg-purple-100 rounded-full opacity-40 animate-pulse delay-1000"></div>
    <div class="absolute top-1/3 right-20 w-16 h-16 bg-indigo-100 rounded-full opacity-50 animate-pulse delay-500"></div>
  </section>

  <!-- 주요 기능 섹션 - Apple 스타일 -->
  <section class="py-32 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- 섹션 헤더 -->
      <div class="text-center mb-20">
        <h2 class="text-headline text-4xl md:text-6xl font-semibold text-black mb-6">
          왜 {env.PUBLIC_SITE_NAME} 인가요?
        </h2>
        <p class="text-body text-xl text-gray-600 max-w-4xl mx-auto">
          최신 AI 기술로<br />
          공공기관 채용의 새로운 경험을 제공합니다
        </p>
      </div>
      
      <!-- 기능 카드들 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- AI 이력서 분석 -->
        <div class="card-apple p-12 text-center group">
          <div class="relative mb-8">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <!-- 장식적 원소 -->
            <div class="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300"></div>
          </div>
          
          <h3 class="text-headline text-2xl font-semibold text-black mb-4">
            AI 이력서 분석
          </h3>
          <p class="text-body text-gray-600 leading-relaxed">
            PDF나 Word 파일을 업로드하면 AI가 자동으로 분석하여<br />
            입력 필드에 정확하게 채워드립니다
          </p>
          
          <!-- 진행 표시줄 -->
          <div class="mt-8 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>정확도</span>
              <span>95%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full w-[95%] group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>
        </div>
        
        <!-- 정확한 매칭 -->
        <div class="card-apple p-12 text-center group">
          <div class="relative mb-8">
            <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="absolute -bottom-1 -left-2 w-4 h-4 bg-green-200 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300 delay-100"></div>
          </div>
          
          <h3 class="text-headline text-2xl font-semibold text-black mb-4">
            정확한 매칭
          </h3>
          <p class="text-body text-gray-600 leading-relaxed">
            당신의 경력과 자격을 AI가 분석하여<br />
            90%+ 정확도로 최적의 공고를 추천합니다
          </p>
          
          <div class="mt-8 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>매칭 성공률</span>
              <span>92%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div class="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full w-[92%] group-hover:w-full transition-all duration-1000 delay-200"></div>
            </div>
          </div>
        </div>
        
        <!-- 24시간 AI 챗봇 -->
        <div class="card-apple p-12 text-center group">
          <div class="relative mb-8">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="absolute -top-1 -left-1 w-3 h-3 bg-purple-200 rounded-full opacity-80 animate-ping"></div>
            <div class="absolute -bottom-2 -right-1 w-5 h-5 bg-purple-200 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300 delay-75"></div>
          </div>
          
          <h3 class="text-headline text-2xl font-semibold text-black mb-4">
            24시간 AI 챗봇
          </h3>
          <p class="text-body text-gray-600 leading-relaxed">
            채용 관련 궁금한 점을 언제든지<br />
            AI 챗봇에게 물어보세요. 즉시 답변드립니다
          </p>
          
          <div class="mt-8 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>응답 속도</span>
              <span>&lt; 3초</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full w-[98%] group-hover:w-full transition-all duration-1000 delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 추천 채용공고 섹션 - Apple 스타일 -->
  <section class="py-32 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- 섹션 헤더 -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
        <div class="mb-8 lg:mb-0">
          <h2 class="text-headline text-4xl md:text-5xl font-semibold text-black mb-4">
            🔥 인기 채용공고
          </h2>
          <p class="text-body text-xl text-gray-600 max-w-2xl">
            지금 가장 많은 관심을 받는 공공기관 채용공고들을<br />
            AI가 분석한 매칭도와 함께 확인해보세요
          </p>
        </div>
        <Button variant="secondary" size="lg">전체 보기</Button>
      </div>
      
      <!-- 채용공고 카드 그리드 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {#each $jobs as job}
          <JobCard {job} showMatchScore={true} />
        {/each}
      </div>
      
      <!-- 더 보기 버튼 -->
      <div class="text-center mt-16">
        <Button variant="outline" size="lg" class="px-12">
          더 많은 채용공고 보기
        </Button>
        <p class="text-fine text-gray-500 mt-4">
          매주 새로운 공고가 업데이트됩니다
        </p>
      </div>
    </div>
  </section>

  <!-- CTA 섹션 - Apple 스타일 -->
  <section class="relative py-32 bg-black text-white overflow-hidden">
    <!-- 배경 그라데이션 -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900"></div>
    
    <!-- 장식적 요소들 -->
    <div class="absolute top-10 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
    <div class="absolute bottom-10 right-1/4 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
    
    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <div class="space-y-8">
        <!-- 메인 헤드라인 -->
        <h2 class="text-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
          지금 시작하세요
        </h2>
        
        <!-- 서브 헤드라인 -->
        <p class="text-body text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          수백 개의 공공기관 채용정보가 당신을 기다리고 있습니다<br />
          무료로 시작하고, 꿈의 직장을 찾아보세요
        </p>
        
        <!-- CTA 버튼들 -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <Button variant="primary" size="lg" class="px-10 py-5 text-lg">
            무료로 시작하기
          </Button>
          <Button variant="outline" size="lg" class="px-10 py-5 text-lg text-white hover:text-black">
            데모 보기
          </Button>
        </div>
        
        <!-- 통계 정보 -->
        <div class="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-800">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
            <div class="text-fine text-gray-400">등록된 채용공고</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
            <div class="text-fine text-gray-400">매칭 정확도</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div class="text-fine text-gray-400">AI 지원 서비스</div>
          </div>
        </div>
        
        <!-- 부가 정보 -->
        <div class="pt-8">
          <p class="text-fine text-gray-500">
            신용카드 불필요 • 언제든 취소 가능 • 개인정보 보호
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<Footer />
