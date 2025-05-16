import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('../views/findSchool/CompareView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/journey',
    name: 'Journey',
    component: () => import('../views/JourneyMap/JourneyView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../views/QASupport/SupportView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/searchingSupport',
    name: 'SearchingSupport',
    component: () => import('../views/QASupport/SearchingSupport.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/detail/:id',
    name: 'SchoolDetail',
    component: () => import('../views/findSchool/SchoolDetailView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/QASupport/ArticleDetailView.vue'),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;  