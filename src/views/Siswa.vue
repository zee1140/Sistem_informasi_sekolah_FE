<template>
  <div class="app-container animate-siswa">
    
    <div class="header-section py-4 px-5 bg-white border-bottom shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <button class="btn btn-back mb-3" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left me-2"></i> Kembali
          </button>
          <h2 class="fw-bold text-dark mb-1">Manajemen Siswa</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item"><a href="#" @click.prevent="$router.push('/dashboard')" class="text-muted text-decoration-none">Beranda</a></li>
              <li class="breadcrumb-item active fw-semibold text-indigo">Data Siswa</li>
            </ol>
          </nav>
        </div>

        <div class="d-flex align-items-center gap-3">
          <div class="stats-badge shadow-sm">
            <div class="stats-content">
              <span class="stats-label">TOTAL SISWA</span>
              <span class="stats-number">{{ daftarSiswa.length }} Orang</span>
            </div>
          </div>
          <button class="btn btn-primary-jeprut shadow-sm px-4 py-2 rounded-pill" @click="bukaModal()">
            <i class="bi bi-person-plus-fill me-2 fs-5"></i>
            <span class="fw-bold">Tambah Siswa</span>
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
            <input v-model="search" class="form-control border-0 bg-transparent fs-6" placeholder="Cari nama siswa atau NIS..." />
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr class="bg-header-table">
                <th class="ps-4 py-4 text-uppercase tracking-wider">Informasi Siswa</th>
                <th class="py-4 text-uppercase tracking-wider">Kelas</th>
                <th class="py-4 text-uppercase tracking-wider text-center">Status</th>
                <th class="text-center py-4 text-uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(siswa, i) in filteredSiswa" :key="siswa.id" class="table-row-animate">
                <td class="ps-4 py-3">
                  <div class="d-flex align-items-center">
                    <div class="avatar-gradient me-3">
                      <i class="bi bi-person"></i>
                    </div>
                    <div>
                      <div class="fw-bold text-dark mb-0">{{ siswa.nama }}</div>
                      <small class="text-muted">NIS. 2026{{ 100 + i }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center text-dark fw-medium">
                    <i class="bi bi-door-open me-2 text-indigo opacity-75"></i>
                    {{ siswa.kelas }}
                  </div>
                </td>
                <td class="text-center">
                  <span class="badge-soft-indigo px-3 py-2">Aktif</span>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-action-view" @click="viewSiswa(siswa)"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-action-edit" @click="bukaModal(siswa)"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-action-delete" @click="hapusSiswa(siswa.id)"><i class="bi bi-trash3-fill"></i></button>
                  </div>
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
          <div class="p-4">
             <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="fw-bold mb-0 text-dark">{{ isView ? 'Detail' : (isEdit ? 'Edit' : 'Tambah') }} Siswa</h4>
                <button class="btn-close" @click="tutupModal"></button>
             </div>
             <div class="mb-3">
                <label class="form-label fw-bold text-secondary small">NAMA LENGKAP</label>
                <input v-model="formSiswa.nama" type="text" class="form-control custom-input" :readonly="isView">
             </div>
             <div class="mb-4">
                <label class="form-label fw-bold text-secondary small">KELAS</label>
                <select v-model="formSiswa.kelas" class="form-select custom-input" :disabled="isView">
                  <option value="10 IPA 1">10 IPA 1</option>
                  <option value="11 IPA 1">11 IPA 1</option>
                  <option value="12 IPA 1">12 IPA 1</option>
                </select>
             </div>
             <div class="d-flex gap-2">
                <button class="btn btn-light flex-grow-1 py-3 fw-bold" @click="tutupModal">Batal</button>
                <button v-if="!isView" class="btn btn-primary-jeprut flex-grow-1 py-3" @click="simpanSiswa">Simpan</button>
             </div>
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
      formSiswa: { nama: '', kelas: '' },
      daftarSiswa: [
        { id: 1, nama: 'Andi Wijaya', kelas: '12 IPA 1' },
        { id: 2, nama: 'Budi Setiawan', kelas: '11 IPA 1' },
        { id: 3, nama: 'Citra Lestari', kelas: '10 IPA 1' }
      ]
    }
  },
  computed: {
    filteredSiswa() {
      return this.daftarSiswa.filter(s => s.nama.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    bukaModal(siswa = null) {
      this.isView = false;
      if (siswa) { this.isEdit = true; this.editId = siswa.id; this.formSiswa = { ...siswa }; }
      else { this.isEdit = false; this.formSiswa = { nama: '', kelas: '' }; }
      this.showModal = true;
    },
    viewSiswa(siswa) { this.isView = true; this.formSiswa = { ...siswa }; this.showModal = true; },
    tutupModal() { this.showModal = false; },
    simpanSiswa() {
      if (!this.formSiswa.nama || !this.formSiswa.kelas) return;
      if (this.isEdit) {
        const idx = this.daftarSiswa.findIndex(s => s.id === this.editId);
        this.daftarSiswa[idx] = { ...this.formSiswa };
      } else {
        this.daftarSiswa.push({ id: Date.now(), ...this.formSiswa });
      }
      this.tutupModal();
    },
    hapusSiswa(id) { if (confirm("Hapus data ini?")) this.daftarSiswa = this.daftarSiswa.filter(s => s.id !== id); }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap');

/* SOLUSI ANTI-MELESAT: Mengunci Layout */
.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  overflow: hidden; /* Mencegah scrollbody utama */
  position: fixed; /* Kunci posisi */
  top: 0;
  left: 0;
  font-family: 'Public Sans', sans-serif;
  
  /* GPU Acceleration untuk transisi mulus */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
}

.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f8fafc;
  -webkit-overflow-scrolling: touch;
}

/* Desain Elemen */
.text-indigo { color: #4f46e5; }
.bg-header-table { background-color: #f8fafc; }

.btn-back {
  background: white; color: #64748b; border: 1px solid #e2e8f0;
  border-radius: 50px; padding: 0.4rem 1rem; font-weight: 600; font-size: 0.85rem; transition: 0.2s;
}
.btn-back:hover { background: #f1f5f9; color: #4f46e5; }

.stats-badge {
  background: white; border: 1.5px solid #eef2ff;
  border-radius: 50px; padding: 0 25px;
  display: flex; align-items: center; height: 50px;
}
.stats-label { font-size: 0.6rem; font-weight: 800; color: #94a3b8; letter-spacing: 0.08em; }
.stats-number { font-size: 0.95rem; font-weight: 800; color: #4f46e5; margin-left: 8px; }

.btn-primary-jeprut {
  background: #4f46e5; border: none; color: white;
  font-weight: 700; transition: 0.3s;
}
.btn-primary-jeprut:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4); }

/* Table Styles */
.tracking-wider { letter-spacing: 0.05em; font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
.avatar-gradient {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  color: white; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}
.badge-soft-indigo { background-color: #eef2ff; color: #4f46e5; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }

/* Buttons */
.btn-action-view { background: #f0f9ff; color: #0284c7; border: none; width: 35px; height: 35px; border-radius: 10px; margin-right: 5px; }
.btn-action-edit { background: #f0fdf4; color: #16a34a; border: none; width: 35px; height: 35px; border-radius: 10px; margin-right: 5px; }
.btn-action-delete { background: #fff1f2; color: #e11d48; border: none; width: 35px; height: 35px; border-radius: 10px; }

/* Modal */
.admin-modal-overlay {
  position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 9999;
}
.admin-modal-box { background: white; width: 400px; }
.custom-input { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px; }

/* Animasi */
.animate-siswa { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>