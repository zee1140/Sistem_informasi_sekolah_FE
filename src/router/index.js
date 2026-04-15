import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Forgot from '../views/Forgot.vue'
import Profile from '../views/Profile.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
  path: '/forgot',
  name: 'Forgot',
  component: Forgot
  },  

   {
    path: '/profile', // Path untuk halaman profile baru kamu
    name: 'Profile',
    component: Profile
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router