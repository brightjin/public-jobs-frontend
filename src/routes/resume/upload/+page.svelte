<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ResumeUploader from '$lib/components/ResumeUploader.svelte';
  import Button from '$lib/components/Button.svelte';
  import { resume, type Resume } from '$lib/stores';
  import { goto } from '$app/navigation';
  import { env } from '$env/dynamic/public';
  
  let parsedData: any = $state(null);
  let showForm = $state(false);
  let formData: Resume = $state({
    id: '',
    name: '',
    email: '',
    phone: '',
    experience: [],
    skills: [],
    education: []
  });
  
  function handleParseComplete(event: CustomEvent<{ data: any }>) {
    parsedData = event.detail.data;
    
    // 파싱된 데이터를 폼 데이터에 적용
    formData = {
      id: Date.now().toString(),
      name: parsedData.name || '',
      email: parsedData.email || '',
      phone: parsedData.phone || '',
      experience: parsedData.experience || [],
      skills: parsedData.skills || [],
      education: parsedData.education || []
    };
    
    showForm = true;
  }
  
  function addExperience() {
    formData.experience = [...formData.experience, ''];
  }
  
  function removeExperience(index: number) {
    formData.experience = formData.experience.filter((_, i) => i !== index);
  }
  
  function addSkill() {
    formData.skills = [...formData.skills, ''];
  }
  
  function removeSkill(index: number) {
    formData.skills = formData.skills.filter((_, i) => i !== index);
  }
  
  function addEducation() {
    formData.education = [...formData.education, ''];
  }
  
  function removeEducation(index: number) {
    formData.education = formData.education.filter((_, i) => i !== index);
  }
  
  function saveResume() {
    // 빈 항목 제거
    formData.experience = formData.experience.filter(item => item.trim());
    formData.skills = formData.skills.filter(item => item.trim());
    formData.education = formData.education.filter(item => item.trim());
    
    resume.set(formData);
    
    // 성공 메시지와 함께 매칭 페이지로 이동
    alert('이력서가 성공적으로 저장되었습니다! AI 매칭 추천을 확인해보세요.');
    goto('/match');
  }
</script>

<svelte:head>
  <title>이력서 업로드 - {env.PUBLIC_SITE_NAME}</title>
  <meta name="description" content="이력서를 업로드하면 AI가 자동으로 분석하여 입력 필드를 채워드립니다.">
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 페이지 헤더 -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-apple-text dark:text-white mb-4">
        📝 이력서 업로드
      </h1>
      <p class="text-xl text-apple-text-secondary max-w-2xl mx-auto">
        이력서를 업로드하면 AI가 자동으로 분석하여 맞춤형 채용공고를 추천해드립니다
      </p>
    </div>

    {#if !showForm}
      <!-- AI 파싱 안내 섹션 -->
      <div class="mb-12">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-semibold text-apple-text dark:text-white mb-4">
              🤖 AI 이력서 자동 분석
            </h2>
            <p class="text-apple-text-secondary">
              최신 AI 기술로 이력서를 정확하게 분석하고 자동으로 입력 필드를 채워드립니다
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl">📄</span>
              </div>
              <h3 class="font-medium text-apple-text dark:text-white mb-2">파일 업로드</h3>
              <p class="text-sm text-apple-text-secondary">PDF, DOCX 파일 지원</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl">⚡</span>
              </div>
              <h3 class="font-medium text-apple-text dark:text-white mb-2">자동 분석</h3>
              <p class="text-sm text-apple-text-secondary">30초 내 완료</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span class="text-2xl">✨</span>
              </div>
              <h3 class="font-medium text-apple-text dark:text-white mb-2">스마트 매칭</h3>
              <p class="text-sm text-apple-text-secondary">90%+ 정확도</p>
            </div>
          </div>
        </div>
        
        <!-- 파일 업로드 컴포넌트 -->
        <ResumeUploader on:parse={handleParseComplete} />
      </div>
      
    {:else}
      <!-- 파싱된 데이터 확인 및 편집 폼 -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-semibold text-apple-text dark:text-white">
                이력서 정보 확인
              </h2>
              <p class="text-apple-text-secondary mt-1">
                AI가 분석한 내용을 확인하고 필요시 수정해주세요
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ✅ 분석 완료
              </span>
            </div>
          </div>
        </div>
        
        <form onsubmit={(e) => { e.preventDefault(); saveResume(); }} class="p-6 space-y-8">
          <!-- 기본 정보 -->
          <div>
            <h3 class="text-lg font-semibold text-apple-text dark:text-white mb-4">
              👤 기본 정보
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-apple-text dark:text-white mb-2">
                  이름 *
                </label>
                <input
                  id="name"
                  type="text"
                  bind:value={formData.name}
                  required
                  class="input-apple"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-apple-text dark:text-white mb-2">
                  이메일 *
                </label>
                <input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  required
                  class="input-apple"
                  placeholder="hong@example.com"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-apple-text dark:text-white mb-2">
                  전화번호 *
                </label>
                <input
                  id="phone"
                  type="tel"
                  bind:value={formData.phone}
                  required
                  class="input-apple"
                  placeholder="010-1234-5678"
                />
              </div>
            </div>
          </div>
          
          <!-- 경력 사항 -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-apple-text dark:text-white">
                💼 경력 사항
              </h3>
              <Button variant="outline" size="sm" type="button" onclick={addExperience}>
                + 경력 추가
              </Button>
            </div>
            <div class="space-y-3">
              {#each formData.experience as experience, index}
                <div class="flex items-center space-x-3">
                  <input
                    type="text"
                    bind:value={experience}
                    class="input-apple flex-1"
                    placeholder="예: 소프트웨어 개발 3년 (2021-2024)"
                  />
                  <button
                    type="button"
                    onclick={() => removeExperience(index)}
                    class="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- 기술 스택 -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-apple-text dark:text-white">
                🛠️ 기술 스택
              </h3>
              <Button variant="outline" size="sm" type="button" onclick={addSkill}>
                + 기술 추가
              </Button>
            </div>
            <div class="space-y-3">
              {#each formData.skills as skill, index}
                <div class="flex items-center space-x-3">
                  <input
                    type="text"
                    bind:value={skill}
                    class="input-apple flex-1"
                    placeholder="예: JavaScript/TypeScript"
                  />
                  <button
                    type="button"
                    onclick={() => removeSkill(index)}
                    class="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- 학력 및 자격증 -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-apple-text dark:text-white">
                🎓 학력 및 자격증
              </h3>
              <Button variant="outline" size="sm" type="button" onclick={addEducation}>
                + 항목 추가
              </Button>
            </div>
            <div class="space-y-3">
              {#each formData.education as education, index}
                <div class="flex items-center space-x-3">
                  <input
                    type="text"
                    bind:value={education}
                    class="input-apple flex-1"
                    placeholder="예: 컴퓨터공학과 학사 (2020년 졸업)"
                  />
                  <button
                    type="button"
                    onclick={() => removeEducation(index)}
                    class="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
          
          <!-- 저장 버튼 -->
          <div class="flex justify-center space-x-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <Button variant="outline" type="button" onclick={() => showForm = false}>
              이전으로
            </Button>
            <Button variant="primary" size="lg" type="submit">
              💾 이력서 저장하고 AI 매칭 받기
            </Button>
          </div>
        </form>
      </div>
    {/if}
  </div>
</main>

<Footer />