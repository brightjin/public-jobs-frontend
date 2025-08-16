<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Props {
    weights: Record<string, number>;
    size?: number; // 차트 크기
    compact?: boolean; // 컴팩트 모드
  }
  
  let { weights, size = 300, compact = false }: Props = $props();
  
  let canvas: HTMLCanvasElement;
  
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
  
  // 그룹별 색상
  const groupColors = {
    'A': '#3b82f6', // blue-500
    'B': '#10b981', // green-500
    'C': '#8b5cf6', // purple-500
    'D': '#f59e0b'  // orange-500
  };
  
  // 레이더 차트 그리기
  function drawRadarChart() {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) / 2 - (compact ? 25 : 40);
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

    // 레이블 (컴팩트 모드에서는 작게)
    const fontSize = compact ? 10 : 12;
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui`;
    ctx.textAlign = 'center';
    
    STATS.forEach((stat, i) => {
      const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
      const labelRadius = radius + (compact ? 15 : 25);
      const x = cx + Math.cos(angle) * labelRadius;
      const y = cy + Math.sin(angle) * labelRadius;
      
      // 그룹별 색상 설정
      ctx.fillStyle = groupColors[stat.group as keyof typeof groupColors] || '#374151';
      ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui`;
      
      // 컴팩트 모드에서는 줄임말 사용
      const labelText = compact ? stat.name.slice(0, 2) : stat.name;
      ctx.fillText(labelText, x, y + 4);
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

    // 데이터 포인트에도 그룹별 색상 적용
    STATS.forEach((stat, i) => {
      const weight = weights[stat.key] || 0;
      const ratio = weight / 5;
      const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius * ratio;
      const y = cy + Math.sin(angle) * radius * ratio;
      
      ctx.beginPath();
      ctx.arc(x, y, compact ? 2 : 4, 0, Math.PI * 2);
      ctx.fillStyle = groupColors[stat.group as keyof typeof groupColors] || '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = compact ? 1 : 2;
      ctx.stroke();
    });
  }
  
  // weights가 변경되면 차트 다시 그리기
  $effect(() => {
    if (weights) {
      drawRadarChart();
    }
  });
  
  onMount(() => {
    drawRadarChart();
  });
</script>

<div class="flex flex-col items-center space-y-3">
  {#if !compact}
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
      <span class="text-xl">📊</span>
      적합성 프로파일
    </h3>
  {/if}
  
  <canvas 
    bind:this={canvas}
    width={size} 
    height={size}
    class="border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800"
  ></canvas>
  
  {#if compact}
    <!-- 컴팩트 모드에서는 간단한 범례 -->
    <div class="flex flex-wrap gap-2 text-xs">
      {#each ['A', 'B', 'C', 'D'] as group}
        {@const groupStats = STATS.filter(s => s.group === group)}
        {@const groupName = groupStats[0]?.category || ''}
        {@const groupColor = {
          'A': 'blue',
          'B': 'green', 
          'C': 'purple',
          'D': 'orange'
        }[group]}
        
        <div class="flex items-center gap-1">
          <div class="w-2 h-2 bg-{groupColor}-500 rounded-full"></div>
          <span class="text-gray-600 dark:text-gray-400">{groupName.split('(')[0]}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>