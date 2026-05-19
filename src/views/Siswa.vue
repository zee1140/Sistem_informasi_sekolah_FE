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
            <h2 class="fw-800 text-dark mb-0 fs-4-mobile">Manajemen Siswa</h2>
            <div class="h-line"></div>
          </div>
        </div>
        <div class="header-side-right d-flex align-items-center justify-content-end gap-2 gap-md-3 w-100-mobile">
          <div class="qs-badge shadow-sm animate-slide-right">
            <span class="qs-lab">TOTAL:</span><span class="qs-val">{{ filteredSiswa.length }}</span>
          </div>
          <button class="btn btn-add-premium ripple shadow-sm" @click="bukaModal()">
            <i class="bi bi-plus-lg me-md-2"></i><span class="d-none d-md-inline">Tambah Siswa</span>
          </button>
        </div>
      </div>
    </div>

    <div class="content-scroll-area p-3 p-md-5">
      <div class="search-wrapper mb-4 mb-md-5 animate-slide-up" style="animation-delay: 0.1s">
        <div class="search-inner-glass border-0">
          <i class="bi bi-search text-indigo me-3"></i>
          <input v-model="search" type="text" placeholder="Cari nama atau kelas siswa..." class="flex-grow-1 border-0 outline-none text-dark fw-600 bg-transparent">
          <transition name="fade">
            <button v-if="search" @click="search = ''" class="btn-clear"><i class="bi bi-x-circle-fill"></i></button>
          </transition>
        </div>
      </div>

      <div v-if="pageMessage" class="alert-siswa mb-4 animate-pop">
        <i class="bi bi-exclamation-circle"></i>
        <span>{{ pageMessage }}</span>
        <button type="button" @click="pageMessage = ''"><i class="bi bi-x"></i></button>
      </div>

      <div class="table-card bg-white shadow-premium rounded-4 overflow-hidden animate-slide-up" style="animation-delay: 0.2s">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light d-none d-md-table-header-group">
              <tr class="text-uppercase small fw-800 text-muted ls-wide">
                <th class="ps-4 py-4">Siswa</th>
                <th>NIS</th>
                <th>Kelas</th>
                <th class="text-center">Status</th>
                <th class="text-end pe-4">Aksi</th>
              </tr>
            </thead>
            <tbody class="mobile-grid">
                <tr v-for="(siswa, i) in filteredSiswa" :key="siswa.id" class="row-hover mobile-card">
                  <td class="ps-md-4 py-3 border-0-mobile">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar-sm initials bg-indigo-grad animate-pop" :style="`animation-delay: ${i * 0.05}s`">
                        {{ getInitials(siswa.nama) }}
                      </div>
                      <div>
                        <div class="fw-bold text-dark mb-0">{{ siswa.nama }}</div>
                        <small class="text-muted">ID: {{ siswa.id }}</small>
                      </div>
                    </div>
                  </td>
                  <td class="border-0-mobile">
                    <div class="mobile-label d-md-none">NIS</div>
                    <span class="class-tag">{{ siswa.nis || '-' }}</span>
                  </td>
                  <td class="border-0-mobile">
                    <div class="mobile-label d-md-none">Kelas</div>
                    <span class="class-tag">{{ siswa.kode_kelas }}</span>
                  </td>
                  <td class="text-md-center border-0-mobile">
                    <div class="mobile-label d-md-none">Status</div>
                    <span class="status-pill active"><span class="dot"></span> Aktif</span>
                  </td>
                  <td class="text-md-end pe-md-4 border-0-mobile">
                    <div class="d-flex justify-content-md-end gap-2">
                      <button type="button" class="btn-tool btn-v ripple" @click.prevent.stop="viewSiswa(siswa)"><i class="bi bi-eye"></i></button>
                      <button type="button" class="btn-tool btn-e ripple" @click.prevent.stop="bukaModal(siswa)"><i class="bi bi-pencil-square"></i></button>
                      <button type="button" class="btn-tool btn-d ripple" @click.prevent.stop="konfirmasiHapus(siswa.id)"><i class="bi bi-trash3"></i></button>
                    </div>
                  </td>
                </tr>
            </tbody>
          </table>
          <div v-if="filteredSiswa.length === 0" class="p-5 text-center animate-pop">
            <i class="bi bi-search-heart fs-1 text-muted opacity-25"></i>
            <p class="mt-3 fw-bold text-muted">Data tidak ditemukan...</p>
          </div>
        </div>
      </div>
    </div>

    <transition name="modal-zoom">
      <div v-if="showModal" class="modal-overlay px-3" @click.self="tutupModal">
        <div class="modal-box bg-white shadow-2xl rounded-5 overflow-hidden position-relative animate-pop">
          <button class="btn-close-modern ripple" @click="tutupModal"><i class="bi bi-x-lg"></i></button>
          <div class="p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-5">
              <div class="modal-icon-header"><i class="bi bi-person-bounding-box"></i></div>
              <h4 class="fw-800 mb-0">{{ isView ? 'Detail' : (isEdit ? 'Edit' : 'Tambah') }} Siswa</h4>
            </div>

            <div class="form-group mb-4">
              <label class="small fw-800 text-muted mb-2 ls-wide">NIS</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.nis}">
                <i class="bi bi-credit-card-2-front text-indigo"></i>
                <input v-model="formSiswa.nis" type="text" placeholder="Masukkan NIS..." :readonly="isView">
              </div>
              <small v-if="errors.nis" class="text-danger-custom fw-bold mt-1 d-block animate-pop">
                <i class="bi bi-exclamation-circle"></i> NIS tidak valid!
              </small>
            </div>

            <div class="form-group mb-4">
              <label class="small fw-800 text-muted mb-2 ls-wide">NAMA LENGKAP</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.nama}">
                <i class="bi bi-person text-indigo"></i>
                <input v-model="formSiswa.nama" type="text" placeholder="Masukkan nama..." :readonly="isView">
              </div>
              <small v-if="errors.nama" class="text-danger-custom fw-bold mt-1 d-block animate-pop">
                <i class="bi bi-exclamation-circle"></i> Nama wajib diisi!
              </small>
            </div>

            <div class="form-group mb-5">
              <label class="small fw-800 text-muted mb-2 ls-wide">KELAS</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.kode_kelas}">
                <i class="bi bi-building-check text-indigo"></i>
                <select v-model="formSiswa.kode_kelas" :disabled="isView">
                  <option value="" disabled>Pilih Kelas</option>
                  <option v-for="kelas in kelasList" :key="kelas.kode_kelas" :value="kelas.kode_kelas">
                    {{ kelas.kode_kelas }}
                  </option>
                </select>
              </div>
              <small v-if="errors.kode_kelas" class="text-danger-custom fw-bold mt-1 d-block animate-pop">
                <i class="bi bi-exclamation-circle"></i> Pilih kelas terlebih dahulu!
              </small>
            </div>

            <small v-if="errorMessage" class="text-danger-custom fw-bold mb-4 d-block animate-pop">
              <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
            </small>

            <div class="d-flex gap-3">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="tutupModal">Kembali</button>
              <button v-if="!isView" class="btn btn-save-modern flex-grow-1 fw-bold ripple shadow-lg" :disabled="isSaving" @click="simpanSiswa">
                {{ isSaving ? 'Menyimpan...' : (isEdit ? 'Update Data' : 'Simpan Siswa') }}
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
              <div class="mx-auto bg-fff1f2 text-e11d48 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 80px; height: 80px; background: #fff1f2; color: #e11d48;">
                <i class="bi bi-exclamation-triangle-fill fs-1"></i>
              </div>
            </div>
            <h4 class="fw-800 text-dark mb-2">Hapus Data?</h4>
            <p class="text-muted mb-4">Apakah anda yakin ingin menghapus data siswa ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div class="d-flex gap-3">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="showConfirm = false">Batal</button>
              <button class="btn btn-d flex-grow-1 fw-bold ripple shadow-sm py-3" style="border-radius: 16px;" :disabled="isDeleting" @click="hapusSiswa">
                {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}
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
      showConfirm: false, // State baru untuk popup konfirmasi
      selectedId: null,   // State baru untuk menyimpan ID yang akan dihapus
      isEdit: false, 
      isView: false, 
      editId: null,
      isSaving: false,
      isDeleting: false,
      errorMessage: '',
      pageMessage: '',
      formSiswa: { id: '', nama: '', nis: '', kode_kelas: '' },
      errors: { nama: false, nis: false, kode_kelas: false },
      kelasList: [],
      daftarSiswa: []
    }
  },
  computed: {
    filteredSiswa() {
      const keyword = this.search.toLowerCase()

      return this.daftarSiswa.filter(s => 
        String(s.nama || '').toLowerCase().includes(keyword) || 
        String(s.nis || '').toLowerCase().includes(keyword) ||
        String(s.kode_kelas || '').toLowerCase().includes(keyword)
      )
    }
  },
  mounted() {
    this.getSiswa()
    this.getKelas()
  },
  methods: {
    getInitials(name) { 
      return (name || '').split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(); 
    },
    createId() {
      if (window.crypto?.randomUUID) return window.crypto.randomUUID()
      return `${Date.now()}`
    },
    async getSiswa() {
      try {
        const response = await api.get('/siswa')
        this.daftarSiswa = Array.isArray(response.data)
          ? response.data.map(this.normalizeSiswa)
          : []
      } catch (error) {
        console.log('GET SISWA ERROR:', error.response || error)
        this.errorMessage = error.response?.data?.message || 'Data siswa gagal dimuat.'
      }
    },
    async getKelas() {
      try {
        const response = await api.get('/kelas')
        this.kelasList = response.data
      } catch (error) {
        console.log('GET KELAS ERROR:', error.response || error)
      }
    },
    bukaModal(siswa = null) {
      this.isView = false;
      this.errorMessage = '';
      this.errors = { nama: false, nis: false, kode_kelas: false };
      if (siswa) { 
        const normalized = this.normalizeSiswa(siswa)
        this.isEdit = true; 
        this.editId = normalized.id; 
        this.formSiswa = {
          id: normalized.id,
          nama: normalized.nama,
          nis: normalized.nis || '',
          kode_kelas: normalized.kode_kelas
        }; 
      }
      else { 
        this.isEdit = false; 
        this.formSiswa = { id: '', nama: '', nis: '', kode_kelas: '' }; 
      }
      this.showModal = true;
    },
    viewSiswa(siswa) { 
      const normalized = this.normalizeSiswa(siswa)

      this.isView = true; 
      this.formSiswa = {
        id: normalized.id,
        nama: normalized.nama,
        nis: normalized.nis || '',
        kode_kelas: normalized.kode_kelas
      }; 
      this.errorMessage = '';
      this.errors = { nama: false, nis: false, kode_kelas: false };
      this.showModal = true; 
    },
    tutupModal() { 
      this.showModal = false; 
      this.errorMessage = '';
    },
    async simpanSiswa() {
      this.errors.nama = !this.formSiswa.nama.trim();
      this.errors.nis = false;
      this.errors.kode_kelas = !this.formSiswa.kode_kelas;
      if (this.errors.nama || this.errors.nis || this.errors.kode_kelas) return;

      try {
        this.isSaving = true
        this.errorMessage = ''

        const payload = {
          nama: this.formSiswa.nama.trim(),
          nis: this.formSiswa.nis ? String(this.formSiswa.nis).trim() : null,
          kode_kelas: this.formSiswa.kode_kelas
        }

        if (this.isEdit) {
          await this.updateSiswa(this.editId, payload)
        } else { 
          await api.post('/siswa', {
            id: this.createId(),
            ...payload
          })
        }

        await this.getSiswa()
        this.tutupModal()
      } catch (error) {
        console.log('SAVE SISWA ERROR:', error.response || error)
        this.errorMessage = this.getErrorMessage(error, 'Data siswa gagal disimpan.')
      } finally {
        this.isSaving = false
      }
    },
    konfirmasiHapus(id) {
      this.selectedId = id;
      this.pageMessage = '';
      this.showConfirm = true;
    },
    async hapusSiswa() { 
      try {
        const id = this.selectedId

        if (!id) return

        this.isDeleting = true
        this.pageMessage = ''

        await this.deleteSiswa(id)

        this.daftarSiswa = this.daftarSiswa.filter(s => s.id !== id)
        await this.getSiswa()
        this.showConfirm = false;
        this.selectedId = null;
      } catch (error) {
        console.log('DELETE SISWA ERROR:', error.response || error)
        this.showConfirm = false;
        this.pageMessage = this.getErrorMessage(error, 'Data siswa gagal dihapus.')
      } finally {
        this.isDeleting = false
      }
    },
    updateSiswa(id, payload) {
      return api.put(`/siswa/${encodeURIComponent(id)}`, payload)
    },
    deleteSiswa(id) {
      return api.delete(`/siswa/${encodeURIComponent(id)}`)
    },
    normalizeSiswa(siswa) {
      return {
        id: siswa?.id || '',
        nama: siswa?.nama || '',
        nis: siswa?.nis === null || siswa?.nis === undefined ? '' : String(siswa.nis),
        kode_kelas: siswa?.kode_kelas || ''
      }
    },
    getErrorMessage(error, fallback) {
      const data = error.response?.data

      if (typeof data === 'string') {
        const match = data.match(/<pre>(.*?)<\/pre>/i)
        const message = match?.[1] || data.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

        if (message.includes('Cannot DELETE /siswa/')) {
          return 'Backend belum punya endpoint DELETE /siswa/:id. Tambahkan route delete di BE lalu restart server.'
        }

        if (message.includes('Cannot PUT /siswa/')) {
          return 'Backend belum punya endpoint PUT /siswa/:id. Tambahkan route update di BE lalu restart server.'
        }

        return message
      }

      if (data?.message) return data.message

      return fallback
    }
  }
}
</script>

<style scoped>
/* Style tetap sama sesuai permintaan Anda agar tidak berubah selain penambahan fitur */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
/* ... (seluruh style Anda di bawahnya tetap dipertahankan) ... */
/* --- VALIDATION STYLES --- */
.border-danger-custom {
  border-color: #ef4444 !important;
  background: #fff5f5 !important;
}
.text-danger-custom {
  color: #ef4444 !important;
  font-size: 0.75rem;
}
.app-container { height: 100vh; background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; position: fixed; inset: 0; }
.content-scroll-area { flex: 1; overflow-y: auto; height: calc(100vh - 120px); scroll-behavior: smooth; }
.fw-800 { font-weight: 800; }
.ls-wide { letter-spacing: 0.05em; }
.text-indigo { color: #4f46e5; }
.shadow-premium { box-shadow: 0 10px 30px -5px rgba(0,0,0,0.05); }
.header-glass { background: white; border-bottom: 1px solid #f1f5f9; min-height: 100px; }
.header-side-left, .header-side-right { flex: 1; }
.avatar-aj { width: 44px; height: 44px; background: #4f46e5; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 4px; border: 3px solid #eef2ff; }
.h-line { width: 40px; height: 3px; background: #4f46e5; border-radius: 10px; margin-top: 4px; }
.ripple { transition: all 0.2s ease; cursor: pointer; }
.ripple:active { transform: scale(0.95); opacity: 0.8; }
.btn-back-modern { background: #f1f5f9; border: none; border-radius: 12px; font-weight: 700; font-size: 0.75rem; padding: 10px 18px; color: #64748b; }
.btn-add-premium { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; }
.qs-badge { background: white; padding: 12px 20px; border-radius: 14px; border: 1px solid #eef2ff; display: flex; align-items: center; gap: 8px; }
.qs-val { font-weight: 800; color: #4f46e5; }
.search-wrapper { max-width: 800px; margin: 0 auto; }
.search-inner-glass {
  background: rgba(255, 255, 255, 0.6) !important; backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.8) !important; border-radius: 20px;
  padding: 16px 28px; display: flex; align-items: center;
  box-shadow: 0 15px 35px rgba(31, 38, 135, 0.05) !important;
}
.btn-clear { border: none; background: transparent; color: #cbd5e1; transition: 0.2s; }
.btn-clear:hover { color: #ef4444; }
.alert-siswa { max-width: 800px; margin: 0 auto; background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 0.85rem; }
.alert-siswa button { margin-left: auto; border: none; background: transparent; color: #e11d48; font-size: 1.1rem; }
.animate-fade-in { animation: fadeIn 0.6s ease; }
.animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-slide-right { animation: slideRight 0.6s ease both; }
.animate-pop { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-30px); }
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
.avatar-sm { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; }
.bg-indigo-grad { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.class-tag { background: #eef2ff; color: #4f46e5; padding: 6px 14px; border-radius: 10px; font-weight: 700; font-size: 11px; border: 1px solid #e0e7ff; }
.status-pill { background: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 50px; font-size: 10px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; }
.dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; }
.btn-tool { width: 38px; height: 38px; border-radius: 12px; border: none; margin-left: 6px; }
.btn-v { background: #f0f9ff; color: #0369a1; }
.btn-e { background: #f0fdf4; color: #16a34a; }
.btn-d { background: #fff1f2; color: #e11d48; }
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-box { width: 100%; max-width: 480px; }
.btn-close-modern { position: absolute; top: 25px; right: 25px; width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9; border: none; color: #94a3b8; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.btn-close-modern:hover { background: #fee2e2; color: #ef4444; transform: rotate(90deg); }
.modal-icon-header { width: 50px; height: 50px; background: #eef2ff; color: #4f46e5; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.input-premium { background: #f8fafc; border: 2px solid #f1f5f9; padding: 14px 20px; border-radius: 16px; display: flex; align-items: center; gap: 12px; transition: 0.3s; }
.input-premium:focus-within { border-color: #4f46e5; background: white; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
.input-premium input, .input-premium select { border: none; background: transparent; outline: none; width: 100%; font-weight: 600; color: #1e293b; }
.btn-save-modern { background: #4f46e5; color: white; border: none; border-radius: 16px; padding: 16px; transition: 0.3s; }
.btn-cancel-modern { background: #f1f5f9; color: #64748b; border: none; border-radius: 16px; padding: 16px; }
</style>
