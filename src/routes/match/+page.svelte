<script lang="ts">
  import { darkMode } from '$lib/stores';
  import { goto } from '$app/navigation';
  import type { Question } from '$lib/mock/questions';
  import { questions } from '$lib/mock/questions';
  
  interface Card {
    id: number;
    question: string;
    subject: string;
    selectedValue: number | null;
  }

  let currentSlide: number = 0;
  let isHovered = false;
  let questionsList: Question[] = [];
  let cards: Card[] = [];
  let visibleCardCount: number = 1; // 보여줄 카드 개수 변수

  // Subscribe to the questions store
  questions.subscribe(value => {
    questionsList = value;
    // Convert questions to cards format
    cards = questionsList.map(q => ({
      id: parseInt(q.id),
      question: q.text,
      subject: q.subject,
      selectedValue: null
    }));
  });

  function nextSlide(): void {
    if (currentSlide < cards.length - 1) {
      currentSlide += 1;
    }
  }

  function prevSlide(): void {
    if (currentSlide > 0) {
      currentSlide -= 1;
    }
  }

  function handleRadioChange(value: number): void {
    cards[currentSlide].selectedValue = value;
    setTimeout(() => nextSlide(), 300);
  }

  // 현재 표시될 카드들 계산
  $: visibleCards = (() => {
    if (visibleCardCount === 1) {
      // 1개 카드만 보여주기
      return [cards[currentSlide]].filter(card => card);
    } else {
      // 3개 카드 보여주기 (기존 로직)
      if (currentSlide === 0) {
        return [
          { id: -1, question: "", subject: "", selectedValue: null },
          cards[0],
          cards[1]
        ];
      }
      if (currentSlide >= cards.length - 1) {
        return [
          cards[cards.length - 2],
          cards[cards.length - 1],
          { id: -2, question: "", subject: "", selectedValue: null }
        ];
      }
      return cards.slice(currentSlide - 1, currentSlide + 2);
    }
  })();

  $: allSelected = cards.every(card => card.selectedValue !== null);

  let showResultTable = false;
  let results: { id: number; subject: string; question: string; answer: number | null }[] = [];

  function handleSubmit(): void {
    if (allSelected) {
      results = cards.map(card => ({
        id: card.id,
        subject: card.subject,
        question: card.question,
        answer: card.selectedValue
      }));
      showResultTable = true;
      alert('설문조사가 제출되었습니다!');
    }
  }
</script>

<svelte:head>
  <title>AI 매칭</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex items-center mb-6">
    <button class="btn-secondary mr-4 text-sm px-3 py-1.5" on:click={() => goto('/')}>돌아가기</button>
    <!-- ...기존 네비게이션 버튼 등 있으면 여기에 추가... -->
  </div>

  <div class="flex justify-center items-center mb-4">
    <span class="text-5xl font-bold text-blue-600 dark:text-blue-400">AI 매칭</span>
  </div>

  <div 
    class="relative overflow-hidden"
    role="region"
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
  >
    <div class="flex items-center justify-center gap-4" style="min-height: 260px;">
      <button 
        class="bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 py-2 mr-4 shadow-lg rounded-lg border-2 border-blue-600 font-bold"
        aria-label="이전 카드"
        on:click={prevSlide}
        disabled={currentSlide === 0}
      >&lt;</button>

      <div class="flex justify-center items-center gap-4 w-full">
        {#each visibleCards as card, i (card.id)}
          <article 
            class="card-apple p-6 group cursor-pointer transition-all duration-300
                   {visibleCardCount === 1 ? 'scale-100' : (i === 1 ? 'scale-105 z-10' : 'scale-90 opacity-70')}
                   {card.id < 0 ? 'invisible' : ''}"
          >
            <!-- 질문 영역 (위쪽) -->
            <div class="flex-1">
              {#if card.subject}
                <div class="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {card.subject}
                </div>
              {/if}
              <div class="min-h-[48px] flex items-center">
                <h3 class="text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 transition-colors">
                  {card.question}
                </h3>
              </div>
            </div>
            
            <!-- 라디오버튼 영역 (아래쪽 고정) -->
            <div class="mt-auto">
              <div class="flex justify-center items-center gap-4 mb-4">
                {#each [1, 2, 3, 4, 5] as value}
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      class="form-radio dark:border-gray-600 dark:bg-gray-700"
                      name={`rating-${card.id}`}
                      value={value}
                      checked={card.selectedValue === value}
                      on:change={() => {
                        if (visibleCardCount === 1 || i === 1) handleRadioChange(value);
                      }}
                    />
                    <span class="text-sm dark:text-gray-300">{value}</span>
                  </label>
                {/each}
              </div>

              {#if card.selectedValue}
                <div class="flex justify-end hidden">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30">
                    선택됨: {card.selectedValue}
                  </span>
                </div>
              {/if}
            </div>
          </article>
        {/each}
      </div>

      <button 
        class="bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 py-2 ml-4 shadow-lg rounded-lg border-2 border-blue-600 font-bold"
        aria-label="다음 카드"
        on:click={nextSlide}
        disabled={currentSlide === cards.length - 1}
      >&gt;</button>
    </div>
  </div>

  <div class="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
    {currentSlide + 1} / {cards.length}
  </div>

  {#if allSelected && !showResultTable}
    <div class="text-center mt-6">
      <button 
        class="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700"
        on:click={handleSubmit}
      >
        매칭하기
      </button>
    </div>
  {/if}

  {#if showResultTable}
    <div class="mt-8">
      <h2 class="text-lg font-bold mb-4">설문 결과</h2>
      <table class="min-w-full border text-sm">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border px-2 py-1">번호</th>
            <th class="border px-2 py-1">주제</th>
            <th class="border px-2 py-1">질문</th>
            <th class="border px-2 py-1">선택값</th>
          </tr>
        </thead>
        <tbody>
          {#each results as r}
            <tr>
              <td class="border px-2 py-1">{r.id}</td>
              <td class="border px-2 py-1">{r.subject}</td>
              <td class="border px-2 py-1">{r.question}</td>
              <td class="border px-2 py-1">{r.answer}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style lang="postcss">
  .card-apple {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg
           border border-gray-200 dark:border-gray-700
           hover:shadow-xl transition-all duration-200;
    width: 320px;
    min-height: 360px;
    display: flex;
    flex-direction: column;
  }

  .form-radio {
    @apply h-4 w-4 text-blue-600 border-gray-300 
           focus:ring-blue-500 dark:text-blue-500 
           dark:focus:ring-blue-400;
  }

  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg font-medium
           hover:bg-blue-600 transition-colors duration-200;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium
           hover:bg-gray-300 transition-colors duration-200;
  }

  button:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
</style>