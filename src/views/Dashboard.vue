<template>
  <div class="app-layout">
    <nav class="navbar bg-white border-bottom shadow-sm px-3">
      <div class="container-fluid p-0">
        <div class="d-flex align-items-center">
          <button class="btn d-lg-none me-2 p-0 border-0" @click="isSidebarOpen = !isSidebarOpen">
            <i class="bi bi-list fs-2 text-indigo"></i>
          </button>
          <span class="navbar-brand d-flex align-items-center m-0">
            <i class="bi bi-shield-check-fill me-2 text-indigo"></i>
            <span class="fw-bold text-dark">JeprutSchool</span>
          </span>
        </div>

        <div class="d-flex align-items-center gap-3">
          <div class="text-end d-none d-md-block">
            <p class="small fw-bold mb-0 text-dark">Administrator</p>
            <p class="small text-muted mb-0" style="font-size: 10px;">{{ tanggalSekarang }}</p>
          </div>
          <router-link to="/profile" class="profile-link shadow-sm">
            <div class="avatar-aj">AJ</div>
          </router-link>
        </div>
      </div>
    </nav>

    <div class="main-wrapper">
      <aside class="sidebar bg-white border-end shadow-sm" :class="{ 'show-sidebar': isSidebarOpen }">
        <div class="p-4 d-flex flex-column h-100">
          <h6 class="sidebar-title">Menu Utama</h6>
          <ul class="nav flex-column gap-1 flex-grow-1">
            <li>
              <router-link to="/dashboard" class="menu-link active">
                <i class="bi bi-grid-1x2-fill"></i><span>Dashboard</span>
              </router-link>
            </li>
            <li>
              <router-link to="/siswa" class="menu-link nowrap-link">
                <i class="bi bi-people-fill"></i><span>Manajemen Siswa</span>
              </router-link>
            </li>
            <li>
              <router-link to="/guru" class="menu-link">
                <i class="bi bi-person-badge-fill"></i><span>Data Pengajar</span>
              </router-link>
            </li>
            <li>
              <router-link to="/kelas" class="menu-link">
                <i class="bi bi-door-open-fill"></i><span>Data Kelas</span>
              </router-link>
            </li>
            <li>
              <router-link to="/jadwal" class="menu-link">
                <i class="bi bi-calendar-week-fill"></i><span>Jadwal Pelajaran</span>
              </router-link>
            </li>
            <li>
              <router-link to="/absensi" class="menu-link">
                <i class="bi bi-check-circle-fill"></i><span>Kehadiran Siswa</span>
              </router-link>
            </li>
          </ul>
          
          <div class="logout-section mt-auto pt-4 border-top">
            <button @click="openLogoutModal" class="btn-logout border-0 shadow-sm w-100">
              <i class="bi bi-power"></i><span>Keluar Sistem</span>
            </button>
          </div>
        </div>
      </aside>

      <main class="content-area p-3 p-md-4">
        <div class="container-fluid p-0">
          
          <div class="hero-banner p-4 p-md-5 mb-4 position-relative overflow-hidden shadow">
            <div class="position-relative z-1 text-white">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-white text-indigo fw-bold">v2.0.4</span>
                <span class="small opacity-75 fw-bold">{{ jamSekarang }} WIB</span>
              </div>
              <h1 class="fw-bold mb-2 hero-title">Halo, Admin Jeprut!</h1>
              <p class="opacity-75 mb-0 fs-5 d-none d-md-block">Sistem Manajemen Sekolah Aktif & Terkendali.</p>
            </div>
            <i class="bi bi-cpu-fill hero-icon"></i>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-12 col-sm-6 col-xl-3" v-for="(stat, i) in stats" :key="i">
              <div class="stat-card p-3 shadow-sm h-100 bg-white border-0">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="stat-icon-box" :class="stat.bg"><i :class="stat.icon"></i></div>
                  <div class="text-success small fw-bold"><i class="bi bi-graph-up"></i> +{{ stat.up }}%</div>
                </div>
                <h3 class="fw-bold mb-0">{{ stat.val }}</h3>
                <p class="text-muted small fw-bold mb-0">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <div class="row g-4 mb-4">
            <div class="col-12 col-xl-8">
              <div class="white-card p-4 shadow-sm border-0 h-100">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="fw-bold mb-0">Statistik Kehadiran Aktif</h5>
                  <div class="d-flex gap-2">
                    <span class="badge bg-indigo-light text-indigo small">Minggu Ini</span>
                  </div>
                </div>
                <div class="chart-wrapper d-flex align-items-end justify-content-around px-2">
                  <div v-for="(val, day) in chartData" :key="day" class="bar-container">
                    <div class="bar-value small fw-bold text-indigo">{{ val }}%</div>
                    <div class="bar-fill" :style="{ height: val + '%' }">
                      <div class="bar-glow"></div>
                    </div>
                    <div class="bar-day small fw-bold text-muted mt-3">{{ day }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-xl-4">
              <div class="white-card p-4 shadow-sm border-0 h-100">
                <h5 class="fw-bold mb-4">Aktivitas Sistem</h5>
                <div class="activity-list">
                  <div class="activity-item d-flex gap-3 mb-4">
                    <div class="activity-dot bg-indigo"></div>
                    <div>
                      <p class="small mb-0 fw-bold">Update Data Guru</p>
                      <small class="text-muted">Baru saja oleh Admin AJ</small>
                    </div>
                  </div>
                  <div class="activity-item d-flex gap-3 mb-4">
                    <div class="activity-dot bg-emerald"></div>
                    <div>
                      <p class="small mb-0 fw-bold">Backup Database Selesai</p>
                      <small class="text-muted">Otomatis - 2 Jam yang lalu</small>
                    </div>
                  </div>
                  <div class="activity-item d-flex gap-3">
                    <div class="activity-dot bg-warning"></div>
                    <div>
                      <p class="small mb-0 fw-bold">5 Siswa Baru Mendaftar</p>
                      <small class="text-muted">Lihat di Manajemen Siswa</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4 mb-4">
            <div class="col-12">
              <div class="white-card p-4 shadow-sm border-0">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="fw-bold mb-0">Siswa Baru Terdaftar</h5>
                  <router-link to="/siswa" class="btn btn-indigo btn-sm rounded-pill px-4 fw-bold">
                    Buka Manajemen Siswa <i class="bi bi-arrow-right ms-1"></i>
                  </router-link>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="bg-light">
                      <tr>
                        <th class="border-0 small fw-bold p-3">NAMA LENGKAP</th>
                        <th class="border-0 small fw-bold">KELAS TUJUAN</th>
                        <th class="border-0 small fw-bold text-center">STATUS AKTIF</th>
                        <th class="border-0 small fw-bold text-end p-3">AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="siswa in siswaTerbaru" :key="siswa.id">
                        <td class="p-3">
                          <div class="d-flex align-items-center gap-3">
                            <div class="avatar-sm bg-indigo-light text-indigo fw-bold">
                              {{ getInitials(siswa.nama) }}
                            </div>
                            <span class="fw-bold small">{{ siswa.nama }}</span>
                          </div>
                        </td>
                        <td class="small fw-semibold">{{ siswa.kode_kelas }}</td>
                        <td class="text-center">
                          <span class="badge-active">Aktif</span>
                        </td>
                        <td class="text-end p-3">
                          <router-link to="/siswa" class="btn btn-sm btn-light border fw-bold text-indigo">
                            KONTROL
                          </router-link>
                        </td>
                      </tr>
                      <tr v-if="siswaTerbaru.length === 0">
                        <td colspan="4" class="text-center py-4 text-muted">Belum ada data siswa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="pb-5"></div>
        </div>
      </main>
    </div>

    <div v-if="isSidebarOpen" class="sidebar-overlay d-lg-none" @click="isSidebarOpen = false"></div>

    <transition name="modal-bounce">
      <div v-if="showLogoutModal" class="custom-modal-overlay" @click.self="closeLogoutModal">
        <div class="custom-modal-box">
          <div class="modal-premium-deco"></div>
          <button class="custom-btn-close" @click="closeLogoutModal">
            <i class="bi bi-x-lg"></i>
          </button>
          
          <div class="custom-modal-content">
            <div class="custom-modal-icon shadow-premium">
              <i class="bi bi-power"></i>
            </div>
            <h4 class="custom-modal-title">Keluar Sistem?</h4>
            <p class="custom-modal-text">Anda akan keluar dari sesi admin **JeprutSchool**. Pastikan semua perubahan data penting telah disimpan.</p>
            
            <div class="custom-modal-actions">
              <button class="custom-btn-cancel" @click="closeLogoutModal">Batal</button>
              <button class="custom-btn-confirm shadow-premium" @click="confirmLogout">Ya, Keluar</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isSidebarOpen: false,
      showLogoutModal: false, // State untuk modal logout custom
      jamSekarang: '',
      tanggalSekarang: '',
      siswaTerbaru: [],
      stats: [
        { label: 'Total Siswa', val: '1002', icon: 'bi-people-fill', bg: 'bg-indigo-light', up: 12 },
        { label: 'Guru Aktif', val: '56', icon: 'bi-person-badge-fill', bg: 'bg-emerald-light', up: 3 },
        { label: 'Ruang Kelas', val: '42', icon: 'bi-door-open-fill', bg: 'bg-cyan-light', up: 0 },
        { label: 'Kehadiran', val: '98%', icon: 'bi-check-circle-fill', bg: 'bg-orange-light', up: 5 }
      ],
      chartData: { Sen: 85, Sel: 92, Rab: 78, Kam: 95, Jum: 88, Sab: 40, Min: 15 }
    }
  },

  methods: {
    updateTime() {
      const now = new Date()
      this.jamSekarang = now.toLocaleTimeString('id-ID', { hour12: false })
      this.tanggalSekarang = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },

    getInitials(nama) {
      if (!nama) return '-'
      return nama.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase()
    },

    async getSiswaTerbaru() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/siswa')
        const data = response.data.data || response.data
        this.siswaTerbaru = data.slice(0, 5)
        this.stats[0].val = data.length
      } catch (error) {
        console.error('Gagal mengambil data siswa:', error)
      }
    },
      
    async getJumlahGuru() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/guru')
        const data = response.data.data || response.data
        this.stats[1].val = data.length
      } catch (error) {
        console.error('Gagal mengambil data guru:', error)
      }
    },

    async getJumlahKelas() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/kelas')
        const data = response.data.data || response.data
        this.stats[2].val = data.length
      } catch (error) {
        console.error('Gagal mengambil data kelas:', error)
      }
    },

    openLogoutModal() {
      this.showLogoutModal = true
    },

    closeLogoutModal() {
      this.showLogoutModal = false
    },

    confirmLogout() {
      this.showLogoutModal = false
      this.$router.push('/')
    }
  },

  mounted() {
    this.updateTime()
    setInterval(() => { this.updateTime() }, 1000)
    this.getSiswaTerbaru()
    this.getJumlahGuru()
    this.getJumlahKelas()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

/* LAYOUT CONFIG */
.app-layout { position: fixed; inset: 0; display: flex; flex-direction: column; background: #f4f7fe; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; }
.navbar { height: 70px; z-index: 1050; }
.main-wrapper { display: flex; flex: 1; overflow: hidden; height: calc(100vh - 70px); }
.sidebar { width: 280px; flex-shrink: 0; background: white; z-index: 1040; transition: 0.3s ease; }
.content-area { flex: 1; overflow-y: auto; scroll-behavior: smooth; }

/* AVATAR AJ */
.avatar-aj { width: 42px; height: 42px; background: #4f46e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 3px solid #eef2ff; }

/* SIDEBAR LINK */
.menu-link { display: flex; align-items: center; gap: 12px; padding: 14px 20px; color: #718096; text-decoration: none; font-weight: 700; border-radius: 14px; transition: 0.2s; }
.nowrap-link { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.menu-link:hover { background: #f8fafc; color: #4f46e5; }
.menu-link.active { background: #4f46e5; color: white; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3); }

/* CARDS & UI */
.white-card { background: white; border-radius: 24px; }
.hero-banner { background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%); border-radius: 24px; color: white; }
.hero-icon { position: absolute; right: -20px; bottom: -20px; font-size: 140px; color: rgba(255,255,255,0.1); transform: rotate(-15deg); }

.stat-card { border-radius: 20px; transition: 0.2s; }
.stat-card:hover { transform: translateY(-5px); }
.stat-icon-box { width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }

/* CHART AKTIF */
.chart-wrapper { height: 250px; border-bottom: 2px solid #f1f5f9; padding-bottom: 5px; }
.bar-container { width: 45px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
.bar-fill { width: 100%; background: linear-gradient(to top, #4f46e5, #818cf8); border-radius: 12px 12px 4px 4px; position: relative; transition: height 1s ease-in-out; animation: grow 1.2s ease-out; }
.bar-glow { position: absolute; top: 0; left: 0; right: 0; height: 20px; background: rgba(255,255,255,0.2); filter: blur(5px); border-radius: 12px 12px 0 0; }
@keyframes grow { from { height: 0; } }

/* UTILS */
.bg-indigo-light { background: #eef2ff; color: #4f46e5; }
.bg-emerald-light { background: #ecfdf5; color: #10b981; }
.bg-cyan-light { background: #ecfeff; color: #06b6d4; }
.bg-orange-light { background: #fff7ed; color: #f97316; }
.text-indigo { color: #4f46e5; }
.btn-indigo { background: #4f46e5; color: white; border: none; }
.badge-active { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 800; }
.avatar-sm { width: 35px; height: 35px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 11px; }

/* ACTIVITY FEED */
.activity-dot { width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 3px #f1f5f9; margin-top: 5px; }
.btn-logout { background: #f3f0ff; color: #6366f1; padding: 14px; border-radius: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; cursor: pointer; }
.btn-logout:hover { background: #e0e7ff; color: #4f46e5; transform: scale(0.98); }

/* =============================================
   CUSTOM MODAL PREMIUM STYLES (THEME UNGU)
   ============================================= */
.custom-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.custom-modal-box {
  width: 90%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 24px 70px rgba(79, 70, 229, 0.15);
  border: 1px solid rgba(238, 242, 255, 0.8);
}

.modal-premium-deco {
  height: 6px;
  background: linear-gradient(90deg, #6366f1, #4f46e5, #312e81);
  width: 100%;
}

.custom-btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  border: none;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  cursor: pointer;
}
.custom-btn-close:hover {
  background: #eef2ff;
  color: #4f46e5;
}

.custom-modal-content {
  padding: 40px 30px 30px 30px;
  text-align: center;
}

.custom-modal-icon {
  width: 64px;
  height: 64px;
  border-radius: 22px;
  background: linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%);
  color: #4f46e5;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}

.shadow-premium {
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.2);
}

.custom-modal-title {
  font-weight: 800;
  color: #0f172a;
  font-size: 22px;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.custom-modal-text {
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 28px;
}

.custom-modal-actions {
  display: flex;
  gap: 12px;
}

.custom-btn-cancel, 
.custom-btn-confirm {
  flex: 1;
  padding: 13px 20px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 14px;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.custom-btn-cancel {
  background: #f1f5f9;
  color: #64748b;
}
.custom-btn-cancel:hover {
  background: #e2e8f0;
  color: #334155;
}

.custom-btn-confirm {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
}
.custom-btn-confirm:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  transform: translateY(-1px);
}
.custom-btn-confirm:active {
  transform: translateY(0);
}

/* ANIMATION BOUNCE INEFFECT */
.modal-bounce-enter-active {
  animation: bounceIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-bounce-leave-active {
  transition: opacity 0.2s ease;
}
.modal-bounce-leave-to {
  opacity: 0;
}

@keyframes bounceIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@media (max-width: 991px) {
  .sidebar { position: fixed; left: -280px; top: 0; bottom: 0; }
  .sidebar.show-sidebar { left: 0; }
  .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1030; backdrop-filter: blur(2px); }
  .bar-container { width: 30px; }
}
</style>