<template>
  <div class="app-container animate-home">
    
    <div class="header-section py-4 px-5 bg-white border-bottom shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <button class="btn btn-back mb-3" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left me-2"></i> Kembali
          </button>
          <h2 class="fw-bold text-dark mb-1">Manajemen Guru</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item"><a href="#" @click.prevent="$router.push('/dashboard')" class="text-muted text-decoration-none">Beranda</a></li>
              <li class="breadcrumb-item active fw-semibold text-indigo">Data Pengajar</li>
            </ol>
          </nav>
        </div>

        <div class="d-flex align-items-center gap-3">
          <div class="stats-badge shadow-sm">
            <div class="stats-content">
              <span class="stats-label">TOTAL PENGAJAR</span>
              <span class="stats-number">{{ daftarGuru.length }} Orang</span>
            </div>
          </div>

          <button class="btn btn-primary-jeprut shadow-sm px-4 py-2 rounded-pill" @click="bukaModal()">
            <i class="bi bi-person-plus-fill me-2 fs-5"></i>
            <span class="fw-bold">Tambah Guru</span>
          </button>
        </div>
      </div>
    </div>

    <div class="content-scroll-area p-5">
      
      <div class="card search-card shadow-sm border-0 mb-4 rounded-4">
        <div class="card-body p-3">
          <div class="input-group input-group-lg">
            <span class="input-group-text bg-transparent border-0 ps-3">
              <i class="bi bi-search text-indigo"></i>
            </span>
            <input v-model="search" class="form-control border-0 bg-transparent fs-6" placeholder="Cari nama guru atau mata pelajaran..." />
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr class="bg-header-table">
                <th class="ps-4 py-4 text-uppercase tracking-wider">Informasi Pengajar</th>
                <th class="py-4 text-uppercase tracking-wider">Mata Pelajaran</th>
                <th class="py-4 text-uppercase tracking-wider text-center">Status</th>
                <th class="text-center py-4 text-uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(guru, i) in filteredGuru" :key="guru.id" class="table-row-animate">
                <td class="ps-4 py-3">
                  <div class="d-flex align-items-center">
                    <div class="avatar-gradient me-3">
                      <i class="bi bi-person-workspace"></i>
                    </div>
                    <div>
                      <div class="fw-bold text-dark mb-0">{{ guru.nama }}</div>
                      <small class="text-muted">NIP. {{ 198000 + i }}XXXX</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center text-dark fw-medium">
                    <i class="bi bi-book-half me-2 text-indigo opacity-75"></i>
                    {{ guru.mapel }}
                  </div>
                </td>
                <td class="text-center">
                  <span class="badge-soft-indigo px-3 py-2">Aktif</span>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-action-view" @click="viewGuru(guru)" title="Lihat Detail">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-action-edit" @click="bukaModal(guru)" title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-action-delete" @click="hapusGuru(guru.id)" title="Hapus">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredGuru.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <i class="bi bi-search fs-1 mb-3 d-block opacity-25"></i>
                  Data tidak ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <transition name="slide-up">
      <div v-if="showModal" class="admin-modal-overlay">
        <div class="admin-modal-box shadow-lg border-0 rounded-4">
          <div class="modal-header-admin border-0 p-4 pb-0 d-flex justify-content-between align-items-center">
            <div>
              <h4 class="fw-bold mb-1">{{ isView ? 'Detail Guru' : (isEdit ? 'Edit Guru' : 'Input Guru') }}</h4>
              <p class="text-muted small">Kelola data pengajar JeprutSchool.</p>
            </div>
            <button class="btn-close" @click="tutupModal"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small text-uppercase">Nama Lengkap</label>
              <input v-model="formGuru.nama" type="text" class="form-control custom-input" :readonly="isView" placeholder="Contoh: Budi Santoso, S.Pd">
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small text-uppercase">Mata Pelajaran</label>
              <input v-model="formGuru.mapel" type="text" class="form-control custom-input" :readonly="isView" placeholder="Contoh: Matematika">
            </div>
          </div>
          <div class="modal-footer border-0 p-4 pt-0 d-flex gap-3">
            <button class="btn btn-light flex-grow-1 py-3 rounded-3 fw-bold text-muted" @click="tutupModal">Batal</button>
            <button v-if="!isView" class="btn btn-primary-jeprut flex-grow-1 py-3 rounded-3" @click="simpanGuru">
               {{ isEdit ? 'Simpan Perubahan' : 'Simpan Data' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      showModal: false,
      isEdit: false,
      isView: false,
      editId: null,
      formGuru: { nama: '', mapel: '' },
      daftarGuru: [
        { id: 1, nama: 'Budi Santoso, S.Pd', mapel: 'Matematika' },
        { id: 2, nama: 'Siti Aminah, M.Si', mapel: 'Fisika' },
        { id: 3, nama: 'Rian Hidayat, S.Kom', mapel: 'Informatika' }
      ]
    }
  },
  computed: {
    filteredGuru() {
      return this.daftarGuru.filter(g =>
        g.nama.toLowerCase().includes(this.search.toLowerCase()) ||
        g.mapel.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    bukaModal(guru = null) {
      this.isView = false;
      if (guru) {
        this.isEdit = true;
        this.editId = guru.id;
        this.formGuru = { ...guru };
      } else {
        this.isEdit = false;
        this.formGuru = { nama: '', mapel: '' };
      }
      this.showModal = true;
    },
    viewGuru(guru) {
      this.isView = true;
      this.formGuru = { ...guru };
      this.showModal = true;
    },
    tutupModal() { this.showModal = false; },
    simpanGuru() {
      if (!this.formGuru.nama || !this.formGuru.mapel) return;
      if (this.isEdit) {
        const idx = this.daftarGuru.findIndex(g => g.id === this.editId);
        this.daftarGuru[idx] = { ...this.formGuru };
      } else {
        this.daftarGuru.push({ id: Date.now(), ...this.formGuru });
      }
      this.tutupModal();
    },
    hapusGuru(id) {
      if (confirm("Hapus data guru?")) this.daftarGuru = this.daftarGuru.filter(g => g.id !== id);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap');

/* Fix Layout Full Layar */
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
}

.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f8fafc;
}

/* UI Elements */
.text-indigo { color: #4f46e5; }
.header-section { border-bottom: 1px solid #e2e8f0; }

.btn-back {
  background: white; color: #64748b; border: 1px solid #e2e8f0;
  border-radius: 50px; padding: 0.4rem 1rem; font-weight: 600; font-size: 0.85rem;
}

/* Stats Badge */
.stats-badge {
  background: white; border: 1.5px solid #eef2ff;
  border-radius: 50px; padding: 0 25px;
  display: flex; align-items: center; height: 50px;
}
.stats-content { display: flex; flex-direction: column; text-align: left; line-height: 1.2; }
.stats-label { font-size: 0.6rem; font-weight: 800; color: #94a3b8; letter-spacing: 0.08em; }
.stats-number { font-size: 0.95rem; font-weight: 800; color: #4f46e5; }

/* Buttons */
.btn-primary-jeprut {
  background: #4f46e5; border: none; color: white;
  font-weight: 700; transition: 0.3s;
}
.btn-primary-jeprut:hover {
  background: #3730a3; transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

/* Table Design */
.bg-header-table { background-color: #f8fafc; }
.tracking-wider { letter-spacing: 0.05em; font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
.badge-soft-indigo { background-color: #eef2ff; color: #4f46e5; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }

.avatar-gradient {
  width: 42px; height: 42px;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  color: white; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}

/* Action Icons */
.btn-action-view { background: #f0f9ff; color: #0284c7; border: none; width: 38px; height: 38px; border-radius: 10px; transition: 0.2s; }
.btn-action-edit { background: #f0fdf4; color: #16a34a; border: none; width: 38px; height: 38px; border-radius: 10px; transition: 0.2s; }
.btn-action-delete { background: #fff1f2; color: #e11d48; border: none; width: 38px; height: 38px; border-radius: 10px; transition: 0.2s; }
.btn-action-view:hover, .btn-action-edit:hover, .btn-action-delete:hover { opacity: 0.8; transform: scale(1.05); }

/* Modal Design */
.admin-modal-overlay {
  position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center; z-index: 9999;
}
.admin-modal-box { background: white; width: 420px; overflow: hidden; }
.custom-input { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px; }
.custom-input:focus { border-color: #4f46e5; box-shadow: none; background: white; }

/* Animations */
.animate-home { animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>