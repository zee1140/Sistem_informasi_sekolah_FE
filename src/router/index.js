import { createRouter, createWebHistory } from 'vue-router'

// VIEWS
import Home from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Forgot from '../views/Forgot.vue'
import Profile from '../views/Profile.vue'
import Siswa from '../views/Siswa.vue'
import Kelas from '../views/Kelas.vue'
import Guru from '../views/Guru.vue'
import Jadwal from '../views/Jadwal.vue'

// ROUTES
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
    path: '/register',
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
    path: '/guru',
    name: 'Guru',
    component: Guru,
    // Tambahkan meta jika nanti butuh title halaman dinamis
    meta: { title: 'Daftar Guru' } 
  },

  {
    path: '/jadwal',
    name: 'Jadwal',
    component: Jadwal
  },

  // fallback (mengarahkan halaman typo ke Login atau Dashboard)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/dashboard' 
  }
]

// ROUTER
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Otomatis scroll ke atas setiap pindah halaman
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router