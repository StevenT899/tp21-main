// src/auth.js
import { ref } from 'vue';
export const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');