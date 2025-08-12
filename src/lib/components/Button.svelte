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
  
  // Apple 스타일 기본 클래스
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-apple',
    secondary: 'btn-secondary', 
    outline: 'btn-outline'
  };
  
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  };
  
  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

<button 
  class={finalClasses}
  disabled={loading}
  {...rest}
>
  {#if loading}
    <!-- Apple 스타일 로딩 스피너 -->
    <div class="flex items-center">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>처리 중...</span>
    </div>
  {:else}
    {@render children?.()}
  {/if}
</button>