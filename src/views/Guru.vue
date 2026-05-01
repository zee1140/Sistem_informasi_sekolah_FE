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
            <h2 class="fw-800 text-dark mb-0 fs-4-mobile">Manajemen Guru</h2>
            <div class="h-line"></div>
          </div>
        </div>

        <div class="header-side-right d-flex align-items-center justify-content-end gap-2 gap-md-3 w-100-mobile">
          <div class="qs-badge shadow-sm animate-slide-right">
            <span class="qs-lab">GURU:</span><span class="qs-val">{{ filteredGuru.length }}</span>
          </div>
          <button class="btn btn-add-premium ripple shadow-sm" @click="bukaModal()">
            <i class="bi bi-person-plus-fill me-md-2"></i><span class="d-none d-md-inline">Tambah Guru</span>
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
            placeholder="Cari nama guru atau mata pelajaran..." 
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
                <th class="ps-4 py-4">Nama Pengajar</th>
                <th>Mata Pelajaran</th>
                <th class="text-center">Status</th>
                <th class="text-end pe-4">Aksi</th>
              </tr>
            </thead>
            <tbody class="mobile-grid">
              <transition-group name="list">
                <tr v-for="(guru, i) in filteredGuru" :key="guru.id" class="row-hover mobile-card">
                  <td class="ps-md-4 py-3 border-0-mobile">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar-sm initials bg-indigo-grad animate-pop" :style="`animation-delay: ${i * 0.05}s`">
                        {{ getInitials(guru.nama) }}
                      </div>
                      <div>
                        <div class="fw-bold text-dark mb-0">{{ guru.nama }}</div>
                        <small class="text-muted">NIP. 19800{{ 2026 + i }}</small>
                      </div>
                    </div>
                  </td>
                  <td class="border-0-mobile">
                    <div class="mobile-label d-md-none">Mata Pelajaran</div>
                    <span class="class-tag">{{ guru.mapel }}</span>
                  </td>
                  <td class="text-md-center border-0-mobile">
                    <div class="mobile-label d-md-none">Status</div>
                    <span class="status-pill active"><span class="dot"></span> Aktif Mengajar</span>
                  </td>
                  <td class="text-md-end pe-md-4 border-0-mobile">
                    <div class="d-flex justify-content-md-end gap-2 mt-2 mt-md-0">
                      <button class="btn-tool btn-v ripple" @click="viewGuru(guru)" title="Lihat"><i class="bi bi-eye"></i></button>
                      <button class="btn-tool btn-e ripple" @click="bukaModal(guru)" title="Edit"><i class="bi bi-pencil-square"></i></button>
                      <button class="btn-tool btn-d ripple" @click="hapusGuru(guru.id)" title="Hapus"><i class="bi bi-trash3"></i></button>
                    </div>
                  </td>
                </tr>
              </transition-group>
            </tbody>
          </table>

          <div v-if="filteredGuru.length === 0" class="p-5 text-center animate-pop">
            <i class="bi bi-person-x fs-1 text-muted opacity-25"></i>
            <p class="mt-3 fw-bold text-muted">Data pengajar tidak ditemukan...</p>
          </div>
        </div>
      </div>
    </div>

    <transition name="modal-zoom">
      <div v-if="showModal" class="modal-overlay px-3" @click.self="tutupModal">
        <div class="modal-box bg-white shadow-2xl rounded-5 overflow-hidden position-relative animate-pop">
          <button class="btn-close-modern ripple" @click="tutupModal">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4 mb-md-5">
                <div class="modal-icon-header"><i class="bi bi-shield-check"></i></div>
                <h4 class="fw-800 mb-0 text-dark">{{ isView ? 'Detail' : (isEdit ? 'Ubah' : 'Input') }} Guru</h4>
            </div>

            <div class="mb-4">
              <label class="small fw-800 text-muted mb-2 ls-wide">NAMA LENGKAP & GELAR</label>
              <div class="input-premium">
                <i class="bi bi-person-badge text-indigo"></i>
                <input v-model="formGuru.nama" type="text" placeholder="Contoh: Dr. Budi Santoso" :readonly="isView">
              </div>
            </div>

            <div class="mb-5">
              <label class="small fw-800 text-muted mb-2 ls-wide">MATA PELAJARAN</label>
              <div class="input-premium">
                <i class="bi bi-journal-bookmark text-indigo"></i>
                <input v-model="formGuru.mapel" type="text" placeholder="Contoh: Matematika / Fisika" :readonly="isView">
              </div>
            </div>

            <div class="d-flex gap-3">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="tutupModal">Kembali</button>
              <button v-if="!isView" class="btn btn-save-modern flex-grow-1 fw-bold ripple shadow-lg" @click="simpanGuru">
                {{ isEdit ? 'Simpan Perubahan' : 'Daftarkan Guru' }}
              </button>
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
    getInitials(name) {
      return name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
    },
    bukaModal(guru = null) {
      this.isView = false;
      if (guru) { this.isEdit = true; this.editId = guru.id; this.formGuru = { ...guru }; }
      else { this.isEdit = false; this.formGuru = { nama: '', mapel: '' }; }
      this.showModal = true;
    },
    viewGuru(guru) { this.isView = true; this.formGuru = { ...guru }; this.showModal = true; },
    tutupModal() { this.showModal = false; },
    simpanGuru() {
      if (!this.formGuru.nama || !this.formGuru.mapel) return;
      if (this.isEdit) {
        const idx = this.daftarGuru.findIndex(g => g.id === this.editId);
        this.daftarGuru[idx] = { ...this.formGuru };
      } else {
        this.daftarGuru.unshift({ id: Date.now(), ...this.formGuru });
      }
      this.tutupModal();
    },
    hapusGuru(id) { if (confirm("Hapus data pengajar ini?")) this.daftarGuru = this.daftarGuru.filter(g => g.id !== id); }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* GLOBAL */
.app-container { height: 100vh; background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; position: fixed; inset: 0; }
.content-scroll-area { flex: 1; overflow-y: auto; height: calc(100vh - 120px); scroll-behavior: smooth; }
.fw-800 { font-weight: 800; }
.ls-wide { letter-spacing: 0.05em; }
.text-indigo { color: #4f46e5; }
.shadow-premium { box-shadow: 0 10px 30px -5px rgba(0,0,0,0.05); }

/* HEADER CENTERED */
.header-glass { background: white; border-bottom: 1px solid #f1f5f9; min-height: 100px; }
.header-side-left, .header-side-right { flex: 1; }
.avatar-aj { width: 44px; height: 44px; background: #4f46e5; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 4px; border: 3px solid #eef2ff; }
.h-line { width: 40px; height: 3px; background: #4f46e5; border-radius: 10px; margin-top: 4px; }

/* BUTTONS */
.ripple { transition: all 0.2s ease; cursor: pointer; }
.ripple:active { transform: scale(0.95); opacity: 0.8; }
.btn-back-modern { background: #f1f5f9; border: none; border-radius: 12px; font-weight: 700; font-size: 0.75rem; padding: 10px 18px; color: #64748b; }
.btn-add-premium { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; }
.qs-badge { background: white; padding: 12px 20px; border-radius: 14px; border: 1px solid #eef2ff; display: flex; align-items: center; gap: 8px; }
.qs-val { font-weight: 800; color: #4f46e5; }

/* SEARCH GLASS */
.search-wrapper { max-width: 800px; margin: 0 auto; }
.search-inner-glass {
  background: rgba(255, 255, 255, 0.6) !important; backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.8) !important; border-radius: 20px;
  padding: 16px 28px; display: flex; align-items: center;
  box-shadow: 0 15px 35px rgba(31, 38, 135, 0.05) !important;
}
.btn-clear { border: none; background: transparent; color: #cbd5e1; transition: 0.2s; }
.btn-clear:hover { color: #ef4444; }

/* RESPONSIVE TABLE TO CARDS */
@media (max-width: 768px) {
  .header-glass { padding: 15px !important; min-height: 120px; }
  .header-side-left, .header-side-right { width: 100%; display: flex; justify-content: center; }
  .header-center { order: -1; margin-bottom: 10px; }
  .fs-4-mobile { font-size: 1.25rem; }
  
  .mobile-grid { display: grid; grid-template-columns: 1fr; gap: 15px; padding: 15px; }
  .mobile-card { 
    display: block !important; background: white; border-radius: 20px !important; 
    padding: 20px; border: 1px solid #eef2ff !important; box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  }
  .border-0-mobile { border: none !important; padding: 5px 0 !important; }
  .mobile-label { display: block !important; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
}

/* UI ELEMENTS */
.avatar-sm { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; }
.bg-indigo-grad { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.class-tag { background: #eef2ff; color: #4f46e5; padding: 6px 14px; border-radius: 10px; font-weight: 700; font-size: 11px; border: 1px solid #e0e7ff; }
.status-pill { background: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 50px; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; }
.dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; }

.btn-tool { width: 38px; height: 38px; border-radius: 12px; border: none; margin-left: 6px; }
.btn-v { background: #f0f9ff; color: #0369a1; }
.btn-e { background: #f0fdf4; color: #16a34a; }
.btn-d { background: #fff1f2; color: #e11d48; }

/* MODAL & X BUTTON */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-box { width: 100%; max-width: 480px; }
.btn-close-modern {
  position: absolute; top: 25px; right: 25px; width: 40px; height: 40px; border-radius: 50%;
  background: #f1f5f9; border: none; color: #94a3b8;
  display: flex; align-items: center; justify-content: center;
  transition: 0.3s; z-index: 10;
}
.btn-close-modern:hover { background: #fee2e2; color: #ef4444; transform: rotate(90deg); }

.modal-icon-header { width: 50px; height: 50px; background: #eef2ff; color: #4f46e5; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.input-premium { background: #f8fafc; border: 2px solid #f1f5f9; padding: 14px 20px; border-radius: 16px; display: flex; align-items: center; gap: 12px; transition: 0.3s; }
.input-premium:focus-within { border-color: #4f46e5; background: white; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
.input-premium input { border: none; background: transparent; outline: none; width: 100%; font-weight: 600; color: #1e293b; }

.btn-save-modern { background: #4f46e5; color: white; border: none; border-radius: 16px; padding: 16px; transition: 0.3s; }
.btn-cancel-modern { background: #f1f5f9; color: #64748b; border: none; border-radius: 16px; padding: 16px; }

/* ANIMATIONS */
.animate-fade-in { animation: fadeIn 0.6s ease; }
.animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-slide-right { animation: slideRight 0.6s ease both; }
.animate-pop { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }

/* List Transition */
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-30px); }
</style>