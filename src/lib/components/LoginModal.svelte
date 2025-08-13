<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import { user } from '$lib/stores';
  import { slide } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  const dispatch = createEventDispatcher<{
    close: void;
    success: { user: any };
  }>();
  
  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state('');

  async function handleSubmit() {
    loading = true;
    error = '';

    try {
      // 실제 구현시에는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 Mock 데이터
      const mockUser = {
        id: '1',
        name: '홍길동',
        email: email,
        role: 'user' as const
      };
      
      user.set(mockUser);
      dispatch('success', { user: mockUser });
      dispatch('close');
      
    } catch (err) {
      error = '로그인에 실패했습니다. 다시 시도해주세요.';
    } finally {
      loading = false;
    }
  }
</script>

<div 
  transition:slide={{ duration: 300, easing: quartOut }} 
  class="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
>
  <div class="max-w-md mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-2xl font-semibold text-apple-text dark:text-white">
        로그인
      </h3>
      <button
        type="button"
        class="rounded-lg p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        on:click={() => dispatch('close')}
      >
        <span class="sr-only">닫기</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      {#if error}
        <div class="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-200">
          {error}
        </div>
      {/if}
      
      <div>
        <label for="email" class="block text-sm font-medium text-apple-text dark:text-white">
          이메일
        </label>
        <input
          type="email"
          name="email"
          id="email"
          bind:value={email}
          required
          class="input-apple mt-1 w-full"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-apple-text dark:text-white">
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          id="password"
          bind:value={password}
          required
          class="input-apple mt-1 w-full"
          placeholder="********"
        />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-apple-blue focus:ring-apple-blue"
          />
          <label for="remember-me" class="ml-2 block text-sm text-apple-text-secondary">
            로그인 상태 유지
          </label>
        </div>

        <div class="text-sm">
          <a href="/forgot-password" class="font-medium text-apple-blue hover:text-apple-light">
            비밀번호 찾기
          </a>
        </div>
      </div>

      <div class="mt-6 space-y-4">
        <Button type="submit" variant="primary" loading={loading} class="w-full">
          로그인
        </Button>
        <div class="text-center text-sm text-apple-text-secondary">
          또는
        </div>
        <Button type="button" variant="outline" class="w-full" onclick={() => window.location.href='/signup'}>
          회원가입
        </Button>
      </div>
    </form>
  </div>
</div>