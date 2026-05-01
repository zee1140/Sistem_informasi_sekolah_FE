<template>
  <div class="app-container animate-home">
    <nav class="navbar navbar-expand-lg px-4 bg-white border-bottom shadow-sm">
      <div class="container-fluid p-0">
        <span class="navbar-brand d-flex align-items-center m-0">
          <i class="bi bi-shield-check me-2 text-indigo"></i>
          <span class="fw-bold text-dark">JeprutSchool</span>
          <span class="badge-admin ms-2">ADMIN</span>
        </span>
        <div class="d-flex align-items-center gap-3">
          <span class="text-secondary small d-none d-md-block">{{ tanggalSekarang }}</span>
          
          <router-link to="/profile" class="profile-link" title="Buka Profil">
            <i class="bi bi-person-circle text-indigo"></i>
          </router-link>
        </div>
      </div>
    </nav>

    <div class="dashboard-wrapper">
      <div class="row g-0 h-100 w-100 m-0">
        
        <div class="col-auto sidebar-box bg-white border-end shadow-sm">
          <div class="p-4 d-flex flex-column h-100">
            <h6 class="sidebar-title">Main Navigation</h6>
            <ul class="nav flex-column gap-2 flex-grow-1">
              <li>
                <router-link to="/dashboard" class="menu-link active">
                  <i class="bi bi-grid-1x2"></i><span>Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link to="/siswa" class="menu-link">
                  <i class="bi bi-people"></i><span>Data Siswa</span>
                </router-link>
              </li>
              <li>
                <router-link to="/kelas" class="menu-link">
                  <i class="bi bi-building"></i><span>Data Kelas</span>
                </router-link>
              </li>
              <li>
                <router-link to="/guru" class="menu-link">
                  <i class="bi bi-person-workspace"></i><span>Data Guru</span>
                </router-link>
              </li>
              <li>
                <router-link to="/jadwal" class="menu-link">
                  <i class="bi bi-calendar-event"></i><span>Jadwal Pelajaran</span>
                </router-link>
              </li>
            </ul>
            
            <div class="logout-section mt-auto">
              <button @click="logout" class="btn-logout border-0 shadow-sm">
                <i class="bi bi-box-arrow-left"></i><span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div class="col content-scroll-area">
          <div class="p-4 p-md-5">
            
            <div class="hero-banner p-5 mb-5 position-relative overflow-hidden shadow-sm">
              <div class="position-relative z-1 d-flex justify-content-between align-items-center">
                <div>
                  <h1 class="fw-bold text-white mb-2">Welcome back, Administrator</h1>
                  <p class="text-white opacity-75 mb-0 fs-5">Sistem manajemen sekolah terintegrasi. Pantau aktivitas dalam satu dasbor.</p>
                </div>
                <div class="d-none d-xl-block">
                  <div class="clock-glass p-3 rounded-4 text-center text-white">
                    <h4 class="fw-bold mb-0" style="min-width: 110px;">{{ jamSekarang }}</h4>
                    <small class="opacity-75 fw-bold">WIB</small>
                  </div>
                </div>
              </div>
              <i class="bi bi-mortarboard-fill hero-icon"></i>
            </div>

            <div class="row g-4 mb-5">
              <div class="col-md-4">
                <div class="stat-box border-indigo shadow-sm">
                  <div class="p-4 d-flex align-items-center">
                    <div class="stat-icon indigo-bg me-4"><i class="bi bi-mortarboard"></i></div>
                    <div>
                      <h2 class="display-6 fw-bold mb-0">1,200</h2>
                      <p class="text-indigo fw-bold mb-0">Total Siswa</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-box border-emerald shadow-sm">
                  <div class="p-4 d-flex align-items-center">
                    <div class="stat-icon emerald-bg me-4"><i class="bi bi-person-video3"></i></div>
                    <div>
                      <h2 class="display-6 fw-bold mb-0">75</h2>
                      <p class="text-emerald fw-bold mb-0">Tenaga Pengajar</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-box border-cyan shadow-sm">
                  <div class="p-4 d-flex align-items-center">
                    <div class="stat-icon cyan-bg me-4"><i class="bi bi-building"></i></div>
                    <div>
                      <h2 class="display-6 fw-bold mb-0">30</h2>
                      <p class="text-cyan fw-bold mb-0">Ruang Kelas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-4 mb-5">
              <div class="col-xl-8">
                <div class="white-card p-4 h-100 shadow-sm border-0">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold mb-0 text-dark">Siswa Baru Terdaftar</h5>
                    <button @click="$router.push('/siswa')" class="btn btn-link text-indigo text-decoration-none fw-bold small p-0">
                      Kelola Semua <i class="bi bi-arrow-right"></i>
                    </button>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover align-middle">
                      <thead class="bg-light">
                        <tr>
                          <th class="border-0 px-3 py-3 text-muted small fw-bold">NAMA SISWA</th>
                          <th class="border-0 py-3 text-muted small fw-bold">KELAS</th>
                          <th class="border-0 py-3 text-muted small fw-bold text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="n in 3" :key="n">
                          <td class="px-3 py-3">
                            <div class="d-flex align-items-center">
                              <div class="avatar-mini me-3">A</div>
                              <span class="fw-bold">Andi Wijaya</span>
                            </div>
                          </td>
                          <td class="text-secondary fw-semibold">12 IPA 1</td>
                          <td class="text-center">
                            <span class="badge-success-light">Verified</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="col-xl-4">
                <div class="white-card p-4 h-100 shadow-sm border-0 d-flex flex-column">
                  <h5 class="fw-bold mb-4 text-dark">Kapasitas Sekolah</h5>
                  <div class="mb-4">
                    <div class="d-flex justify-content-between mb-2">
                      <span class="small fw-bold text-secondary">Kapasitas Siswa</span>
                      <span class="small fw-bold">85%</span>
                    </div>
                    <div class="progress rounded-pill" style="height: 10px;">
                      <div class="progress-bar bg-indigo" style="width: 85%"></div>
                    </div>
                  </div>
                  <div class="info-alert p-3 rounded-4 mt-auto">
                    <div class="d-flex gap-3 align-items-center text-indigo">
                      <i class="bi bi-info-circle-fill fs-4"></i>
                      <p class="small mb-0 fw-medium">Sistem melakukan backup otomatis pada tengah malam.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-4 pb-5">
              <div class="col-md-7">
                <div class="white-card p-4 h-100 shadow-sm border-0">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold mb-0 text-dark">Log Aktivitas Admin</h5>
                    <button class="btn btn-sm btn-indigo-light rounded-pill px-3">Lihat Semua</button>
                  </div>
                  <div class="activity-list">
                    <div v-for="(act, index) in activities" :key="index" class="activity-row d-flex gap-3 mb-4">
                      <div class="dot-indicator"></div>
                      <div>
                        <p class="mb-0 fw-bold text-dark">{{ act.text }}</p>
                        <small class="text-muted">{{ act.time }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-5">
                <div class="white-card p-4 h-100 shadow-sm border-0">
                  <h5 class="fw-bold mb-4 text-dark">Aksi Cepat</h5>
                  <div class="d-grid gap-3">
                    <button class="btn-indigo-action" @click="$router.push('/siswa')">
                      <i class="bi bi-person-plus-fill me-2"></i>Tambah Siswa Baru
                    </button>
                    <button class="btn-indigo-outline" @click="$router.push('/jadwal')">
                      <i class="bi bi-calendar-check me-2"></i>Konfigurasi Jadwal
                    </button>
                    <button class="btn-grey-light">
                      <i class="bi bi-file-earmark-pdf me-2"></i>Cetak Laporan Bulanan
                    </button>
                  </div>
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
  name: 'FullDashboard',
  data() {
    return {
      jamSekarang: '--:--:--',
      tanggalSekarang: '',
      timer: null,
      activities: [
        { text: 'Update data siswa - Kelas 12 IPA 1', time: '5 menit yang lalu' },
        { text: 'Penambahan jadwal ujian semester', time: '2 jam yang lalu' },
        { text: 'Publikasi pengumuman lomba nasional', time: 'Kemarin, 14:00' }
      ]
    }
  },
  methods: {
    updateWaktu() {
      const skrg = new Date();
      
      // Update Jam
      const h = String(skrg.getHours()).padStart(2, '0');
      const m = String(skrg.getMinutes()).padStart(2, '0');
      const s = String(skrg.getSeconds()).padStart(2, '0');
      this.jamSekarang = `${h}:${m}:${s}`;

      // Update Tanggal (Format Indonesia)
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      this.tanggalSekarang = skrg.toLocaleDateString('id-ID', options);
    },
    logout() {
      if(confirm('Keluar dari sistem?')) this.$router.push('/');
    }
  },
  mounted() {
    this.updateWaktu();
    this.timer = setInterval(this.updateWaktu, 1000);
  },
  beforeUnmount() {
    // Penting: Hapus interval agar tidak terjadi memory leak
    if (this.timer) clearInterval(this.timer);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap');

/* ANTI-MELESAT: Layout Lock */
.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  font-family: 'Public Sans', sans-serif;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
}

.dashboard-wrapper { flex: 1; display: flex; overflow: hidden; }
.sidebar-box { width: 280px; height: 100%; z-index: 10; }
.content-scroll-area { flex: 1; height: 100%; overflow-y: auto; background-color: #f8fafc; }

/* Navbar & Profile Perbaikan */
.navbar { height: 75px; z-index: 1000; }
.profile-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8fafc;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}
.profile-link:hover { background: #eef2ff; transform: scale(1.1); }
.profile-link i { font-size: 1.6rem !important; line-height: 0; }

.badge-admin { background: #eef2ff; color: #4f46e5; font-size: 11px; padding: 5px 12px; border-radius: 8px; font-weight: 800; }
.text-indigo { color: #4f46e5; }

/* Sidebar Menu */
.sidebar-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800; color: #94a3b8; margin-bottom: 25px; }
.menu-link {
  display: flex; align-items: center; gap: 15px; padding: 15px 20px;
  color: #64748b; text-decoration: none; font-weight: 700; border-radius: 16px; transition: 0.3s;
}
.menu-link:hover { background: #f1f5f9; color: #4f46e5; }
.menu-link.active { background: #4f46e5; color: #fff; box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4); }

.btn-logout {
  display: flex; align-items: center; gap: 15px; padding: 15px 20px;
  background: #fff1f2; color: #e11d48; border-radius: 16px; font-weight: 700; width: 100%; transition: 0.3s;
}

/* Stat Box */
.stat-box { background: white; border-radius: 24px; border: 1px solid #e2e8f0; border-left-width: 8px !important; }
.border-indigo { border-left-color: #4f46e5 !important; }
.border-emerald { border-left-color: #10b981 !important; }
.border-cyan { border-left-color: #06b6d4 !important; }
.stat-icon { width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; border-radius: 18px; font-size: 24px; }
.indigo-bg { background: #eef2ff; color: #4f46e5; }
.emerald-bg { background: #ecfdf5; color: #10b981; }
.cyan-bg { background: #ecfeff; color: #06b6d4; }
.text-emerald { color: #10b981; }

/* Hero UI */
.hero-banner { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); border-radius: 32px; }
.hero-icon { position: absolute; right: -30px; bottom: -30px; font-size: 180px; color: rgba(255,255,255,0.1); transform: rotate(-15deg); }
.clock-glass { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); min-width: 130px; }

/* Card & Tables */
.white-card { background: white; border-radius: 32px; }
.avatar-mini { width: 32px; height: 32px; background: #eef2ff; color: #4f46e5; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; }
.badge-success-light { background: #ecfdf5; color: #10b981; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
.bg-indigo { background-color: #4f46e5 !important; }
.info-alert { background: #f5f3ff; border: 1px solid #ddd6fe; }
.dot-indicator { width: 10px; height: 10px; background: #4f46e5; border-radius: 50%; margin-top: 6px; box-shadow: 0 0 0 4px #eef2ff; }

/* Actions */
.btn-indigo-action { background: #4f46e5; color: white; border: none; padding: 16px; border-radius: 18px; font-weight: 700; text-align: left; transition: 0.3s; }
.btn-indigo-outline { background: white; border: 2px solid #4f46e5; color: #4f46e5; padding: 16px; border-radius: 18px; font-weight: 700; text-align: left; }
.btn-grey-light { background: #f1f5f9; color: #64748b; border: none; padding: 16px; border-radius: 18px; font-weight: 700; text-align: left; }
.btn-indigo-light { background: #f5f3ff; color: #4f46e5; border: none; }
.btn-indigo-action:hover { transform: translateX(5px); background: #3730a3; }

/* Animasi */
.animate-home { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>