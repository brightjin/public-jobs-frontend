<script lang="ts">
  import { onMount } from 'svelte';
  
  // RPG 능력치 정의 (rpg_score.html 기반)
  const STATS = [
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
  ];

  // 직무별 기본 가중치 (0~5 범위로 정규화)
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
    },
    design: {
      conscientiousness:3, openness:4, extraversion:3, agreeableness:3, emotional_stability:3,
      technical_mastery:3, cognitive_problem_solving:3, interpersonal_influence:3, self_management:3, adaptability:4,
      learning_speed:3, people_agility:3, result_agility:3,
      self_awareness:3, self_regulation:2, empathy_social:3,
    }
  };

  // 상태 관리
  let jobTitle = '';
  let jobDescription = '';
  let selectedRole = 'common';
  let customWeights = { ...DEFAULT_WEIGHTS.common };
  let canvas: HTMLCanvasElement;
  let isPreset = true;

  // 가중치를 절대값으로 표시 (0-5 범위)
  function getAbsoluteWeights(weights: Record<string, number>) {
    return weights;
  }

  // 직무 프로파일 변경 시
  function onRoleChange() {
    if (isPreset) {
      customWeights = { ...DEFAULT_WEIGHTS[selectedRole as keyof typeof DEFAULT_WEIGHTS] };
      updateVisualization();
    }
  }

  // 커스텀 가중치로 전환
  function switchToCustom() {
    isPreset = false;
  }

  // 프리셋으로 전환
  function switchToPreset() {
    isPreset = true;
    onRoleChange();
  }

  // 시각화 업데이트
  function updateVisualization() {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawRadarChart(ctx, customWeights);
  }

  // 레이더 차트 그리기
  function drawRadarChart(ctx: CanvasRenderingContext2D, weights: Record<string, number>) {
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) / 2 - 40;
    const N = STATS.length;

    // 배경 그리드
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // 동심원
    for (let ring = 1; ring <= 4; ring++) {
      const r = radius * (ring / 4);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 축선
    STATS.forEach((stat, i) => {
      const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // 레이블
    ctx.fillStyle = '#374151';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui';
    ctx.textAlign = 'center';
    
    STATS.forEach((stat, i) => {
      const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
      const labelRadius = radius + 25;
      const x = cx + Math.cos(angle) * labelRadius;
      const y = cy + Math.sin(angle) * labelRadius;
      
      ctx.fillText(stat.name, x, y + 4);
    });

    // 데이터 영역
    ctx.beginPath();
    STATS.forEach((stat, i) => {
      const weight = weights[stat.key] || 0;
      const ratio = weight / 5; // 0-5 범위로 정규화
      const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius * ratio;
      const y = cy + Math.sin(angle) * radius * ratio;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // 저장
  function saveRequirements() {
    const data = {
      jobTitle,
      jobDescription,
      roleProfile: selectedRole,
      isPreset,
      weights: customWeights,
      timestamp: new Date().toISOString()
    };
    
    // 로컬 저장소에 저장 (실제로는 API 호출)
    const key = `job-requirements:${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(data));
    
    alert('직무 적합 정보가 저장되었습니다.');
  }

  // 초기화
  function resetForm() {
    jobTitle = '';
    jobDescription = '';
    selectedRole = 'common';
    isPreset = true;
    onRoleChange();
  }

  onMount(() => {
    updateVisualization();
  });
</script>

<svelte:head>
  <title>직무적합정보 입력 - PublicJob Match</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
  <!-- 헤더 -->
  <header class="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-display text-3xl text-gray-900 dark:text-gray-100 mb-2">직무적합정보 입력</h1>
      <p class="text-body text-gray-600 dark:text-gray-400">지원자의 능력치와 비교할 직무별 요구사항을 설정하세요</p>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 좌측: 기본 정보 및 설정 -->
      <section class="card-apple p-8 space-y-6">
        <!-- 직무 기본 정보 -->
        <div class="space-y-4">
          <h2 class="text-headline text-xl text-gray-900 dark:text-gray-100">기본 정보</h2>
          
          <div>
            <label for="jobTitle" class="block text-fine text-gray-700 dark:text-gray-300 mb-2">
              직무명
            </label>
            <input 
              id="jobTitle"
              bind:value={jobTitle}
              placeholder="예: 정보보안 담당자"
              class="input-apple"
            />
          </div>

          <div>
            <label for="jobDescription" class="block text-fine text-gray-700 dark:text-gray-300 mb-2">
              직무 설명
            </label>
            <textarea
              id="jobDescription"
              bind:value={jobDescription}
              placeholder="직무의 주요 업무와 요구사항을 간단히 설명해주세요"
              rows="4"
              class="input-apple resize-none"
            ></textarea>
          </div>
        </div>

        <!-- 직무 프로파일 선택 -->
        <div class="space-y-4">
          <h3 class="text-headline text-lg text-gray-900 dark:text-gray-100">적합성 프로파일</h3>
          
          <div class="flex gap-4 mb-4">
            <button 
              class="btn-{isPreset ? 'apple' : 'secondary'}"
              onclick={switchToPreset}
            >
              프리셋 사용
            </button>
            <button 
              class="btn-{!isPreset ? 'apple' : 'secondary'}"
              onclick={switchToCustom}
            >
              커스텀 설정
            </button>
          </div>

          {#if isPreset}
            <select 
              bind:value={selectedRole}
              onchange={onRoleChange}
              class="input-apple"
            >
              <option value="common">공통</option>
              <option value="backend">백엔드 개발</option>
              <option value="data">데이터/ML</option>
              <option value="sales">영업</option>
              <option value="pm">PM/PO</option>
              <option value="design">디자이너</option>
            </select>
          {/if}
        </div>

        <!-- 가중치 조정 -->
        {#if !isPreset}
          <div class="space-y-4">
            <h3 class="text-headline text-lg text-gray-900 dark:text-gray-100">가중치 조정</h3>
            
            {#each ['A', 'B', 'C', 'D'] as group}
              {@const groupStats = STATS.filter(s => s.group === group)}
              {@const groupName = groupStats[0]?.category || ''}
              
              <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                <h4 class="text-fine font-medium text-gray-800 dark:text-gray-200 mb-3">{groupName}</h4>
                
                <div class="space-y-3">
                  {#each groupStats as stat}
                    <div class="flex items-center justify-between">
                      <label class="text-fine text-gray-700 dark:text-gray-300">
                        {stat.name}
                      </label>
                      <div class="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="1"
                          bind:value={customWeights[stat.key]}
                          onchange={updateVisualization}
                          class="w-32"
                        />
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="1"
                          bind:value={customWeights[stat.key]}
                          onchange={updateVisualization}
                          class="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        {/if}

        <!-- 액션 버튼 -->
        <div class="flex gap-4 pt-4">
          <button class="btn-apple flex-1" onclick={saveRequirements}>
            저장하기
          </button>
          <button class="btn-secondary" onclick={resetForm}>
            초기화
          </button>
        </div>
      </section>

      <!-- 우측: 시각화 및 미리보기 -->
      <section class="card-apple p-8">
        <div class="space-y-6">
          <h2 class="text-headline text-xl text-gray-900 dark:text-gray-100">적합성 프로파일</h2>
          
          <!-- 레이더 차트 -->
          <div class="flex justify-center">
            <canvas 
              bind:this={canvas}
              width="400" 
              height="400"
              class="border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900"
            ></canvas>
          </div>

          <!-- 가중치 요약 -->
          <div class="space-y-4">
            <h3 class="text-headline text-lg text-gray-900 dark:text-gray-100">가중치 요약</h3>
            
            <div class="grid grid-cols-2 gap-4">
              {#each STATS as stat}
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span class="text-fine text-gray-700 dark:text-gray-300">{stat.name}</span>
                  <span class="text-fine font-semibold text-gray-900 dark:text-gray-100">
                    {customWeights[stat.key] || 0}/5
                  </span>
                </div>
              {/each}
            </div>
          </div>

          <!-- 설명 -->
          <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
            <p class="text-fine text-blue-800 dark:text-blue-200">
              💡 각 능력치는 0~5점으로 평가됩니다. 높은 점수일수록 해당 능력이 직무에 더 중요함을 의미합니다.
              수치는 절대값으로 표시되어 원의 최대 범위를 넘지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</div>

<style>
  /* Apple 스타일 슬라이더 */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 2px;
    background: #e5e7eb;
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    input[type="range"] {
      background: #374151;
    }
  }
</style>