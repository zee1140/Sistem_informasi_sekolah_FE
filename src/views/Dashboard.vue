<template>
  <div class="app-wrapper animate-home">
    <nav class="navbar navbar-expand-lg px-4">
      <div class="container-fluid">
        <span class="navbar-brand">
          <i class="bi bi-shield-check me-2"></i>JeprutSchool <span class="badge-admin">ADMIN</span>
        </span>
        <div class="d-flex align-items-center gap-3">
          <span class="text-secondary small d-none d-md-block">Senin, 21 April 2026</span>
          <router-link to="/profile" class="profile-icon">
            <i class="bi bi-person-circle"></i>
          </router-link>
        </div>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <div class="row g-4">
        <div class="col-md-3">
          <div class="glass-card p-4 h-100">
            <div class="sidebar-header mb-4">
              <h6 class="text-uppercase small fw-bold text-muted">Main Navigation</h6>
            </div>
            
            <ul class="nav flex-column gap-2">
              <li>
                <router-link to="/dashboard" class="menu-btn">
                  <i class="bi bi-grid-1x2"></i>
                  <span>Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link to="/siswa" class="menu-btn">
                  <i class="bi bi-people"></i>
                  <span>Data Siswa</span>
                </router-link>
              </li>
              <li>
                <router-link to="/kelas" class="menu-btn">
                  <i class="bi bi-building"></i>
                  <span>Data Kelas</span>
                </router-link>
              </li>
              <li>
                <router-link to="/guru" class="menu-btn">
                  <i class="bi bi-person-workspace"></i>
                  <span>Data Guru</span>
                </router-link>
              </li>
              <li>
                <router-link to="/jadwal" class="menu-btn">
                  <i class="bi bi-calendar-event"></i>
                  <span>Jadwal Pelajaran</span>
                </router-link>
              </li>
            </ul>

            <div class="mt-5 pt-4 border-top">
              <button @click="logout" class="menu-btn text-danger">
                <i class="bi bi-box-arrow-left"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-9">
          <div class="admin-hero p-5 mb-4 position-relative overflow-hidden">
            <div class="position-relative z-1">
              <h2>Welcome back, Administrator</h2>
              <p class="lead mb-0">Sistem manajemen sekolah terintegrasi. Pantau aktivitas dan kelola data dalam satu dasbor.</p>
            </div>
            <i class="bi bi-mortarboard-fill hero-bg-icon"></i>
          </div>

          <div class="row g-3 mb-4">
            <div v-for="stat in stats" :key="stat.label" class="col-md-4">
              <div class="stat-card p-4" :style="{ borderLeftColor: stat.color }">
                <div class="stat-icon" :style="{ color: stat.color + '44' }">
                  <i :class="stat.icon"></i>
                </div>
                <div class="stat-content">
                  <h3 class="fw-bold">{{ stat.value }}</h3>
                  <p :style="{ color: stat.color }">{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-md-7">
              <div class="admin-card p-4 h-100">
                <div class="card-title-box d-flex justify-content-between align-items-center">
                  <h6><i class="bi bi-clock-history me-2"></i>Log Aktivitas Terbaru</h6>
                  <button class="btn btn-sm btn-light text-primary">Lihat Semua</button>
                </div>
                <ul class="activity-list mt-3">
                  <li v-for="(act, index) in activities" :key="index">
                    <span class="dot"></span>
                    <div class="d-flex flex-column">
                      <span class="act-text">{{ act.text }}</span>
                      <small class="text-muted">{{ act.time }}</small>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-5">
              <div class="admin-card p-4 h-100">
                <div class="card-title-box">
                  <h6><i class="bi bi-lightning-charge me-2"></i>Quick Actions</h6>
                </div>
                <div class="d-grid gap-3 mt-3">
                  <router-link to="/siswa" class="btn-admin-primary text-decoration-none">
                    <i class="bi bi-person-plus"></i>
                    Pendaftaran Siswa Baru
                  </router-link>

                  <router-link to="/jadwal" class="btn-admin-outline text-decoration-none">
                    <i class="bi bi-calendar-event"></i>
                    Konfigurasi Jadwal
                  </router-link>

                  <button class="btn-admin-outline border-secondary text-secondary">
                    <i class="bi bi-file-earmark-pdf"></i>
                    Cetak Laporan Bulanan
                  </button>
                </div>
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
  data() {
    return {
      // Data dikembalikan lengkap seperti aslinya agar tidak error
      stats: [
        { label: 'Total Siswa', value: '1,200', icon: 'bi bi-mortarboard', color: '#4e73df' },
        { label: 'Tenaga Pengajar', value: '75', icon: 'bi bi-person-workspace', color: '#1cc88a' },
        { label: 'Ruang Kelas', value: '30', icon: 'bi bi-building', color: '#36b9cc' }
      ],
      activities: [
        { text: 'Update data siswa - Kelas 12 IPA 1', time: '5 menit yang lalu' },
        { text: 'Penambahan jadwal ujian semester', time: '2 jam yang lalu' },
        { text: 'Publikasi pengumuman lomba nasional', time: 'Kemarin, 14:00' }
      ]
    }
  },
  methods: {
    logout() {
      // Logika logout sederhana
      if(confirm('Apakah anda yakin ingin keluar?')) {
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
/* Style tetap Pro & Mewah */
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap');

.app-wrapper {
  background-color: #f8f9fc;
  min-height: 100vh;
  font-family: 'Public Sans', sans-serif;
  color: #2c3e50;
}

/* Hero Section Enhancement */
.admin-hero {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(78, 115, 223, 0.2);
}

.hero-bg-icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  font-size: 180px;
  color: rgba(255,255,255,0.1);
  transform: rotate(-15deg);
}

/* Sidebar & Buttons */
.glass-card {
  background: white;
  border: 1px solid #e3e6f0;
  border-radius: 18px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.05);
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  width: 100%;
  border: none;
  background: transparent;
  color: #5a5c69;
  text-decoration: none;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.25s ease;
}

.menu-btn:hover {
  background: #f1f4ff;
  color: #4e73df;
  transform: translateX(5px);
}

.router-link-active.menu-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  color: #fff !important;
  box-shadow: 0 4px 12px rgba(78, 115, 223, 0.3);
}

/* Stat Cards */
.stat-card {
  background: white;
  border-left: 5px solid #4e73df;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1);
  transition: transform 0.3s;
}

.stat-card:hover { transform: translateY(-5px); }

.stat-icon { font-size: 2.5rem; opacity: 0.3; }

/* General Cards */
.admin-card {
  background: white;
  border: 1px solid #e3e6f0;
  border-radius: 18px;
}

.activity-list { list-style: none; padding: 0; }
.activity-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f8f9fc;
}

.dot {
  width: 10px;
  height: 10px;
  background: #4e73df;
  border-radius: 50%;
  margin-top: 6px;
}

/* Animations */
.animate-home { animation: fadeIn 0.6s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn-admin-primary, .btn-admin-outline {
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.3s;
}

.btn-admin-primary { background: #4e73df; color: white; border: none; }
.btn-admin-primary:hover { background: #224abe; box-shadow: 0 5px 15px rgba(78, 115, 223, 0.3); }

.btn-admin-outline { background: transparent; border: 1.5px solid #4e73df; color: #4e73df; }
.btn-admin-outline:hover { background: #f1f4ff; }
</style>