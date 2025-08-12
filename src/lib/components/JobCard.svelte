<script lang="ts">
  import type { Job } from '$lib/stores';
  import Button from './Button.svelte';
  
  interface Props {
    job: Job;
    showMatchScore?: boolean;
  }
  
  let { job, showMatchScore = false }: Props = $props();
  
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '마감';
    if (diffDays === 0) return '오늘 마감';
    if (diffDays === 1) return '내일 마감';
    return `${diffDays}일 남음`;
  };
  
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };
</script>

<article class="card-apple p-6 group cursor-pointer">
  <div class="flex justify-between items-start mb-4">
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-black dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
        {job.title}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-1">{job.organization}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
    </div>
    
    {#if showMatchScore && job.matchScore}
      <div class="ml-4 text-right">
        <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getMatchScoreColor(job.matchScore)}">
          매칭도 {job.matchScore}%
        </div>
      </div>
    {/if}
  </div>
  
  <div class="mb-4">
    <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">주요 요구사항:</p>
    <div class="flex flex-wrap gap-2">
      {#each job.requirements.slice(0, 3) as requirement}
        <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-black dark:text-white">
          {requirement}
        </span>
      {/each}
      {#if job.requirements.length > 3}
        <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-500 dark:text-gray-400">
          +{job.requirements.length - 3}개 더
        </span>
      {/if}
    </div>
  </div>
  
  <div class="flex justify-between items-center">
    <div class="text-sm">
      <span class="text-gray-600 dark:text-gray-300">급여:</span>
      <span class="font-medium text-black dark:text-white ml-1">{job.salary}</span>
    </div>
    
    <div class="flex items-center space-x-3">
      <span class="text-sm {formatDeadline(job.deadline).includes('마감') ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}">
        {formatDeadline(job.deadline)}
      </span>
      <Button variant="primary" size="sm" onclick={() => window.location.href = `/jobs/${job.id}`}>
        상세보기
      </Button>
    </div>
  </div>
</article>