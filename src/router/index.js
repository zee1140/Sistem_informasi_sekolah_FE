import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Forgot from '../views/Forgot.vue'
import Profile from '../views/Profile.vue'
import Siswa from '../views/Siswa.vue'
import Kelas from '../views/Kelas.vue'
import Guru from '../views/Guru.vue'
import Jadwal from '../views/Jadwal.vue'

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
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
   
  {
   path: '/siswa',
   name: 'Siswa',
   component: Siswa
 },
  {
   path: '/kelas',
   name: 'Kelas',
   component: Kelas
 },
 {
  path: '/Guru',
  name: '/Guru',
  component: Guru
 },
 {
  path: '/Jadwal',
  name: '/Jadwal',
  component: Jadwal
 }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router