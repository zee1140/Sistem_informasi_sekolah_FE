<template>
  <div class="app-wrapper animate-home">
    <!-- Floating Glass Navbar -->
    <nav class="navbar navbar-expand-lg px-4">
      <div class="container-fluid">
        <span class="navbar-brand">JeprutSchool</span>
        <router-link to="/login" class="login-btn">Login</router-link>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <div class="row g-4">
        <!-- Sidebar Glass -->
        <div class="col-md-3">
          <div class="glass-card p-4 h-100">
            <h6 class="mb-3">Menu</h6>
            <ul class="nav flex-column gap-2">
              <li><button class="menu-btn">Dashboard</button></li>
              <li><button class="menu-btn">Data Siswa</button></li>
              <li><button class="menu-btn">Guru</button></li>
              <li><button class="menu-btn">Jadwal</button></li>
            </ul>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9">
          <!-- Hero Section -->
          <div class="glass-card p-5 mb-4 hero">
            <h2>Dashboard Sekolah Modern</h2>
            <p>Kelola sistem sekolah dengan pengalaman premium & elegan.</p>
          </div>

          <!-- Stats -->
          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <div class="glass-card p-4 text-center">
                <h3>1200</h3>
                <p>Siswa</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="glass-card p-4 text-center">
                <h3>75</h3>
                <p>Guru</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="glass-card p-4 text-center">
                <h3>30</h3>
                <p>Kelas</p>
              </div>
            </div>
          </div>

          <!-- Grid Content -->
          <div class="row g-4">
            <div class="col-md-6">
              <div class="glass-card p-4 h-100">
                <h6>Aktivitas</h6>
                <ul>
                  <li>Update data siswa</li>
                  <li>Tambah jadwal</li>
                  <li>Pengumuman lomba</li>
                </ul>
              </div>
            </div>

            <div class="col-md-6">
              <div class="glass-card p-4 h-100">
                <h6>Quick Action</h6>

<button @click="goToSiswa" class="quick-btn mb-2">
  <i class="bi bi-person-plus"></i>
  Tambah Siswa
</button>

<button @click="goToJadwal" class="quick-btn outline">
  <i class="bi bi-calendar-event"></i>
  Kelola Jadwal
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UltraDashboard',
  methods: {
    goToSiswa() {
      this.$router.push('/siswa')
    },
    goToJadwal() {
      this.$router.push('/jadwal')
    }
  }
}
</script>

<style>
/* ===== ULTRA APPLE GOD LEVEL THEME ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  background: linear-gradient(-45deg, #f5f5f7, #e5e5ea, #f5f5f7, #dcdce1);
  background-size: 400% 400%;
  animation: bgMove 15s ease infinite;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, sans-serif;
  letter-spacing: -0.2px;
}

@keyframes bgMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes darkGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.navbar {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  margin: 10px;
}

.navbar-brand {
  font-weight: 600;
  font-size: 20px;
}

.glass-card {
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(30px);
  border-radius: 25px;
  border: 1px solid rgba(255,255,255,0.4);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
}

.glass-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.hero {
  background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(240,240,245,0.5));
}

.nav-link {
  padding: 10px;
  border-radius: 12px;
  color: #333;
  transition: 0.3s;
}

.nav-link:hover {
  background: rgba(0,0,0,0.05);
}

h2, h3, h6 {
  font-weight: 600;
}

p {
  color: #6e6e73;
}

.btn-apple {
  background: #0071e3;
  color: white;
  border-radius: 14px;
  border: none;
  padding: 10px;
}

.btn-apple-outline {
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 10px;
}



/* Animated Menu Button */
.menu-btn {
  width: 100%;
  background: transparent;
  border: none;
  padding: 10px;
  border-radius: 12px;
  text-align: left;
  transition: all 0.3s ease;
  color: #1d1d1f;
  font-weight: 500;
}

.menu-btn:hover {
  background: linear-gradient(135deg, #1c1c1e, #3a3a3c);
  color: white;
  transform: translateX(5px);
}

/* Login Button */
.login-btn {
  display: inline-block;
  text-decoration: none;
  background: linear-gradient(135deg, #1c1c1e, #3a3a3c);
  color: white;
  padding: 8px 18px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
}

/* ===== ULTRA PREMIUM BUTTON ===== */
.quick-btn {
  width: 100%;
  padding: 14px;
  border-radius: 18px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  /* Apple gradient */
  background: linear-gradient(135deg, #1c1c1e, #2c2c2e);
  color: white;

  /* smooth shadow */
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.1);

  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}

/* ICON */
.quick-btn i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

/* HOVER */
.quick-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 15px 35px rgba(0,0,0,0.25),
    inset 0 1px 0 rgba(255,255,255,0.15);
}

/* ICON MOVE */
.quick-btn:hover i {
  transform: translateX(3px);
}

/* CLICK EFFECT */
.quick-btn:active {
  transform: scale(0.97);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* ===== GLOW ANIMATION ===== */
.quick-btn::before {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.25),
    transparent
  );
  top: -10%;
  left: -120%;
  transition: 0.6s;
}

.quick-btn:hover::before {
  left: 120%;
}

/* ===== OUTLINE VERSION ===== */
.quick-btn.outline {
  background: linear-gradient(135deg, #1c1c1e, #2c2c2e);
  color: white;
  border: 1px solid rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.quick-btn.outline:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 15px 35px rgba(0,0,0,0.25),
    inset 0 1px 0 rgba(255,255,255,0.15);
}
/* ===== Animasi Masuk Home ===== */
.animate-home {
  animation: homeFade 0.7s ease;
}

@keyframes homeFade {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  
}
</style>
