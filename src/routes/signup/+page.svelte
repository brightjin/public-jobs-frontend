<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import { user } from '$lib/stores';
  import { navigationState } from '$lib/stores';
  import { slide } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';
  import { goto } from '$app/navigation';


  const dispatch = createEventDispatcher<{
    close: void;
    success: { user: any };
    handleSwitchToLogin: void; // 새로운 이벤트 타입 추가
  }>();
  
  let email = $state('');
  let password = $state('');
  let name = $state('');
  let loading = $state(false);
  let error = $state('');

  async function handleSubmit() {
    loading = true;
    error = '';

    try {
      // 실제 구현시에는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 Mock 데이터
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user' as const
      };
      
      user.set(newUser);
      dispatch('success', { user: newUser });
      dispatch('close');
      
    } catch (err) {
      error = '회원가입에 실패했습니다. 다시 시도해주세요.';
    } finally {
      loading = false;
    }
  }

  function handleSwitchToLogin() {

    navigationState.set({
      showLoginModal: true,
      email: email
    });
    goto('/');
  }

</script>

<div 
  transition:slide={{ duration: 300, easing: quartOut }} 
  class="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
>
  <div class="max-w-md mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-2xl font-semibold text-apple-text dark:text-white">
        회원가입
      </h3>
      <button
        type="button"
        class="rounded-lg p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        on:click={() => window.location.href='/'}
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
        <label for="name" class="block text-sm font-medium text-apple-text dark:text-white">
          이름
        </label>
        <input
          type="text"
          name="name"
          id="name"
          bind:value={name}
          required
          class="input-apple mt-1 w-full"
          placeholder="홍길동"
        />
      </div>

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
          minlength="8"
          class="input-apple mt-1 w-full"
          placeholder="8자리 이상 입력해주세요"
        />
      </div>

      <div class="mt-6 space-y-4">
        <Button type="submit" variant="primary" loading={loading} class="w-full">
          회원가입
        </Button>
        <div class="text-center text-sm text-apple-text-secondary">
          이미 계정이 있으신가요?
        </div>
        <Button type="button" variant="outline" class="w-full" onclick={handleSwitchToLogin}>
          로그인하기
        </Button>
      </div>
    </form>
  </div>
</div>