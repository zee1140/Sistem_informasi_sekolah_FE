<template>
  <div class="container-fluid py-4 min-vh-100 bg-light-custom">

    <transition name="fade">
      <div v-if="alert.show" class="custom-alert shadow" :class="alert.type">
        <i class="bi" :class="alert.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'"></i>
        {{ alert.message }}
      </div>
    </transition>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-white shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
                @click="goDashboard" style="width: 42px; height: 42px;">
          <i class="bi bi-arrow-left fs-5 text-primary"></i>
        </button>
        <div>
          <h4 class="fw-bold mb-0 text-dark">Manajemen Siswa</h4>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0" style="font-size: 0.85rem;">
              <li class="breadcrumb-item"><a href="#" @click.prevent="goDashboard" class="text-decoration-none text-muted">Dashboard</a></li>
              <li class="breadcrumb-item active fw-medium text-primary">Data Siswa</li>
            </ol>
          </nav>
        </div>
      </div>

      <button class="btn btn-primary-jeprut shadow-sm px-4 py-2" @click="openModal">
        <i class="bi bi-plus-lg me-2"></i> Tambah Siswa
      </button>
    </div>

    <div class="card shadow-sm border-0 mb-4 rounded-4">
      <div class="card-body p-3">
        <div class="input-group">
          <span class="input-group-text bg-light border-0"><i class="bi bi-search text-muted"></i></span>
          <input v-model="search" class="form-control border-0 bg-light" placeholder="Cari berdasarkan nama atau kelas..." />
        </div>
      </div>
    </div>

    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="bg-header-table">
            <tr>
              <th class="ps-4 py-3 text-uppercase fw-bold text-muted" style="font-size: 0.75rem;">Siswa</th>
              <th class="py-3 text-uppercase fw-bold text-muted" style="font-size: 0.75rem;">Kontak</th>
              <th class="py-3 text-uppercase fw-bold text-muted" style="font-size: 0.75rem;">Kelas</th>
              <th class="text-center py-3 text-uppercase fw-bold text-muted" style="font-size: 0.75rem;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(siswa, i) in filteredSiswa" :key="i">
              <td class="ps-4">
                <div class="d-flex align-items-center">
                  <div class="avatar-circle me-3">{{ siswa.nama.charAt(0) }}</div>
                  <span class="fw-bold text-dark">{{ siswa.nama }}</span>
                </div>
              </td>
              <td><span class="text-muted">{{ siswa.email }}</span></td>
              <td>
                <span class="badge-soft-primary">
                  {{ siswa.kelas }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-icon-delete border-0" @click="deleteData(i)">
                  <i class="bi bi-trash3 text-danger"></i>
                </button>
              </td>
            </tr>

            <tr v-if="filteredSiswa.length === 0">
              <td colspan="4" class="text-center py-5">
                <i class="bi bi-inbox fs-1 text-light mb-2 d-block"></i>
                <p class="text-muted mb-0">Data tidak ditemukan atau masih kosong.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalSiswa" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow-lg">
          <div class="modal-header border-0 p-4 pb-0">
            <h5 class="fw-bold">Input Data Siswa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-3">
              <label class="form-label fw-semibold small">Nama Lengkap</label>
              <input v-model="form.nama" type="text" class="form-control custom-input" placeholder="Contoh: Andi Wijaya">
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold small">Alamat Email</label>
              <input v-model="form.email" type="email" class="form-control custom-input" placeholder="andi@gmail.com">
            </div>
            <div class="mb-2">
              <label class="form-label fw-semibold small">Kelas</label>
              <input v-model="form.kelas" type="text" class="form-control custom-input" placeholder="Contoh: 12 IPA 1">
            </div>
          </div>
          <div class="modal-footer border-0 p-4 pt-0 d-flex gap-2">
            <button class="btn btn-light flex-grow-1 py-2 rounded-3 text-muted fw-bold" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-primary-jeprut flex-grow-1 py-2 rounded-3" @click="saveData">Simpan Siswa</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  data() {
    return {
      search: "",
      siswaList: [
        { nama: "Budi Santoso", email: "budi@gmail.com", kelas: "10A" },
        { nama: "Siti Aminah", email: "siti@gmail.com", kelas: "11B" },
        { nama: "Andi Saputra", email: "andi@gmail.com", kelas: "12C" }
      ],
      form: { nama: "", email: "", kelas: "" },
      modal: null,
      alert: {
        show: false,
        message: '',
        type: 'success'
      }
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

  mounted() {
    // Memastikan modal Bootstrap terinisialisasi dengan benar
    const modalEl = document.getElementById('modalSiswa');
    if (modalEl) {
      this.modal = new Modal(modalEl);
    }
  },

  methods: {
    goDashboard() {
      this.$router.push('/dashboard')
    },

    openModal() {
      this.form = { nama: "", email: "", kelas: "" }
      if (this.modal) this.modal.show()
    },

    saveData() {
      if (!this.form.nama || !this.form.email || !this.form.kelas) {
        this.showAlert('Semua data wajib diisi!', 'danger')
        return
      }

      this.siswaList.push({ ...this.form })
      if (this.modal) this.modal.hide()
      this.showAlert('Siswa berhasil ditambahkan', 'success')
    },

    deleteData(i) {
      if (confirm("Hapus data siswa ini?")) {
        this.siswaList.splice(i, 1)
        this.showAlert('Data siswa telah dihapus', 'warning')
      }
    },

    showAlert(message, type = 'success') {
      this.alert.message = message
      this.alert.type = type
      this.alert.show = true
      setTimeout(() => { this.alert.show = false }, 2500)
    }
  }
}
</script>

<style scoped>
/* BACKGROUND & UTILS */
.bg-light-custom { background-color: #f4f7fe; }
.btn-white { background: white; border: none; }

/* GRADASI BIRU (Sesuai Banner Dashboard) */
.btn-primary-jeprut {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}
.btn-primary-jeprut:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(78, 115, 223, 0.35);
  color: white;
}

/* BADGE & AVATAR */
.badge-soft-primary {
  background-color: #eef2ff;
  color: #4e73df;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
}
.avatar-circle {
  width: 38px;
  height: 38px;
  background: #4e73df;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* TABLE STYLING */
.bg-header-table { background-color: #f8fafc; }
.btn-icon-delete {
  padding: 8px 12px;
  border-radius: 8px;
  background: transparent;
  transition: 0.2s;
}
.btn-icon-delete:hover { background: #fee2e2; }

/* FORM CUSTOM */
.custom-input {
  background-color: #f8fafc;
  border: 1.5px solid #e2e8f0;
  padding: 0.7rem 1rem;
  border-radius: 10px;
}
.custom-input:focus {
  border-color: #4e73df;
  box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.1);
  background-color: #fff;
}

/* ALERT NOTIFICATION */
.custom-alert {
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}
.custom-alert.success { background: #10b981; }
.custom-alert.warning { background: #f59e0b; }
.custom-alert.danger { background: #ef4444; }

/* ANIMATION */
.fade-enter-active, .fade-leave-active { transition: opacity .4s, transform .4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translate(-50%, -20px); }
</style>