import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import { auth } from '../main'

const guard = (to, from, next) => {
  try {
    if (auth.currentUser?.uid) {
      next();
    }
    else {
      next('/');
    }
  } catch (error) {
    next('/');
  }
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/Authentication.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: guard
  },
  {
    path: '/polls/:id',
    name: 'Poll',
    component: () => import('../views/Poll.vue'),
    beforeEnter: guard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
