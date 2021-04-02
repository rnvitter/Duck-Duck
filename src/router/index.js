import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import { auth } from '@/firebase'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Authentication.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/polls/:id',
    name: 'Poll',
    component: () => import('../views/Poll.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import('../views/Friends.vue'),
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.auth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
