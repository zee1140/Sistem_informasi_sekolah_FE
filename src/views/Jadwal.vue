<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass">
      <div class="header-inner">
        <div class="header-side">
          <button class="btn-back-modern ripple" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left"></i>
            Dashboard
          </button>
        </div>

        <div class="header-center">
          <div class="avatar-aj shadow-premium">AJ</div>
          <h2>Agenda Pembelajaran</h2>
          <div class="h-line"></div>
        </div>

        <div class="header-side header-actions">
          <button class="btn-add-premium ripple shadow-sm" @click="openModal()">
            <i class="bi bi-plus-lg"></i>
            <span>Tambah Jadwal</span>
          </button>
        </div>
      </div>
    </header>

    <main class="content-scroll-area">
      <section class="summary-grid animate-slide-up">
        <article class="summary-card">
          <div class="summary-icon bg-indigo-soft">
            <i class="bi bi-journal-bookmark-fill"></i>
          </div>
          <div>
            <p>Total Mapel</p>
            <h3>{{ jadwalList.length }}</h3>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-icon bg-amber-soft">
            <i class="bi bi-clock-fill"></i>
          </div>
          <div>
            <p>Status Sesi</p>
            <h3 class="text-amber">Aktif</h3>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-icon bg-rose-soft">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div>
            <p>Lokasi</p>
            <h3 class="text-rose">Lab Komp</h3>
          </div>
        </article>
      </section>

      <section class="search-wrapper animate-slide-up" style="animation-delay: 0.08s">
        <div class="search-inner-glass">
          <i class="bi bi-search text-indigo"></i>
          <input v-model="search" type="text" placeholder="Cari mata pelajaran atau guru...">
          <button v-if="search" type="button" class="btn-clear" @click="search = ''">
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </section>

      <section class="table-card animate-slide-up" style="animation-delay: 0.16s">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Mata Pelajaran</th>
                <th>Kelas</th>
                <th>Waktu</th>
                <th>Ruang</th>
                <th class="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredJadwal" :key="item.id">
                <td>
                  <div class="student-cell">
                    <div class="avatar-sm initials">{{ getInitials(item.guru) }}</div>
                    <div>
                      <strong>{{ item.mapel }}</strong>
                      <small>Guru: {{ item.guru }}</small>
                    </div>
                  </div>
                </td>
                <td><span class="class-tag">{{ item.kelas }}</span></td>
                <td class="time-text">{{ item.waktu }}</td>
                <td>
                  <span class="status-pill status-sakit">
                    <span class="dot"></span>
                    {{ item.ruang }}
                  </span>
                </td>
                <td class="text-end">
                  <button type="button" class="btn-tool ripple" @click="openModal(item)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn-tool btn-tool-danger ripple" @click="openConfirm(item)">
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredJadwal.length === 0" class="empty-state">
          <i class="bi bi-calendar-x"></i>
          <p>Jadwal tidak ditemukan...</p>
        </div>
      </section>
    </main>

    <transition name="modal-zoom">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">
          <button class="btn-close-modern ripple" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="modal-content-inner">
            <div class="modal-heading">
              <div class="modal-icon-header"><i class="bi bi-calendar-plus"></i></div>
              <h4>{{ isEdit ? 'Edit Jadwal' : 'Tambah Jadwal Baru' }}</h4>
            </div>

            <div class="form-group">
              <label>MATA PELAJARAN</label>
              <div class="input-premium">
                <i class="bi bi-book text-indigo"></i>
                <input v-model="form.mapel" type="text" placeholder="Contoh: Pemrograman Web">
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>KELAS</label>
                <div class="input-premium">
                  <i class="bi bi-people text-indigo"></i>
                  <input v-model="form.kelas" type="text" placeholder="XI-PPLG 1">
                </div>
              </div>

              <div class="form-group">
                <label>WAKTU / JAM</label>
                <div class="input-premium">
                  <i class="bi bi-clock text-indigo"></i>
                  <input v-model="form.waktu" type="text" placeholder="07:00 - 09:00">
                </div>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>RUANG</label>
                <div class="input-premium">
                  <i class="bi bi-geo-alt text-indigo"></i>
                  <input v-model="form.ruang" type="text" placeholder="Lab 01">
                </div>
              </div>
              <div class="form-group">
                <label>GURU</label>
                <div class="input-premium">
                  <i class="bi bi-person-workspace text-indigo"></i>
                  <input v-model="form.guru" type="text" placeholder="Nama Guru">
                </div>
              </div>
            </div>

            <div class="modal-actions mt-4">
              <button class="btn-cancel-modern ripple" @click="closeModal">Batal</button>
              <button class="btn-save-modern ripple" :disabled="isSaving" @click="saveJadwal">
                {{ isSaving ? 'Menyimpan...' : 'Simpan Jadwal' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-zoom">
      <div v-if="showConfirm" class="modal-overlay" @click.self="closeConfirm">
        <div class="modal-box modal-confirm">
          <div class="confirm-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
          <h4>Hapus Jadwal?</h4>
          <p>Jadwal <strong>{{ selectedJadwal?.mapel }}</strong> akan dihapus permanen.</p>
          <div class="modal-actions">
            <button class="btn-cancel-modern ripple" @click="closeConfirm">Batal</button>
            <button class="btn-delete-modern ripple" @click="deleteJadwal">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../service/axios.js'

const search = ref('')
const showModal = ref(false)
const showConfirm = ref(false)
const isEdit = ref(false)
const isSaving = ref(false)
const selectedJadwal = ref(null)
const jadwalList = ref([])

const form = ref({ id: '', mapel: '', kelas: '', waktu: '', ruang: '', guru: '' })

onMounted(() => { getJadwal() })

const filteredJadwal = computed(() => {
  const k = search.value.toLowerCase()
  return jadwalList.value.filter(j => 
    j.mapel.toLowerCase().includes(k) || j.guru.toLowerCase().includes(k)
  )
})

const getJadwal = async () => {
  try {
    const res = await api.get('/jadwal')
    jadwalList.value = res.data.map(item => ({
      id: item.id || item.id_jadwal,
      mapel: item.mapel || item.mata_pelajaran || '-',
      kelas: item.kelas || '-',
      waktu: item.waktu || item.jam || '-',
      ruang: item.ruang || '-',
      guru: item.guru || item.nama_guru || '-'
    }))
  } catch (e) { console.error(e) }
}

const openModal = (item = null) => {
  isEdit.value = !!item
  form.value = item ? { ...item } : { id: '', mapel: '', kelas: '', waktu: '', ruang: '', guru: '' }
  showModal.value = true
}

const closeModal = () => { showModal.value = false }

const saveJadwal = async () => {
  isSaving.value = true
  try {
    if(isEdit.value) await api.put(`/jadwal/${form.value.id}`, form.value)
    else await api.post('/jadwal', { ...form.value, id: Date.now().toString() })
    getJadwal(); closeModal();
  } catch (e) { alert('Gagal simpan!'); }
  finally { isSaving.value = false; }
}

const openConfirm = (item) => {
  selectedJadwal.value = item
  showConfirm.value = true
}

const closeConfirm = () => { showConfirm.value = false }

const deleteJadwal = async () => {
  try {
    await api.delete(`/jadwal/${selectedJadwal.value.id}`)
    getJadwal(); closeConfirm();
  } catch (e) { alert('Gagal hapus!'); }
}

const getInitials = (n) => n ? n.split(' ').map(x=>x[0]).join('').toUpperCase().substring(0,2) : '?'
</script>

<style scoped>
/* CSS PERSIS IDENTIK DENGAN ABSENSI & SISWA */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.app-container { min-height: 100vh; background: #f8fafc; color: #1e293b; font-family: 'Plus Jakarta Sans', sans-serif; }
.header-glass { background: white; border-bottom: 1px solid #eef2ff; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05); padding: 22px clamp(18px, 5vw, 64px); }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.header-side { flex: 1; display: flex; align-items: center; }
.header-actions { justify-content: flex-end; gap: 12px; }
.header-center { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.header-center h2 { margin: 0; font-size: 1.65rem; font-weight: 800; }
.avatar-aj { width: 42px; height: 42px; background: #4f46e5; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 3px solid #eef2ff; }
.h-line { width: 42px; height: 3px; background: #4f46e5; border-radius: 999px; }

.content-scroll-area { padding: 34px clamp(18px, 5vw, 64px) 56px; }

/* Summary Grid */
.summary-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
.summary-card { background: white; border: 1px solid #eef2ff; border-radius: 18px; padding: 18px; display: flex; align-items: center; gap: 14px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04); }
.summary-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; }
.summary-card p { margin: 0; color: #94a3b8; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; }
.summary-card h3 { margin: 0; color: #4f46e5; font-size: 1.45rem; font-weight: 800; }
.bg-indigo-soft { background: #eef2ff; color: #4f46e5; }
.bg-amber-soft { background: #fffbeb; color: #f59e0b; }
.bg-rose-soft { background: #fff1f2; color: #e11d48; }
.text-amber { color: #f59e0b !important; }
.text-rose { color: #e11d48 !important; }

/* Search Clean */
.search-wrapper { max-width: 800px; margin: 0 auto 28px; }
.search-inner-glass { background: white; border: 1px solid #eef2ff; border-radius: 20px; padding: 16px 24px; display: flex; align-items: center; gap: 14px; box-shadow: 0 18px 40px rgba(79, 70, 229, 0.08); }
.search-inner-glass input { width: 100%; border: none; outline: none; background: transparent; font-weight: 600; }
.btn-clear { border: none; background: transparent; color: #cbd5e1; }
.text-indigo { color: #4f46e5; }

/* Table */
.table-card { background: white; border: 1px solid #eef2ff; border-radius: 20px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06); overflow: hidden; }
.table-responsive { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: #f8fafc; }
th { padding: 18px 24px; color: #64748b; font-size: 0.72rem; font-weight: 800; text-align: left; text-transform: uppercase; }
td { padding: 16px 24px; border-top: 1px solid #f1f5f9; vertical-align: middle; }

.student-cell { display: flex; align-items: center; gap: 12px; }
.avatar-sm { width: 42px; height: 42px; border-radius: 13px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; }
.class-tag { background: #eef2ff; color: #4f46e5; padding: 6px 12px; border-radius: 10px; font-size: 0.72rem; font-weight: 800; }
.time-text { color: #64748b; font-weight: 700; }

.status-pill { border-radius: 999px; padding: 7px 12px; display: inline-flex; align-items: center; gap: 7px; font-size: 0.72rem; font-weight: 800; }
.status-sakit { background: #e0f2fe; color: #0369a1; }
.dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; }

.btn-tool { width: 38px; height: 38px; border: none; border-radius: 12px; background: #f0fdf4; color: #16a34a; margin-left: 6px; }
.btn-tool-danger { background: #fff1f2; color: #e11d48; }

.btn-add-premium, .btn-save-modern { background: #4f46e5; color: white; border: none; border-radius: 14px; padding: 11px 18px; font-weight: 800; display: flex; align-items: center; gap: 8px; box-shadow: 0 14px 28px rgba(79, 70, 229, 0.25); }
.btn-back-modern, .btn-cancel-modern { background: #f1f5f9; color: #64748b; border: none; border-radius: 14px; padding: 11px 18px; font-weight: 800; }

/* Modal & Animations */
.modal-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(15, 23, 42, 0.42); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 18px; }
.modal-box { width: 100%; max-width: 520px; background: white; border-radius: 28px; position: relative; box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22); }
.modal-content-inner { padding: 34px; }
.input-premium { background: #f8fafc; border: 2px solid #f1f5f9; border-radius: 16px; padding: 13px 16px; display: flex; align-items: center; gap: 12px; }
.input-premium input { width: 100%; border: none; outline: none; background: transparent; font-weight: 700; color: #1e293b; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; margin-bottom: 8px; color: #64748b; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; }

.animate-fade-in { animation: fadeIn 0.5s ease; }
.animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

.text-end { text-align: right; }
.ripple:active { transform: scale(0.96); transition: 0.1s; }
.modal-confirm { max-width: 420px; padding: 36px; text-align: center; }
.confirm-icon { width: 78px; height: 78px; margin: 0 auto 20px; border-radius: 50%; background: #fff1f2; color: #e11d48; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
.btn-delete-modern { background: #fff1f2; color: #e11d48; border: none; border-radius: 14px; padding: 11px 18px; font-weight: 800; }
</style>