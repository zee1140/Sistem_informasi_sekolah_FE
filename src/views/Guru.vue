<template>
  <div class="admin-wrapper">
    <nav class="admin-nav">
      <div class="nav-container">
        <button class="btn-back-circle" @click="$router.push('/dashboard')">
          <i class="bi bi-arrow-left"></i>
        </button>
        
        <div class="header-titles">
          <span class="badge-category">Teacher Management</span>
          <h2 class="title-text">Daftar Tenaga Pengajar</h2>
          <p class="subtitle-text">Kelola direktori guru JeprutSchool secara real-time</p>
        </div>

        <button class="btn-add-main" @click="bukaModal()">
          <i class="bi bi-plus-circle-fill"></i> Tambah Guru Baru
        </button>
      </div>
    </nav>

    <div class="content-body px-lg-5">
      <div class="info-card-summary">
        <div class="info-icon"><i class="bi bi-people-fill"></i></div>
        <div class="info-data">
          <span class="info-label">TOTAL PENGAJAR</span>
          <h3 class="info-value">{{ daftarGuru.length }}</h3>
        </div>
      </div>

      <div class="row g-4 mt-2">
        <div v-for="guru in daftarGuru" :key="guru.id" class="col-xl-3 col-lg-4 col-md-6">
          <div class="teacher-card">
            <div class="card-accent-top"></div>
            <div class="card-inner-content p-4">
              <div class="avatar-box">
                <i class="bi bi-person-fill"></i>
              </div>
              <h5 class="teacher-fullname">{{ guru.nama }}</h5>
              <div class="subject-pill">
                <i class="bi bi-book-half"></i> {{ guru.mapel }}
              </div>
            </div>
            
            <div class="card-actions-row">
              <button class="btn-tool edit" @click="bukaModal(guru)"><i class="bi bi-pencil-square"></i></button>
              <button class="btn-tool view" @click="viewGuru(guru)"><i class="bi bi-eye"></i></button>
              <button class="btn-tool delete" @click="hapusGuru(guru.id)"><i class="bi bi-trash3"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay-custom">
      <div class="modal-admin-box animate-pop">
        <button class="btn-close-modal" @click="tutupModal"><i class="bi bi-x-lg"></i></button>
        
        <div class="modal-header-section text-center mb-4">
          <h4 class="fw-bold">{{ isView ? 'Detail Data Guru' : (isEdit ? 'Edit Data Guru' : 'Input Data Guru') }}</h4>
        </div>
        
        <div class="modal-form-body">
          <div class="admin-input-group mb-4">
            <label class="admin-label">Nama Lengkap</label>
            <input 
              v-model="formGuru.nama" 
              type="text" 
              placeholder="Contoh: Andi Wijaya"
              :readonly="isView"
              class="admin-dark-input"
            >
          </div>
          <div class="admin-input-group mb-4">
            <label class="admin-label">Mata Pelajaran</label>
            <input 
              v-model="formGuru.mapel" 
              type="text" 
              placeholder="Contoh: Matematika"
              :readonly="isView"
              class="admin-dark-input"
            >
          </div>
        </div>

        <div class="modal-actions-footer">
          <button class="btn-admin-cancel" @click="tutupModal">Batal</button>
          <button v-if="!isView" class="btn-admin-save" @click="simpanGuru">
            {{ isEdit ? 'Simpan Perubahan' : 'Simpan Guru' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuruAdminPro',
  data() {
    return {
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
/* Perbaikan Error CSS - Pastikan tanda kurung kurawal & semicolon benar */
.admin-wrapper { background: #fcfdfe; min-height: 100vh; padding-bottom: 60px; font-family: 'Plus Jakarta Sans', sans-serif; }

/* Navbar */
.admin-nav { background: #fff; border-bottom: 1px solid #f1f5f9; padding: 25px 0; margin-bottom: 40px; }
.nav-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; }

.btn-back-circle { width: 45px; height: 45px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; color: #2f54eb; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
.btn-back-circle:hover { background: #2f54eb; color: #fff; box-shadow: 0 5px 15px rgba(47,84,235,0.2); }

.badge-category { background: #f0f5ff; color: #2f54eb; padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; }
.title-text { font-weight: 800; color: #1a1a1a; margin: 8px 0; font-size: 28px; }
.subtitle-text { color: #64748b; font-size: 14px; margin: 0; }

.btn-add-main { background: #2f54eb; color: #fff; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s; }
.btn-add-main:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(47,84,235,0.25); }

/* Stats Card */
.info-card-summary { background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; padding: 20px 30px; display: inline-flex; align-items: center; gap: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
.info-icon { width: 50px; height: 50px; background: #f0f5ff; color: #2f54eb; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
.info-label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; }
.info-value { font-size: 30px; font-weight: 800; margin: 0; color: #1e293b; }

/* Teacher Cards */
.teacher-card { background: #fff; border: 1px solid #f1f5f9; border-radius: 24px; transition: 0.3s; overflow: hidden; text-align: center; }
.teacher-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.06); }
.card-accent-top { height: 6px; background: #2f54eb; }

.avatar-box { width: 80px; height: 80px; background: #f8fafc; border-radius: 22px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 38px; color: #cbd5e1; }
.teacher-fullname { font-weight: 800; color: #1e293b; margin-bottom: 10px; font-size: 17px; }
.subject-pill { background: #f0f5ff; color: #2f54eb; padding: 6px 14px; border-radius: 12px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }

.card-actions-row { display: flex; justify-content: center; gap: 10px; padding: 15px; border-top: 1px solid #f1f5f9; background: #fcfdfe; }
.btn-tool { width: 40px; height: 40px; border-radius: 10px; border: none; font-size: 18px; cursor: pointer; transition: 0.2s; }
.edit { background: #fffbeb; color: #d97706; }
.view { background: #f0fdf4; color: #16a34a; }
.delete { background: #fef2f2; color: #dc2626; }

/* Modal Custom Sesuai Gambar */
.modal-overlay-custom { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-admin-box { background: #fff; width: 90%; max-width: 420px; border-radius: 35px; padding: 40px; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.15); }

.btn-close-modal { position: absolute; top: 25px; right: 25px; border: none; background: #f1f5f9; width: 35px; height: 35px; border-radius: 50%; color: #64748b; cursor: pointer; }

.admin-label { display: block; font-weight: 700; font-size: 14px; margin-bottom: 12px; color: #1e293b; text-align: center; }

/* Input Gelap Sesuai Gambar */
.admin-dark-input { 
  width: 100%; padding: 16px; background: #3d3d3d !important; border: none; 
  border-radius: 18px; color: #fff; text-align: center; font-size: 15px; font-weight: 600;
}
.admin-dark-input::placeholder { color: #888; }

.modal-actions-footer { display: flex; gap: 15px; margin-top: 35px; }
.btn-admin-cancel { flex: 1; padding: 14px; border-radius: 15px; border: none; background: #f8fafc; color: #64748b; font-weight: 700; cursor: pointer; }
.btn-admin-save { flex: 1.5; padding: 14px; border-radius: 15px; border: none; background: #2f54eb; color: #fff; font-weight: 700; cursor: pointer; }

.animate-pop { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
</style>