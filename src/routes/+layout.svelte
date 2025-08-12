<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { darkMode } from '$lib/stores';
  
  let { children } = $props();
  
  onMount(() => {
    // 시스템 다크모드 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkMode.set(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      darkMode.set(e.matches);
    };
    
    mediaQuery.addListener(handleChange);
    
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  });
</script>

<div class="min-h-screen bg-white dark:bg-black transition-colors duration-200">
  {@render children?.()}
</div>
