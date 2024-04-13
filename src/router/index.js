import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import dangNhap from '../views/dang-nhap.vue'
import { checkTokenExpiration } from '@/constants/auth'
const routes = [
  {
    path: '/',
    redirect: '/trang-chu'
  },
  //authorize
  {
    path: '/dang-nhap',
    name: '/dang-nhap',
    component: dangNhap
  },
  //đăng ký
  {
    path: '/dang-ky',
    name: '/dang-ky',
    component: () => import('../views/dang-ky.vue')
  },
  {
    path: '/user',
    name: '/user',
    meta: {
      breadcrumb: 'User' 
    },
    children:[
      {
        path: '/ho-so',
        name: '/ho-so',
        component: () => import('@/views/user/ho-so/index.vue'),
        meta: {
          breadcrumb: 'Hồ sơ' 
        }
      }
    ]
  },
  //thư viện
  {
    path: '/thu-vien',
    name: '/thu-vien',
    meta: {
      breadcrumb: 'Thư viện' 
    },
    children:[
      {
        path: '/hoc-phan',
        name: '/hoc-phan',
        component: () => import('@/views/thu-vien/hoc-phan/index.vue'),
        meta: {
          breadcrumb: 'Học phần' 
        },
        props: true,
        
      },
      {
        path: '/chi-tiet-hoc-phan',
        name: '/chi-tiet-hoc-phan',
        component: () => import('@/components/thu-vien/hoc-phan/chi-tiet-hoc-phan/chi-tiet.vue'),
        meta: {
          breadcrumb: 'Chi tiết học phần' 
        },
        props: true,
      },
      {
        path: '/match-game',
        name: '/match-game',
        component: () => import('@/components/thu-vien/hoc-phan/games/match-game/match-game.vue'),
        meta: {
          breadcrumb: 'Ghép thẻ' 
        },
        props: true,
        
      },
      {
        path: '/sua-hoc-phan',
        name: '/sua-hoc-phan',
        component: () => import('@/components/thu-vien/hoc-phan/sua-hoc-phan/chi-tiet.vue'),
        meta: {
          breadcrumb: 'Sửa học phần' 
        },
        props: true,
      },
      {
        path: '/tao-hoc-phan',
        name: '/tao-hoc-phan',
        component: () => import('@/components/thu-vien/hoc-phan/tao-hoc-phan/index.vue'),
        meta: {
          breadcrumb: 'Tạo học phần' 
        },
        props: true
      },
      {
        path: '/thu-muc',
        name: '/thu-muc',
        component: () => import('@/views/thu-vien/thu-muc/index.vue'),
        meta: {
          breadcrumb: 'Học phần' 
        },
        props: true
      }
    ]
  },
  //trang chủ
  {
    path: '/trang-chu',
    name: '/trang-chu',
    component: () => import('../views/trang-chu/index.vue'),
    meta: {
      breadcrumb: 'Trang chủ' // Định nghĩa breadcrumb cho route này
    }
  },


  //ADMIN
  {
    path: '/admin',
    name: '/admin',
    component: () => import('@/views_admin/trang-chu/index.vue'),
  },
  {
    path: '/quan-ly-nguoi-dung',
    name: '/quan-ly-nguoi-dung',
    meta: {
      breadcrumb: 'Quản lý người dùng' 
    },
    component: () => import('@/views_admin/quan-ly-nguoi-dung/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard để kiểm tra xem người dùng đã đăng nhập chưa
router.beforeEach((to, from, next) => {
  // Kiểm tra nếu đường dẫn không phải là trang đăng nhập và người dùng chưa đăng nhập
  if (to.name !== '/dang-nhap' && to.name !== '/dang-ky' && !checkTokenExpiration()) {
    // Redirect người dùng đến trang đăng nhập
    next({ name: '/dang-nhap' });
  } else {
    // Nếu người dùng đã đăng nhập hoặc đang truy cập trang đăng nhập, cho phép đi tiếp
    next();
  }
});

export default router
