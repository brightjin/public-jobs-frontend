<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import JobCard from '$lib/components/JobCard.svelte';
  import Button from '$lib/components/Button.svelte';
  import { jobs, type Job } from '$lib/stores';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  
  // 샘플 채용공고 데이터 확장
  const allJobs: Job[] = [
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
    },
    {
      id: '4',
      title: '인천시 스마트시티 개발자',
      organization: '인천광역시',
      location: '인천시 연수구',
      salary: '6급 상당 (연봉 4,200만원)',
      requirements: ['컴퓨터공학 전공', 'Python 능숙', 'IoT 경험'],
      deadline: '2025-09-05',
      description: '스마트시티 플랫폼 개발 및 운영',
      matchScore: 88
    },
    {
      id: '5',
      title: '경기도청 데이터분석 전문가',
      organization: '경기도',
      location: '경기도 수원시',
      salary: '7급 상당 (연봉 3,900만원)',
      requirements: ['통계학 전공', 'R/Python', '빅데이터 분석 경험'],
      deadline: '2025-08-28',
      description: '도정 데이터 분석 및 정책 수립 지원',
      matchScore: 76
    },
    {
      id: '6',
      title: '강원도 관광정책 기획자',
      organization: '강원도',
      location: '강원도 춘천시',
      salary: '7급 상당 (연봉 3,700만원)',
      requirements: ['관광학 전공', '기획 경험', '영어/중국어'],
      deadline: '2025-09-10',
      description: '강원도 관광 활성화 정책 기획 및 추진',
      matchScore: 72
    }
  ];
  
  let filteredJobs = $state(allJobs);
  let searchQuery = $state('');
  let selectedLocation = $state('전체');
  let selectedOrganization = $state('전체');
  let sortBy = $state('deadline');
  
  // 필터링 옵션
  const locations = ['전체', '서울', '부산', '대구', '인천', '경기', '강원'];
  const organizations = ['전체', '시/도청', '교육청', '공기업', '기타 공공기관'];
  const sortOptions = [
    { value: 'deadline', label: '마감일순' },
    { value: 'matchScore', label: '매칭도순' },
    { value: 'salary', label: '급여순' },
    { value: 'recent', label: '최신순' }
  ];
  
  function filterJobs() {
    let filtered = allJobs;
    
    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // 지역 필터링
    if (selectedLocation !== '전체') {
      filtered = filtered.filter(job => 
        job.location.includes(selectedLocation)
      );
    }
    
    // 정렬
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'matchScore':
          return (b.matchScore || 0) - (a.matchScore || 0);
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        default:
          return 0;
      }
    });
    
    filteredJobs = filtered;
  }
  
  // 반응형 필터링
  $effect(() => {
    filterJobs();
  });
  
  onMount(() => {
    jobs.set(allJobs);
  });
</script>

<svelte:head>
  <title>채용공고 목록 - {env.PUBLIC_SITE_NAME}</title>
  <meta name="description" content="최신 공공기관 채용공고를 확인하고 나에게 맞는 공고를 찾아보세요.">
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- 페이지 헤더 -->
  <section class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-apple-text dark:text-white mb-4">
          📋 채용공고 목록
        </h1>
        <p class="text-xl text-apple-text-secondary">
          전국 공공기관의 최신 채용정보를 한눈에 확인하세요
        </p>
      </div>
    </div>
  </section>

  <!-- 검색 및 필터 -->
  <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="space-y-4">
        <!-- 검색바 -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="직무, 기관명, 자격요건 등으로 검색하세요..."
            class="input-apple pl-10 pr-4 py-3 w-full text-lg"
          />
        </div>
        
        <!-- 필터 옵션 -->
        <div class="flex flex-wrap gap-4">
          <div>
            <label for="location" class="block text-sm font-medium text-apple-text dark:text-white mb-1">
              지역
            </label>
            <select
              id="location"
              bind:value={selectedLocation}
              class="input-apple py-2 px-3 text-sm min-w-[120px]"
            >
              {#each locations as location}
                <option value={location}>{location}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label for="sort" class="block text-sm font-medium text-apple-text dark:text-white mb-1">
              정렬
            </label>
            <select
              id="sort"
              bind:value={sortBy}
              class="input-apple py-2 px-3 text-sm min-w-[120px]"
            >
              {#each sortOptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </div>
          
          <div class="flex items-end">
            <Button variant="primary" size="sm">
              🔍 검색
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 검색 결과 -->
  <section class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-xl font-semibold text-apple-text dark:text-white">
            검색결과 {filteredJobs.length}개
          </h2>
          <p class="text-apple-text-secondary text-sm">
            {searchQuery ? `"${searchQuery}"에 대한 검색결과` : '전체 채용공고'}
          </p>
        </div>
        
        <div class="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            🔔 알림 설정
          </Button>
          <Button variant="secondary" size="sm">
            📤 목록 내보내기
          </Button>
        </div>
      </div>
      
      {#if filteredJobs.length > 0}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {#each filteredJobs as job}
            <JobCard {job} showMatchScore={true} />
          {/each}
        </div>
        
        <!-- 페이지네이션 -->
        <div class="mt-8 flex justify-center">
          <div class="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              이전
            </Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              다음
            </Button>
          </div>
        </div>
      {:else}
        <div class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-apple-text dark:text-white mb-2">
            검색 결과가 없습니다
          </h3>
          <p class="text-apple-text-secondary mb-4">
            다른 검색어나 필터 조건을 시도해보세요.
          </p>
          <Button variant="primary" onclick={() => { searchQuery = ''; selectedLocation = '전체'; }}>
            전체 공고 보기
          </Button>
        </div>
      {/if}
    </div>
  </section>
</main>

<Footer />