import Vue from 'vue'
import VueRouter from 'vue-router'
//import createWebHistory from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '@/views/LogInView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
