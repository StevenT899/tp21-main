<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <!-- Page Title -->
      <h1 class="text-4xl font-bold text-center text-blue-600 mb-10">
        Tailwind CSS 测试页面
      </h1>
      
      <!-- Sub-title -->
      <p class="text-center text-lg mb-10">
        这是一个简单的页面，测试 Tailwind CSS 是否正常工作。
      </p>
  
      <!-- Example of Buttons -->
      <div class="flex justify-center gap-6 mb-10">
        <button class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all">
          按钮 1
        </button>
        <button class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all">
          按钮 2
        </button>
        <button class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all">
          按钮 3
        </button>
      </div>
  
      <!-- Example of Cards -->
      <div class="flex justify-center gap-8">
        <div class="w-64 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">卡片 1</h2>
          <p class="text-gray-600">这是一个测试卡片，展示基本的样式。</p>
        </div>
        <div class="w-64 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">卡片 2</h2>
          <p class="text-gray-600">这是第二个卡片，展示更多样式。</p>
        </div>
      </div>
  
      <!-- Example of Responsive Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div class="p-6 bg-blue-100 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold">响应式卡片 1</h3>
          <p>在不同屏幕尺寸下显示不同数量的卡片。</p>
        </div>
        <div class="p-6 bg-blue-100 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold">响应式卡片 2</h3>
          <p>这是第二个响应式卡片。</p>
        </div>
        <div class="p-6 bg-blue-100 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold">响应式卡片 3</h3>
          <p>这是第三个响应式卡片。</p>
        </div>
      </div>
    </div>
  </template>

  