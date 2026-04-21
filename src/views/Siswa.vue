<template>
  <div class="container-fluid py-4 animate-page">

    <div class="row mb-4 align-items-center fade-in">
      <div class="col">
        <h3 class="admin-title">Manajemen Siswa</h3>
        <p class="text-muted small">Daftar seluruh siswa aktif di JeprutSchool</p>
      </div>
      <div class="col-auto">
        <button class="btn-admin-primary" @click="openModal()">
          <i class="bi bi-plus-lg me-2"></i> Tambah Siswa
        </button>
      </div>
    </div>

    <div class="admin-card p-3 mb-4 fade-in-delay">
      <div class="search-wrapper">
        <i class="bi bi-search"></i>
        <input type="text" v-model="search" placeholder="Cari berdasarkan nama atau kelas..." class="search-input" />
      </div>
    </div>

    <div class="admin-card overflow-hidden fade-up">
      <div class="table-responsive">
        <table class="table admin-table align-middle">
          <thead>
            <tr>
              <th>Nama Lengkap</th>
              <th>Alamat Email</th>
              <th>Kelas</th>
              <th class="text-center" width="180">Aksi Management</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(siswa, index) in filteredSiswa" :key="index" class="row-anim">
              <td class="fw-bold text-dark">{{ siswa.nama }}</td>
              <td><span class="text-secondary">{{ siswa.email }}</span></td>
              <td><span class="badge-kelas">{{ siswa.kelas }}</span></td>
              <td class="text-center">
                <button class="btn-icon edit" @click="editData(index)" title="Edit">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn-icon delete" @click="deleteData(index)" title="Hapus">
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredSiswa.length === 0">
              <td colspan="4" class="text-center py-5 text-muted">Data tidak ditemukan.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showModal" class="admin-modal-overlay">
        <div class="admin-modal-box scale-in">
          <div class="modal-header-admin">
            <h4>{{ isEdit ? 'Edit Data' : 'Tambah Siswa' }}</h4>
            <p>Pastikan informasi data siswa sudah benar.</p>
          </div>

          <div class="modal-body-admin">
            <div class="input-group-admin">
              <label>Nama Lengkap</label>
              <input v-model="form.nama" placeholder="Masukkan nama...">
            </div>
            <div class="input-group-admin">
              <label>Email</label>
              <input v-model="form.email" placeholder="contoh@gmail.com">
            </div>
            <div class="input-group-admin">
              <label>Kelas</label>
              <input v-model="form.kelas" placeholder="Misal: 10 IPA 1">
            </div>
          </div>

          <div class="modal-footer-admin">
            <button class="btn-admin-primary w-100" @click="saveData">
              <i class="bi bi-check-circle me-2"></i> Simpan Data
            </button>
            <button class="btn-admin-outline w-100 mt-2" @click="closeModal">Batal</button>
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
      siswaList: [
        { nama: "Budi Santoso", email: "budi@gmail.com", kelas: "10A" },
        { nama: "Siti Aminah", email: "siti@gmail.com", kelas: "11B" },
        { nama: "Rizky Pratama", email: "rizky@gmail.com", kelas: "12C" }
      ],
      form: { nama: "", email: "", kelas: "" }
    }
  },
  computed: {
    filteredSiswa() {
      return this.siswaList.filter(s =>
        s.nama.toLowerCase().includes(this.search.toLowerCase()) ||
        s.kelas.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    openModal() {
      this.showModal = true
      this.isEdit = false
      this.form = { nama: "", email: "", kelas: "" }
    },
    closeModal() {
      this.showModal = false
    },
    saveData() {
      if (this.isEdit) {
        this.siswaList[this.editIndex] = { ...this.form }
      } else {
        this.siswaList.push({ ...this.form })
      }
      this.closeModal()
    },
    editData(index) {
      this.form = { ...this.siswaList[index] }
      this.editIndex = index
      this.isEdit = true
      this.showModal = true
    },
    deleteData(index) {
      if(confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        this.siswaList.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
/* KONFIGURASI WARNA ADMIN */
:root {
  --primary: #4e73df;
  --dark: #1e1e2d;
  --border: #e3e6f0;
  --bg-soft: #f8f9fc;
}

.animate-page {
  animation: fadeInPage 0.5s ease-out;
}

.admin-title {
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0;
}

/* SEARCH BOX ADMIN */
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-wrapper i {
  position: absolute;
  left: 15px;
  color: #b7b9cc;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #fff;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.1);
}

/* CARD & TABLE ADMIN */
.admin-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.05);
}

.admin-table thead {
  background: #f8f9fc;
}

.admin-table th {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: #4e5d78;
  padding: 15px;
  border-bottom: 2px solid var(--border);
}

.admin-table td {
  padding: 15px;
  border-bottom: 1px solid #f2f4f9;
}

.badge-kelas {
  background: #eef2ff;
  color: #4e73df;
  padding: 5px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
}

/* BUTTONS */
.btn-admin-primary {
  background: #4e73df;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-admin-primary:hover {
  background: #2e59d9;
  transform: translateY(-2px);
}

.btn-admin-outline {
  background: transparent;
  color: #858796;
  border: 1px solid #d1d3e2;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-admin-outline:hover { background: #f8f9fc; }

/* ACTION BUTTONS (ICONS) */
.btn-icon {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  border: none;
  margin: 0 3px;
  transition: all 0.2s;
}

.btn-icon.edit { background: #eef2ff; color: #4e73df; }
.btn-icon.delete { background: #fff1f0; color: #ff4d4f; }

.btn-icon:hover { transform: scale(1.1); }

/* MODAL ADMIN */
.admin-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
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
}

.modal-header-admin h4 { font-weight: 800; color: #2c3e50; margin: 0;}
.modal-header-admin p { font-size: 0.85rem; color: #858796; margin-bottom: 20px;}

.input-group-admin { margin-bottom: 15px; }
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
}

/* ANIMATIONS */
@keyframes fadeInPage {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.scale-in { animation: scaleIn 0.3s ease; }
@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.fade-in { animation: fadeIn 0.5s ease; }
.fade-in-delay { animation: fadeIn 0.8s ease; }
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-up { animation: fadeUp 0.6s ease; }
@keyframes fadeUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>