<template>

    
    <div class="max-w-5xl mx-auto py-8 px-4">
        <button
      @click="goBack"
      class="mb-6 inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 focus:outline-none"
    >
      <span class="text-lg font-medium">&lt; Back</span>
    </button>
      <!-- 搜索结果头 -->
      <h2 class="text-2xl font-bold mb-2">
        Search results for '{{ searchTerm || "" }}'
      </h2>
      <p class="text-gray-600 mb-4">
        Displaying {{ resultStart }}–{{ resultEnd }} of {{ totalResults }} results
      </p>
      <hr class="mb-6" />
  
      <!-- 结果列表 -->
      <ul>
        <li
          v-for="item in results"
          :key="item.id"
          class="mb-8"
        >
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
            class="text-xl text-blue-600 font-semibold hover:underline"
          >
            {{ item.title }}
          </a>
          <p class="mt-1 text-gray-700">{{ item.description }}</p>
          
        </li>
      </ul>
  
      <!-- 分页 -->
      <div class="flex justify-center items-center mt-8 space-x-2">
        <!-- 上一页 -->
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="flex items-center px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
  
        <!-- 中间 5 个页码 -->
        <button
          v-for="n in pagesToShow"
          :key="n"
          @click="goPage(n)"
          :class="[
            'px-3 py-1 border rounded',
            n === page ? 'border-2 border-blue-600 text-blue-600' : 'hover:bg-gray-100'
          ]"
        >
          {{ n }}
        </button>
  
        <!-- 下一页 -->
        <button
          @click="nextPage"
          :disabled="page === totalPages"
          class="flex items-center px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  
    <!-- Back to Top 按钮 -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      aria-label="Back to top"
    >
      Back to Top
    </button>

  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // 搜索关键词
  const searchTerm = ref('education')

  
  // 分页与结果
  const page = ref(1)
  const perPage = 8
  const results = ref([])
  const totalResults = ref(0)
  
  // 计算总页数
  const totalPages = computed(() => Math.ceil(totalResults.value / perPage))
  
  // 生成长度为 5 的页码窗口
  const pagesToShow = computed(() => {
    const total = totalPages.value
    const current = page.value
    const windowSize = 5
    let start = Math.max(1, current - Math.floor(windowSize / 2))
    let end = start + windowSize - 1
    if (end > total) {
      end = total
      start = Math.max(1, end - windowSize + 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })
  
  // 当前页起始/结束序号
  const resultStart = computed(() => (page.value - 1) * perPage + 1)
  const resultEnd = computed(() =>
    Math.min(page.value * perPage, totalResults.value)
  )
  
  // Back to Top 控制
  const showBackToTop = ref(false)
  
  // 格式化日期
  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', {
      day:    'numeric',
      month:  'short',
      year:   'numeric'
    })
  }
  
  // 模拟加载数据
  async function fetchResults() {
    // TODO: 换成真实 API 调用
    totalResults.value = 50
    results.value = Array.from({ length: perPage }, (_, i) => ({
      id:          (page.value - 1) * perPage + i + 1,
      title:       'Education – information for parents',
      url:         'www.vic.gov.au/education-information-parents',
      description: "Practical information for Victorian parents and carers to support their child's learning needs",
      updatedAt:   '2024-12-02'
    }))
  }
  
  // 搜索触发
  function onSearch() {
    page.value = 1
    fetchResults()
  }
  
  // 翻页函数
  function prevPage() {
    if (page.value > 1) {
      page.value--
      fetchResults()
    }
  }
  function nextPage() {
    if (page.value < totalPages.value) {
      page.value++
      fetchResults()
    }
  }
  function goPage(n) {
    if (n !== page.value) {
      page.value = n
      fetchResults()
    }
  }
  
  // 监听滚动，控制 Back to Top 显示
  function handleScroll() {
    showBackToTop.value = window.scrollY > 300
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  onMounted(() => {
    fetchResults()
    window.addEventListener('scroll', handleScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>

  </style>
  