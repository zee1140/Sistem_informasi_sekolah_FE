<template>
  <div class="container-fluid py-4 animate-page">

    <div class="row mb-4 align-items-center fade-in">
      <div class="col">
        <h3 class="admin-title">Manajemen Kelas</h3>
        <p class="text-muted small">Daftar seluruh kelas di JeprutSchool</p>
      </div>
      <div class="col-auto">
     <button class="btn-admin-primary btn-tambah" @click="openModal">
  <i class="bi bi-plus-lg me-2"></i> Tambah Kelas
</button>
      </div>
    </div>

    <div class="admin-card p-3 mb-4 fade-in-delay">
      <div class="search-wrapper">
        <i class="bi bi-search"></i>
        <input
          type="text"
          v-model="search"
          placeholder="Cari berdasarkan nama kelas atau wali..."
          class="search-input"
        />
      </div>
    </div>

    <div class="admin-card overflow-hidden fade-up">
      <div class="table-responsive">
        <table class="table admin-table align-middle">
          <thead>
            <tr>
              <th>Nama Kelas</th>
              <th>Wali Kelas</th>
              <th>Jumlah Siswa</th>
              <th class="text-center" width="180">Aksi Management</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(kelas, index) in filteredKelas" :key="index" class="row-anim">
              <td class="fw-bold text-dark">{{ kelas.nama }}</td>
              <td><span class="text-secondary">{{ kelas.wali }}</span></td>
              <td><span class="badge-kelas">{{ kelas.jumlah }} Siswa</span></td>

              <td class="text-center">
                <button class="btn-icon edit" @click="editData(index)" title="Edit">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn-icon delete" @click="deleteData(index)" title="Hapus">
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>

            <tr v-if="filteredKelas.length === 0">
              <td colspan="4" class="text-center py-5 text-muted">
                Data tidak ditemukan.
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

    <!-- MODAL -->
    <transition name="fade">
      <div v-if="showModal" class="admin-modal-overlay">
        <div class="admin-modal-box scale-in">

          <div class="modal-header-admin">
            <h4>{{ isEdit ? 'Edit Kelas' : 'Tambah Kelas' }}</h4>
            <p>Pastikan informasi data kelas sudah benar.</p>
          </div>

          <div class="modal-body-admin">
            <div class="input-group-admin">
              <label>Nama Kelas</label>
              <input v-model="form.nama" placeholder="Masukkan nama kelas..." />
            </div>

            <div class="input-group-admin">
              <label>Wali Kelas</label>
              <input v-model="form.wali" placeholder="Nama wali kelas..." />
            </div>

            <div class="input-group-admin">
              <label>Jumlah Siswa</label>
              <input v-model="form.jumlah" type="number" />
            </div>
          </div>

          <div class="modal-footer-admin">
            <button class="btn-admin-primary w-100" @click="saveData">
              <i class="bi bi-check-circle me-2"></i> Simpan Data
            </button>
            <button class="btn-admin-outline w-100 mt-2" @click="closeModal">
              Batal
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
    openModal() {
      this.showModal = true
      this.isEdit = false
      this.form = { nama: "", wali: "", jumlah: "" }
    },

    closeModal() {
      this.showModal = false
    },

    saveData() {
      if (this.isEdit) {
        this.kelasList[this.editIndex] = { ...this.form }
      } else {
        this.kelasList.push({ ...this.form })
      }
      this.closeModal()
    },

    editData(index) {
      this.form = { ...this.kelasList[index] }
      this.editIndex = index
      this.isEdit = true
      this.showModal = true
    },

    deleteData(index) {
      if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        this.kelasList.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
/* ===== ADMIN THEME ===== */
:root {
  --primary: #4e73df;
  --primary-hover: #2e59d9;
  --border: #e3e6f0;
  --bg-soft: #f8f9fc;
  --text-main: #2c3e50;
  --text-muted: #858796;
}

/* PAGE */
.animate-page {
  animation: fadeInPage 0.5s ease-out;
}

.admin-title {
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0;
}

/* ===== SEARCH ===== */
.search-wrapper {
  position: relative;
}

.search-wrapper i {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #b7b9cc;
}

.search-input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #fff;
  transition: 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.1);
}

/* ===== CARD ===== */
.admin-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 0.15rem 1.2rem rgba(58, 59, 69, 0.05);
}

/* ===== TABLE ===== */
.admin-table thead {
  background: var(--bg-soft);
}

.admin-table th {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: #4e5d78;
  padding: 16px;
  border-bottom: 2px solid var(--border);
}

.admin-table td {
  padding: 16px;
  border-bottom: 1px solid #f2f4f9;
}

/* Hover row */
.admin-table tbody tr:hover {
  background: #f9fbff;
  transition: 0.2s;
}

/* ===== BADGE ===== */
.badge-kelas {
  background: #eef2ff;
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
}

/* ===== BUTTON ===== */
.admin-modal-box {
  background: #fff;
  border-radius: 16px;
  width: 420px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  border: 1px solid #e3e6f0;
}

.modal-header-admin h4 {
  font-weight: 800;
  color: #2c3e50;
  text-align: center;
}

.modal-header-admin p {
  text-align: center;
  font-size: 0.85rem;
  color: #858796;
  margin-bottom: 20px;
}

.input-group-admin label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #4e5d78;
  margin-bottom: 6px;
  display: block;
}

.input-group-admin input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e3e6f0;
  background: #fff;
  transition: 0.3s;
}

.input-group-admin input:focus {
  border-color: #4e73df;
  box-shadow: 0 0 0 3px rgba(78,115,223,0.15);
  outline: none;
}

/* BUTTON BIRU SAMA PERSIS SISWA */
.btn-admin-primary {
  background: #4e73df !important;
  color: #fff !important;
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-weight: 600;
}

.btn-admin-primary:hover {
  background: #2e59d9 !important;
}

.btn-admin-outline {
  background: transparent;
  border: 1px solid #d1d3e2;
  color: #858796;
  padding: 10px;
  border-radius: 10px;
  font-weight: 600;
}

.btn-admin-outline:hover {
  background: #f8f9fc;
}

/* ===== ICON BUTTON ===== */
.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  margin: 0 4px;
  transition: 0.2s;
}

.btn-icon.edit {
  background: #eef2ff;
  color: var(--primary);
}

.btn-icon.delete {
  background: #fff1f0;
  color: #ff4d4f;
}

.btn-icon:hover {
  transform: scale(1.1);
}

/* ===== MODAL ===== */
.admin-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 45, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.admin-modal-box {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: scaleIn 0.3s ease;
}

.modal-header-admin h4 {
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
}

.modal-header-admin p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.input-group-admin {
  margin-bottom: 15px;
}

.input-group-admin label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #4e5d78;
  margin-bottom: 5px;
}

.input-group-admin input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  transition: 0.2s;
}

.input-group-admin input:focus {
  outline: none;
  border-color: var(--primary);
}

/* FIX tombol biar gak putih */
.btn-tambah {
  background: #4e73df !important;
  color: #fff !important;
  border: none !important;
}

.btn-tambah:hover {
  background: #2e59d9 !important;
  color: #fff !important;
}

/* ===== ANIMATIONS ===== */
@keyframes fadeInPage {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>