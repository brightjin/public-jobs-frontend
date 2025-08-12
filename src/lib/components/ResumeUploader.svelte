<script lang="ts">
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';
  
  interface Props {
    loading?: boolean;
    supportedFormats?: string[];
  }
  
  let { 
    loading = false,
    supportedFormats = ['PDF', 'DOCX', 'DOC']
  }: Props = $props();
  
  const dispatch = createEventDispatcher<{
    upload: { file: File };
    parse: { data: any };
  }>();
  
  let fileInput: HTMLInputElement;
  let dragActive = $state(false);
  let selectedFile: File | null = $state(null);
  let parseProgress = $state(0);
  let parseStatus = $state<'idle' | 'uploading' | 'parsing' | 'completed' | 'error'>('idle');
  let errorMessage = $state('');
  
  const acceptedTypes = '.pdf,.docx,.doc';
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  
  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    dragActive = true;
  }
  
  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    dragActive = false;
  }
  
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragActive = false;
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  }
  
  function handleFileInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  }
  
  function handleFileSelection(file: File) {
    // 파일 크기 체크
    if (file.size > maxFileSize) {
      errorMessage = '파일 크기는 10MB 이하여야 합니다.';
      parseStatus = 'error';
      return;
    }
    
    // 파일 형식 체크
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !['pdf', 'doc', 'docx'].includes(fileExt)) {
      errorMessage = '지원되지 않는 파일 형식입니다. PDF, DOC, DOCX 파일만 업로드 가능합니다.';
      parseStatus = 'error';
      return;
    }
    
    selectedFile = file;
    parseStatus = 'idle';
    errorMessage = '';
  }
  
  async function uploadAndParse() {
    if (!selectedFile) return;
    
    parseStatus = 'uploading';
    parseProgress = 0;
    
    try {
      // 업로드 진행률 시뮬레이션
      const uploadInterval = setInterval(() => {
        if (parseProgress < 50) {
          parseProgress += 10;
        }
      }, 200);
      
      // 실제 업로드 로직 (현재는 시뮬레이션)
      dispatch('upload', { file: selectedFile });
      
      parseStatus = 'parsing';
      clearInterval(uploadInterval);
      
      // AI 파싱 진행률 시뮬레이션
      const parseInterval = setInterval(() => {
        if (parseProgress < 90) {
          parseProgress += 5;
        }
      }, 300);
      
      // 시뮬레이션된 AI 파싱 결과
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockParsedData = {
        name: '홍길동',
        email: 'hong@example.com',
        phone: '010-1234-5678',
        experience: [
          '소프트웨어 개발 3년 (2021-2024)',
          'React, Node.js 웹 개발',
          '팀 리드 경험 1년'
        ],
        skills: [
          'JavaScript/TypeScript',
          'React/Vue.js',
          'Node.js/Express',
          '데이터베이스 설계',
          'Git/GitHub'
        ],
        education: [
          '컴퓨터공학과 학사 (2020년 졸업)',
          '정보처리기사 자격증 (2020)',
          'TOEIC 850점 (2023)'
        ]
      };
      
      clearInterval(parseInterval);
      parseProgress = 100;
      parseStatus = 'completed';
      
      dispatch('parse', { data: mockParsedData });
      
    } catch (error) {
      parseStatus = 'error';
      errorMessage = '파일 처리 중 오류가 발생했습니다. 다시 시도해주세요.';
    }
  }
  
  function reset() {
    selectedFile = null;
    parseProgress = 0;
    parseStatus = 'idle';
    errorMessage = '';
    if (fileInput) fileInput.value = '';
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  {#if parseStatus === 'idle' || parseStatus === 'error'}
    <!-- 파일 업로드 영역 -->
    <div 
      class="border-2 border-dashed transition-colors duration-200 rounded-2xl p-8 text-center
             {dragActive 
               ? 'border-apple-blue bg-blue-50 dark:bg-blue-900/20' 
               : 'border-gray-300 dark:border-gray-600 hover:border-apple-blue'}"
      role="button"
      tabindex="0"
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
      onclick={() => fileInput.click()}
      onkeydown={(e) => e.key === 'Enter' && fileInput.click()}
    >
      <div class="flex flex-col items-center space-y-4">
        <div class="w-16 h-16 bg-apple-blue rounded-2xl flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-apple-text dark:text-white mb-2">
            이력서 파일을 업로드하세요
          </h3>
          <p class="text-apple-text-secondary mb-4">
            파일을 드래그 앤 드롭하거나 클릭하여 선택하세요
          </p>
          <div class="flex flex-wrap justify-center gap-2 mb-4">
            {#each supportedFormats as format}
              <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-apple-text dark:text-white">
                {format}
              </span>
            {/each}
          </div>
          <p class="text-sm text-apple-text-secondary">
            최대 파일 크기: 10MB
          </p>
        </div>
        
        {#if selectedFile}
          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 w-full max-w-md">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-apple-blue rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-apple-text dark:text-white truncate">
                  {selectedFile.name}
                </p>
                <p class="text-xs text-apple-text-secondary">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onclick={reset}
                class="text-apple-text-secondary hover:text-apple-text"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <input
      bind:this={fileInput}
      type="file"
      accept={acceptedTypes}
      onchange={handleFileInput}
      class="hidden"
      aria-label="이력서 파일 선택"
    />
    
    {#if errorMessage}
      <div class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-red-700 dark:text-red-300 text-sm">{errorMessage}</p>
        </div>
      </div>
    {/if}
    
    {#if selectedFile && parseStatus === 'idle'}
      <div class="mt-6 text-center">
        <Button variant="primary" size="lg" onclick={uploadAndParse}>
          🤖 AI로 이력서 분석하기
        </Button>
      </div>
    {/if}
    
  {:else if parseStatus === 'uploading' || parseStatus === 'parsing'}
    <!-- 업로드 및 파싱 진행 상태 -->
    <div class="text-center py-8">
      <div class="w-20 h-20 bg-apple-blue rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <h3 class="text-xl font-semibold text-apple-text dark:text-white mb-2">
        {parseStatus === 'uploading' ? '📤 파일 업로드 중...' : '🤖 AI가 이력서를 분석하고 있습니다...'}
      </h3>
      
      <p class="text-apple-text-secondary mb-6">
        {parseStatus === 'uploading' 
          ? '파일을 서버에 업로드하고 있습니다.' 
          : '이력서 내용을 읽고 자동으로 입력 필드에 채워드리고 있어요.'}
      </p>
      
      <!-- 진행률 바 -->
      <div class="max-w-md mx-auto">
        <div class="flex justify-between text-sm text-apple-text-secondary mb-2">
          <span>진행률</span>
          <span>{parseProgress}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            class="bg-apple-blue h-2 rounded-full transition-all duration-300 ease-out"
            style="width: {parseProgress}%"
          ></div>
        </div>
      </div>
    </div>
    
  {:else if parseStatus === 'completed'}
    <!-- 완료 상태 -->
    <div class="text-center py-8">
      <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h3 class="text-xl font-semibold text-apple-text dark:text-white mb-2">
        ✅ 이력서 분석 완료!
      </h3>
      
      <p class="text-apple-text-secondary mb-6">
        AI가 이력서를 성공적으로 분석했습니다. 아래에서 내용을 확인하고 수정해보세요.
      </p>
      
      <div class="flex justify-center space-x-3">
        <Button variant="outline" onclick={reset}>
          다른 파일 업로드
        </Button>
        <Button variant="primary">
          이력서 편집하기
        </Button>
      </div>
    </div>
  {/if}
</div>