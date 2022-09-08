import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js';
//import createWebHistory from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrantView from '@/views/RegistrantView.vue'
import AdminView from '@/views/AdminView.vue'
import LogInView from '@/views/LogInView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RegisterGuest from '@/views/RegisterGuestView.vue'
import RegisterClientView from '@/views/RegisterClientView.vue'
import OccasionCreate from '@/views/OccasionCreateView.vue'
import OccasionsView from '@/views/OccasionsView.vue'
import GuestsView from '@/views/GuestsView.vue'
import ViewAllCustomers from '@/views/ViewAllCustomers.vue'
import EmailConfirmed from '@/views/EmailConfirmedView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registrantview',
    name: 'RegistrantView',
    component: RegistrantView
  },
  {
    path: '/adminview',
    name: 'AdminView',
    component: AdminView
  },
  {
    path: '/createoccasion',
    name: 'createOccasion',
    component : OccasionCreate
  },
  {
    path: '/occasions',
    name: 'OccasionsView',
    component : OccasionsView
  },
  {
    path: '/occasions/:id/Guests',
    props: true,
    name: 'GuestsView',
    component : GuestsView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/register',
    name: 'register',
    component : RegisterView
  },
  {
    path: '/registerclient',
    name: 'registerclient',
    component : RegisterClientView
  },
  {
    path: '/registerguest',
    name: 'registerGuest',
    component : RegisterGuest
  },
  {
    path: '/customers',
    name: 'viewAllCustomers',
    component : ViewAllCustomers
  },
  {
    path: '/emailconfirmed',
    name: 'emailConfirmed',
    component : EmailConfirmed
  }

  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

router.beforeEach((to, from, next) =>{
  const publicPages = ['/registerguest','/register','/login','/emailconfirmed'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.isLoggedIn;

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next();
});
