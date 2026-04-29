<template>
  <div class="main-wrapper py-5">
    <div class="container">

      <div class="row mb-5 align-items-center">
        <div class="col-auto me-2">
          <button class="btn-back" @click="goDashboard">
            <i class="bi bi-arrow-left"></i>
          </button>
        </div>

        <div class="col">
          <h1 class="fw-bold mb-1">Manajemen Kelas</h1>
          <p class="text-muted mb-0">Daftar seluruh kelas di JeprutSchool</p>
        </div>

        <div class="col-auto">
          <button class="btn-primary-jeprut shadow-sm" @click="openModal">
            <i class="bi bi-plus-lg me-2"></i> Tambah Kelas
          </button>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-4 mb-4 action-card">
        <div class="card-body p-3">
          <div class="search-group">
            <i class="bi bi-search search-icon"></i>
            <input
              v-model="search"
              type="text"
              class="form-control custom-search ps-5"
              placeholder="Cari berdasarkan nama kelas atau wali..."
            />
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-table-head border-bottom">
              <tr>
                <th class="ps-4 py-3 text-uppercase text-primary fs-7 fw-bold">Nama Kelas</th>
                <th class="py-3 text-uppercase text-primary fs-7 fw-bold text-center">Wali Kelas</th>
                <th class="py-3 text-uppercase text-primary fs-7 fw-bold text-center">Jumlah Siswa</th>
                <th class="py-3 text-uppercase text-primary fs-7 fw-bold text-center">Aksi Management</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(kelas, index) in filteredKelas" :key="index">
                <td class="ps-4 fw-bold h6 mb-0 py-4">{{ kelas.nama }}</td>
                <td class="text-secondary text-center">{{ kelas.wali }}</td>
                <td class="text-center">
                  <span class="badge-kelas">{{ kelas.jumlah }} Siswa</span>
                </td>

                <td class="text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button class="btn-action edit" @click="editData(index)">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn-action delete" @click="deleteData(index)">
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredKelas.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <i class="bi bi-search fs-1 mb-3 d-block text-light"></i>
                  Data tidak ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <transition name="fade">
        <div v-if="showModal" class="admin-modal-overlay">
          <div class="admin-modal-box shadow-lg">
            <div class="modal-header-admin border-0 p-4 pb-0">
              <h4 class="fw-bold mb-1">{{ isEdit ? 'Update Data Kelas' : 'Tambah Kelas Baru' }}</h4>
              <p class="text-muted small">Pastikan informasi data kelas sudah benar.</p>
            </div>

            <div class="modal-body-admin p-4">
              <div class="input-group-admin mb-3">
                <label class="fw-semibold small mb-2 d-block">Nama Kelas</label>
                <input v-model="form.nama" class="form-control custom-input" placeholder="Contoh: 10A" />
              </div>

              <div class="input-group-admin mb-3">
                <label class="fw-semibold small mb-2 d-block">Wali Kelas</label>
                <input v-model="form.wali" class="form-control custom-input" placeholder="Nama Guru" />
              </div>

              <div class="input-group-admin">
                <label class="fw-semibold small mb-2 d-block">Jumlah Siswa</label>
                <input v-model="form.jumlah" type="number" class="form-control custom-input" placeholder="0" />
              </div>
            </div>

            <div class="modal-footer-admin p-4 pt-0 d-flex gap-2">
              <button class="btn btn-light w-100 py-2 fw-bold text-muted" @click="closeModal">Batal</button>
              <button class="btn btn-primary-jeprut w-100 py-2" @click="saveData">
                {{ isEdit ? 'Update Data' : 'Simpan Data' }}
              </button>
            </div>
          </div>
        </div>
      </transition>

    </div>
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
      if (!this.form.nama || !this.form.wali) return alert("Isi data dulu!");
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
/* GLOBAL & BACKGROUND */
.main-wrapper { background-color: #f8faff; min-height: 100vh; }

/* HEADER BUTTONS */
.btn-back {
  width: 42px; height: 42px; border-radius: 12px; border: none;
  background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: 0.3s; color: #4e73df;
}
.btn-back:hover { background: #4e73df; color: #fff; }

.btn-primary-jeprut {
  background: #4e73df; color: white; border: none;
  padding: 10px 24px; border-radius: 12px; font-weight: 600;
  transition: 0.3s;
}
.btn-primary-jeprut:hover { background: #3e5fbb; transform: translateY(-2px); }

/* SEARCH BAR */
.search-group { position: relative; }
.search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #adb5bd; }
.custom-search { border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; background: #fff; }

/* TABLE */
.bg-table-head { background-color: #fff; }
.fs-7 { font-size: 0.75rem; letter-spacing: 0.05rem; }
.badge-kelas {
  background: #eef2ff; color: #4e73df; font-weight: 800;
  padding: 6px 16px; border-radius: 10px; font-size: 0.85rem;
}

/* ACTION BUTTONS (EDIT & DELETE) */
.btn-action { border: none; padding: 8px 12px; border-radius: 10px; transition: 0.2s; }
.btn-action.edit { background: #eef2ff; color: #4e73df; }
.btn-action.delete { background: #fff5f5; color: #dc3545; }
.btn-action:hover { opacity: 0.8; transform: scale(1.1); }

/* MODAL OVERLAY */
.admin-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.4); display: flex; align-items: center;
  justify-content: center; z-index: 9999;
}
.admin-modal-box { background: white; width: 450px; border-radius: 20px; overflow: hidden; }
.custom-input { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px; }

/* ANIMATION */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>