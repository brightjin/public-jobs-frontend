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
    { name: '챗봇', href: '/chat', icon: '🤖' }
  ];
  
  let mobileMenuOpen = $state(false);
</script>

<header class="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 transition-all duration-200">
  <nav class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center h-16">
      <!-- 로고 - Toss 스타일 -->
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 gradient-toss-blue rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <span class="text-white font-black text-lg">🏛️</span>
          </div>
          <span class="text-xl font-bold text-gray-900 tracking-tight">
            {env.PUBLIC_SITE_NAME}
          </span>
        </a>
      </div>
      
      <!-- 데스크톱 네비게이션 - Toss 스타일 -->
      <div class="hidden md:flex items-center space-x-2">
        {#each navigation as item}
          <a 
            href={item.href}
            class="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                   {$page.url.pathname === item.href 
                     ? 'bg-blue-600 text-white shadow-md' 
                     : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}"
          >
            <span class="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </a>
        {/each}
      </div>
      
      <!-- 사용자 메뉴 - Toss 스타일 -->
      <div class="hidden md:flex items-center space-x-3">
        {#if $user}
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-600 font-medium">안녕하세요, {$user.name}님 👋</span>
            <Button variant="outline" size="sm">로그아웃</Button>
          </div>
        {:else}
          <div class="flex items-center space-x-2">
            <Button variant="secondary" size="sm">로그인</Button>
            <Button variant="primary" size="sm">회원가입</Button>
          </div>
        {/if}
      </div>
      
      <!-- 모바일 메뉴 버튼 - Toss 스타일 -->
      <div class="md:hidden">
        <button
          type="button"
          class="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          onclick={() => mobileMenuOpen = !mobileMenuOpen}
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 모바일 메뉴 - Toss 스타일 -->
    {#if mobileMenuOpen}
      <div class="md:hidden border-t border-gray-200 pt-4 pb-4 bg-gray-50/50">
        <div class="space-y-1">
          {#each navigation as item}
            <a
              href={item.href}
              class="flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-base font-bold transition-all duration-200
                     {$page.url.pathname === item.href 
                       ? 'bg-blue-600 text-white shadow-md' 
                       : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}"
              onclick={() => mobileMenuOpen = false}
            >
              <span class="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          {/each}
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-200 px-2">
          {#if $user}
            <div class="space-y-3">
              <p class="px-2 text-sm text-gray-600 font-medium">안녕하세요, {$user.name}님 👋</p>
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