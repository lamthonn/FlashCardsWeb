import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import dangNhap from '../views/dang-nhap.vue'

const routes = [
  {
    path: '/dang-nhap',
    name: '/dang-nhap',
    component: dangNhap
  },
  {
    path: '/dang-ky',
    name: '/dang-ky',
    component: () => import('../views/dang-ky.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
