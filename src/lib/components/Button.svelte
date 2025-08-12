<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  
  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
  }
  
  let { 
    variant = 'primary',
    size = 'md',
    loading = false,
    class: className = '',
    children,
    ...rest
  }: Props = $props();
  
  // Toss 스타일 기본 클래스
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-toss',
    secondary: 'btn-toss-secondary', 
    outline: 'btn-toss-outline'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[48px]',
    md: 'px-6 py-4 text-base min-h-[56px]',
    lg: 'px-8 py-5 text-lg min-h-[64px]'
  };
  
  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

<button 
  class={finalClasses}
  disabled={loading}
  {...rest}
>
  {#if loading}
    <!-- Toss 스타일 로딩 스피너 -->
    <div class="flex items-center gap-2">
      <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      <span>처리 중...</span>
    </div>
  {:else}
    {@render children?.()}
  {/if}
</button>