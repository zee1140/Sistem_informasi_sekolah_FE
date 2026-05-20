<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass">
      <div class="header-inner">
        <div class="header-side">
          <button class="btn-back-modern ripple" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left"></i> Dashboard
          </button>
        </div>

        <div class="header-center">
          <div class="avatar-aj shadow-premium">AJ</div>
          <h2>Manajemen Siswa</h2>
          <div class="h-line"></div>
        </div>

        <div class="header-side header-actions">
          <button class="btn-stat-link ripple" @click="$router.push('/absensi')">
            <i class="bi bi-calendar-check"></i>
            <span>Absensi</span>
          </button>
          
          <div class="stats-badge">
            <span>TOTAL:</span>
            <strong>{{ daftarSiswa.length }}</strong>
          </div>

          <button class="btn-add-premium ripple shadow-sm" @click="openModal()">
            <i class="bi bi-plus-lg"></i>
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>
    </header>

    <main class="content-scroll-area">
      <section class="search-wrapper animate-slide-up">
        <div class="search-inner-glass">
          <i class="bi bi-search text-indigo"></i>
          <input v-model="search" type="text" placeholder="Cari nama atau kelas siswa...">
          <button v-if="search" type="button" class="btn-clear" @click="search = ''">
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </section>

      <section class="table-card animate-slide-up">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>NAMA SISWA</th>
                <th>NIS</th>
                <th>KELAS</th>
                <th class="text-end">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="siswa in filteredSiswa" :key="siswa.id">
                <td>
                  <div class="student-cell">
                    <div class="avatar-sm initials">{{ getInitials(siswa.nama) }}</div>
                    <strong>{{ siswa.nama }}</strong>
                  </div>
                </td>
                <td><span class="status-pill">{{ siswa.nis || '-' }}</span></td>
                <td><span class="class-tag">{{ siswa.kode_kelas }}</span></td>
                <td class="text-end">
                  <div class="action-group">
                    <button class="btn-tool btn-tool-edit ripple" title="Edit" @click="openModal(siswa)">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn-tool btn-tool-danger ripple" title="Hapus" @click="openConfirm(siswa)">
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredSiswa.length === 0" class="empty-state">
          <div class="empty-icon-wrapper">
             <i class="bi bi-search"></i>
          </div>
          <p>Data tidak ditemukan...</p>
        </div>
      </section>
    </main>

    <transition name="modal-zoom">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box shadow-premium">
          <div class="modal-content-inner">
            <div class="modal-heading">
              <h4>{{ isEdit ? 'Update Data Siswa' : 'Tambah Siswa Baru' }}</h4>
            </div>
            <div class="form-group">
              <label>NAMA LENGKAP</label>
              <div class="input-premium">
                <input v-model="form.nama" type="text" placeholder="Masukkan nama lengkap">
              </div>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label>NIS</label>
                <div class="input-premium">
                  <input v-model="form.nis" type="text" placeholder="NIS">
                </div>
              </div>
              <div class="form-group">
                <label>KELAS</label>
                <div class="input-premium">
                  <select v-model="form.kode_kelas">
                    <option value="" disabled>Pilih Kelas</option>
                    <option v-for="k in kelasList" :key="k.kode_kelas" :value="k.kode_kelas">{{ k.kode_kelas }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-actions">
              <button class="btn-cancel-modern ripple" @click="closeModal">Batal</button>
              <button class="btn-save-modern ripple" @click="handleSave">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-zoom">
      <div v-if="showConfirm" class="modal-overlay" @click.self="closeConfirm">
        <div class="modal-box modal-confirm">
          <div class="confirm-icon"><i class="bi bi-exclamation-triangle"></i></div>
          <h4>Hapus Data?</h4>
          <p>Data siswa <strong>{{ selectedSiswa?.nama }}</strong> akan dihapus permanen.</p>
          <div class="modal-actions">
            <button class="btn-cancel-modern ripple" @click="closeConfirm">Batal</button>
            <button class="btn-delete-modern ripple" @click="handleDelete">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../service/axios.js'

// Logic States
const search = ref('')
const showModal = ref(false)
const showConfirm = ref(false)
const isEdit = ref(false)
const selectedSiswa = ref(null)
const daftarSiswa = ref([])
const kelasList = ref([])
const form = ref({ id: '', nama: '', nis: '', kode_kelas: '' })

// Lifecycle - API fetch tetep aman
onMounted(() => { 
  fetchSiswa() 
  fetchKelas()
})

// Search Logic
const filteredSiswa = computed(() => {
  const q = search.value.toLowerCase()
  return (daftarSiswa.value || []).filter(s => 
    s.nama?.toLowerCase().includes(q) || s.kode_kelas?.toLowerCase().includes(q)
  )
})

// API Functions
const fetchSiswa = async () => { 
  try { 
    const res = await api.get('/siswa')
    daftarSiswa.value = Array.isArray(res.data) ? res.data : []
  } catch (e) { console.error("API Error fetch siswa:", e) } 
}

const fetchKelas = async () => {
  try {
    const res = await api.get('/kelas')
    kelasList.value = Array.isArray(res.data) ? res.data : []
  } catch (e) { console.error("API Error fetch kelas:", e) }
}

const handleSave = async () => {
  try {
    if (isEdit.value) await api.put(`/siswa/${form.value.id}`, form.value)
    else await api.post('/siswa', { ...form.value, id: Date.now().toString() })
    fetchSiswa(); closeModal();
  } catch (e) { alert('Gagal menyimpan data!'); }
}

const handleDelete = async () => {
  try {
    await api.delete(`/siswa/${selectedSiswa.value.id}`)
    fetchSiswa(); closeConfirm();
  } catch (e) { alert('Gagal menghapus data!'); }
}

// UI Helpers
const openModal = (item = null) => {
  isEdit.value = !!item
  form.value = item ? { ...item } : { id: '', nama: '', nis: '', kode_kelas: '' }
  showModal.value = true
}
const closeModal = () => { showModal.value = false }
const openConfirm = (item) => { selectedSiswa.value = item; showConfirm.value = true; }
const closeConfirm = () => { showConfirm.value = false }
const getInitials = (n) => n ? n.split(' ').map(x => x[0]).join('').toUpperCase().substring(0, 2) : '?'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.app-container { min-height: 100vh; background: #fcfdfe; font-family: 'Plus Jakarta Sans', sans-serif; color: #1e293b; }

/* Header Luxury (Match Gambar 2 & Warna Ungu Indigo) */
.header-glass { background: white; border-bottom: 1px solid #f1f5f9; padding: 12px 60px; position: sticky; top: 0; z-index: 100; }
.header-inner { display: flex; align-items: center; justify-content: space-between; }
.header-side { flex: 1; }

.header-center { text-align: center; }
.header-center h2 { 
  margin: 0; 
  font-size: 1.4rem; /* Diperkecil biar pas */
  font-weight: 700; 
  letter-spacing: -0.5px; 
}
.avatar-aj { width: 38px; height: 38px; background: #6366f1; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 4px; font-size: 0.9rem; }
.h-line { width: 30px; height: 3px; background: #6366f1; border-radius: 10px; margin: 0 auto; }

.header-actions { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }

/* Buttons & Badges (Indigo Theme) */
.btn-stat-link { background: #f5f3ff; color: #6366f1; border: 1px solid #ede9fe; padding: 8px 18px; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
.stats-badge { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 10px; font-size: 0.85rem; color: #64748b; }
.stats-badge strong { color: #6366f1; margin-left: 5px; }
.btn-add-premium { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
.btn-back-modern { background: #f1f5f9; color: #64748b; border: none; padding: 8px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; }

/* Content Section */
.content-scroll-area { padding: 40px 60px; }

/* Search Bar (Clean White) */
.search-wrapper { max-width: 750px; margin: 0 auto 40px; }
.search-inner-glass { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 14px 25px; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
.search-inner-glass input { width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 500; background: transparent; color: #1e293b; }
.text-indigo { color: #6366f1; }

/* Table Section */
.table-card { background: transparent; }
table { width: 100%; border-collapse: separate; border-spacing: 0 0px; }
th { padding: 15px 25px; color: #94a3b8; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; text-align: left; }
td { padding: 20px 25px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }

.student-cell { display: flex; align-items: center; gap: 15px; }
.avatar-sm { width: 40px; height: 40px; background: #f5f3ff; color: #6366f1; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; }
.class-tag { background: #f1f5f9; color: #6366f1; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }

/* Actions */
.action-group { display: flex; justify-content: flex-end; gap: 8px; }
.btn-tool { background: transparent; border: none; color: #cbd5e1; font-size: 1.1rem; padding: 6px; cursor: pointer; transition: 0.2s; }
.btn-tool:hover { color: #6366f1; transform: translateY(-2px); }
.btn-tool-danger:hover { color: #ef4444; }

/* Empty State */
.empty-state { text-align: center; padding: 100px 0; color: #cbd5e1; }
.empty-icon-wrapper { font-size: 4rem; margin-bottom: 10px; opacity: 0.5; }

/* Modal System */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.3); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal-box { background: white; padding: 35px; border-radius: 24px; width: 100%; max-width: 480px; }
.modal-heading h4 { margin: 0 0 25px; font-size: 1.3rem; font-weight: 800; text-align: center; }
.form-group { margin-bottom: 15px; }
.form-group label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 6px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.input-premium { border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 12px; background: #f8fafc; }
.input-premium input, .input-premium select { width: 100%; border: none; outline: none; background: transparent; font-weight: 600; }
.modal-actions { display: flex; gap: 12px; margin-top: 30px; }
.modal-actions button { flex: 1; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; }
.btn-save-modern { background: #6366f1; color: white; }
.btn-cancel-modern { background: #f1f5f9; color: #64748b; }

/* Animations */
.animate-fade-in { animation: fadeIn 0.4s ease both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-slide-up { animation: slideUp 0.5s ease both; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.ripple:active { transform: scale(0.96); }
.text-end { text-align: right; }
</style>