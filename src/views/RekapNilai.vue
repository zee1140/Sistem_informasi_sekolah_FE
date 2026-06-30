<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass">
      <div class="header-inner">
        <div class="header-side">
          <button class="btn btn-back-modern ripple" @click="router.push('/dashboard')">
            <i class="bi bi-arrow-left"></i> Dashboard
          </button>
        </div>

        <div class="header-center">
          <div class="avatar-aj shadow-premium">AJ</div>
          <h2>Rekap Nilai Siswa</h2>
          <div class="h-line"></div>
        </div>

        <div class="header-side header-actions">
          <button class="btn-add-premium ripple shadow-sm" @click="openModal()">
            <i class="bi bi-plus-lg"></i>
            <span>Input Nilai</span>
          </button>
        </div>
      </div>
    </header>

    <main class="content-scroll-area">

      <!-- SUMMARY -->
      <section class="summary-grid animate-slide-up">
        <article class="summary-card">
          <div class="summary-icon bg-indigo-soft"><i class="bi bi-bar-chart-fill"></i></div>
          <div>
            <p>Rata-rata Kelas</p>
            <h3>{{ rataRataKelas }}</h3>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-icon bg-amber-soft"><i class="bi bi-check2-circle"></i></div>
          <div>
            <p>Tuntas</p>
            <h3 class="text-amber">{{ totalTuntas }}</h3>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-icon bg-rose-soft"><i class="bi bi-x-octagon"></i></div>
          <div>
            <p>Belum Tuntas</p>
            <h3 class="text-rose">{{ totalBelumTuntas }}</h3>
          </div>
        </article>
      </section>

      <!-- KKM SETTING -->
      <section class="kkm-bar animate-slide-up">
        <label>KKM (Kriteria Ketuntasan Minimal)</label>
        <input type="number" v-model.number="kkm" min="0" max="100">
      </section>

      <!-- SEARCH -->
     <section class="search-wrapper animate-slide-up">

  <div class="search-filter-row">

    <div class="search-inner-glass">
      <i class="bi bi-search text-indigo"></i>

      <input
        v-model="search"
        type="text"
        placeholder="Cari nama atau kelas siswa..."
      >

      <button
        v-if="search"
        type="button"
        class="btn-clear"
        @click="search = ''"
      >
        <i class="bi bi-x-circle-fill"></i>
      </button>
    </div>

    <div class="filter-kelas-wrapper">
      <select v-model="filterKelas" class="filter-kelas-select">
        <option value="">Semua Kelas</option>
        <option v-for="k in daftarKelas" :key="k" :value="k">{{ k }}</option>
      </select>
    </div>

  </div>

</section>

      <!-- TABLE -->
      <section class="table-card animate-slide-up">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Tugas</th>
                <th>UH</th>
                <th>UTS</th>
                <th>UAS</th>
                <th>Nilai Akhir</th>
                <th>Predikat</th>
                <th>Status</th>
                <th class="text-end">Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in filteredNilai" :key="item.id">
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <div class="avatar-sm">{{ getInitials(item.nama) }}</div>
                    <div>
                      <span class="fw-bold d-block">{{ item.nama }}</span>
                      <small class="text-muted">{{ item.kelas }}</small>
                    </div>
                  </div>
                </td>
                <td class="text-center">{{ item.tugas }}</td>
                <td class="text-center">{{ item.uh }}</td>
                <td class="text-center">{{ item.uts }}</td>
                <td class="text-center">{{ item.uas }}</td>
                <td class="text-center fw-bold">{{ hitungNilaiAkhir(item) }}</td>
                <td class="text-center">
                  <span :class="'predikat-pill predikat-' + getPredikat(item)">{{ getPredikat(item) }}</span>
                </td>
                <td class="text-center">
                  <span :class="isTuntas(item) ? 'status-pill status-hadir' : 'status-pill status-alpa'">
                    {{ isTuntas(item) ? 'Tuntas' : 'Belum Tuntas' }}
                  </span>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-content-center gap-2">
                    <button class="btn-action btn-edit" title="Edit" @click="openModal(item)">
                      <i class="bi bi-pencil"></i>
                    </button>
                  <button class="btn-action btn-delete" title="Hapus" @click="openConfirm(item)">
  <i class="bi bi-trash"></i>
</button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredNilai.length === 0">
                <td colspan="9" class="text-center py-4 text-muted">Belum ada data nilai</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box">
        <button class="btn-close-modern ripple" @click="closeModal"><i class="bi bi-x-lg"></i></button>

        <div class="modal-content-inner">
          <div class="modal-heading">
            <div class="modal-icon-header"><i class="bi bi-journal-text"></i></div>
            <h4>{{ isEdit ? 'Edit Nilai' : 'Input Nilai' }}</h4>
          </div>

          <div class="form-group">
            <label>NAMA SISWA</label>
            <div class="input-premium">
              <select v-model="form.siswa_id" @change="onSelectSiswa">
                <option value="">Pilih Nama Siswa</option>
                <option v-for="s in dataSiswa" :key="s.id" :value="s.id">{{ s.nama }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>KELAS</label>
            <div class="input-premium">
              <input v-model="form.kelas" type="text" readonly placeholder="Otomatis terisi">
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>TUGAS (20%)</label>
              <div class="input-premium"><input v-model.number="form.tugas" type="number" min="0" max="100"></div>
            </div>
            <div class="form-group">
              <label>ULANGAN HARIAN (30%)</label>
              <div class="input-premium"><input v-model.number="form.uh" type="number" min="0" max="100"></div>
            </div>
            <div class="form-group">
              <label>UTS (20%)</label>
              <div class="input-premium"><input v-model.number="form.uts" type="number" min="0" max="100"></div>
            </div>
            <div class="form-group">
              <label>UAS (30%)</label>
              <div class="input-premium"><input v-model.number="form.uas" type="number" min="0" max="100"></div>
            </div>
          </div>

          <div class="preview-box">
            Nilai Akhir (preview): <strong>{{ hitungNilaiAkhir(form) }}</strong>
            — Predikat: <strong>{{ getPredikat(form) }}</strong>
            — Status: <strong>{{ isTuntas(form) ? 'Tuntas' : 'Belum Tuntas' }}</strong>
          </div>

          <div class="modal-actions">
            <button class="btn-cancel-modern ripple" @click="closeModal">Batal</button>
            <button class="btn-save-modern ripple" @click="simpanData">{{ isEdit ? 'Update' : 'Simpan' }}</button>
          </div>
        </div>
      </div>
    </div>

  </div>

    <Teleport to="body">
      <div v-if="showDeleteModal" class="delete-modal-overlay" @click.self="closeDeleteConfirm">
        <transition name="box-bounce">
          <div v-if="showDeleteModal" class="delete-modal-box">
            <div class="delete-icon-circle">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </div>

            <h3 class="delete-modal-title">Hapus Data?</h3>
            <p class="delete-modal-text">
              Apakah anda yakin ingin menghapus data nilai ini? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div class="delete-modal-actions">
              <button class="btn-delete-cancel" @click="closeDeleteConfirm">Batal</button>
              <button class="btn-delete-confirm" @click="confirmDelete">Ya, Hapus</button>
            </div>
          </div>
        </transition>
      </div>
    </Teleport>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../service/axios.js'

const router = useRouter()

const search = ref('')
const showModal = ref(false)
const isEdit = ref(false)
const editId = ref(null)

const dataNilai = ref([])
const dataSiswa = ref([])

// KKM bisa diubah sesuai standar sekolah, default 75
const kkm = ref(75)

// BOBOT NILAI (total harus 100%)
const BOBOT = {
  tugas: 0.2,
  uh: 0.3,
  uts: 0.2,
  uas: 0.3
}

const form = ref({
  siswa_id: '',
  nama: '',
  kelas: '',
  tugas: 0,
  uh: 0,
  uts: 0,
  uas: 0
})

// ===== RUMUS NILAI AKHIR =====
// Nilai Akhir = (Tugas × 20%) + (UH × 30%) + (UTS × 20%) + (UAS × 30%)
const hitungNilaiAkhir = (item) => {
  const tugas = Number(item.tugas) || 0
  const uh = Number(item.uh) || 0
  const uts = Number(item.uts) || 0
  const uas = Number(item.uas) || 0

  const nilai =
    tugas * BOBOT.tugas +
    uh * BOBOT.uh +
    uts * BOBOT.uts +
    uas * BOBOT.uas

  return Math.round(nilai * 10) / 10 // dibulatkan 1 angka desimal
}

// ===== PREDIKAT =====
const getPredikat = (item) => {
  const n = hitungNilaiAkhir(item)
  if (n >= 90) return 'A'
  if (n >= 80) return 'B'
  if (n >= 70) return 'C'
  return 'D'
}

// ===== KETUNTASAN =====
const isTuntas = (item) => hitungNilaiAkhir(item) >= kkm.value

const filteredNilai = computed(() => {
  const q = search.value.toLowerCase().trim()
  return dataNilai.value.filter(item => {
    const cocokSearch =
      (item.nama || '').toLowerCase().includes(q) ||
      (item.kelas || '').toLowerCase().includes(q)

    const cocokFilterKelas = filterKelas.value
      ? item.kelas === filterKelas.value
      : true

    return cocokSearch && cocokFilterKelas
  })
})

const rataRataKelas = computed(() => {
  if (dataNilai.value.length === 0) return 0
  const total = dataNilai.value.reduce((sum, item) => sum + hitungNilaiAkhir(item), 0)
  return Math.round((total / dataNilai.value.length) * 10) / 10
})

const totalTuntas = computed(() =>
  dataNilai.value.filter(item => isTuntas(item)).length
)

const totalBelumTuntas = computed(() =>
  dataNilai.value.filter(item => !isTuntas(item)).length
)

const openModal = (data = null) => {
  if (data) {
    isEdit.value = true
    editId.value = data.id
    form.value = { ...data }
  } else {
    isEdit.value = false
    editId.value = null
    form.value = { siswa_id: '', nama: '', kelas: '', tugas: 0, uh: 0, uts: 0, uas: 0 }
  }
  showModal.value = true
}

const closeModal = () => { showModal.value = false }

const onSelectSiswa = () => {
  const s = dataSiswa.value.find(s => s.id === form.value.siswa_id)
  if (s) {
    form.value.nama = s.nama
    form.value.kelas = s.kode_kelas
  }
}

const simpanData = async () => {
  try {
    const payload = {
      siswa_id: form.value.siswa_id,
      kelas: form.value.kelas,
      tugas: form.value.tugas,
      uh: form.value.uh,
      uts: form.value.uts,
      uas: form.value.uas
    }

    if (isEdit.value) {
      await api.put(`/nilai/${editId.value}`, payload)
    } else {
      await api.post('/nilai', payload)
    }

    closeModal()
    getNilai()
  } catch (e) {
    console.error('ERROR SIMPAN NILAI:', e.response?.data || e.message)
    alert('Gagal menyimpan nilai!')
  }
}

const showDeleteModal = ref(false)
const itemToDelete = ref(null)

const openConfirm = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const closeDeleteConfirm = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return
  try {
    await api.delete(`/nilai/${itemToDelete.value.id}`)
    getNilai()
  } catch (e) {
    console.error('ERROR HAPUS NILAI:', e.response?.data || e.message)
    alert('Gagal menghapus data!')
  } finally {
    closeDeleteConfirm()
  }
}

const getInitials = (nama = '') =>
  nama.split(' ').map(i => i[0]).join('').substring(0, 2).toUpperCase()

const getNilai = async () => {
  try {
    const res = await api.get('/nilai')
    dataNilai.value = res.data.map(item => {
      // kalau kelas kosong, coba ambil dari data siswa berdasarkan siswa_id
      let kelasFix = item.kelas
      if (!kelasFix) {
        const siswaCocok = dataSiswa.value.find(s => s.id === item.siswa_id)
        kelasFix = siswaCocok ? siswaCocok.kode_kelas : '-'
      }
      return {
        ...item,
        kelas: kelasFix
      }
    })
  } catch (e) {
    console.error('GET NILAI ERROR:', e.response || e)
  }
}

const getSiswaDariAbsensi = async () => {
  try {
    const res = await api.get('/absensi')

    // mapping field sama seperti di halaman Absensi
    const mapped = res.data.map(item => ({
      id: item.siswa_id,
      nama: item.nama_siswa,
      kode_kelas: item.kode_kelas
    }))

    // dedupe berdasarkan siswa_id, biar siswa yang absen beberapa kali tidak muncul berkali-kali di dropdown
    const unik = []
    const idTerpakai = new Set()

    for (const s of mapped) {
      if (s.id && !idTerpakai.has(s.id)) {
        idTerpakai.add(s.id)
        unik.push(s)
      }
    }

    dataSiswa.value = unik
  } catch (e) {
    console.error('GET SISWA DARI ABSENSI ERROR:', e.response || e)
  }
}

const filterKelas = ref('')

const daftarKelas = computed(() => {
  const set = new Set(dataNilai.value.map(item => item.kelas).filter(Boolean))
  return Array.from(set).sort()
})

onMounted(async () => {
  await getSiswaDariAbsensi()
  await getNilai()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }
.app-container { min-height:100vh; background:#f8fafc; font-family:'Plus Jakarta Sans',sans-serif; }

.header-glass { background:white; padding:22px 40px; border-bottom:1px solid #eef2ff; box-shadow:0 8px 24px rgba(0,0,0,0.04); }
.header-inner { display:flex; align-items:center; justify-content:space-between; gap:20px; }
.header-side { flex:1; display:flex; align-items:center; }
.header-actions { justify-content:flex-end; gap:12px; }
.header-center { text-align:center; }
.header-center h2 { font-weight:800; margin-top:8px; color:#111827; }
.avatar-aj { width:45px; height:45px; border-radius:14px; background:#4f46e5; color:white; display:flex; align-items:center; justify-content:center; font-weight:800; margin:auto; border:3px solid #eef2ff; }
.h-line { width:50px; height:4px; border-radius:999px; background:#4f46e5; margin:10px auto 0; }

.content-scroll-area { padding:35px 40px; }

.summary-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:24px; }
.summary-card { background:white; padding:22px; border-radius:24px; display:flex; align-items:center; gap:15px; border:1px solid #eef2ff; box-shadow:0 10px 30px rgba(0,0,0,0.04); }
.summary-card p { font-size:.75rem; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:4px; }
.summary-card h3 { font-size:1.7rem; font-weight:800; }
.summary-icon { width:54px; height:54px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; }
.bg-indigo-soft { background:#eef2ff; color:#4f46e5; }
.bg-amber-soft { background:#fffbeb; color:#f59e0b; }
.bg-rose-soft { background:#fff1f2; color:#e11d48; }
.text-amber { color:#f59e0b; }
.text-rose { color:#e11d48; }

.kkm-bar { display:flex; align-items:center; gap:12px; background:white; border:1px solid #eef2ff; border-radius:16px; padding:14px 20px; margin-bottom:24px; box-shadow:0 10px 25px rgba(0,0,0,0.03); }
.kkm-bar label { font-weight:700; color:#475569; font-size:.85rem; }
.kkm-bar input {
  width: 80px;
  border: 2px solid #f1f5f9;
  border-radius: 10px;
  padding: 6px 10px;
  font-weight: 700;
  background: #ffffff;
  color: #1e293b;
  -moz-appearance: textfield;
  appearance: textfield;
}

.kkm-bar input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.kkm-bar input::-webkit-outer-spin-button,
.kkm-bar input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.kkm-bar input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.search-wrapper { margin-bottom:24px; }
.search-filter-row {
  display: flex;
  gap: 14px;
  align-items: center;
}

.search-inner-glass {
  flex: 1;
}

.filter-kelas-wrapper {
  flex-shrink: 0;
}

.filter-kelas-select {
  height: 100%;
  background: white;
  border: 1px solid #eef2ff;
  border-radius: 22px;
  padding: 16px 20px;
  font-weight: 600;
  color: #0f172a;
  outline: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.04);
  color-scheme: light;
}

.filter-kelas-select:focus {
  border-color: #4f46e5;
}

@media (max-width: 768px) {
  .search-filter-row {
    flex-direction: column;
  }
  .filter-kelas-wrapper {
    width: 100%;
  }
  .filter-kelas-select {
    width: 100%;
  }
}
.search-inner-glass { background:white; border-radius:22px; padding:16px 22px; display:flex; align-items:center; gap:12px; border:1px solid #eef2ff; box-shadow:0 10px 25px rgba(0,0,0,0.04); }
.search-inner-glass input { width:100%; border:none; outline:none; background:transparent; color:#0f172a; font-weight:600; }
.text-indigo { color:#4f46e5; }
.btn-clear { border:none; background:transparent; color:#94a3b8; cursor:pointer; }

.table-card { background:white; border-radius:28px; overflow:hidden; border:1px solid #eef2ff; box-shadow:0 10px 30px rgba(0,0,0,0.04); }
.table-responsive { overflow-x:auto; }
table { width:100%; border-collapse:collapse; }
thead { background:#f8fafc; }
th { padding:18px 24px; text-align:center; font-size:.75rem; color:#64748b; text-transform:uppercase; font-weight:800; }
td { padding:18px 24px; text-align:center; vertical-align:middle; }
table td:first-child, table th:first-child { text-align:left; }
tbody tr { border-top:1px solid #f1f5f9; transition:.2s ease; }
tbody tr:hover { background:#f8fafc; }

.avatar-sm { width:44px; height:44px; border-radius:14px; background:linear-gradient(135deg,#6366f1,#4f46e5); color:white; display:flex; align-items:center; justify-content:center; font-weight:800; }

.predikat-pill { padding:6px 14px; border-radius:999px; font-weight:800; font-size:.8rem; }
.predikat-A { background:#dcfce7; color:#15803d; }
.predikat-B { background:#dbeafe; color:#1d4ed8; }
.predikat-C { background:#fef3c7; color:#92400e; }
.predikat-D { background:#fff1f2; color:#e11d48; }

.status-pill { padding:8px 14px; border-radius:999px; font-size:.75rem; font-weight:800; display:inline-flex; align-items:center; gap:7px; }
.status-hadir { background:#dcfce7; color:#15803d; }
.status-alpa { background:#fff1f2; color:#e11d48; }

.text-end { text-align:right; }

.btn-back-modern, .btn-add-premium, .btn-save-modern, .btn-cancel-modern, .btn-close-modern { border:none; display:flex; align-items:center; gap:8px; font-weight:700; cursor:pointer; transition:.2s ease; }
.ripple { transition:.2s ease; cursor:pointer; }
.ripple:active { transform:scale(.95); opacity:.8; }
.btn-back-modern { background:#eef2ff; color:#4f46e5; border-radius:999px; padding:8px 16px; font-size:.9rem; }
.btn-back-modern:hover { background:#4f46e5; color:white; transform:translateY(-1px); }
.btn-add-premium, .btn-save-modern { background:#4f46e5; color:white; padding:12px 18px; border-radius:14px; box-shadow:0 14px 28px rgba(79,70,229,.2); }
.btn-add-premium:hover, .btn-save-modern:hover { background:#4338ca; }
.btn-cancel-modern { background:#f1f5f9; color:#64748b; padding:14px; border-radius:16px; justify-content:center; }
.btn-cancel-modern:hover { background:#e2e8f0; }

.btn-action { width:36px; height:36px; border-radius:8px; border:none; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px; transition:.2s ease; }
.btn-edit { background:#f0fdf4; color:#16a34a; }
.btn-edit:hover { background:#dcfce7; }
.btn-delete { background:#fff1f2; color:#e11d48; }
.btn-delete:hover { background:#ffe4e6; }

.modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,.45); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; z-index:9999; }
.modal-box { width:100%; max-width:520px; background:white; border-radius:28px; overflow:hidden; position:relative; box-shadow:0 24px 80px rgba(0,0,0,.2); max-height:90vh; overflow-y:auto; }
.modal-content-inner { padding:35px; }
.modal-heading { display:flex; align-items:center; gap:14px; margin-bottom:25px; }
.modal-heading h4 { font-weight:800; color:#111827; }
.modal-icon-header { width:50px; height:50px; border-radius:14px; background:#eef2ff; color:#4f46e5; display:flex; align-items:center; justify-content:center; }
.btn-close-modern { position:absolute; top:18px; right:18px; width:42px; height:42px; justify-content:center; border-radius:50%; background:#f1f5f9; color:#94a3b8; }
.btn-close-modern:hover { background:#4f46e5; color:white; }

.form-group { margin-bottom:18px; }
.form-group label { display:block; margin-bottom:8px; font-size:.75rem; font-weight:800; color:#64748b; }
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.input-premium input,
.input-premium select {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-weight: 700;
  color: #111827;
  color-scheme: light;
}
.preview-box { background:#eef2ff; color:#4338ca; border-radiuas:14px; padding:14px 18px; font-size:.85rem; font-weight:600; margin-bottom:10px; }

.modal-actions { display:flex; gap:14px; margin-top:25px; }
.modal-actions button { flex:1; }

.d-flex { display:flex; }
.align-items-center { align-items:center; }
.justify-content-end { justify-content:flex-end; }
.gap-2 { gap:8px; }
.gap-3 { gap:12px; }
.d-block { display:block; }
.fw-bold { font-weight:800; }
.text-muted { color:#94a3b8; }
.text-center { text-align:center; }
.py-4 { padding-top:24px; padding-bottom:24px; }

.animate-fade-in { animation:fadeIn .5s ease; }
.animate-slide-up { animation:slideUp .6s ease both; }
@keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
@keyframes slideUp { from{opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);} }

@media(max-width:768px){
  .header-inner { flex-direction:column; }
  .header-side, .header-actions { width:100%; justify-content:center; }
  .content-scroll-area { padding:25px 18px; }
  .summary-grid { grid-template-columns:1fr; }
  .form-grid { grid-template-columns:1fr; }
  th { display:none; }
  table, tbody, tr, td { display:block; width:100%; }
  tr { padding:16px; border-bottom:1px solid #f1f5f9; }
  td { padding:8px 0; border:none; text-align:left !important; }
}
.delete-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.delete-modal-box {
  width: 90%;
  max-width: 380px;
  background: white;
  border-radius: 28px;
  padding: 36px 28px;
  text-align: center;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.2);
}

.delete-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fff1f2;
  color: #e11d48;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}

.delete-modal-title {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 12px;
}

.delete-modal-text {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 28px;
}

.delete-modal-actions {
  display: flex;
  gap: 12px;
}

.btn-delete-cancel,
.btn-delete-confirm {
  flex: 1;
  height: 50px;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-delete-cancel {
  background: #eef2ff;
  color: #4338ca;
}

.btn-delete-cancel:hover {
  background: #e0e7ff;
}

.btn-delete-confirm {
  background: #fff1f2;
  color: #e11d48;
}

.btn-delete-confirm:hover {
  background: #ffe4e6;
}

.box-bounce-enter-active {
  animation: modalBounceIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.box-bounce-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.box-bounce-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

@keyframes modalBounceIn {
  0% { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>