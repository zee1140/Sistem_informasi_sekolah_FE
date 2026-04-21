<template>
  <div class="app-wrapper animate-home">
    <nav class="navbar navbar-expand-lg px-4">
      <div class="container-fluid">
        <span class="navbar-brand">
          <i class="bi bi-shield-check me-2"></i>JeprutSchool <span class="badge-admin">ADMIN</span>
        </span>
        <router-link to="/profile" class="profile-icon">
          <i class="bi bi-person-circle"></i>
        </router-link>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <div class="row g-4">
        <div class="col-md-3">
          <div class="glass-card p-4 h-100">
            <h6 class="mb-3">Menu</h6>
            <ul class="nav flex-column gap-2">
           <li>
  <router-link to="/siswa" class="menu-btn">Siswa</router-link>
</li>
           <li>
  <router-link to="/kelas" class="menu-btn">Kelas</router-link>
</li>
              <li><button class="menu-btn">Guru</button></li>
              <li><button class="menu-btn">Jadwal</button></li>
            </ul>
          </div>
        </div>

        <div class="col-md-9">
          <div class="admin-hero p-5 mb-4">
            <h2>Welcome back, Administrator</h2>
            <p>Sistem manajemen sekolah terintegrasi. Pantau aktivitas dan kelola data dalam satu dasbor.</p>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <div class="stat-card p-4">
                <div class="stat-icon"><i class="bi bi-mortarboard"></i></div>
                <div class="stat-content">
                  <h3>1200</h3>
                  <p>Total Siswa</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="stat-card p-4">
                <div class="stat-icon icon-guru"><i class="bi bi-person-workspace"></i></div>
                <div class="stat-content">
                  <h3>75</h3>
                  <p>Tenaga Pengajar</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="stat-card p-4">
                <div class="stat-icon icon-kelas"><i class="bi bi-building"></i></div>
                <div class="stat-content">
                  <h3>30</h3>
                  <p>Ruang Kelas</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-md-7">
              <div class="admin-card p-4 h-100">
                <div class="card-title-box">
                  <h6><i class="bi bi-clock-history me-2"></i>Log Aktivitas Terbaru</h6>
                </div>
                <ul class="activity-list">
                  <li><span class="dot"></span> Update data siswa - Kelas 12 IPA 1</li>
                  <li><span class="dot"></span> Penambahan jadwal ujian semester</li>
                  <li><span class="dot"></span> Publikasi pengumuman lomba nasional</li>
                </ul>
              </div>
            </div>

            <div class="col-md-5">
              <div class="admin-card p-4 h-100">
                <div class="card-title-box">
                  <h6><i class="bi bi-lightning-charge me-2"></i>Quick Actions</h6>
                </div>
                <button @click="goToSiswa" class="btn-admin-primary mb-3">
                  <i class="bi bi-person-plus"></i>
                  Pendaftaran Siswa Baru
                </button>

                <button @click="goToJadwal" class="btn-admin-outline">
                  <i class="bi bi-calendar-event"></i>
                  Konfigurasi Jadwal
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
  name: 'ModernAdminDashboard',
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

<style scoped>
/* ===== ADMIN PRO THEME CONFIG ===== */
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4361ee;
  --secondary: #3f3d56;
  --bg-body: #f8f9fc;
  --sidebar-text: #5a5c69;
}

body {
  background-color: #f8f9fc;
  font-family: 'Public Sans', sans-serif;
  color: #2c3e50;
}

/* Navbar Admin */
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.5rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.05);
}

.navbar-brand {
  font-weight: 800;
  color: #4e73df;
  font-size: 1.25rem;
}

.badge-admin {
  font-size: 0.6rem;
  background: #eaecf4;
  color: #5a5c69;
  padding: 2px 8px;
  border-radius: 4px;
  vertical-align: middle;
  margin-left: 5px;
}

/* Sidebar Navigation */
.sidebar-card {
  background: #ffffff;
  border: 1px solid #e3e6f0;
  border-radius: 12px;
  overflow: hidden;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #f8f9fc;
}

.sidebar-header h6 {
  font-size: 0.7rem;
  font-weight: 700;
  color: #b7b9cc;
  margin: 0;
  letter-spacing: 1px;
}

.admin-nav-list {
  padding: 10px;
  list-style: none;
}

.admin-menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  width: 100%;
  border: none;
  background: transparent;
  color: #5a5c69;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.admin-menu-btn:hover {
  background: #f8f9fc;
  color: #4e73df;
  transform: translateX(5px);
}

.router-link-active.admin-menu-btn {
  background: #4e73df;
  color: white;
}

/* Hero Section */
.admin-hero {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(78, 115, 223, 0.15);
}

.admin-hero h2 { font-weight: 700; margin-bottom: 10px; }
.admin-hero p { color: rgba(255,255,255,0.8); font-weight: 300; }

/* Stats Card */
.stat-card {
  background: white;
  border-left: 4px solid #4e73df;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1);
}

.stat-icon {
  font-size: 2rem;
  color: #dddfeb;
}

.stat-content h3 {
  margin: 0;
  font-weight: 700;
  color: #5a5c69;
}

.stat-content p {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #4e73df;
  text-transform: uppercase;
}

/* Admin Card General */
.admin-card {
  background: white;
  border: 1px solid #e3e6f0;
  border-radius: 12px;
}

.card-title-box {
  border-bottom: 1px solid #f8f9fc;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.card-title-box h6 {
  color: #4e73df;
  font-weight: 700;
  margin: 0;
}

/* Activity List */
.activity-list {
  list-style: none;
  padding: 0;
}

.activity-list li {
  padding: 10px 0;
  font-size: 0.9rem;
  color: #5a5c69;
  border-bottom: 1px dashed #eaecf4;
}

.dot {
  height: 8px;
  width: 8px;
  background-color: #4e73df;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

/* Admin Buttons */
.btn-admin-primary {
  width: 100%;
  padding: 12px;
  background: #4e73df;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-admin-primary:hover {
  background: #2e59d9;
  box-shadow: 0 5px 15px rgba(78, 115, 223, 0.3);
}

.btn-admin-outline {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #4e73df;
  border: 1px solid #4e73df;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-admin-outline:hover {
  background: #f8f9fc;
}

/* Animations */
.animate-home {
  animation: pageIn 0.6s ease-out;
}

@keyframes pageIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.profile-icon {
  font-size: 28px;
  color: #5a5c69;
  transition: color 0.3s;
}

.profile-icon:hover {
  color: #4e73df;
}
</style>