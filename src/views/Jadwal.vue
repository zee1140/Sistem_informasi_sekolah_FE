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
            <h6 class="text-uppercase small fw-bold text-muted mb-4">Main Navigation</h6>
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
          </div>
        </div>

        <div class="col-md-9">
          <div class="admin-hero p-5 mb-4 position-relative overflow-hidden">
            <div class="position-relative z-1">
              <h2>Jadwal Pelajaran</h2>
              <p class="lead mb-0">Atur dan pantau alokasi waktu belajar mengajar tiap kelas.</p>
            </div>
            <i class="bi bi-calendar-check hero-bg-icon"></i>
          </div>

          <div class="admin-card p-4">
            <div class="card-title-box d-flex justify-content-between align-items-center mb-4">
              <div class="d-flex align-items-center gap-3">
                <h6><i class="bi bi-calendar3 me-2"></i>Jadwal Hari Ini</h6>
                <select class="form-select form-select-sm select-kelas">
                  <option>Semua Kelas</option>
                  <option>10 IPA 1</option>
                  <option>11 IPS 2</option>
                  <option>12 IPA 3</option>
                </select>
              </div>
              <button class="btn-admin-primary py-2 px-3 fs-6">
                <i class="bi bi-plus-circle"></i> Buat Jadwal Baru
              </button>
            </div>

            <div class="table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Mata Pelajaran</th>
                    <th>Kelas</th>
                    <th>Guru Pengajar</th>
                    <th class="text-center">Ruangan</th>
                    <th class="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in jadwalHariIni" :key="index">
                    <td class="fw-bold"><i class="bi bi-clock me-1 text-primary"></i> {{ item.waktu }}</td>
                    <td><span class="badge-mapel">{{ item.mapel }}</span></td>
                    <td class="fw-semibold">{{ item.kelas }}</td>
                    <td>{{ item.guru }}</td>
                    <td class="text-center"><span class="badge bg-light text-dark border">{{ item.ruang }}</span></td>
                    <td>
                      <div class="d-flex justify-content-center gap-2">
                        <button class="btn-action edit"><i class="bi bi-pencil"></i></button>
                        <button class="btn-action delete"><i class="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap');

.app-wrapper {
  background-color: #f8f9fc;
  min-height: 100vh;
  font-family: 'Public Sans', sans-serif;
}

.navbar { background: #ffffff; border-bottom: 1px solid #e3e6f0; }
.navbar-brand { font-weight: 800; color: #4e73df; }
.badge-admin { font-size: 0.6rem; background: #eaecf4; color: #5a5c69; padding: 2px 8px; border-radius: 4px; }

/* Sidebar & Hero */
.glass-card { background: white; border: 1px solid #e3e6f0; border-radius: 18px; }
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

  white-space: nowrap; /* penting */
}

.menu-btn:hover {
  background: #f1f4ff;
  color: #4e73df;
  transform: translateX(5px);
}
/* optional biar lebih rapi lagi */
.menu-btn span {
  overflow: hidden;
  text-overflow: ellipsis;
}
.router-link-active.menu-btn { background: linear-gradient(135deg, #4e73df, #224abe); color: #fff !important; }

.admin-hero { background: linear-gradient(135deg, #4e73df 0%, #224abe 100%); color: white; border-radius: 20px; }
.hero-bg-icon { position: absolute; right: -20px; bottom: -20px; font-size: 180px; color: rgba(255,255,255,0.1); transform: rotate(-15deg); }

/* Table Section */
.admin-card { background: white; border: 1px solid #e3e6f0; border-radius: 18px; }
.select-kelas { width: auto; border-radius: 8px; border-color: #e3e6f0; }

.custom-table thead th { background: #f8f9fc; color: #4e73df; text-transform: uppercase; font-size: 0.75rem; font-weight: 700; padding: 15px; border-bottom: 2px solid #e3e6f0; }
.custom-table tbody td { padding: 15px; vertical-align: middle; color: #5a5c69; border-bottom: 1px solid #f8f9fc; }

.badge-mapel { background: #f1f4ff; color: #4e73df; padding: 6px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; }

.btn-admin-primary { background: #4e73df; color: white; border: none; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; }

/* Actions */
.btn-action { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.edit { background: #eaecf4; color: #4e73df; }
.delete { background: #ffebeb; color: #e74a3b; }
.btn-action:hover { transform: scale(1.1); }

.animate-home { animation: fadeIn 0.6s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>