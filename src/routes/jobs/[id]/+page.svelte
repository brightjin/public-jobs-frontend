<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Button from '$lib/components/Button.svelte';
  import JobMatchRadarChart from '$lib/components/JobMatchRadarChart.svelte';
  import WeightsSummary from '$lib/components/WeightsSummary.svelte';
  import { page } from '$app/stores';
  import { mockJobsAPI, user } from '$lib/stores';
  import type { Job } from '$lib/stores';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';

  let job: Job | null = $state(null);
  let loading = $state(true);
  let error = $state('');
  let showApplyModal = $state(false);

  const jobId = $page.params.id;

  // 채용공고 상세 정보 로드
  onMount(async () => {
    try {
      job = await mockJobsAPI.getJob(jobId);
      if (!job) {
        error = '해당 채용공고를 찾을 수 없습니다.';
      }
    } catch (err) {
      error = '채용공고를 불러오는 중 오류가 발생했습니다.';
    } finally {
      loading = false;
    }
  });

  // 지원하기 모달 토글
  function toggleApplyModal() {
    showApplyModal = !showApplyModal;
  }

  // 마감일 포맷팅
  function formatDeadline(deadline: string) {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: '마감', color: 'text-red-600', urgent: true };
    if (diffDays === 0) return { text: '오늘 마감', color: 'text-red-600', urgent: true };
    if (diffDays === 1) return { text: '내일 마감', color: 'text-orange-600', urgent: true };
    if (diffDays <= 7) return { text: `${diffDays}일 남음`, color: 'text-orange-600', urgent: true };
    return { text: `${diffDays}일 남음`, color: 'text-gray-600 dark:text-gray-400', urgent: false };
  }

  // 매칭 점수 색상
  function getMatchScoreColor(score: number) {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (score >= 60) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
  }

  // 뒤로가기
  function goBack() {
    history.back();
  }

  // 관심공고 추가
  function addToFavorites() {
    alert('관심공고에 추가되었습니다.');
  }

  // 공유하기
  function shareJob() {
    if (navigator.share && job) {
      navigator.share({
        title: job.title,
        text: `${job.organization} - ${job.title}`,
        url: window.location.href
      });
    } else {
      // 폴백: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  }

  // AI 문의하기
  function goToChatbot() {
    if (job) {
      // 채용공고 정보를 쿼리 파라미터로 전달
      const params = new URLSearchParams({
        jobId: job.id,
        jobTitle: job.title,
        organization: job.organization,
        context: 'job_inquiry'
      });
      window.location.href = `/chat?${params.toString()}`;
    }
  }
</script>

<svelte:head>
  {#if job}
    <title>{job.title} - {job.organization} | {env.PUBLIC_SITE_NAME}</title>
    <meta name="description" content="{job.description.slice(0, 150)}...">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{job.title} - {job.organization}">
    <meta property="og:description" content="{job.description.slice(0, 150)}...">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{window.location.href}">
  {:else}
    <title>채용공고 상세 - {env.PUBLIC_SITE_NAME}</title>
  {/if}
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 dark:bg-gray-900">
  {#if loading}
    <!-- 로딩 상태 -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  {:else if error}
    <!-- 에러 상태 -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <div class="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          요청하신 채용공고를 찾을 수 없거나 문제가 발생했습니다.
        </p>
        <div class="flex justify-center gap-4">
          <Button variant="outline" onclick={goBack}>
            뒤로가기
          </Button>
          <Button variant="primary" onclick={() => window.location.href = '/jobs'}>
            채용공고 목록
          </Button>
        </div>
      </div>
    </div>
  {:else if job}
    <!-- 채용공고 상세 내용 -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 브레드크럼 & 뒤로가기 -->
      <nav class="flex items-center mb-6">
        <button 
          onclick={goBack}
          class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>
        <span class="mx-3 text-gray-400">/</span>
        <span class="text-gray-600 dark:text-gray-400">채용공고</span>
        <span class="mx-3 text-gray-400">/</span>
        <span class="text-gray-900 dark:text-white font-medium truncate">{job.title}</span>
      </nav>

      <!-- 메인 헤더 카드 -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div class="flex-1">
            <!-- 제목 & 기본 정보 -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-4">
                {#if job.isNew}
                  <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                    NEW
                  </span>
                {/if}
                {#if job.isHot}
                  <span class="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium rounded-full">
                    HOT
                  </span>
                {/if}
                {#if job.isUrgent}
                  <span class="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-medium rounded-full">
                    마감임박
                  </span>
                {/if}
              </div>
              
              <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {job.title}
              </h1>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <div class="flex items-center text-gray-700 dark:text-gray-300">
                  <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span class="font-medium">{job.organization}</span>
                </div>
                
                <div class="flex items-center text-gray-700 dark:text-gray-300">
                  <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{job.location}</span>
                </div>
                
                <div class="flex items-center text-gray-700 dark:text-gray-300">
                  <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span class="font-medium">{job.salary}</span>
                </div>
                
                <div class="flex items-center text-gray-700 dark:text-gray-300">
                  <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="{formatDeadline(job.deadline).color} font-medium">
                    마감: {formatDeadline(job.deadline).text}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- 매칭도 (있는 경우) -->
            {#if job.matchScore}
              <div class="mb-6">
                <div class="flex items-center gap-4">
                  <span class="text-lg font-medium text-gray-900 dark:text-white">AI 매칭도</span>
                  <div class="flex items-center gap-2">
                    <div class="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        class="h-full {job.matchScore >= 80 ? 'bg-green-500' : job.matchScore >= 60 ? 'bg-blue-500' : 'bg-orange-500'} transition-all duration-500" 
                        style="width: {job.matchScore}%"
                      ></div>
                    </div>
                    <span class="text-2xl font-bold {getMatchScoreColor(job.matchScore)}">
                      {job.matchScore}%
                    </span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {job.matchScore >= 80 ? '매우 높은 일치도! 이 공고가 당신에게 적합합니다.' : 
                   job.matchScore >= 60 ? '좋은 일치도입니다. 지원을 고려해보세요.' : 
                   '일부 조건이 맞지 않을 수 있습니다. 자세히 확인해보세요.'}
                </p>
              </div>
            {/if}
          </div>
          
          <!-- 액션 버튼들 -->
          <div class="flex flex-col gap-3 lg:min-w-[200px]">
            <Button 
              variant="primary" 
              size="lg" 
              onclick={toggleApplyModal}
              class="w-full text-lg py-4"
            >
              🚀 지원하기
            </Button>

            <Button 
              variant="secondary" 
              size="lg" 
              onclick={goToChatbot}
              class="w-full text-lg py-4"
            >
              🤖 AI 문의
            </Button>
            
            <div class="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onclick={addToFavorites}
                class="flex-1"
              >
                ❤️ 관심공고
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onclick={shareJob}
                class="flex-1"
              >
                📤 공유
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 메인 콘텐츠 (2/3) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 직무 내용 -->
          <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span class="text-2xl">💼</span>
              직무 내용
            </h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </section>

          <!-- 자격 요건 -->
          <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span class="text-2xl">📋</span>
              자격 요건
            </h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">경력 요구사항</h3>
                  <p class="text-gray-700 dark:text-gray-300">{job.experience || '무관'}</p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">학력 요구사항</h3>
                  <p class="text-gray-700 dark:text-gray-300">{job.education || '무관'}</p>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">필수 자격 요건</h3>
                <div class="flex flex-wrap gap-2">
                  {#each job.requirements as requirement}
                    <span class="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                      {requirement}
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          </section>

          <!-- 복리후생 (있는 경우) -->
          {#if job.benefits && job.benefits.length > 0}
            <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span class="text-2xl">🎁</span>
                복리후생
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each job.benefits as benefit}
                  <div class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-green-800 dark:text-green-200 font-medium">{benefit}</span>
                  </div>
                {/each}
              </div>
            </section>
          {/if}
        </div>

        <!-- 사이드바 (1/3) -->
        <div class="space-y-6">
          <!-- 직무 적합성 비교 -->
          {#if job.jobProfile && $user?.jobProfile}
            <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <JobMatchRadarChart 
                jobWeights={job.jobProfile} 
                userWeights={$user.jobProfile}
                size={300}
                title="직무 적합성 비교"
              />
            </section>
          {/if}
          
          <!-- 채용공고 요구사항 프로파일 -->
          {#if job.jobProfile}
            <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="text-xl">🎯</span>
                채용공고 요구사항
              </h3>
              <div class="space-y-4">
                <WeightsSummary weights={job.jobProfile} compact={true} />
              </div>
            </section>
          {/if}

          <!-- 채용 정보 요약 -->
          <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">채용 정보</h3>
            <div class="space-y-4">
              <div>
                <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">부서</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{job.department || '미지정'}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">채용형태</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{job.workType || '정규직'}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">모집인원</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{job.recruitCount || '00'}명</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">지원자 수</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{job.applicationCount || 0}명</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-600 dark:text-gray-400">조회수</dt>
                <dd class="text-gray-900 dark:text-white font-medium">{job.viewCount?.toLocaleString() || 0}회</dd>
              </div>
            </div>
          </section>

          <!-- 태그 -->
          {#if job.tags && job.tags.length > 0}
            <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">관련 태그</h3>
              <div class="flex flex-wrap gap-2">
                {#each job.tags as tag}
                  <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                    #{tag}
                  </span>
                {/each}
              </div>
            </section>
          {/if}

          <!-- AI 추천 (매칭도가 있는 경우) -->
          {#if job.matchScore && job.matchScore > 70}
            <section class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="text-xl">🤖</span>
                AI 추천사항
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400">✅</span>
                  <span class="text-gray-700 dark:text-gray-300">보유하신 자격증과 일치도가 높습니다</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400">✅</span>
                  <span class="text-gray-700 dark:text-gray-300">경력 조건을 충족합니다</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">💡</span>
                  <span class="text-gray-700 dark:text-gray-300">이 기관에서 경력을 쌓을 좋은 기회입니다</span>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="sm" 
                onclick={toggleApplyModal}
                class="w-full mt-4"
              >
                지금 지원하기
              </Button>
            </section>
          {/if}
        </div>
      </div>
    </div>

    <!-- 지원하기 모달 -->
    {#if showApplyModal}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onclick={toggleApplyModal}>
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full" onclick={(e) => e.stopPropagation()}>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">지원하기</h3>
          
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                지원 방법을 선택하세요
              </label>
              <div class="space-y-2">
                <button class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <div class="font-medium text-gray-900 dark:text-white">📄 이력서로 지원</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">등록된 이력서를 사용하여 지원</div>
                </button>
                <button class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <div class="font-medium text-gray-900 dark:text-white">🔗 외부 링크로 지원</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">기관 홈페이지에서 직접 지원</div>
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <Button variant="outline" onclick={toggleApplyModal} class="flex-1">
              취소
            </Button>
            <Button variant="primary" onclick={() => { alert('지원이 완료되었습니다!'); toggleApplyModal(); }} class="flex-1">
              지원하기
            </Button>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</main>

<Footer />