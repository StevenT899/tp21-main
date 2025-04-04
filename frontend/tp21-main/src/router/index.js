import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompareView from '../views/CompareView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/compare',
    name: 'Compare',
    component: CompareView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router