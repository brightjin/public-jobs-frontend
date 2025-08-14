<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/stores';
  import Button from './Button.svelte';
  import { env } from '$env/dynamic/public';
  
  const navigation = [
    { name: '홈', href: '/', icon: '🏠' },
    { name: '채용공고', href: '/jobs', icon: '📄' },
    { name: '이력서', href: '/resume/upload', icon: '📝' },
    { name: 'AI 매칭', href: '/match', icon: '💡' },
    { name: '챗봇', href: '/chat', icon: '🤖' },
    { name: '신규등록', href: '/admin/jobs/new', icon: '✏️' }
  ];
  
  let mobileMenuOpen = $state(false);
</script>

<header class="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 sticky top-0 z-50 transition-all duration-300">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- 로고 - Apple 스타일 -->
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <span class="text-white font-bold text-lg">P</span>
          </div>
          <span class="text-xl font-semibold text-black dark:text-white tracking-tight">
            {env.PUBLIC_SITE_NAME}
          </span>
        </a>
      </div>
      
      <!-- 데스크톱 네비게이션 - Apple 스타일 -->
      <div class="hidden md:flex items-center space-x-1">
        {#each navigation as item}
          <a 
            href={item.href}
            class="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                   {$page.url.pathname === item.href 
                     ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
                     : 'text-gray-600 hover:text-black hover:bg-gray-100/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10'}"
          >
            <span class="text-base">{item.icon}</span>
            <span class="tracking-tight">{item.name}</span>
          </a>
        {/each}
      </div>
      
      <!-- 사용자 메뉴 -->
      <div class="hidden md:flex items-center space-x-4">
        {#if $user}
          <div class="flex items-center space-x-2">
            <span class="text-sm text-apple-text-secondary">안녕하세요, {$user.name}님</span>
            <Button variant="outline" size="sm">로그아웃</Button>
          </div>
        {:else}
          <div class="flex items-center space-x-2">
            <Button variant="secondary" size="sm">로그인</Button>
            <Button variant="primary" size="sm">회원가입</Button>
          </div>
        {/if}
      </div>
      
      <!-- 모바일 메뉴 버튼 -->
      <div class="md:hidden">
        <button
          type="button"
          class="p-2 rounded-lg text-apple-text-secondary hover:text-apple-text hover:bg-gray-100 dark:hover:bg-gray-800"
          onclick={() => mobileMenuOpen = !mobileMenuOpen}
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 모바일 메뉴 -->
    {#if mobileMenuOpen}
      <div class="md:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-4">
        <div class="space-y-2">
          {#each navigation as item}
            <a
              href={item.href}
              class="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors
                     {$page.url.pathname === item.href 
                       ? 'bg-apple-blue text-white' 
                       : 'text-apple-text hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'}"
              onclick={() => mobileMenuOpen = false}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          {/each}
        </div>
        
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {#if $user}
            <div class="space-y-2">
              <p class="px-3 text-sm text-apple-text-secondary">안녕하세요, {$user.name}님</p>
              <Button variant="outline" size="sm" class="w-full">로그아웃</Button>
            </div>
          {:else}
            <div class="space-y-2">
              <Button variant="secondary" size="sm" class="w-full">로그인</Button>
              <Button variant="primary" size="sm" class="w-full">회원가입</Button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </nav>
</header>