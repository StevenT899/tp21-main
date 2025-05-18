/**
 * auth.js
 *
 * Description:
 *   Provides a reactive reference to track the user's authentication state across the app.
 *   Initial value is derived from `localStorage` to persist login status across page reloads.
 *
 * Key Features:
 *   - Exports `isLoggedIn` as a global reactive ref
 *   - Automatically reflects the `isLoggedIn` value stored in localStorage
 *   - Intended to be used in layout guards, components, and login/logout flows
 */

// src/auth.js
import { ref } from 'vue';
export const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');