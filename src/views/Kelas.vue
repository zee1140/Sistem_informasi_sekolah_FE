<template>
  <div class="app-container animate-home">
    
    <div class="header-section py-4 px-5 bg-white border-bottom shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <button class="btn btn-back mb-3" @click="goDashboard">
            <i class="bi bi-arrow-left me-2"></i> Kembali
          </button>
          <h2 class="fw-bold text-dark mb-1">Manajemen Kelas</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item"><a href="#" @click.prevent="goDashboard" class="text-muted text-decoration-none">Beranda</a></li>
              <li class="breadcrumb-item active fw-semibold text-indigo">Data Kelas</li>
            </ol>
          </nav>
        </div>

        <div class="text-end">
          <div class="badge-stats mb-2">Total: {{ kelasList.length }} Kelas Terdaftar</div>
          <button class="btn btn-primary-jeprut shadow-sm px-4 py-2 rounded-pill" @click="openModal">
            <i class="bi bi-plus-circle-fill me-2"></i> Tambah Kelas
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
            <input v-model="search" class="form-control border-0 bg-transparent fs-6" placeholder="Cari nama kelas atau wali kelas di sini..." />
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr class="bg-header-table">
                <th class="ps-4 py-4 text-uppercase tracking-wider">Informasi Kelas</th>
                <th class="py-4 text-uppercase tracking-wider text-center">Wali Kelas</th>
                <th class="py-4 text-uppercase tracking-wider text-center">Kapasitas</th>
                <th class="text-center py-4 text-uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kelas, index) in filteredKelas" :key="index" class="table-row-animate">
                <td class="ps-4 py-3">
                  <div class="d-flex align-items-center">
                    <div class="avatar-gradient me-3">
                      <i class="bi bi-door-open-fill"></i>
                    </div>
                    <div>
                      <div class="fw-bold text-dark mb-0">{{ kelas.nama }}</div>
                      <small class="text-muted">JeprutSchool Academic</small>
                    </div>
                  </div>
                </td>
                <td class="text-center text-secondary fw-semibold">
                   {{ kelas.wali }}
                </td>
                <td class="text-center">
                  <span class="badge-soft-indigo px-3 py-2">
                    <i class="bi bi-people-fill me-1"></i> {{ kelas.jumlah }} Siswa
                  </span>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-action-edit" @click="editData(index)" title="Edit Kelas">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-action-delete" @click="deleteData(index)" title="Hapus Kelas">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredKelas.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <i class="bi bi-search fs-1 mb-3 d-block opacity-25"></i>
                  Data kelas tidak ditemukan
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
              <h4 class="fw-bold mb-1">{{ isEdit ? 'Update Data Kelas' : 'Tambah Kelas Baru' }}</h4>
              <p class="text-muted small">Lengkapi informasi kelas di bawah ini.</p>
            </div>
            <button class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body-admin p-4">
            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small text-uppercase">Nama Kelas</label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0"><i class="bi bi-door-open"></i></span>
                <input v-model="form.nama" class="form-control custom-input border-start-0" placeholder="Contoh: 10 IPA 1" />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold text-secondary small text-uppercase">Wali Kelas</label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0"><i class="bi bi-person-badge"></i></span>
                <input v-model="form.wali" class="form-control custom-input border-start-0" placeholder="Nama Guru" />
              </div>
            </div>

            <div class="mb-2">
              <label class="form-label fw-bold text-secondary small text-uppercase">Jumlah Siswa</label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0"><i class="bi bi-people"></i></span>
                <input v-model="form.jumlah" type="number" class="form-control custom-input border-start-0" placeholder="0" />
              </div>
            </div>
          </div>

          <div class="modal-footer-admin p-4 pt-0 d-flex gap-3">
            <button class="btn btn-light flex-grow-1 py-3 rounded-3 text-muted fw-bold" @click="closeModal">Batal</button>
            <button class="btn btn-primary-jeprut flex-grow-1 py-3 rounded-3 shadow-sm" @click="saveData">
              {{ isEdit ? 'Simpan Perubahan' : 'Tambah Kelas' }}
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
      editIndex: null,
      kelasList: [
        { nama: "10A", wali: "Pak Budi", jumlah: 32 },
        { nama: "11B", wali: "Bu Siti", jumlah: 30 },
        { nama: "12C", wali: "Pak Andi", jumlah: 28 }
      ],
      form: { nama: "", wali: "", jumlah: "" }
    }
  },
  computed: {
    filteredKelas() {
      return this.kelasList.filter(k =>
        k.nama.toLowerCase().includes(this.search.toLowerCase()) ||
        k.wali.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    goDashboard() { this.$router.push('/dashboard') },
    openModal() {
      this.showModal = true;
      this.isEdit = false;
      this.form = { nama: "", wali: "", jumlah: "" };
    },
    closeModal() { this.showModal = false; },
    saveData() {
      if (!this.form.nama || !this.form.wali) return alert("Mohon isi data dengan lengkap!");
      if (this.isEdit) {
        this.kelasList[this.editIndex] = { ...this.form };
      } else {
        this.kelasList.push({ ...this.form });
      }
      this.closeModal();
    },
    editData(index) {
      this.form = { ...this.kelasList[index] };
      this.editIndex = index;
      this.isEdit = true;
      this.showModal = true;
    },
    deleteData(index) {
      if (confirm('Hapus data kelas ini?')) this.kelasList.splice(index, 1);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap');

/* Fix Layout agar nempel ke pinggir */
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

.btn-back {
  background: white; color: #64748b; border: 1px solid #e2e8f0;
  border-radius: 50px; padding: 0.4rem 1.2rem; font-weight: 600; font-size: 0.85rem;
}

.btn-primary-jeprut {
  background: #4f46e5; border: none; color: white;
  font-weight: 700; transition: 0.3s;
}
.btn-primary-jeprut:hover {
  background: #3730a3; transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

.badge-stats {
  background: #eef2ff; color: #4f46e5; padding: 6px 14px;
  border-radius: 50px; font-weight: 800; font-size: 0.75rem; display: inline-block;
}

/* Table Design */
.bg-header-table { background-color: #f8fafc; }
.tracking-wider { letter-spacing: 0.05em; font-size: 0.7rem; font-weight: 800; color: #94a3b8; }

.avatar-gradient {
  width: 42px; height: 42px;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  color: white; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}

.badge-soft-indigo {
  background-color: #eef2ff; color: #4f46e5; border-radius: 8px;
  font-weight: 700; font-size: 0.85rem;
}

/* Action Buttons */
.btn-action-edit {
  background: #f0fdf4; color: #16a34a; border: none; width: 38px; height: 38px; border-radius: 10px; transition: 0.2s;
}
.btn-action-edit:hover { background: #16a34a; color: white; }

.btn-action-delete {
  background: #fff1f2; color: #e11d48; border: none; width: 38px; height: 38px; border-radius: 10px; transition: 0.2s;
}
.btn-action-delete:hover { background: #e11d48; color: white; }

/* Modal Design */
.admin-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center; z-index: 9999;
}
.admin-modal-box { background: white; width: 450px; overflow: hidden; }
.custom-input { border-radius: 0 12px 12px 0; border-color: #e2e8f0; padding: 12px; }
.input-group-text { border-radius: 12px 0 0 12px; border-color: #e2e8f0; }

/* Animations */
.animate-home { animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>