<template>
    <!-- Navigation Bar -->
    <nav class="bg-blue-600 text-white py-3 px-6 flex items-center justify-between">
        <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" y1="8" x2="12" y2="8"></line>
                <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
            </svg>
            <span class="text-xl font-bold">SchoolMate</span>
        </div>
        <div class="hidden md:flex space-x-6">
          <router-link to="/" class="hover:underline">Home</router-link>
          <router-link to="/compare" class="hover:underline">Compare</router-link>
            <a href="#" class="hover:underline relative group">
                Resource
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline ml-1">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </a>
            <a href="#" class="hover:underline">Support</a>
        </div>
    </nav>
  </template>