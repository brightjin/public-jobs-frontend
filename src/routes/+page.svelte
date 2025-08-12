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
  <!-- 히어로 섹션 - Toss 스타일 -->
  <section class="relative min-h-screen flex items-center justify-center gradient-toss-blue overflow-hidden">
    <!-- 토스 스타일 배경 패턴 -->
    <div class="absolute inset-0">
      <!-- 그라데이션 오버레이 -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/80 to-blue-800/90"></div>
      <!-- 기하학적 패턴 -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-xl"></div>
      </div>
    </div>
    
    <!-- 콘텐츠 -->
    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
      <div class="space-y-12">
        <!-- 메인 헤드라인 - 토스 스타일 -->
        <h1 class="text-toss-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
          <span class="block mb-4">🚀 AI가 찾아주는</span>
          <span class="block bg-gradient-to-r from-yellow-300 via-white to-mint-300 bg-clip-text text-transparent font-black">
            맞춤형 공공기관 채용
          </span>
        </h1>
        
        <!-- 서브 헤드라인 -->
        <p class="text-toss-body text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          이력서 한 번 업로드로 AI가 당신에게 딱 맞는 채용공고를 찾아드려요.<br />
          더 빠르고, 더 정확하고, 더 쉽게 꿈의 직장을 만나보세요! ✨
        </p>
        
        <!-- CTA 버튼 - 토스 스타일 -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <button class="btn-toss px-12 py-5 text-lg bg-white text-blue-600 hover:bg-gray-50 shadow-xl">
            🎯 바로 시작하기
          </button>
          <button class="btn-toss-outline px-12 py-5 text-lg text-white border-white hover:bg-white hover:text-blue-600">
            💡 어떻게 작동하나요?
          </button>
        </div>
        
        <!-- 토스 스타일 통계 -->
        <div class="pt-16">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-black text-yellow-300 mb-2">10,000+</div>
              <div class="text-sm text-white/80">등록된 채용공고</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-mint-300 mb-2">95%</div>
              <div class="text-sm text-white/80">매칭 정확도</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-black text-pink-300 mb-2">24/7</div>
              <div class="text-sm text-white/80">AI 지원 서비스</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 토스 스타일 플로팅 요소들 -->
    <div class="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-2xl opacity-20 animate-bounce delay-1000"></div>
    <div class="absolute bottom-40 right-20 w-12 h-12 bg-mint-400 rounded-full opacity-30 animate-pulse delay-500"></div>
    <div class="absolute top-1/3 right-10 w-20 h-20 bg-pink-400 rounded-3xl opacity-15 animate-bounce delay-2000"></div>
    <div class="absolute bottom-20 left-1/4 w-8 h-8 bg-white rounded-full opacity-40 animate-ping"></div>
  </section>

  <!-- 주요 기능 섹션 - Toss 스타일 -->
  <section class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <!-- 섹션 헤더 - 토스 스타일 -->
      <div class="text-center mb-16">
        <div class="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
          ✨ 특별한 기능들
        </div>
        <h2 class="text-toss-headline text-3xl md:text-5xl text-gray-900 mb-6">
          왜 {env.PUBLIC_SITE_NAME}인가요?
        </h2>
        <p class="text-toss-body text-lg text-gray-600 max-w-3xl mx-auto">
          토스뱅크처럼 쉽고 직관적인 UI로<br />
          AI 기반 공공기관 채용의 새로운 경험을 제공해요! 🎉
        </p>
      </div>
      
      <!-- 기능 카드들 - 토스 스타일 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- AI 이력서 분석 -->
        <div class="card-toss p-6 text-left group">
          <!-- 토스 스타일 아이콘 -->
          <div class="w-14 h-14 gradient-toss-blue rounded-2xl flex items-center justify-center mb-6">
            <span class="text-2xl">📄</span>
          </div>
          
          <h3 class="text-toss-headline text-xl text-gray-900 mb-3">
            AI 이력서 분석
          </h3>
          <p class="text-toss-body text-gray-600 leading-relaxed mb-6">
            파일만 끌어다 놓으면 끝!<br />
            AI가 자동으로 이력서를 분석해서<br />
            입력 폼에 척척 채워드려요 ⚡
          </p>
          
          <!-- 토스 스타일 뱃지 -->
          <div class="flex gap-2">
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">정확도 95%</span>
            <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">3초 완료</span>
          </div>
        </div>
        
        <!-- 정확한 매칭 -->
        <div class="card-toss p-6 text-left group">
          <div class="w-14 h-14 gradient-toss-mint rounded-2xl flex items-center justify-center mb-6">
            <span class="text-2xl">🎯</span>
          </div>
          
          <h3 class="text-toss-headline text-xl text-gray-900 mb-3">
            정확한 매칭
          </h3>
          <p class="text-toss-body text-gray-600 leading-relaxed mb-6">
            내 경력과 자격증을 분석해서<br />
            딱 맞는 공고만 골라드려요!<br />
            "이거 완전 내가 찾던 거네!" 🤩
          </p>
          
          <div class="flex gap-2">
            <span class="bg-mint-100 text-mint-600 px-3 py-1 rounded-full text-xs font-bold">매칭률 92%</span>
            <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">실시간 추천</span>
          </div>
        </div>
        
        <!-- 24시간 AI 챗봇 -->
        <div class="card-toss p-6 text-left group">
          <div class="w-14 h-14 gradient-toss-warm rounded-2xl flex items-center justify-center mb-6 relative">
            <span class="text-2xl">🤖</span>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <h3 class="text-toss-headline text-xl text-gray-900 mb-3">
            24시간 AI 챗봇
          </h3>
          <p class="text-toss-body text-gray-600 leading-relaxed mb-6">
            궁금한 게 있으면 언제든 물어보세요!<br />
            밤낮없이 친절하게 답변해드려요<br />
            마치 채용 전문가가 옆에 있는 것처럼 💬
          </p>
          
          <div class="flex gap-2">
            <span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">응답 3초</span>
            <span class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">24시간 운영</span>
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
