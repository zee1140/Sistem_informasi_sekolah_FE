<template>
  <div class="app-container animate-jadwal">
    
    <div class="header-section py-4 px-5 bg-white border-bottom shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <button class="btn btn-back mb-3" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left me-2"></i> Kembali
          </button>
          <h2 class="fw-bold text-dark mb-1">Jadwal Pelajaran</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item"><a href="#" @click.prevent="$router.push('/dashboard')" class="text-muted text-decoration-none">Beranda</a></li>
              <li class="breadcrumb-item active fw-semibold text-indigo">Jadwal</li>
            </ol>
          </nav>
        </div>

        <div class="d-flex align-items-center gap-3">
          <div class="d-flex gap-2">
            <select class="form-select select-kelas border-0 bg-light fw-semibold shadow-sm">
              <option>Semua Kelas</option>
              <option>10 IPA 1</option>
              <option>11 IPS 2</option>
              <option>12 IPA 3</option>
            </select>
            <button class="btn btn-primary-jeprut shadow-sm px-4 py-2 rounded-pill">
              <i class="bi bi-plus-circle me-2"></i> Buat Jadwal
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="content-scroll-area p-5">
      
      <div class="admin-hero p-5 mb-5 position-relative overflow-hidden shadow-sm">
        <div class="position-relative z-1">
          <h3 class="fw-bold text-white mb-2">Manajemen Waktu Belajar</h3>
          <p class="text-white opacity-75 mb-0 fs-5">Atur alokasi waktu dan guru pengampu tiap kelas dengan presisi.</p>
        </div>
        <i class="bi bi-calendar3 hero-bg-icon"></i>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr class="bg-header-table">
                <th class="ps-4 py-4 text-uppercase tracking-wider">Waktu</th>
                <th class="py-4 text-uppercase tracking-wider">Mata Pelajaran</th>
                <th class="py-4 text-uppercase tracking-wider">Kelas</th>
                <th class="py-4 text-uppercase tracking-wider">Guru</th>
                <th class="text-center py-4 text-uppercase tracking-wider">Ruang</th>
                <th class="text-center py-4 text-uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in jadwalHariIni" :key="index" class="table-row-animate">
                <td class="ps-4 py-3">
                  <div class="d-flex align-items-center gap-2">
                    <div class="dot-indicator"></div>
                    <span class="fw-bold text-dark">{{ item.waktu }}</span>
                  </div>
                </td>
                <td><span class="badge-mapel-indigo">{{ item.mapel }}</span></td>
                <td class="fw-semibold text-secondary">{{ item.kelas }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar-mini-indigo me-2">{{ item.guru.charAt(0) }}</div>
                    <span class="small fw-bold text-dark">{{ item.guru }}</span>
                  </div>
                </td>
                <td class="text-center">
                  <span class="badge-ruang">{{ item.ruang }}</span>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button class="btn-action-edit" title="Edit"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn-action-delete" title="Hapus"><i class="bi bi-trash3"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JadwalPelajaran',
  data() {
    return {
      jadwalHariIni: [
        { waktu: '07:00 - 08:30', mapel: 'Matematika', kelas: '12 IPA 1', guru: 'Budi Santoso, S.Pd', ruang: 'LAB-01' },
        { waktu: '08:30 - 10:00', mapel: 'Bahasa Inggris', kelas: '11 IPS 2', guru: 'Dewi Lestari, M.Pd', ruang: 'R.102' },
        { waktu: '10:15 - 11:45', mapel: 'Informatika', kelas: '10 IPA 2', guru: 'Rian Hidayat, S.Kom', ruang: 'LAB-KOM' },
        { waktu: '12:30 - 14:00', mapel: 'Fisika', kelas: '12 IPA 1', guru: 'Siti Aminah, M.Si', ruang: 'R.205' },
        { waktu: '14:00 - 15:30', mapel: 'Kimia', kelas: '11 IPA 3', guru: 'Ahmad Fauzi, S.T', ruang: 'R.104' }
      ]
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap');

/* FIX ANTI-MELLESAT: Layout Lock */
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
  
  /* GPU Acceleration */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
}

.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f8fafc;
}

/* Sidebar & Hero */
.glass-card { background: white; border: 1px solid #e3e6f0; border-radius: 18px; }
.menu-btn { display: flex; align-items: center; gap: 12px; padding: 12px 16px; width: 100%; color: #5a5c69; text-decoration: none; font-weight: 500; border-radius: 12px; transition: 0.25s; }
.router-link-active.menu-btn { background: linear-gradient(135deg, #4e73df, #224abe); color: #fff !important; }

.admin-hero { background: linear-gradient(135deg, #4e73df 0%, #224abe 100%); color: white; border-radius: 20px; }
.hero-bg-icon { position: absolute; right: -20px; bottom: -20px; font-size: 180px; color: rgba(255,255,255,0.1); transform: rotate(-15deg); }

/* Table Styles */
.bg-header-table { background-color: #f8fafc; }
.tracking-wider { letter-spacing: 0.05em; font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
.dot-indicator { width: 8px; height: 8px; background: #4f46e5; border-radius: 50%; }

.badge-mapel-indigo { background: #eef2ff; color: #4f46e5; padding: 6px 14px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; border: 1px solid #e0e7ff; }
.avatar-mini-indigo { width: 32px; height: 32px; background: #818cf8; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
.badge-ruang { background: #f1f5f9; color: #475569; padding: 5px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; border: 1px solid #e2e8f0; }

/* Action Buttons */
.btn-action-edit { background: #f0fdf4; color: #16a34a; border: none; width: 35px; height: 35px; border-radius: 10px; transition: 0.2s; }
.btn-action-delete { background: #fff1f2; color: #e11d48; border: none; width: 35px; height: 35px; border-radius: 10px; transition: 0.2s; }
.btn-action-edit:hover, .btn-action-delete:hover { transform: scale(1.1); }

/* Animation */
.animate-jadwal { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>