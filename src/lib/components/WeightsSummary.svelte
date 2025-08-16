<script lang="ts">
  // 가중치 요약 컴포넌트
  interface Props {
    weights: Record<string, number>;
    compact?: boolean; // 컴팩트 모드 (작은 화면용)
  }
  
  let { weights, compact = false }: Props = $props();
  
  // RPG 능력치 정의
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
  
  // 그룹별 색상 매핑
  const groupColors = {
    'A': 'blue',
    'B': 'green', 
    'C': 'purple',
    'D': 'orange'
  };
</script>

<!-- 가중치 요약 -->
<div class="space-y-4">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
    <span class="text-xl">⚖️</span>
    가중치 요약
  </h3>
  
  <!-- 그룹별 요약 -->
  <div class="space-y-3">
    {#each ['A', 'B', 'C', 'D'] as group}
      {@const groupStats = STATS.filter(s => s.group === group)}
      {@const groupName = groupStats[0]?.category || ''}
      {@const groupColor = groupColors[group]}
      {@const groupAvg = (groupStats.reduce((sum, stat) => sum + (weights[stat.key] || 0), 0) / groupStats.length).toFixed(1)}
      
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 bg-{groupColor}-500 rounded-full"></div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{groupName}</span>
        </div>
        
        {#if compact}
          <span class="text-sm font-semibold text-gray-900 dark:text-white">
            {groupAvg}/5
          </span>
        {:else}
          <div class="flex items-center gap-3">
            <!-- 프로그레스 바 -->
            <div class="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                class="h-full bg-{groupColor}-500 transition-all duration-300" 
                style="width: {(parseFloat(groupAvg) / 5) * 100}%"
              ></div>
            </div>
            <span class="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px]">
              {groupAvg}/5
            </span>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  
  {#if !compact}
    <!-- 설명 -->
    <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-3">
      <p class="text-xs text-blue-700 dark:text-blue-300">
        💡 각 능력치는 0~5점으로 평가됩니다. 높은 점수일수록 해당 능력이 직무에 더 중요함을 의미합니다.
      </p>
    </div>
  {/if}
</div>