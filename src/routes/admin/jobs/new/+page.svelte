<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import WeightsSummary from '$lib/components/WeightsSummary.svelte';
  import RadarChart from '$lib/components/RadarChart.svelte';
  import { goto } from '$app/navigation';
  
  // 폼 상태
  let formData = {
    title: '',
    organization: '',
    department: '',
    location: '',
    employmentType: '정규직',
    experience: '무관',
    education: '무관',
    salary: '',
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    contactPhone: ''
  };

  let loading = false;
  let errors: Record<string, string> = {};

  // 직무별 기본 가중치 (job-requirements에서 가져옴)
  const DEFAULT_WEIGHTS = {
    common: {
      conscientiousness:3, openness:3, extraversion:3, agreeableness:3, emotional_stability:3,
      technical_mastery:3, cognitive_problem_solving:3, interpersonal_influence:3, self_management:3, adaptability:3,
      learning_speed:3, people_agility:3, result_agility:3,
      self_awareness:3, self_regulation:3, empathy_social:3,
    },
    backend: {
      conscientiousness:4, openness:2, extraversion:2, agreeableness:2, emotional_stability:3,
      technical_mastery:5, cognitive_problem_solving:5, interpersonal_influence:2, self_management:4, adaptability:3,
      learning_speed:3, people_agility:2, result_agility:3,
      self_awareness:2, self_regulation:3, empathy_social:2,
    },
    data: {
      conscientiousness:3, openness:4, extraversion:2, agreeableness:2, emotional_stability:3,
      technical_mastery:5, cognitive_problem_solving:5, interpersonal_influence:2, self_management:3, adaptability:3,
      learning_speed:4, people_agility:2, result_agility:3,
      self_awareness:2, self_regulation:3, empathy_social:2,
    },
    sales: {
      conscientiousness:2, openness:3, extraversion:5, agreeableness:4, emotional_stability:3,
      technical_mastery:2, cognitive_problem_solving:2, interpersonal_influence:5, self_management:3, adaptability:4,
      learning_speed:3, people_agility:4, result_agility:4,
      self_awareness:2, self_regulation:2, empathy_social:4,
    },
    pm: {
      conscientiousness:3, openness:3, extraversion:3, agreeableness:3, emotional_stability:4,
      technical_mastery:3, cognitive_problem_solving:4, interpersonal_influence:5, self_management:3, adaptability:4,
      learning_speed:3, people_agility:4, result_agility:4,
      self_awareness:3, self_regulation:3, empathy_social:3,
    }
  };

  // 현재 선택된 가중치 (기본값: 공통)
  let currentWeights = $state({ ...DEFAULT_WEIGHTS.common });
  let selectedJobProfile = $state('common');
  
  // 고급 설정 패널 상태
  let showAdvancedSettings = $state(false);
  let isCustomMode = $state(false); // 프리셋 모드 vs 신규 프리셋 모드
  let newPresetName = $state(''); // 신규 프리셋명

  // 필수 필드 검증
  function validateForm() {
    errors = {};
    
    if (!formData.title.trim()) errors.title = '채용공고 제목을 입력해주세요.';
    if (!formData.organization.trim()) errors.organization = '기관명을 입력해주세요.';
    if (!formData.department.trim()) errors.department = '부서명을 입력해주세요.';
    if (!formData.location.trim()) errors.location = '근무지역을 입력해주세요.';
    if (!formData.deadline) errors.deadline = '마감일을 선택해주세요.';
    if (!formData.description.trim()) errors.description = '직무내용을 입력해주세요.';
    if (!formData.contactEmail.trim()) errors.contactEmail = '담당자 이메일을 입력해주세요.';
    
    return Object.keys(errors).length === 0;
  }

  // 폼 제출
  async function handleSubmit() {
    if (!validateForm()) return;
    
    loading = true;
    
    try {
      // API 호출 (모킹)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 시 목록 페이지로 이동
      alert('채용공고가 등록되었습니다.');
      goto('/admin/jobs');
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      loading = false;
    }
  }

  // 직무적합성 정보 페이지로 이동
  function goToJobRequirements() {
    goto('/admin/job-requirements');
  }

  // 직무 프로필 변경
  function onJobProfileChange() {
    if (!isCustomMode) {
      currentWeights = { ...DEFAULT_WEIGHTS[selectedJobProfile as keyof typeof DEFAULT_WEIGHTS] };
    }
  }

  // 고급 설정 토글
  function toggleAdvancedSettings() {
    showAdvancedSettings = !showAdvancedSettings;
  }

  // 프리셋 모드로 전환
  function switchToPresetMode() {
    isCustomMode = false;
    currentWeights = { ...DEFAULT_WEIGHTS[selectedJobProfile as keyof typeof DEFAULT_WEIGHTS] };
  }

  // 신규 프리셋 모드로 전환
  function switchToCustomMode() {
    isCustomMode = true;
    if (!newPresetName) {
      newPresetName = '새로운 프리셋';
    }
  }

  // 가중치 업데이트 (신규 프리셋 모드에서 슬라이더 변경 시)
  function updateWeight(key: string, value: number) {
    currentWeights[key] = value;
  }

  // 신규 프리셋 저장
  function saveNewPreset() {
    if (!newPresetName.trim()) {
      alert('프리셋명을 입력해주세요.');
      return;
    }
    
    const presetData = {
      name: newPresetName.trim(),
      weights: { ...currentWeights },
      createdAt: new Date().toISOString()
    };
    
    // 로컬 저장소에 저장 (실제로는 API 호출)
    const savedPresets = JSON.parse(localStorage.getItem('customPresets') || '[]');
    savedPresets.push(presetData);
    localStorage.setItem('customPresets', JSON.stringify(savedPresets));
    
    alert(`"${newPresetName}" 프리셋이 저장되었습니다.`);
  }

  // 폼 초기화
  function resetForm() {
    formData = {
      title: '',
      organization: '',
      department: '',
      location: '',
      employmentType: '정규직',
      experience: '무관',
      education: '무관',
      salary: '',
      deadline: '',
      description: '',
      requirements: '',
      benefits: '',
      contactEmail: '',
      contactPhone: ''
    };
    selectedJobProfile = 'common';
    currentWeights = { ...DEFAULT_WEIGHTS.common };
    showAdvancedSettings = false;
    isCustomMode = false;
    newPresetName = '';
    errors = {};
  }
</script>

<svelte:head>
  <title>채용공고 등록 - PublicJob Match</title>
</svelte:head>

<div class="min-h-screen bg-gray-50/50 dark:bg-black">
  <!-- 헤더 -->
  <header class="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">채용공고 등록</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">새로운 채용공고를 등록하고 관리하세요</p>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-8">
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-8">
      <!-- 기본 정보 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">📝</span>
          기본 정보
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 채용공고 제목 -->
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              채용공고 제목 <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              bind:value={formData.title}
              placeholder="예) 2024년 서울시청 정보보안 담당 공개채용"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.title}
            />
            {#if errors.title}
              <p class="mt-1 text-sm text-red-600">{errors.title}</p>
            {/if}
          </div>

          <!-- 기관명 -->
          <div>
            <label for="organization" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              기관명 <span class="text-red-500">*</span>
            </label>
            <input
              id="organization"
              type="text"
              bind:value={formData.organization}
              placeholder="예) 서울특별시청"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.organization}
            />
            {#if errors.organization}
              <p class="mt-1 text-sm text-red-600">{errors.organization}</p>
            {/if}
          </div>

          <!-- 부서명 -->
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              부서명 <span class="text-red-500">*</span>
            </label>
            <input
              id="department"
              type="text"
              bind:value={formData.department}
              placeholder="예) 정보보안담당관실"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.department}
            />
            {#if errors.department}
              <p class="mt-1 text-sm text-red-600">{errors.department}</p>
            {/if}
          </div>

          <!-- 근무지역 -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              근무지역 <span class="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              bind:value={formData.location}
              placeholder="예) 서울시 중구"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.location}
            />
            {#if errors.location}
              <p class="mt-1 text-sm text-red-600">{errors.location}</p>
            {/if}
          </div>

          <!-- 고용형태 -->
          <div>
            <label for="employmentType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              고용형태
            </label>
            <select
              id="employmentType"
              bind:value={formData.employmentType}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
            >
              <option value="정규직">정규직</option>
              <option value="계약직">계약직</option>
              <option value="임시직">임시직</option>
              <option value="인턴">인턴</option>
            </select>
          </div>
        </div>
      </section>

      <!-- 직무 적합성 프로파일 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">🎯</span>
          직무 적합성 프로파일
        </h2>
        
        <div class="space-y-6">
          <!-- 직무 프로파일 선택 -->
          <div>
            <label for="jobProfile" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              직무 유형 선택
            </label>
            <select
              id="jobProfile"
              bind:value={selectedJobProfile}
              onchange={onJobProfileChange}
              disabled={isCustomMode}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="common">공통 직무</option>
              <option value="backend">백엔드 개발자</option>
              <option value="data">데이터 분석/ML</option>
              <option value="sales">영업/마케팅</option>
              <option value="pm">프로젝트 매니저</option>
            </select>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {isCustomMode ? '신규 프리셋 모드에서는 직무 유형 선택이 비활성화됩니다.' : '선택한 직무 유형에 따라 AI 매칭에 사용될 가중치가 자동으로 설정됩니다.'}
            </p>
          </div>

          <!-- 가중치 요약과 레이더차트를 나란히 배치 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- 가중치 요약 -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <WeightsSummary weights={currentWeights} />
            </div>
            
            <!-- 레이더차트 -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <RadarChart weights={currentWeights} size={250} compact={true} />
            </div>
          </div>

          <!-- 설명 -->
          <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="text-blue-600 dark:text-blue-400 text-lg">💡</span>
              <div class="text-sm text-blue-800 dark:text-blue-200">
                <p class="font-medium mb-1">직무 적합성 프로파일이란?</p>
                <p>AI가 지원자의 이력서를 분석하여 이 채용공고와의 매칭도를 계산할 때 사용되는 기준입니다. 
                각 능력치별 가중치에 따라 더 정확한 매칭 결과를 제공합니다.</p>
              </div>
            </div>
          </div>

          <!-- 고급 설정 토글 버튼 -->
          <div class="flex justify-center">
            <Button 
              variant="outline" 
              onclick={toggleAdvancedSettings}
              class="flex items-center gap-2"
            >
              <span class="text-lg">⚙️</span>
              고급 설정에서 세부 조정하기
              <svg 
                class="w-5 h-5 transition-transform duration-200 {showAdvancedSettings ? 'rotate-180' : ''}" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>

          <!-- 고급 설정 패널 (확장 가능) -->
          {#if showAdvancedSettings}
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-300">
              <!-- 모드 선택 -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">설정 모드</h3>
                <div class="flex gap-4">
                  <Button 
                    variant={!isCustomMode ? 'primary' : 'outline'}
                    onclick={switchToPresetMode}
                    size="sm"
                  >
                    프리셋 사용
                  </Button>
                  <Button 
                    variant={isCustomMode ? 'primary' : 'outline'}
                    onclick={switchToCustomMode}
                    size="sm"
                  >
                    신규 프리셋
                  </Button>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {isCustomMode ? '새로운 프리셋을 만들어 저장할 수 있습니다.' : '미리 정의된 직무 프로파일을 사용합니다.'}
                </p>
              </div>

              <!-- 신규 프리셋 설정 -->
              {#if isCustomMode}
                <div class="space-y-6">
                  <!-- 프리셋명 입력 -->
                  <div>
                    <label for="presetName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      프리셋명
                    </label>
                    <input
                      id="presetName"
                      type="text"
                      bind:value={newPresetName}
                      placeholder="예) 백엔드 개발자 - 시니어"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition-all duration-200 placeholder:text-gray-500"
                    />
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      이 프리셋은 향후 다른 채용공고에서도 재사용할 수 있습니다.
                    </p>
                  </div>
                  
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">가중치 조정</h4>
                  
                  <!-- 그룹별 가중치 조정 (2x2 그리드) -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {#each ['A', 'B', 'C', 'D'] as group}
                    {@const STATS = [
                      // A. Big Five
                      {key:'conscientiousness', name:'성실성', group:'A', category: '성격(빅파이브)'},
                      {key:'openness', name:'개방성', group:'A', category: '성격(빅파이브)'},
                      {key:'extraversion', name:'외향성', group:'A', category: '성격(빅파이브)'},
                      {key:'agreeableness', name:'우호성', group:'A', category: '성격(빅파이브)'},
                      {key:'emotional_stability', name:'정서안정성', group:'A', category: '성격(빅파이브)'},
                      // B. Competency
                      {key:'technical_mastery', name:'기술전문성', group:'B', category: '직무역량'},
                      {key:'cognitive_problem_solving', name:'인지문제해결', group:'B', category: '직무역량'},
                      {key:'interpersonal_influence', name:'대인·영향력', group:'B', category: '직무역량'},
                      {key:'self_management', name:'자기관리', group:'B', category: '직무역량'},
                      {key:'adaptability', name:'적응력', group:'B', category: '직무역량'},
                      // C. Learning Agility
                      {key:'learning_speed', name:'학습속도', group:'C', category: '학습민첩성'},
                      {key:'people_agility', name:'대인민첩성', group:'C', category: '학습민첩성'},
                      {key:'result_agility', name:'성과민첩성', group:'C', category: '학습민첩성'},
                      // D. EQ
                      {key:'self_awareness', name:'자기인식', group:'D', category: 'EQ(감성지능)'},
                      {key:'self_regulation', name:'자기조절', group:'D', category: 'EQ(감성지능)'},
                      {key:'empathy_social', name:'공감·사회기술', group:'D', category: 'EQ(감성지능)'},
                    ]}
                    {@const groupStats = STATS.filter(s => s.group === group)}
                    {@const groupName = groupStats[0]?.category || ''}
                    {@const groupColor = {
                      'A': 'blue',
                      'B': 'green', 
                      'C': 'purple',
                      'D': 'orange'
                    }[group]}
                    
                    <div class="border border-gray-200 dark:border-gray-600 rounded-xl p-4 h-fit">
                      <!-- 그룹 헤더 -->
                      <div class="flex items-center gap-3 mb-4">
                        <div class="w-3 h-3 bg-{groupColor}-500 rounded-full"></div>
                        <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                          {groupName}
                        </h5>
                      </div>
                      
                      <!-- 능력치 슬라이더들 -->
                      <div class="space-y-2">
                        {#each groupStats as stat}
                          <div class="flex items-center gap-3 py-1">
                            <span class="text-xs text-gray-700 dark:text-gray-300 min-w-[80px] leading-tight">
                              {stat.name}
                            </span>
                            <div class="flex items-center gap-2 flex-1">
                              <input
                                type="range"
                                min="0"
                                max="5"
                                step="1"
                                value={currentWeights[stat.key] || 0}
                                oninput={(e) => updateWeight(stat.key, parseInt(e.target.value))}
                                class="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-{groupColor}"
                              />
                              <div class="w-6 text-center text-xs font-semibold text-gray-900 dark:text-white">
                                {currentWeights[stat.key] || 0}
                              </div>
                            </div>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                  </div>
                  
                  <!-- 프리셋 저장 버튼 -->
                  <div class="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Button 
                      variant="primary" 
                      onclick={saveNewPreset}
                      size="sm"
                      class="flex items-center gap-2"
                    >
                      <span class="text-sm">💾</span>
                      프리셋 저장
                    </Button>
                  </div>
                </div>
              {:else}
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>프리셋 모드에서는 위의 직무 유형 선택으로 가중치가 자동 설정됩니다.</p>
                  <p class="text-sm mt-2">세부 조정이 필요하면 "신규 프리셋"으로 전환하세요.</p>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </section>

      <!-- 채용 조건 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">📋</span>
          채용 조건
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 경력 -->
          <div>
            <label for="experience" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              경력 요구사항
            </label>
            <select
              id="experience"
              bind:value={formData.experience}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
            >
              <option value="무관">무관</option>
              <option value="신입">신입</option>
              <option value="1년 이상">1년 이상</option>
              <option value="3년 이상">3년 이상</option>
              <option value="5년 이상">5년 이상</option>
              <option value="10년 이상">10년 이상</option>
            </select>
          </div>

          <!-- 학력 -->
          <div>
            <label for="education" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              학력 요구사항
            </label>
            <select
              id="education"
              bind:value={formData.education}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
            >
              <option value="무관">무관</option>
              <option value="고등학교 졸업">고등학교 졸업</option>
              <option value="대학교 졸업">대학교 졸업</option>
              <option value="석사 이상">석사 이상</option>
            </select>
          </div>

          <!-- 마감일 -->
          <div>
            <label for="deadline" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              마감일 <span class="text-red-500">*</span>
            </label>
            <input
              id="deadline"
              type="date"
              bind:value={formData.deadline}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
              class:border-red-500={errors.deadline}
            />
            {#if errors.deadline}
              <p class="mt-1 text-sm text-red-600">{errors.deadline}</p>
            {/if}
          </div>
        </div>

        <!-- 급여 -->
        <div class="mt-6">
          <label for="salary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            급여 정보
          </label>
          <input
            id="salary"
            type="text"
            bind:value={formData.salary}
            placeholder="예) 공무원 보수규정에 따름, 연봉 4000만원 ~ 5000만원"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
      </section>

      <!-- 직무 상세 정보 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">💼</span>
          직무 상세 정보
        </h2>
        
        <div class="space-y-6">
          <!-- 직무 내용 -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              직무 내용 <span class="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              bind:value={formData.description}
              rows="6"
              placeholder="담당업무를 구체적으로 입력해주세요..."
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500 resize-none"
              class:border-red-500={errors.description}
            ></textarea>
            {#if errors.description}
              <p class="mt-1 text-sm text-red-600">{errors.description}</p>
            {/if}
          </div>

          <!-- 자격 요건 -->
          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              자격 요건 및 우대사항
            </label>
            <textarea
              id="requirements"
              bind:value={formData.requirements}
              rows="4"
              placeholder="필수 자격증, 보유 기술, 우대사항 등을 입력해주세요..."
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500 resize-none"
            ></textarea>
          </div>

          <!-- 복리후생 -->
          <div>
            <label for="benefits" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              복리후생 및 기타사항
            </label>
            <textarea
              id="benefits"
              bind:value={formData.benefits}
              rows="4"
              placeholder="복리후생, 교육지원, 근무환경 등을 입력해주세요..."
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500 resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- 담당자 정보 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">📞</span>
          담당자 정보
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 담당자 이메일 -->
          <div>
            <label for="contactEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              담당자 이메일 <span class="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              bind:value={formData.contactEmail}
              placeholder="contact@organization.go.kr"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.contactEmail}
            />
            {#if errors.contactEmail}
              <p class="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
            {/if}
          </div>

          <!-- 담당자 전화번호 -->
          <div>
            <label for="contactPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              담당자 전화번호
            </label>
            <input
              id="contactPhone"
              type="tel"
              bind:value={formData.contactPhone}
              placeholder="02-123-4567"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
        </div>
      </section>

      <!-- 제출 버튼 -->
      <div class="flex justify-center gap-4 pt-8">
        <Button
          variant="outline"
          type="button"
          onclick={resetForm}
          size="lg"
          class="min-w-32"
        >
          초기화
        </Button>
        
        <Button
          variant="primary"
          type="submit"
          {loading}
          size="lg"
          class="min-w-32"
        >
          {loading ? '등록 중...' : '공고 등록'}
        </Button>
      </div>
    </form>
  </main>
</div>

<style>
  /* 커스텀 스크롤바 */
  textarea {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  
  textarea::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
  
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
  }

  /* 가중치 슬라이더 스타일 */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    transition: all 0.2s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  input[type="range"]::-moz-range-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
    border: none;
  }

  input[type="range"]::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }

  /* 그룹별 슬라이더 색상 */
  .slider-blue::-webkit-slider-thumb {
    background: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }

  .slider-green::-webkit-slider-thumb {
    background: #10b981;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  .slider-purple::-webkit-slider-thumb {
    background: #8b5cf6;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  }

  .slider-orange::-webkit-slider-thumb {
    background: #f59e0b;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  }

  .slider-blue::-moz-range-thumb {
    background: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }

  .slider-green::-moz-range-thumb {
    background: #10b981;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  .slider-purple::-moz-range-thumb {
    background: #8b5cf6;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  }

  .slider-orange::-moz-range-thumb {
    background: #f59e0b;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  }

  /* 다크모드 스타일 */
  @media (prefers-color-scheme: dark) {
    input[type="range"]::-webkit-slider-track {
      background: #374151;
    }

    input[type="range"]::-moz-range-track {
      background: #374151;
    }
  }
</style>