<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Button from '$lib/components/Button.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import { mockJobsAPI } from '$lib/stores';
  import type { Job } from '$lib/stores';

  // 상태 관리
  let messages = $state<Array<{
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>>([]);
  
  let currentMessage = $state('');
  let isTyping = $state(false);
  let chatContainer: HTMLElement;
  let inputElement: HTMLInputElement;
  
  // 채용공고 컨텍스트
  let jobContext: Job | null = $state(null);
  let isJobInquiry = $state(false);
  
  // URL 파라미터에서 채용공고 정보 추출
  onMount(async () => {
    const params = $page.url.searchParams;
    const jobId = params.get('jobId');
    const context = params.get('context');
    
    if (jobId && context === 'job_inquiry') {
      isJobInquiry = true;
      try {
        jobContext = await mockJobsAPI.getJob(jobId);
        if (jobContext) {
          // 초기 AI 메시지 추가
          addAIMessage(
            `안녕하세요! 😄\n\n**${jobContext.organization}**의 **${jobContext.title}** 채용공고에 대해 문의해 주셨군요.\n\n이 채용공고에 대해 궁금한 점이 있으시매요? 다음과 같은 내용을 도와드릴 수 있습니다:\n\n• 직무 내용 상세 설명\n• 자격 요건 및 우대사항\n• 체용 과정 및 전형 일정\n• 급여 및 복리후생\n• 근무 환경 및 조직 문화\n• 자기소개서 작성 도움\n\n무엇이 궁금하신가요? 🤔`
          );
        }
      } catch (error) {
        console.error('채용공고 정보 로드 실패:', error);
        addAIMessage('채용공고 정보를 불러오는 중 오류가 발생했습니다. 그래도 일반적인 질문에는 답변드릴 수 있습니다!');
      }
    } else {
      // 일반 챗봇 모드
      addAIMessage(
        '안녕하세요! 저는 PublicJob Match AI 어시스턴트입니다. 🤖\n\n공공기관 채용에 대한 모든 궁금한 점을 도와드릴게요!\n\n무엇이 궁금하신가요?'
      );
    }
    
    // 입력창에 포커스
    if (inputElement) {
      inputElement.focus();
    }
  });

  // AI 메시지 추가
  function addAIMessage(content: string) {
    messages.push({
      id: Date.now().toString(),
      type: 'ai',
      content,
      timestamp: new Date()
    });
    scrollToBottom();
  }

  // 사용자 메시지 추가
  function addUserMessage(content: string) {
    messages.push({
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    });
    scrollToBottom();
  }

  // 메시지 전송
  async function sendMessage() {
    if (!currentMessage.trim() || isTyping) return;
    
    const userMessage = currentMessage.trim();
    currentMessage = '';
    
    // 사용자 메시지 추가
    addUserMessage(userMessage);
    
    // AI 응답 시뮬레이션
    isTyping = true;
    
    try {
      // 실제 구현에서는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiResponse = generateAIResponse(userMessage);
      addAIMessage(aiResponse);
    } catch (error) {
      addAIMessage('죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      isTyping = false;
      inputElement.focus();
    }
  }

  // AI 응답 생성 (Mock)
  function generateAIResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // 채용공고 컨텍스트가 있는 경우
    if (jobContext && isJobInquiry) {
      if (message.includes('직무') || message.includes('업무') || message.includes('일')) {
        return `${jobContext.title} 직무에 대해 설명드릴게요!\n\n**주요 업무:**\n${jobContext.description}\n\n더 구체적인 업무 내용이 궁금하시다면 언제든 문의해 주세요!`;
      }
      
      if (message.includes('자격') || message.includes('요건') || message.includes('조건')) {
        return `${jobContext.title} 자격 요건을 알려드릴게요!\n\n**필수 자격:**\n${jobContext.requirements.map(req => `• ${req}`).join('\n')}\n\n**경력 요구사항:** ${jobContext.experience || '무관'}\n**학력 요구사항:** ${jobContext.education || '무관'}\n\n자격 요건에 대해 더 자세한 설명이 필요하시다면 말씬해 주세요!`;
      }
      
      if (message.includes('급여') || message.includes('연봉') || message.includes('보수')) {
        return `${jobContext.title} 급여 정보를 알려드릴게요!\n\n**급여:** ${jobContext.salary}\n\n${jobContext.benefits && jobContext.benefits.length > 0 ? `**복리후생:**\n${jobContext.benefits.map(benefit => `• ${benefit}`).join('\n')}` : ''}\n\n급여에 대한 추가 질문이 있으시면 언제든 문의해 주세요!`;
      }
      
      if (message.includes('지원') || message.includes('전형') || message.includes('체용') || message.includes('면접')) {
        return `${jobContext.organization} 지원 과정에 대해 안내드릴게요!\n\n**마감일:** ${jobContext.deadline}\n**모집인원:** ${jobContext.recruitCount || '미정'}명\n\n일반적인 공공기관 체용 과정은 다음과 같습니다:\n1차: 서류전형\n2차: 필기시험(직무능력평가)\n3차: 면접시험\n\n구체적인 전형 일정은 해당 기관에 문의하시기 바랍니다.`;
      }
      
      if (message.includes('자기소개서') || message.includes('자소서')) {
        return `${jobContext.title} 자기소개서 작성 팁을 드릴게요!\n\n**핵심 포인트:**\n• 맡고자 하는 직무에 대한 이해도 어피얼\n• 관련 자격증이나 경험 구체적으로 명시\n• 해당 기관에 지원하는 동기와 의지 표현\n• 공공서비스에 대한 소명의식 강조\n\n자기소개서 작성에 대한 더 자세한 도움이 필요하시다면 말씬해 주세요!`;
      }
    }
    
    // 일반적인 응답
    const responses = [
      '좋은 질문이네요! 공공기관 채용에 대해 더 구체적으로 알려드릴게요.',
      '그 부분에 대해 설명드릴게요. 공공기관 채용은 일반 기업과 다른 특징이 있습니다.',
      '이해하기 쉬도록 자세히 설명드릴게요. 추가로 궁금한 점이 있으시면 언제든 문의해 주세요!',
      '좋은 질문입니다! 공공기관 채용 과정에 대해 안내드릴게요.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // 스크롤 하단으로 이동
  function scrollToBottom() {
    setTimeout(() => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  // 엔터 키 처리
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  // 다시 새로고침
  function resetChat() {
    messages = [];
    if (jobContext && isJobInquiry) {
      addAIMessage(
        `안녕하세요! 😄\n\n**${jobContext.organization}**의 **${jobContext.title}** 채용공고에 대해 문의해 주셨군요.\n\n무엇이 궁금하신가요? 🤔`
      );
    } else {
      addAIMessage('안녕하세요! 저는 PublicJob Match AI 어시스턴트입니다. 🤖\n\n무엇이 궁금하신가요?');
    }
  }

  // 채용공고로 돌아가기
  function goBackToJob() {
    if (jobContext) {
      window.location.href = `/jobs/${jobContext.id}`;
    }
  }
</script>

<svelte:head>
  <title>AI 상담 - {env.PUBLIC_SITE_NAME}</title>
  <meta name="description" content="공공기관 채용에 대한 AI 상담 서비스">
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
  <!-- 상단 헤더 -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4">
        {#if isJobInquiry && jobContext}
          <button 
            onclick={goBackToJob}
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            채용공고로
          </button>
          <div class="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        {/if}
        
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white text-lg">🤖</span>
          </div>
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              {#if isJobInquiry && jobContext}
                {jobContext.title} AI 상담
              {:else}
                PublicJob AI 어시스턴트
              {/if}
            </h1>
            {#if isJobInquiry && jobContext}
              <p class="text-sm text-gray-600 dark:text-gray-400">{jobContext.organization}</p>
            {:else}
              <p class="text-sm text-gray-600 dark:text-gray-400">온라인</p>
            {/if}
          </div>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" onclick={resetChat}>
          🔄 다시 시작
        </Button>
      </div>
    </div>
  </div>

  <!-- 챗 메시지 영역 -->
  <div 
    bind:this={chatContainer}
    class="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full"
  >
    <div class="space-y-6">
      {#each messages as message (message.id)}
        <div class="flex gap-4 {message.type === 'user' ? 'justify-end' : 'justify-start'}">
          {#if message.type === 'ai'}
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white text-sm">🤖</span>
            </div>
          {/if}
          
          <div class="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl {message.type === 'user' ? 'order-1' : ''}">
            <div class="{
              message.type === 'user' 
                ? 'bg-blue-600 text-white rounded-2xl rounded-br-md' 
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-700'
            } px-4 py-3 shadow-sm">
              <div class="prose prose-sm max-w-none {message.type === 'user' ? 'prose-invert' : 'dark:prose-invert'}">
                {#if message.content.includes('\n')}
                  {#each message.content.split('\n') as line}
                    {#if line.startsWith('**') && line.endsWith('**')}
                      <strong>{line.slice(2, -2)}</strong>
                    {:else if line.startsWith('• ')}
                      <div class="ml-4">{line}</div>
                    {:else}
                      <div>{line}</div>
                    {/if}
                    <br />
                  {/each}
                {:else}
                  {message.content}
                {/if}
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 {
              message.type === 'user' ? 'text-right' : 'text-left'
            }">
              {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          {#if message.type === 'user'}
            <div class="w-8 h-8 bg-gray-600 dark:bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white dark:text-gray-900 text-sm">🙋</span>
            </div>
          {/if}
        </div>
      {/each}
      
      {#if isTyping}
        <div class="flex gap-4 justify-start">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-white text-sm">🤖</span>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- 메시지 입력 영역 -->
  <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-end gap-3">
        <div class="flex-1">
          <textarea
            bind:this={inputElement}
            bind:value={currentMessage}
            onkeydown={handleKeyPress}
            placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
            rows="1"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400
                   resize-none overflow-hidden"
            style="min-height: 52px; max-height: 120px;"
            disabled={isTyping}
          ></textarea>
        </div>
        <Button 
          variant="primary" 
          size="lg" 
          onclick={sendMessage}
          disabled={!currentMessage.trim() || isTyping}
          class="px-6 py-3 h-[52px]"
        >
          {#if isTyping}
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {:else}
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          {/if}
        </Button>
      </div>
      
      {#if isJobInquiry && jobContext}
        <!-- 빠른 질문 버튼들 -->
        <div class="mt-3 flex flex-wrap gap-2">
          <button 
            onclick={() => { currentMessage = '직무 내용에 대해 자세히 알려주세요'; sendMessage(); }}
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            💼 직무 내용
          </button>
          <button 
            onclick={() => { currentMessage = '자격 요건을 알려주세요'; sendMessage(); }}
            class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
          >
            📎 자격 요건
          </button>
          <button 
            onclick={() => { currentMessage = '급여와 복리후생에 대해 알려주세요'; sendMessage(); }}
            class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
          >
            💰 급여 정보
          </button>
          <button 
            onclick={() => { currentMessage = '지원 과정과 전형 일정을 알려주세요'; sendMessage(); }}
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
          >
            📅 지원 과정
          </button>
          <button 
            onclick={() => { currentMessage = '자기소개서 작성 팁을 알려주세요'; sendMessage(); }}
            class="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-sm hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
          >
            ✍️ 자기소개서 팁
          </button>
        </div>
      {/if}
    </div>
  </div>
</main>

<Footer />

<style>
  /* 스크롤바 스타일링 */
  :global(.overflow-y-auto) {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar) {
    width: 6px;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
    background-color: #94a3b8;
  }
  
  /* 입력창 자동 크기 조절 */
  textarea {
    field-sizing: content;
  }
</style>