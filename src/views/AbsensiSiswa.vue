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
            <h2>Absensi Siswa</h2>
            <div class="h-line"></div>
          </div>

          <div class="header-side header-actions">

            <button class="btn-report ripple btn-hover-premium" @click="downloadLaporan">
              <i class="bi bi-download"></i>
              <span>Laporan</span>
            </button>

            <button class="btn-add-premium ripple shadow-sm btn-hover-premium" @click="openModal()">
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

        <section class="search-wrapper animate-slide-up">

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

        </section>

        <section class="table-card animate-slide-up">

          <div class="table-responsive">

            <table>

              <thead>
    <tr>
      <th>Nama Siswa</th>
      <th>Kelas</th>
      <th>Status</th>
      <th class="text-end">Aksi</th>
    </tr>
  </thead>

        <tbody>
  <tr v-for="siswa in siswaTerbaru" :key="siswa.id">

    <td>
      <div class="d-flex align-items-center gap-3">
        <div class="avatar-sm">
          {{ getInitials(siswa.nama) }}
        </div>
        <div>
          <span class="fw-bold d-block">{{ siswa.nama }}</span>
        </div>
      </div>
    </td>

    <td class="text-center">
      <span class="class-tag">{{ siswa.kelas }}</span>
    </td>

    <td class="text-center">
      <span :class="'status-pill status-' + siswa.status">
        • {{ siswa.status ? siswa.status.charAt(0).toUpperCase() + siswa.status.slice(1) : '-' }}
      </span>
    </td>

    <td class="text-center">
      <div class="d-flex justify-content-center gap-2">
        <button class="btn-action btn-view" title="Lihat">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn-action btn-edit" title="Edit" @click="openModal(siswa)">
          <i class="bi bi-pencil"></i>
        </button>
    <button class="btn-action btn-delete" title="Hapus" @click="openConfirm(siswa)">
  <i class="bi bi-trash"></i>
</button>
      </div>
    </td>

  </tr>

  <tr v-if="siswaTerbaru.length === 0">
    <td colspan="4" class="text-center py-4 text-muted">
      Belum ada data absensi
    </td>
  </tr>
</tbody>
                  
            </table>


          </div>

        </section>

      </main>

      <!-- MODAL -->
      <div name="modal-zoom">

        <div
          v-if="showModal"
          class="modal-overlay"
          @click.self="closeModal"
        >

          <div class="modal-box">

            <button
              class="btn-close-modern ripple btn-hover-premium"
              @click="closeModal"
            >
              <i class="bi bi-x-lg"></i>
            </button>

            <div class="modal-content-inner">

              <div class="modal-heading">

                <div class="modal-icon-header">
                  <i class="bi bi-calendar-check"></i>
                </div>

                <h4>
                  {{ isEdit ? 'Edit Absensi' : 'Catat Absensi' }}
                </h4>

              </div>

              <div class="form-group">

                <label>NAMA SISWA</label>

                <div class="input-premium">
                  <i class="bi bi-person text-indigo"></i>  

                  <select
                    v-model="form.siswa_id"
                    @change="onSelectSiswa"
                    placeholder="Pilih nama siswa"
                  >
                    <option value="">Pilih Nama Siswa</option>
                    <option
                      v-for="siswa in dataSiswa"
                      :key="siswa.id"
                      :value="siswa.id"
                    >
                      {{ siswa.nama }}
                    </option>
                  </select>
                </div>

              </div>

              <div class="form-grid">

                <div class="form-group">

                  <label>KELAS</label>

                  <div class="input-premium">
                    <i class="bi bi-house text-indigo"></i>

                    <input
                      v-model="form.kelas"
                      type="text"
                      placeholder="Otomatis terisi"
                      readonly
                    >
                  </div>

                </div>

                <div class="form-group">
                  <label>TANGGAL</label>

                  <div class="input-premium">
                    <i class="bi bi-calendar"></i>

                    <input
                      type="date"
                      v-model="form.tanggal"
                      readonly
                    >
                  </div>
                </div>

              </div>

  <div class="form-group">
    <label>STATUS</label>

    <div class="input-premium">
<select v-model="form.status">
  <option value="hadir">Hadir</option>
  <option value="izin">Izin</option>
  <option value="alpa">Alpa</option>
  <option value="sakit">Sakit</option>
</select>


    </div>
  </div>

              </div>


              <div class="modal-actions">

                <button
                  class="btn-cancel-modern ripple btn-hover-premium"
                  @click="closeModal"
                >
                  Batal
                </button>

                <button
                  class="btn-save-modern ripple btn-hover-premium"
                  @click="simpanData"
                >
                  {{ isEdit ? 'Update' : 'Simpan' }}
                </button>

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
                Apakah anda yakin ingin menghapus data absensi ini? Tindakan ini tidak dapat dibatalkan.
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

const dataAbsensi = ref([])
const dataSiswa = ref([])

const form = ref({
  siswa_id: '',
  nama: '',
  kelas: '',
  tanggal: new Date().toISOString().split('T')[0],
  status: 'Hadir'
})

const filteredAbsensi = computed(() => {
  return dataAbsensi.value.filter(item =>
    (item.nama || '').toLowerCase().includes(search.value.toLowerCase()) ||
    (item.kelas || '').toLowerCase().includes(search.value.toLowerCase())
  )
})

const siswaTerbaru = computed(() => filteredAbsensi.value ?? [])

const totalHadir = computed(() =>
  dataAbsensi.value.filter(i => i.status === 'hadir').length
)
const totalIzinSakit = computed(() =>
  dataAbsensi.value.filter(i => i.status === 'izin' || i.status === 'sakit').length
)
const totalAlpa = computed(() =>
  dataAbsensi.value.filter(i => i.status === 'alpha').length
)

const openModal = (data = null) => {
  if (data) {
    isEdit.value = true
    editId.value = data.id
    form.value = {
      siswa_id: data.siswa_id,   // ← pastikan ini ada
      nama: data.nama,
      kelas: data.kelas,
      tanggal: data.tanggal ? data.tanggal.split('T')[0] : new Date().toISOString().split('T')[0],
      status: data.status || 'hadir'
    }
  } else {
    isEdit.value = false
    editId.value = null
    form.value = {
      siswa_id: '',
      nama: '',
      kelas: '',
      tanggal: new Date().toISOString().split('T')[0],
      status: 'hadir'
    }
  }
  showModal.value = true
}
const onSelectSiswa = () => {
  if (!form.value.siswa_id) {
    form.value.nama = ''
    form.value.kelas = ''
    return
  }
  const siswaSelected = dataSiswa.value.find(s => s.id === form.value.siswa_id)
  if (siswaSelected) {
    form.value.nama = siswaSelected.nama
    form.value.kelas = siswaSelected.kode_kelas // ← pakai kode_kelas
  }
}

const closeModal = () => {
  showModal.value = false
}

const simpanData = async () => {
  try {
    const payload = {
      siswa_id: form.value.siswa_id,
      tanggal: form.value.tanggal,
      status: form.value.status,
      kelas: form.value.kelas
    }

    if (isEdit.value) {
      await api.put(`/absensi/${editId.value}`, payload)
    } else {
      await api.post('/absensi', payload)
    }

    closeModal()
    getAbsensi() // refresh tabel
  } catch (e) {
    console.error('ERROR SIMPAN:', e.response?.data || e.message)
    alert('Gagal menyimpan absensi!')
  }
}

const hapusData = async (id) => {
  const yakin = confirm('Hapus data absensi ini?')
  if (!yakin) return
  try {
    await api.delete(`/absensi/${id}`)
    getAbsensi()
  } catch (e) {
    console.error('ERROR HAPUS:', e.response?.data || e.message)
    alert('Gagal menghapus data!')
  }
}

const downloadLaporan = () => {
  alert('Fitur download laporan akan segera tersedia')
}

const getInitials = (nama = '') => {
  return nama.split(' ').map(i => i[0]).join('').substring(0, 2).toUpperCase()
}

const getAbsensi = async () => {
  try {
    const response = await api.get('/absensi')
    // mapping nama_siswa → nama, kode_kelas → kelas
    dataAbsensi.value = response.data.map(item => ({
      ...item,
      nama: item.nama_siswa,
      kelas: item.kode_kelas
    }))
  } catch (error) {
    console.error('GET ABSENSI ERROR:', error.response || error)
  }
}

const getSiswa = async () => {
  try {
    const response = await api.get('/siswa')
    dataSiswa.value = response.data
    console.log('SISWA:', response.data)
  } catch (error) {
    console.error('GET SISWA ERROR:', error.response || error)
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
    await api.delete(`/absensi/${itemToDelete.value.id}`)
    getAbsensi()
  } catch (e) {
    console.error('ERROR HAPUS:', e.response?.data || e.message)
    alert('Gagal menghapus data!')
  } finally {
    closeDeleteConfirm()
  }
}

onMounted(() => {
  getSiswa()
  getAbsensi()
})

  </script>
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  .app-container{
    min-height:100vh;
    background:#f8fafc;
    font-family:'Plus Jakarta Sans',sans-serif;
  }

  /* HEADER */

  .header-glass{
    background:white;
    padding:22px 40px;
    border-bottom:1px solid #eef2ff;
    box-shadow:0 8px 24px rgba(0,0,0,0.04);
  }

  .header-inner{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:20px;
  }

  .header-side{
    flex:1;
    display:flex;
    align-items:center;
  }

  .header-actions{
    justify-content:flex-end;
    gap:12px;
  }

  .header-center{
    text-align:center;
  }

  .header-center h2{
    font-weight:800;
    margin-top:8px;
    color:#111827;
  }

  .avatar-aj{
    width:45px;
    height:45px;
    border-radius:14px;
    background:#4f46e5;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:800;
    margin:auto;
    border:3px solid #eef2ff;
  }

  .h-line{
    width:50px;
    height:4px;
    border-radius:999px;
    background:#4f46e5;
    margin:10px auto 0;
  }

  /* CONTENT */

  .content-scroll-area{
    padding:35px 40px;
  }

  /* SUMMARY */

  .summary-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:18px;
    margin-bottom:30px;
  }

  .summary-card{
    background:white;
    padding:22px;
    border-radius:24px;
    display:flex;
    align-items:center;
    gap:15px;
    border:1px solid #eef2ff;
    box-shadow:0 10px 30px rgba(0,0,0,0.04);
  }

  .summary-card p{
    font-size:.75rem;
    font-weight:800;
    color:#94a3b8;
    text-transform:uppercase;
    margin-bottom:4px;
  }

  .summary-card h3{
    font-size:1.7rem;
    font-weight:800;
  }

  .summary-icon{
    width:54px;
    height:54px;
    border-radius:16px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.4rem;
  }

  .bg-indigo-soft{
    background:#eef2ff;
    color:#4f46e5;
  }

  .bg-amber-soft{
    background:#fffbeb;
    color:#f59e0b;
  }

  .bg-rose-soft{
    background:#fff1f2;
    color:#e11d48;
  }

  .text-amber{
    color:#f59e0b;
  }

  .text-rose{
    color:#e11d48;
  }

  /* SEARCH */

  .search-wrapper{
    margin-bottom:28px;
  }

  .search-inner-glass{
    background:white;
    border-radius:22px;
    padding:16px 22px;
    display:flex;
    align-items:center;
    gap:12px;
    border:1px solid #eef2ff;
    box-shadow:0 10px 25px rgba(0,0,0,0.04);
  }

  .search-inner-glass input{
    width:100%;
    border:none;
    outline:none;
    background:transparent;
    color:#0f172a;
    font-weight:600;
  }

  .text-indigo{
    color:#4f46e5;
  }

  .btn-clear{
    border:none;
    background:transparent;
    color:#94a3b8;
    cursor:pointer;
  }

  /* TABLE */

  .table-card{
    background:white;
    border-radius:28px;
    overflow:hidden;
    border:1px solid #eef2ff;
    box-shadow:0 10px 30px rgba(0,0,0,0.04);
  }

  .table-responsive{
    overflow-x:auto;
  }

  table{
    width:100%;
    border-collapse:collapse;
  }

  thead{
    background:#f8fafc;
  }

  th{
    padding:18px 24px;
    text-align:left;
    font-size:.75rem;
    color:#64748b;
    text-transform:uppercase;
    font-weight:800;
  }

  td{
    padding:18px 24px;
  }

  tbody tr{
    border-top:1px solid #f1f5f9;
    transition:.2s ease;
  }

  tbody tr:hover{
    background:#f8fafc;
  }

  .student-cell{
    display:flex;
    align-items:center;
    gap:14px;
  }

  .avatar-sm{
    width:44px;
    height:44px;
    border-radius:14px;
    background:linear-gradient(135deg,#6366f1,#4f46e5);
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:800;
  }

  .student-cell strong{
    display:block;
    color:#111827;
    font-weight:800;
  }

  .student-cell small{
    color:#94a3b8;
    font-size:.72rem;
    font-weight:700;
  }

  .class-tag{
    background:#eef2ff;
    color:#4f46e5;
    padding:7px 14px;
    border-radius:10px;
    font-size:.78rem;
    font-weight:800;
  }

  .time-text{
    font-weight:700;
    color:#64748b;
  }

  .status-pill{
    padding:8px 14px;
    border-radius:999px;
    font-size:.75rem;
    font-weight:800;
    display:inline-flex;
    align-items:center;
    gap:7px;
  }

  .dot{
    width:7px;
    height:7px;
    border-radius:999px;
    background:currentColor;
  }

  .status-hadir{
    background:#dcfce7;
    color:#15803d;
  }

  .status-izin{
    background:#fef3c7;
    color:#92400e;
  }

  .status-sakit{
    background:#e0f2fe;
    color:#0369a1;
  }

  .status-alpa{
    background:#fff1f2;
    color:#e11d48;
  }

  .status-default{
    background:#f1f5f9;
    color:#64748b;
  }

  .text-end{
    text-align:right;
  }

  /* BUTTON */

  .btn-back-modern,
  .btn-report,
  .btn-add-premium,
  .btn-save-modern,
  .btn-cancel-modern,
  .btn-tool,
  .btn-close-modern{
    border:none;
    display:flex;
    align-items:center;
    gap:8px;
    font-weight:700;
    cursor:pointer;
    transition:0.2s ease;
  }

  /* DASHBOARD BUTTON SAMA PERSIS */
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


  /* BUTTON LAIN */

  .btn-report{
    background:#f1f5f9;
    color:#64748b;
    padding:12px 18px;
    border-radius:14px;
  }

  .btn-report:hover{
    background:#0f172a;
    color:white;
  }

  .btn-add-premium,
  .btn-save-modern{
    background:#4f46e5;
    color:white;
    padding:12px 18px;
    border-radius:14px;
    box-shadow:0 14px 28px rgba(79,70,229,.2);
  }

  .btn-add-premium:hover,
  .btn-save-modern:hover{
    background:#4338ca;
  }

  .btn-cancel-modern{
    background:#f1f5f9;
    color:#64748b;
    padding:14px;
    border-radius:16px;
    justify-content:center;
  }

  .btn-cancel-modern:hover{
    background:#e2e8f0;
  }

  .btn-tool{
    width:40px;
    height:40px;
    justify-content:center;
    border-radius:12px;
    background:#ecfdf5;
    color:#16a34a;
  }

  .btn-tool:hover{
    background:#22c55e;
    color:white;
  }

  .btn-tool-danger{
    background:#fff1f2;
    color:#e11d48;
  }

  .btn-tool-danger:hover{
    background:#e11d48;
    color:white;
  }

  .btn-close-modern{
    position:absolute;
    top:18px;
    right:18px;
    width:42px;
    height:42px;
    justify-content:center;
    border-radius:50%;
    background:#f1f5f9;
    color:#94a3b8;
  }

  .btn-close-modern:hover{
    background:#4f46e5;
    color:white;
  }

  /* HOVER HALUS */

  .btn-hover-premium:hover{
    transform:translateY(-1px);
  }

  /* MODAL */

  .modal-overlay{
    position:fixed;
    inset:0;
    background:rgba(15,23,42,.45);
    backdrop-filter:blur(8px);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
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

  .modal-box{
    width:100%;
    max-width:500px;
    background:white;
    border-radius:28px;
    overflow:hidden;
    position:relative;
    box-shadow:0 24px 80px rgba(0,0,0,.2);
  }

  .modal-content-inner{
    padding:35px;
  }

  .modal-heading{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:25px;
  }

  .modal-heading h4{
    font-weight:800;
    color:#111827;
  }

  .modal-icon-header{
    width:50px;
    height:50px;
    border-radius:14px;
    background:#eef2ff;
    color:#4f46e5;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .form-group{
    margin-bottom:18px;
  }

  .form-group label{
    display:block;
    margin-bottom:8px;
    font-size:.75rem;
    font-weight:800;
    color:#64748b;
  }

  .form-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:14px;
  }

  .input-premium{
    background:#f8fafc;
    border:2px solid #f1f5f9;
    border-radius:16px;
    padding:14px 16px;
    display:flex;
    align-items:center;
    gap:10px;
    transition:.2s;
  }

  .input-premium:focus-within{
    border-color:#4f46e5;
    background:white;
    box-shadow:0 0 0 4px rgba(79,70,229,.1);
  }

  .input-premium input,
  .input-premium select{
    width:100%;
    border:none;
    outline:none;
    background:transparent;
    font-weight:700;
    color:#111827;
  }

  .modal-actions{
    display:flex;
    gap:14px;
    margin-top:25px;
  }

  .modal-actions button{
    flex:1;
  }

  /* RIPPLE */

  .ripple{
    transition:.2s ease;
  }

  .ripple:active{
    transform:scale(.96);
  }

  /* ANIMATION */

  .animate-fade-in{
    animation:fadeIn .5s ease;
  }

  .animate-slide-up{
    animation:slideUp .6s ease both;
  }

  .modal-zoom-enter-active,
  .modal-zoom-leave-active{
    transition:.2s ease;
  }

  .modal-zoom-enter-from,
  .modal-zoom-leave-to{
    opacity:0;
  }

  .modal-zoom-enter-from .modal-box,
  .modal-zoom-leave-to .modal-box{
    transform:scale(.94);
  }

  @keyframes fadeIn{
    from{
      opacity:0;
    }
    to{
      opacity:1;
    }
  }

  @keyframes slideUp{
    from{
      opacity:0;
      transform:translateY(20px);
    }
    to{
      opacity:1;
      transform:translateY(0);
    }
  }

  /* MOBILE */

  @media(max-width:768px){

    .header-inner{
      flex-direction:column;
    }

    .header-side,
    .header-actions{
      width:100%;
      justify-content:center;
    }

    .content-scroll-area{
      padding:25px 18px;
    }

    .summary-grid{
      grid-template-columns:1fr;
    }

    .form-grid{
      grid-template-columns:1fr;
    }

    th{
      display:none;
    }

    table,
    tbody,
    tr,
    td{
      display:block;
      width:100%;
    }

    tr{
      padding:16px;
    }

    td{
      padding:8px 0;
      border:none;
    }

    .text-end{
      text-align:left;
    }
  }
  /* Style Tambahan untuk Label Bertingkat dan Tombol Aksi */
  .d-flex { display: flex; }
  .flex-column { flex-direction: column; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .align-items-center { align-items: center; }
  .justify-content-end { justify-content: flex-end; }
  .mb-1 { margin-bottom: 4px; }
  .d-block { display: block; }
  .text-xs { font-size: 11px; }

  .status-hadir { background:#dcfce7; color:#15803d; }
.status-izin  { background:#fef3c7; color:#92400e; }
.status-sakit { background:#e0f2fe; color:#0369a1; }
.status-alpa  { background:#fff1f2; color:#e11d48; }

  /* Badge Status Aktif Hijau */
  .badge-active {
    background-color: #e6f9f0;
    color: #10b981;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    display: inline-block;
  }

  /* Kustomisasi Tombol Aksi Sesuai Gambar */
  .btn-action {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s ease;
  }

  .btn-view {
    background-color: #f0f7ff;
    color: #0284c7;
  }
  .btn-view:hover { background-color: #e0f2fe; }

  .btn-edit {
    background-color: #f0fdf4;
    color: #16a34a;
  }
  .btn-edit:hover { background-color: #dcfce7; }

  .btn-delete {
    background-color: #fff1f2;
    color: #e11d48;
  }
  .btn-delete:hover { background-color: #ffe4e6; }
  

  table th {
  padding: 18px 24px;
  text-align: center;
  font-size: .75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 800;
}

table td {
  padding: 18px 24px;
  text-align: center;
  vertical-align: middle;
}

/* kolom nama tetap kiri */
table td:first-child,
table th:first-child {
  text-align: left;
}
  </style>