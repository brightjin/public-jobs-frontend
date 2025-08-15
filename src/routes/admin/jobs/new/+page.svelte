<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';
  
  // 폼 상태
  let formData = {
    title: '',
    organization: '',
    department: '',
    location: '',
    employmentType: '정규직',
    experience: '무관',
    education: '무관',
    salary: '',
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    contactPhone: ''
  };

  let loading = false;
  let errors: Record<string, string> = {};

  // 필수 필드 검증
  function validateForm() {
    errors = {};
    
    if (!formData.title.trim()) errors.title = '채용공고 제목을 입력해주세요.';
    if (!formData.organization.trim()) errors.organization = '기관명을 입력해주세요.';
    if (!formData.department.trim()) errors.department = '부서명을 입력해주세요.';
    if (!formData.location.trim()) errors.location = '근무지역을 입력해주세요.';
    if (!formData.deadline) errors.deadline = '마감일을 선택해주세요.';
    if (!formData.description.trim()) errors.description = '직무내용을 입력해주세요.';
    if (!formData.contactEmail.trim()) errors.contactEmail = '담당자 이메일을 입력해주세요.';
    
    return Object.keys(errors).length === 0;
  }

  // 폼 제출
  async function handleSubmit() {
    if (!validateForm()) return;
    
    loading = true;
    
    try {
      // API 호출 (모킹)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 시 목록 페이지로 이동
      alert('채용공고가 등록되었습니다.');
      goto('/admin/jobs');
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      loading = false;
    }
  }

  // 직무적합성 정보 페이지로 이동
  function goToJobRequirements() {
    goto('/admin/job-requirements');
  }

  // 폼 초기화
  function resetForm() {
    formData = {
      title: '',
      organization: '',
      department: '',
      location: '',
      employmentType: '정규직',
      experience: '무관',
      education: '무관',
      salary: '',
      deadline: '',
      description: '',
      requirements: '',
      benefits: '',
      contactEmail: '',
      contactPhone: ''
    };
    errors = {};
  }
</script>

<svelte:head>
  <title>채용공고 등록 - PublicJob Match</title>
</svelte:head>

<div class="min-h-screen bg-gray-50/50 dark:bg-black">
  <!-- 헤더 -->
  <header class="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">채용공고 등록</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">새로운 채용공고를 등록하고 관리하세요</p>
        </div>
        
        <!-- 직무적합성 정보 버튼 -->
        <Button 
          variant="outline" 
          onclick={goToJobRequirements}
          class="flex items-center gap-2"
        >
          <span class="text-lg">🎯</span>
          직무적합성 정보
        </Button>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-8">
    <form on:submit|preventDefault={handleSubmit} class="space-y-8">
      <!-- 기본 정보 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">📝</span>
          기본 정보
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 채용공고 제목 -->
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              채용공고 제목 <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              bind:value={formData.title}
              placeholder="예) 2024년 서울시청 정보보안 담당 공개채용"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.title}
            />
            {#if errors.title}
              <p class="mt-1 text-sm text-red-600">{errors.title}</p>
            {/if}
          </div>

          <!-- 기관명 -->
          <div>
            <label for="organization" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              기관명 <span class="text-red-500">*</span>
            </label>
            <input
              id="organization"
              type="text"
              bind:value={formData.organization}
              placeholder="예) 서울특별시청"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.organization}
            />
            {#if errors.organization}
              <p class="mt-1 text-sm text-red-600">{errors.organization}</p>
            {/if}
          </div>

          <!-- 부서명 -->
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              부서명 <span class="text-red-500">*</span>
            </label>
            <input
              id="department"
              type="text"
              bind:value={formData.department}
              placeholder="예) 정보보안담당관실"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.department}
            />
            {#if errors.department}
              <p class="mt-1 text-sm text-red-600">{errors.department}</p>
            {/if}
          </div>

          <!-- 근무지역 -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              근무지역 <span class="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              bind:value={formData.location}
              placeholder="예) 서울시 중구"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.location}
            />
            {#if errors.location}
              <p class="mt-1 text-sm text-red-600">{errors.location}</p>
            {/if}
          </div>

          <!-- 고용형태 -->
          <div>
            <label for="employmentType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              고용형태
            </label>
            <select
              id="employmentType"
              bind:value={formData.employmentType}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
            >
              <option value="정규직">정규직</option>
              <option value="계약직">계약직</option>
              <option value="임시직">임시직</option>
              <option value="인턴">인턴</option>
            </select>
          </div>
        </div>
      </section>

      <!-- 채용 조건 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">📋</span>
          채용 조건
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 경력 -->
          <div>
            <label for="experience" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              경력 요구사항
            </label>
            <select
              id="experience"
              bind:value={formData.experience}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
            >
              <option value="무관">무관</option>
              <option value="신입">신입</option>
              <option value="1년 이상">1년 이상</option>
              <option value="3년 이상">3년 이상</option>
              <option value="5년 이상">5년 이상</option>
              <option value="10년 이상">10년 이상</option>
            </select>
          </div>

          <!-- 학력 -->
          <div>
            <label for="education" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              학력 요구사항
            </label>
            <select
              id="education"
              bind:value={formData.education}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
            >
              <option value="무관">무관</option>
              <option value="고등학교 졸업">고등학교 졸업</option>
              <option value="대학교 졸업">대학교 졸업</option>
              <option value="석사 이상">석사 이상</option>
            </select>
          </div>

          <!-- 마감일 -->
          <div>
            <label for="deadline" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              마감일 <span class="text-red-500">*</span>
            </label>
            <input
              id="deadline"
              type="date"
              bind:value={formData.deadline}
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200"
              class:border-red-500={errors.deadline}
            />
            {#if errors.deadline}
              <p class="mt-1 text-sm text-red-600">{errors.deadline}</p>
            {/if}
          </div>
        </div>

        <!-- 급여 -->
        <div class="mt-6">
          <label for="salary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            급여 정보
          </label>
          <input
            id="salary"
            type="text"
            bind:value={formData.salary}
            placeholder="예) 공무원 보수규정에 따름, 연봉 4000만원 ~ 5000만원"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
      </section>

      <!-- 직무 상세 정보 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">💼</span>
          직무 상세 정보
        </h2>
        
        <div class="space-y-6">
          <!-- 직무 내용 -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              직무 내용 <span class="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              bind:value={formData.description}
              rows="6"
              placeholder="담당업무를 구체적으로 입력해주세요..."
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500 resize-none"
              class:border-red-500={errors.description}
            ></textarea>
            {#if errors.description}
              <p class="mt-1 text-sm text-red-600">{errors.description}</p>
            {/if}
          </div>

          <!-- 자격 요건 -->
          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              자격 요건 및 우대사항
            </label>
            <textarea
              id="requirements"
              bind:value={formData.requirements}
              rows="4"
              placeholder="필수 자격증, 보유 기술, 우대사항 등을 입력해주세요..."
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500 resize-none"
            ></textarea>
          </div>

          <!-- 복리후생 -->
          <div>
            <label for="benefits" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              복리후생 및 기타사항
            </label>
            <textarea
              id="benefits"
              bind:value={formData.benefits}
              rows="4"
              placeholder="복리후생, 교육지원, 근무환경 등을 입력해주세요..."
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500 resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- 담당자 정보 섹션 -->
      <section class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
          <span class="text-2xl">📞</span>
          담당자 정보
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 담당자 이메일 -->
          <div>
            <label for="contactEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              담당자 이메일 <span class="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              bind:value={formData.contactEmail}
              placeholder="contact@organization.go.kr"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
              class:border-red-500={errors.contactEmail}
            />
            {#if errors.contactEmail}
              <p class="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
            {/if}
          </div>

          <!-- 담당자 전화번호 -->
          <div>
            <label for="contactPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              담당자 전화번호
            </label>
            <input
              id="contactPhone"
              type="tel"
              bind:value={formData.contactPhone}
              placeholder="02-123-4567"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-200 placeholder:text-gray-500"
            />
          </div>
        </div>
      </section>

      <!-- 제출 버튼 -->
      <div class="flex justify-center gap-4 pt-8">
        <Button
          variant="outline"
          type="button"
          onclick={resetForm}
          size="lg"
          class="min-w-32"
        >
          초기화
        </Button>
        
        <Button
          variant="primary"
          type="submit"
          {loading}
          size="lg"
          class="min-w-32"
        >
          {loading ? '등록 중...' : '공고 등록'}
        </Button>
      </div>
    </form>
  </main>
</div>

<style>
  /* 커스텀 스크롤바 */
  textarea {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  
  textarea::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
  
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
  }
</style>