<template>
  <div class="app-container animate-fade-in">
    <div class="header-glass py-3 py-md-4 px-3 px-md-5 bg-white border-bottom shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div class="header-side-left w-100-mobile">
          <button class="btn btn-back-modern ripple" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left"></i> Dashboard
          </button>
        </div>

        <div class="header-center text-center animate-pop">
          <div class="d-flex flex-column align-items-center gap-2">
            <div class="avatar-aj shadow-premium">AJ</div>
            <h2 class="fw-800 text-dark mb-0 fs-4-mobile">Manajemen Kelas</h2>
            <div class="h-line"></div>
          </div>
        </div>

        <div class="header-side-right d-flex align-items-center justify-content-end gap-2 gap-md-3 w-100-mobile">
          <div class="qs-badge shadow-sm animate-slide-right">
            <span class="qs-lab">TOTAL KELAS:</span><span class="qs-val">{{ filteredKelas.length }}</span>
          </div>
          <button class="btn btn-add-premium ripple shadow-sm" @click="openModal()">
            <i class="bi bi-plus-circle-fill me-md-2"></i><span class="d-none d-md-inline">Tambah Kelas</span>
          </button>
        </div>
      </div>
    </div>

    <div class="content-scroll-area p-3 p-md-5">
      <div class="search-wrapper mb-4 mb-md-5 animate-slide-up" style="animation-delay: 0.1s">
        <div class="search-inner-glass border-0">
          <i class="bi bi-search text-indigo me-3"></i>
          <input 
            v-model="search" 
            type="text" 
            placeholder="Cari ruang kelas atau wali kelas..." 
            class="flex-grow-1 border-0 outline-none text-dark fw-600 bg-transparent"
          >
          <transition name="fade">
            <button v-if="search" @click="search = ''" class="btn-clear"><i class="bi bi-x-circle-fill"></i></button>
          </transition>
        </div>
      </div>

      <div class="table-card bg-white shadow-premium rounded-4 overflow-hidden animate-slide-up" style="animation-delay: 0.2s">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light d-none d-md-table-header-group">
              <tr class="text-uppercase small fw-800 text-muted ls-wide">
                <th>Kode Kelas</th>
                <th>Wali Kelas</th>
                <th class="text-center">Kapasitas</th>
                <th class="text-end pe-4">Aksi</th>
              </tr>
            </thead>
            <transition-group name="list" tag="tbody" class="mobile-grid">
                <tr v-for="kelas in filteredKelas" :key="kelas.kode_kelas" class="row-hover mobile-card">
                  <td class="ps-md-4 py-3 border-0-mobile">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar-sm initials bg-indigo-grad animate-pop">
                        <i class="bi bi-door-closed"></i>
                      </div>
                      <div>
                        <div class="fw-bold text-dark mb-0">{{ kelas.kode_kelas }}</div>
                        <small class="text-muted">Kode Kelas</small>
                      </div>
                    </div>
                  </td>
                  <td class="border-0-mobile">
                    <div class="mobile-label d-md-none">Wali Kelas</div>
                    <div class="d-flex align-items-center gap-2 fw-semibold text-secondary">
                        <i class="bi bi-person-badge opacity-50"></i> {{ kelas.wali_kelas }}
                    </div>
                  </td>
                  <td class="text-md-center border-0-mobile">
                    <div class="mobile-label d-md-none">Kapasitas Siswa</div>
                    <div class="d-flex flex-column align-items-md-center">
                        <span class="badge-soft-indigo mb-1">{{ kelas.kapasitas_siswa }} siswa</span>
                        <div class="cap-bar d-none d-md-block">
                            <div class="cap-fill" :style="{ width: `${Math.min(Number(kelas.kapasitas_siswa || 0), 100)}%` }"></div>
                        </div>
                    </div>
                  </td>
                  <td class="text-md-end pe-md-4 border-0-mobile">
                    <div class="d-flex justify-content-md-end gap-2 mt-2 mt-md-0">
                      <button type="button" class="btn-tool btn-e ripple" @click.stop="editData(kelas)"><i class="bi bi-pencil-square"></i></button>
                      <button type="button" class="btn-tool btn-d ripple" @click.stop="confirmDelete(kelas)"><i class="bi bi-trash3"></i></button>
                    </div>
                  </td>
                </tr>
            </transition-group>
          </table>
          
          <div v-if="filteredKelas.length === 0" class="p-5 text-center animate-pop">
            <i class="bi bi-door-open fs-1 text-muted opacity-25"></i>
            <p class="mt-3 fw-bold text-muted">Kelas tidak ditemukan...</p>
          </div>
        </div>
      </div>
    </div>

    <transition name="modal-zoom">
      <div v-if="showModal" class="modal-overlay px-3" @click.self="closeModal">
        <div class="modal-box bg-white shadow-2xl rounded-5 overflow-hidden position-relative animate-pop">
          <button class="btn-close-modern ripple" @click="closeModal"><i class="bi bi-x-lg"></i></button>
          
          <div class="p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-5">
                <div class="modal-icon-header"><i class="bi bi-building-add"></i></div>
                <h4 class="fw-800 mb-0 text-dark">{{ isEdit ? 'Update' : 'Tambah' }} Kelas</h4>
            </div>

            <div class="mb-4">
              <label class="small fw-800 text-muted mb-2 ls-wide">KODE KELAS</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.kode_kelas}">
                <i class="bi bi-hash text-indigo"></i>
                <input
                  v-model="form.kode_kelas"
                  type="text"
                  placeholder="Contoh: X-PPLG-1"
                  :disabled="isEdit"
                >
              </div>
              <small v-if="errors.kode_kelas" class="text-danger-custom fw-bold mt-1 d-block animate-pop">
                <i class="bi bi-exclamation-circle"></i> Kode kelas harus diisi!
              </small>
            </div>

            <div class="mb-4">
              <label class="small fw-800 text-muted mb-2 ls-wide">WALI KELAS</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.wali_kelas}">
                <i class="bi bi-person-workspace text-indigo"></i>
                <input
                  v-model="form.wali_kelas"
                  type="text"
                  placeholder="Nama Guru Wali"
                >
              </div>
              <small v-if="errors.wali_kelas" class="text-danger-custom fw-bold mt-1 d-block animate-pop">
                <i class="bi bi-exclamation-circle"></i> Wali kelas harus diisi!
              </small>
            </div>

            <div class="mb-4">
              <label class="small fw-800 text-muted mb-2 ls-wide">KAPASITAS SISWA</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.kapasitas_siswa}">
                <i class="bi bi-people text-indigo"></i>
                <input
                  v-model.number="form.kapasitas_siswa"
                  type="number"
                  min="1"
                  placeholder="Contoh: 36"
                >
              </div>
              <small v-if="errors.kapasitas_siswa" class="text-danger-custom fw-bold mt-1 d-block animate-pop">
                <i class="bi bi-exclamation-circle"></i> Kapasitas siswa harus diisi!
              </small>
            </div>

            <small v-if="errorMessage" class="text-danger-custom fw-bold mb-4 d-block animate-pop">
              <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
            </small>

            <div class="d-flex gap-3">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="closeModal">Batal</button>
              <button class="btn btn-save-modern flex-grow-1 fw-bold ripple shadow-lg" @click="saveData">
                {{ isEdit ? 'Simpan Perubahan' : 'Buat Kelas' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-zoom">
      <div v-if="showConfirm" class="modal-overlay px-3" @click.self="showConfirm = false">
        <div class="modal-box bg-white shadow-2xl rounded-5 overflow-hidden text-center animate-pop" style="max-width: 400px;">
          <div class="p-4 p-md-5">
            <div class="mb-4">
              <div class="mx-auto rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 80px; height: 80px; background: #fff1f2; color: #e11d48;">
                <i class="bi bi-exclamation-octagon-fill fs-1"></i>
              </div>
            </div>
            <h4 class="fw-800 text-dark mb-2">Hapus Kelas?</h4>
            <p class="text-muted mb-4">Apakah anda yakin ingin menghapus data kelas ini? Semua data terkait mungkin akan terpengaruh.</p>
            <div class="d-flex gap-3">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="cancelDelete">Batal</button>
              <button class="btn btn-d flex-grow-1 fw-bold ripple shadow-sm py-3" style="border-radius: 16px;" @click="deleteData">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../service/axios.js'

export default {
  data() {
    return {
      search: "",
      showModal: false,
      showConfirm: false,
      selectedKelas: null,
      isEdit: false,
      errorMessage: "",

      kelasList: [],

      form: {
        kode_kelas: "",
        wali_kelas: "",
        kapasitas_siswa: ""
      },

      errors: {
        kode_kelas: false,
        wali_kelas: false,
        kapasitas_siswa: false
      }
    }
  },

  computed: {
    filteredKelas() {
      const keyword = this.search.toLowerCase()

      return this.kelasList.filter(k =>
        k.kode_kelas
          ?.toLowerCase()
          .includes(keyword) ||

        k.wali_kelas
          ?.toLowerCase()
          .includes(keyword)
      )
    }
  },

  mounted() {
    this.getKelas()
  },

  methods: {

    // ==================
    // GET DATA
    // ==================
    async getKelas() {
      try {
        const response = await api.get('/kelas')

        this.kelasList = response.data

      } catch(error){
        console.log("GET ERROR:",error)
        this.errorMessage = error.response?.data?.message || 'Data kelas gagal dimuat.'
      }
    },
    

    // ==================
    // OPEN MODAL
    // ==================
    openModal(){

      this.isEdit=false
      this.selectedKelas=null
      this.errorMessage=""

      this.form={
        kode_kelas:"",
        wali_kelas:"",
        kapasitas_siswa:""
      }

      this.errors={
        kode_kelas:false,
        wali_kelas:false,
        kapasitas_siswa:false
      }

      this.showModal=true
    },

    closeModal(){
      this.showModal=false
      this.errorMessage=""
    },

    // ==================
    // TAMBAH + EDIT
    // ==================
    async saveData(){

      this.errors.kode_kelas=
      !this.form.kode_kelas.trim()

      this.errors.wali_kelas=
      !this.form.wali_kelas.trim()

      this.errors.kapasitas_siswa=
      !this.form.kapasitas_siswa || Number(this.form.kapasitas_siswa) <= 0

      if(
        this.errors.kode_kelas ||
        this.errors.wali_kelas ||
        this.errors.kapasitas_siswa
      ){
        return
      }

      try{

        if(this.isEdit){

          await api.put(
            `/kelas/${this.selectedKelas.kode_kelas}`,
            {
              wali_kelas:this.form.wali_kelas,
              kapasitas_siswa:this.form.kapasitas_siswa
            }
          )

        }else{

          await api.post(
            '/kelas',
            {
              kode_kelas:this.form.kode_kelas,
              wali_kelas:this.form.wali_kelas,
              kapasitas_siswa:this.form.kapasitas_siswa
            }
          )
        }

        await this.getKelas()

        this.closeModal()

      }catch(error){
        console.log("SAVE ERROR:",error.response || error)
        this.errorMessage = error.response?.data?.message || 'Data kelas gagal disimpan.'
      }

    },

    // ==================
    // EDIT
    // ==================
    editData(kelas){
      if(!kelas) return

      this.form={

        kode_kelas:kelas.kode_kelas,
        wali_kelas:kelas.wali_kelas,
        kapasitas_siswa:kelas.kapasitas_siswa

      }

      this.selectedKelas=kelas
      this.errorMessage=""
      this.isEdit=true
      this.showModal=true
    },

    // ==================
    // HAPUS POPUP
    // ==================
    confirmDelete(kelas){
      if(!kelas) return

      this.selectedKelas=kelas
      this.showConfirm=true

    },

    cancelDelete(){
      this.showConfirm=false
      this.selectedKelas=null
    },

    // ==================
    // DELETE
    // ==================
    async deleteData(){

      try{
        if(!this.selectedKelas) return

        const kode=this.selectedKelas.kode_kelas

        await api.delete(
          `/kelas/${kode}`
        )

        await this.getKelas()

        this.showConfirm=false
        this.selectedKelas=null

      }catch(error){

        console.log(
          "DELETE ERROR:",
          error.response || error
        )
        this.errorMessage = error.response?.data?.message || 'Data kelas gagal dihapus.'

      }

    }

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* --- VALIDATION CUSTOM STYLES --- */
.border-danger-custom {
  border-color: #ef4444 !important;
  background: #fff5f5 !important;
}
.text-danger-custom {
  color: #ef4444 !important;
  font-size: 0.75rem;
}

/* --- LAYOUT & THEME --- */
.app-container { height: 100vh; background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; position: fixed; inset: 0; }
.content-scroll-area { flex: 1; overflow-y: auto; height: calc(100vh - 120px); scroll-behavior: smooth; }
.fw-800 { font-weight: 800; }
.ls-wide { letter-spacing: 0.05em; }
.text-indigo { color: #4f46e5; }
.shadow-premium { box-shadow: 0 10px 30px -5px rgba(0,0,0,0.05); }

/* --- HEADER CENTERED --- */
.header-glass { background: white; border-bottom: 1px solid #f1f5f9; min-height: 100px; }
.header-side-left, .header-side-right { flex: 1; }
.avatar-aj { width: 44px; height: 44px; background: #4f46e5; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 4px; border: 3px solid #eef2ff; }
.h-line { width: 40px; height: 3px; background: #4f46e5; border-radius: 10px; margin-top: 4px; }

/* --- BUTTONS & BADGES --- */
.ripple { transition: all 0.2s ease; cursor: pointer; }
.ripple:active { transform: scale(0.95); opacity: 0.8; }
.btn-back-modern {
  background: #eef2ff;
  color: #4f46e5;
  border: none;
  border-radius: 999px; /* bikin pill */
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s;
}

/* hover biar hidup dikit */
.btn-back-modern:hover {
  background: #4f46e5;
  color: white;
  transform: translateY(-1px);
}

/* PAKSA KIRI BANGET */
.header-side-left {
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
}

/* HILANGIN WIDTH FULL YANG BIKIN KE TENGAH */
.w-100-mobile {
  width: auto !important;
}

/* BIAR CENTER TETEP DI TENGAH */
.header-center {
  flex: 1;
  text-align: center;
}

/* KANAN TETEP DI KANAN */
.header-side-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn-add-premium { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; }
.qs-badge { background: white; padding: 12px 20px; border-radius: 14px; border: 1px solid #eef2ff; display: flex; align-items: center; gap: 8px; }
.qs-val { font-weight: 800; color: #4f46e5; }

/* --- SEARCH BAR GLASS --- */
.search-wrapper { max-width: 800px; margin: 0 auto; }
.search-inner-glass {
  background: rgba(255, 255, 255, 0.6) !important; backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.8) !important; border-radius: 20px;
  padding: 16px 28px; display: flex; align-items: center;
  box-shadow: 0 15px 35px rgba(31, 38, 135, 0.05) !important;
}
.btn-clear { border: none; background: transparent; color: #cbd5e1; transition: 0.2s; }

/* --- CAPACITY BAR --- */
.cap-bar { width: 100px; height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; margin-top: 5px; }
.cap-fill { height: 100%; background: linear-gradient(90deg, #818cf8, #4f46e5); border-radius: 10px; }

/* --- RESPONSIVE MOBILE --- */
@media (max-width: 768px) {
  .header-glass { padding: 15px !important; min-height: 130px; }
  .header-side-left, .header-side-right { width: 100%; display: flex; justify-content: center; }
  .header-center { order: -1; margin-bottom: 5px; }
  .mobile-grid { display: grid; grid-template-columns: 1fr; gap: 15px; padding: 15px; }
  .mobile-card { 
    display: block !important; background: white; border-radius: 20px !important; 
    padding: 20px; border: 1px solid #eef2ff !important; 
  }
  .border-0-mobile { border: none !important; padding: 5px 0 !important; }
  .mobile-label { display: block !important; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
}

/* --- UI ELEMENTS --- */
.avatar-sm { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; }
.bg-indigo-grad { background: linear-gradient(135deg, #6366f1, #4f46e5); font-size: 1.2rem; }
.badge-soft-indigo { background: #eef2ff; color: #4f46e5; padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; }

.btn-tool { width: 38px; height: 38px; border-radius: 12px; border: none; margin-left: 6px; }
.btn-e { background: #f0fdf4; color: #16a34a; }
.btn-d { background: #fff1f2; color: #e11d48; }

/* --- MODAL --- */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-box { width: 100%; max-width: 480px; }
.btn-close-modern { position: absolute; top: 25px; right: 25px; width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9; border: none; color: #94a3b8; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.modal-icon-header { width: 50px; height: 50px; background: #eef2ff; color: #4f46e5; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.input-premium { background: #f8fafc; border: 2px solid #f1f5f9; padding: 14px 20px; border-radius: 16px; display: flex; align-items: center; gap: 12px; transition: 0.3s; }
.input-premium:focus-within { border-color: #4f46e5; background: white; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
.input-premium input { border: none; background: transparent; outline: none; width: 100%; font-weight: 600; color: #1e293b; }
.btn-save-modern { background: #4f46e5; color: white; border: none; border-radius: 16px; padding: 16px; transition: 0.3s; }
.btn-cancel-modern { background: #f1f5f9; color: #64748b; border: none; border-radius: 16px; padding: 16px; }

/* --- ANIMATIONS --- */
.animate-fade-in { animation: fadeIn 0.6s ease; }
.animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-pop { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
