<template>
  <div class="app-container animate-fade-in">
    <header class="header-glass">
      <div class="header-inner">
        <div class="header-side">
          <button class="btn-back-modern ripple" @click="router.push('/siswa')">
            <i class="bi bi-arrow-left"></i>
            Siswa
          </button>
        </div>

        <div class="header-center">
          <div class="avatar-aj shadow-premium">AJ</div>
          <h2>Absensi Siswa</h2>
          <div class="h-line"></div>
        </div>

        <div class="header-side header-actions">
          <button class="btn-report ripple" @click="downloadLaporan">
            <i class="bi bi-download"></i>
            <span>Laporan</span>
          </button>
          <button class="btn-add-premium ripple shadow-sm" @click="openModal()">
            <i class="bi bi-plus-lg"></i>
            <span>Catat Absensi</span>
          </button>
        </div>
      </div>
    </header>

    <main class="content-scroll-area">
      <section class="summary-grid animate-slide-up">
        <article class="summary-card">
          <div class="summary-icon bg-indigo-soft">
            <i class="bi bi-check2-circle"></i>
          </div>
          <div>
            <p>Total Hadir</p>
            <h3>{{ totalHadir }}</h3>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-icon bg-amber-soft">
            <i class="bi bi-clipboard-pulse"></i>
          </div>
          <div>
            <p>Izin/Sakit</p>
            <h3 class="text-amber">{{ totalIzinSakit }}</h3>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-icon bg-rose-soft">
            <i class="bi bi-exclamation-octagon"></i>
          </div>
          <div>
            <p>Tanpa Keterangan</p>
            <h3 class="text-rose">{{ totalAlpa }}</h3>
          </div>
        </article>
      </section>

      <div v-if="pageMessage" class="alert-absensi animate-slide-up">
        <i class="bi bi-exclamation-circle"></i>
        <span>{{ pageMessage }}</span>
        <button type="button" @click="pageMessage = ''"><i class="bi bi-x"></i></button>
      </div>

      <section class="search-wrapper animate-slide-up" style="animation-delay: 0.08s">
        <div class="search-inner-glass">
          <i class="bi bi-search text-indigo"></i>
          <input v-model="search" type="text" placeholder="Cari nama atau kelas siswa...">
          <button v-if="search" type="button" class="btn-clear" @click="search = ''">
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </section>

      <section class="table-card animate-slide-up" style="animation-delay: 0.16s">
        <div v-if="isLoading" class="empty-state">
          <i class="bi bi-arrow-repeat"></i>
          <p>Memuat data absensi...</p>
        </div>

        <div v-else class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Kelas</th>
                <th>Waktu Masuk</th>
                <th>Status</th>
                <th class="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="siswa in filteredAbsensi" :key="siswa.absensiId || siswa.id">
                <td>
                  <div class="student-cell">
                    <div class="avatar-sm">{{ getInitials(siswa.nama) }}</div>
                    <div>
                      <strong>{{ siswa.nama }}</strong>
                      <small>ID: {{ siswa.siswaId || siswa.id }}</small>
                    </div>
                  </div>
                </td>
                <td><span class="class-tag">{{ siswa.kelas }}</span></td>
                <td class="time-text">{{ siswa.waktu }}</td>
                <td>
                  <span class="status-pill" :class="statusClass(siswa.status)">
                    <span class="dot"></span>
                    {{ siswa.status }}
                  </span>
                </td>
                <td class="text-end">
                  <button type="button" class="btn-tool ripple" title="Edit absensi" @click="openModal(siswa)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn-tool btn-tool-danger ripple" title="Hapus absensi" @click="openConfirm(siswa)">
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!isLoading && filteredAbsensi.length === 0" class="empty-state">
          <i class="bi bi-calendar-x"></i>
          <p>Data absensi tidak ditemukan...</p>
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
              <div class="modal-icon-header"><i class="bi bi-calendar-check"></i></div>
              <h4>{{ isEdit ? 'Edit Absensi' : 'Catat Absensi' }}</h4>
            </div>

            <div class="form-group">
              <label>SISWA</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.siswa_id}">
                <i class="bi bi-person text-indigo"></i>
                <select v-model="form.siswa_id" :disabled="isEdit || Boolean(route.params.id)">
                  <option value="" disabled>Pilih Siswa</option>
                  <option v-for="siswa in siswaList" :key="siswa.id" :value="siswa.id">
                    {{ siswa.nama }} - {{ siswa.kode_kelas }}
                  </option>
                </select>
              </div>
              <small v-if="errors.siswa_id" class="text-danger-custom">
                <i class="bi bi-exclamation-circle"></i> Pilih siswa terlebih dahulu!
              </small>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>TANGGAL</label>
                <div class="input-premium" :class="{'border-danger-custom': errors.tanggal}">
                  <i class="bi bi-calendar-date text-indigo"></i>
                  <input v-model="form.tanggal" type="date">
                </div>
                <small v-if="errors.tanggal" class="text-danger-custom">
                  <i class="bi bi-exclamation-circle"></i> Tanggal wajib diisi!
                </small>
              </div>

              <div class="form-group">
                <label>WAKTU MASUK</label>
                <div class="input-premium">
                  <i class="bi bi-clock text-indigo"></i>
                  <input v-model="form.waktu_masuk" type="time">
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>STATUS</label>
              <div class="input-premium" :class="{'border-danger-custom': errors.status}">
                <i class="bi bi-clipboard2-check text-indigo"></i>
                <select v-model="form.status">
                  <option value="" disabled>Pilih Status</option>
                  <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                </select>
              </div>
              <small v-if="errors.status" class="text-danger-custom">
                <i class="bi bi-exclamation-circle"></i> Status wajib dipilih!
              </small>
            </div>

            <div class="form-group">
              <label>KETERANGAN</label>
              <div class="input-premium textarea-input">
                <i class="bi bi-chat-left-text text-indigo"></i>
                <textarea v-model="form.keterangan" rows="3" placeholder="Opsional"></textarea>
              </div>
            </div>

            <small v-if="modalMessage" class="text-danger-custom modal-message">
              <i class="bi bi-exclamation-circle"></i> {{ modalMessage }}
            </small>

            <div class="modal-actions">
              <button class="btn-cancel-modern ripple" @click="closeModal">Batal</button>
              <button class="btn-save-modern ripple" :disabled="isSaving" @click="saveAbsensi">
                {{ isSaving ? 'Menyimpan...' : (isEdit ? 'Update Absensi' : 'Simpan Absensi') }}
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
          <h4>Hapus Absensi?</h4>
          <p>Data absensi ini akan dihapus dari database.</p>
          <div class="modal-actions">
            <button class="btn-cancel-modern ripple" @click="closeConfirm">Batal</button>
            <button class="btn-delete-modern ripple" :disabled="isDeleting" @click="deleteAbsensi">
              {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../service/axios.js'

const router = useRouter()
const route = useRoute()
const search = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const pageMessage = ref('')
const modalMessage = ref('')
const dataAbsensi = ref([])
const siswaList = ref([])
const showModal = ref(false)
const showConfirm = ref(false)
const isEdit = ref(false)
const selectedAbsensi = ref(null)
const statusOptions = ['Hadir', 'Terlambat', 'Izin', 'Sakit', 'Alpa']
const ABSENSI_ENDPOINT = '/absensi'

const today = new Date().toISOString().slice(0, 10)
const form = ref({
  siswa_id: '',
  tanggal: today,
  waktu_masuk: '',
  status: '',
  keterangan: ''
})

const errors = ref({
  siswa_id: false,
  tanggal: false,
  status: false
})

onMounted(() => {
  getAbsensi()
  getSiswa()
})

const filteredAbsensi = computed(() => {
  const keyword = search.value.toLowerCase()

  return dataAbsensi.value.filter(item =>
    item.nama.toLowerCase().includes(keyword) ||
    item.kelas.toLowerCase().includes(keyword) ||
    item.status.toLowerCase().includes(keyword)
  )
})

const totalHadir = computed(() => {
  return dataAbsensi.value.filter(item => item.status.toLowerCase() === 'hadir').length
})

const totalIzinSakit = computed(() => {
  return dataAbsensi.value.filter(item => {
    const status = item.status.toLowerCase()
    return status === 'izin' || status === 'sakit'
  }).length
})

const totalAlpa = computed(() => {
  return dataAbsensi.value.filter(item => {
    const status = item.status.toLowerCase()
    return status === 'alpa' || status === 'tanpa keterangan'
  }).length
})

const getAbsensi = async () => {
  try {
    isLoading.value = true
    pageMessage.value = ''

    const siswaId = route.params.id
    const response = await api.get(siswaId ? `/absensi/${encodeURIComponent(siswaId)}` : '/absensi')
    const rawData = Array.isArray(response.data) ? response.data : [response.data]

    dataAbsensi.value = rawData
      .filter(Boolean)
      .map(normalizeAbsensi)
  } catch (error) {
    console.log('GET ABSENSI ERROR:', error.response || error)
    dataAbsensi.value = []
    pageMessage.value = getErrorMessage(error, 'Data absensi gagal dimuat.')
  } finally {
    isLoading.value = false
  }
}

const getSiswa = async () => {
  try {
    const response = await api.get('/siswa')
    siswaList.value = Array.isArray(response.data)
      ? response.data.map(normalizeSiswa)
      : []
  } catch (error) {
    console.log('GET SISWA ABSENSI ERROR:', error.response || error)
  }
}

const openModal = (absensi = null) => {
  isEdit.value = Boolean(absensi)
  selectedAbsensi.value = absensi
  modalMessage.value = ''
  errors.value = { siswa_id: false, tanggal: false, status: false }

  if (absensi) {
    form.value = {
      siswa_id: absensi.siswaId || '',
      tanggal: absensi.tanggal || today,
      waktu_masuk: normalizeTimeInput(absensi.waktu),
      status: absensi.status || '',
      keterangan: absensi.keterangan || ''
    }
  } else {
    form.value = {
      siswa_id: route.params.id || '',
      tanggal: today,
      waktu_masuk: '',
      status: 'Hadir',
      keterangan: ''
    }
  }

  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalMessage.value = ''
}

const saveAbsensi = async () => {
  errors.value.siswa_id = !form.value.siswa_id
  errors.value.tanggal = !form.value.tanggal
  errors.value.status = !form.value.status

  if (errors.value.siswa_id || errors.value.tanggal || errors.value.status) return

  try {
    isSaving.value = true
    modalMessage.value = ''

    const siswa = siswaList.value.find(item => item.id === form.value.siswa_id)
    const payload = {
      siswa_id: form.value.siswa_id,
      id_siswa: form.value.siswa_id,
      kode_kelas: siswa?.kode_kelas || selectedAbsensi.value?.kelas || '',
      tanggal: form.value.tanggal,
      waktu_masuk: form.value.waktu_masuk || null,
      status: form.value.status,
      keterangan: form.value.keterangan || null
    }

    if (isEdit.value) {
      const id = selectedAbsensi.value?.absensiId || selectedAbsensi.value?.id
      await api.put(`${ABSENSI_ENDPOINT}/${encodeURIComponent(id)}`, payload)
    } else {
      await api.post(ABSENSI_ENDPOINT, payload)
    }

    closeModal()
    await getAbsensi()
  } catch (error) {
    console.log('SAVE ABSENSI ERROR:', error.response || error)
    modalMessage.value = getErrorMessage(error, 'Data absensi gagal disimpan.')
  } finally {
    isSaving.value = false
  }
}

const openConfirm = (absensi) => {
  selectedAbsensi.value = absensi
  pageMessage.value = ''
  showConfirm.value = true
}

const closeConfirm = () => {
  showConfirm.value = false
  selectedAbsensi.value = null
}

const deleteAbsensi = async () => {
  try {
    isDeleting.value = true
    const id = selectedAbsensi.value?.absensiId || selectedAbsensi.value?.id

    if (!id) return

    await api.delete(`${ABSENSI_ENDPOINT}/${encodeURIComponent(id)}`)
    dataAbsensi.value = dataAbsensi.value.filter(item => (item.absensiId || item.id) !== id)
    closeConfirm()
    await getAbsensi()
  } catch (error) {
    console.log('DELETE ABSENSI ERROR:', error.response || error)
    pageMessage.value = getErrorMessage(error, 'Data absensi gagal dihapus.')
    closeConfirm()
  } finally {
    isDeleting.value = false
  }
}

const downloadLaporan = () => {
  const header = ['Nama Siswa', 'Kelas', 'Waktu Masuk', 'Status', 'Keterangan']
  const rows = filteredAbsensi.value.map(item => [
    item.nama,
    item.kelas,
    item.waktu,
    item.status,
    item.keterangan || ''
  ])
  const csv = [header, ...rows]
    .map(row => row.map(escapeCsv).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `laporan-absensi-${today}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

const normalizeAbsensi = (item) => {
  return {
    id: item.id || item.id_absensi || item.siswa_id || item.id_siswa || '',
    absensiId: item.id_absensi || item.absensi_id || item.id || '',
    siswaId: item.siswa_id || item.id_siswa || item.siswa?.id || '',
    nama: item.nama || item.nama_siswa || item.siswa?.nama || '-',
    kelas: item.kode_kelas || item.kelas || item.siswa?.kode_kelas || '-',
    waktu: item.waktu || item.waktu_masuk || item.jam_masuk || item.tanggal || '-',
    tanggal: normalizeDateInput(item.tanggal || item.created_at || ''),
    status: item.status || item.keterangan || 'Hadir',
    keterangan: item.catatan || item.note || item.keterangan_absensi || ''
  }
}

const normalizeSiswa = (siswa) => {
  return {
    id: siswa?.id || '',
    nama: siswa?.nama || '-',
    kode_kelas: siswa?.kode_kelas || '-'
  }
}

const normalizeTimeInput = (value) => {
  if (!value || value === '-') return ''
  const match = String(value).match(/(\d{2}):(\d{2})/)
  return match ? `${match[1]}:${match[2]}` : ''
}

const normalizeDateInput = (value) => {
  if (!value) return ''
  const match = String(value).match(/\d{4}-\d{2}-\d{2}/)
  return match ? match[0] : ''
}

const escapeCsv = (value) => {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

const getInitials = (name) => {
  return String(name || '')
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const statusClass = (status) => {
  switch (status) {
    case 'Hadir': return 'status-hadir'
    case 'Terlambat': return 'status-terlambat'
    case 'Izin': return 'status-izin'
    case 'Sakit': return 'status-sakit'
    case 'Alpa': return 'status-alpa'
    default: return 'status-default'
  }
}

const getErrorMessage = (error, fallback) => {
  const data = error.response?.data

  if (data?.message) return data.message
  if (typeof data === 'string') {
    return data.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }

  return fallback
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.app-container {
  min-height: 100vh;
  background: #f8fafc;
  color: #1e293b;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.header-glass {
  background: white;
  border-bottom: 1px solid #eef2ff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  padding: 22px clamp(18px, 5vw, 64px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.header-side {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-actions {
  justify-content: flex-end;
  gap: 12px;
}

.header-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.header-center h2 {
  margin: 0;
  font-size: 1.65rem;
  font-weight: 800;
}

.avatar-aj {
  width: 42px;
  height: 42px;
  background: #4f46e5;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  border: 3px solid #eef2ff;
}

.h-line {
  width: 42px;
  height: 3px;
  background: #4f46e5;
  border-radius: 999px;
}

.content-scroll-area {
  padding: 34px clamp(18px, 5vw, 64px) 56px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: white;
  border: 1px solid #eef2ff;
  border-radius: 18px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
}

.summary-card p {
  margin: 0 0 4px;
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.summary-card h3 {
  margin: 0;
  color: #4f46e5;
  font-size: 1.45rem;
  font-weight: 800;
}

.summary-card h3 span {
  color: #22c55e;
  font-size: 0.82rem;
  font-weight: 700;
}

.bg-indigo-soft { background: #eef2ff; color: #4f46e5; }
.bg-amber-soft { background: #fffbeb; color: #f59e0b; }
.bg-rose-soft { background: #fff1f2; color: #e11d48; }
.text-amber { color: #f59e0b !important; }
.text-rose { color: #e11d48 !important; }

.search-wrapper {
  max-width: 800px;
  margin: 0 auto 28px;
}

.alert-absensi {
  max-width: 800px;
  margin: 0 auto 24px;
  background: #fff1f2;
  color: #e11d48;
  border: 1px solid #fecdd3;
  border-radius: 14px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.86rem;
  font-weight: 800;
}

.alert-absensi button {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #e11d48;
  font-size: 1.1rem;
}

.search-inner-glass {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(238, 242, 255, 0.95);
  border-radius: 20px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 18px 40px rgba(79, 70, 229, 0.08);
}

.search-inner-glass input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #1e293b;
  font-weight: 600;
}

.text-indigo { color: #4f46e5; }

.btn-clear {
  border: none;
  background: transparent;
  color: #cbd5e1;
}

.table-card {
  background: white;
  border: 1px solid #eef2ff;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8fafc;
}

th {
  padding: 18px 24px;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 800;
  text-align: left;
  text-transform: uppercase;
}

td {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  vertical-align: middle;
}

tbody tr {
  transition: background 0.2s ease;
}

tbody tr:hover {
  background: #f8fafc;
}

.student-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-sm {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.student-cell strong {
  display: block;
  font-weight: 800;
}

.student-cell small {
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 700;
}

.class-tag {
  background: #eef2ff;
  color: #4f46e5;
  border: 1px solid #e0e7ff;
  border-radius: 10px;
  padding: 6px 12px;
  font-size: 0.72rem;
  font-weight: 800;
}

.time-text {
  color: #64748b;
  font-weight: 700;
}

.status-pill {
  border-radius: 999px;
  padding: 7px 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.72rem;
  font-weight: 800;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
}

.status-hadir { background: #dcfce7; color: #15803d; }
.status-terlambat { background: #fffbeb; color: #b45309; }
.status-izin { background: #fef3c7; color: #92400e; }
.status-sakit { background: #e0f2fe; color: #0369a1; }
.status-alpa { background: #fff1f2; color: #e11d48; }
.status-default { background: #f1f5f9; color: #64748b; }

.btn-tool {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 12px;
  background: #f0fdf4;
  color: #16a34a;
  margin-left: 6px;
}

.btn-tool-danger {
  background: #fff1f2;
  color: #e11d48;
}

.btn-back-modern,
.btn-report,
.btn-add-premium,
.btn-cancel-modern,
.btn-save-modern,
.btn-delete-modern {
  border: none;
  border-radius: 14px;
  padding: 11px 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
}

.btn-back-modern,
.btn-report,
.btn-cancel-modern {
  background: #f1f5f9;
  color: #64748b;
}

.btn-add-premium,
.btn-save-modern {
  background: #4f46e5;
  color: white;
  box-shadow: 0 14px 28px rgba(79, 70, 229, 0.25);
}

.btn-delete-modern {
  background: #fff1f2;
  color: #e11d48;
}

.btn-save-modern:disabled,
.btn-delete-modern:disabled {
  cursor: wait;
  opacity: 0.72;
}

.ripple {
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.ripple:active {
  transform: scale(0.96);
  opacity: 0.82;
}

.text-end {
  text-align: right;
}

.empty-state {
  padding: 52px 20px;
  text-align: center;
  color: #94a3b8;
  font-weight: 800;
}

.empty-state i {
  display: block;
  margin-bottom: 12px;
  font-size: 2.4rem;
  opacity: 0.45;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}

.modal-box {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
  position: relative;
}

.modal-content-inner {
  padding: 34px;
}

.btn-close-modern {
  position: absolute;
  top: 22px;
  right: 22px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #f1f5f9;
  color: #94a3b8;
}

.modal-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.modal-heading h4,
.modal-confirm h4 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
}

.modal-icon-header {
  width: 50px;
  height: 50px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.input-premium {
  background: #f8fafc;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-premium:focus-within {
  border-color: #4f46e5;
  background: white;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.input-premium input,
.input-premium select,
.input-premium textarea {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #1e293b;
  font-weight: 700;
}

.textarea-input {
  align-items: flex-start;
}

.text-danger-custom {
  color: #ef4444;
  font-size: 0.74rem;
  font-weight: 800;
}

.border-danger-custom {
  border-color: #ef4444 !important;
  background: #fff5f5 !important;
}

.modal-message {
  display: block;
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  gap: 14px;
}

.modal-actions button {
  flex: 1;
  justify-content: center;
  padding: 15px 18px;
}

.modal-confirm {
  max-width: 420px;
  padding: 36px;
  text-align: center;
}

.modal-confirm p {
  color: #64748b;
  margin: 12px 0 26px;
}

.confirm-icon {
  width: 78px;
  height: 78px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #fff1f2;
  color: #e11d48;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(225, 29, 72, 0.12);
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: all 0.2s ease;
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
  opacity: 0;
}

.modal-zoom-enter-from .modal-box,
.modal-zoom-leave-to .modal-box {
  transform: scale(0.94);
}

.animate-fade-in { animation: fadeIn 0.5s ease; }
.animate-slide-up { animation: slideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
  }

  .header-side,
  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  th {
    display: none;
  }

  table,
  tbody,
  tr,
  td {
    display: block;
    width: 100%;
  }

  tr {
    padding: 16px;
    border-top: 1px solid #f1f5f9;
  }

  td {
    border: none;
    padding: 8px 0;
  }

  .text-end {
    text-align: left;
  }
}
</style>
