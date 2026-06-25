<template>
  <div class="app-container animate-page">

    <div class="header-glass py-3 py-md-4 px-3 px-md-5 bg-white border-bottom shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

        <div class="header-side-left w-100-mobile">
          <button class="btn btn-back-modern ripple" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left"></i>
            Dashboard
          </button>
        </div>

        <div class="header-center text-center animate-pop">
          <div class="d-flex flex-column align-items-center gap-2">
            <div class="avatar-aj shadow-premium">AJ</div>

            <h2 class="fw-800 text-dark mb-0 fs-4-mobile">
              Agenda Pembelajaran
            </h2>

            <div class="h-line"></div>
          </div>
        </div>

        <div class="header-side-right d-flex align-items-center justify-content-end gap-2 gap-md-3 w-100-mobile">

          <div class="qs-badge shadow-sm animate-slide-right">
            <span class="qs-lab">TOTAL MAPEL:</span>
            <span class="qs-val">{{ jadwalList.length }}</span>
          </div>

          <button
            class="btn btn-add-premium ripple shadow-sm"
            @click="openModal()"
          >
            <i class="bi bi-plus-circle-fill me-md-2"></i>
            <span class="d-none d-md-inline">Tambah Jadwal</span>
          </button>

        </div>
      </div>
    </div>

    <div class="content-scroll-area p-3 p-md-5">

      <div class="summary-grid animate-slide-up mb-4 mb-md-5">

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

      </div>

      <div
        class="search-wrapper mb-4 mb-md-5 animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <div class="search-inner-glass border-0">

          <i class="bi bi-search text-indigo me-3"></i>

          <input
            v-model="search"
            type="text"
            placeholder="Cari mata pelajaran atau guru..."
            class="flex-grow-1 border-0 outline-none text-dark fw-600 bg-transparent"
          >

          <transition name="fade">
            <button
              v-if="search"
              class="btn-clear"
              @click="search = ''"
            >
              <i class="bi bi-x-circle-fill"></i>
            </button>
          </transition>

        </div>
      </div>

      <div
        class="table-card bg-white shadow-premium rounded-4 overflow-hidden animate-slide-up"
        style="animation-delay: 0.2s"
      >

        <div class="table-responsive">

          <table class="table table-hover align-middle mb-0">

            <thead class="bg-light d-none d-md-table-header-group">
              <tr class="text-uppercase small fw-800 text-muted ls-wide">
                <th>Mata Pelajaran</th>
                <th>Kelas</th>
                <th>Waktu</th>
                <th>Ruang</th>
                <th class="text-end pe-4">Aksi</th>
              </tr>
            </thead>

            <transition-group
              name="list"
              tag="tbody"
              class="mobile-grid"
            >

              <tr
                v-for="item in filteredJadwal"
                :key="item.id"
                class="row-hover mobile-card"
              >

                <td class="ps-md-4 py-3 border-0-mobile">

                  <div class="d-flex align-items-center gap-3">

                    <div class="avatar-sm initials bg-indigo-grad animate-pop">
                      {{ getInitials(item.guru) }}
                    </div>

                    <div>
                      <div class="fw-bold text-dark mb-0">
                        {{ item.mapel }}
                      </div>

                      <small class="text-muted">
                        Guru: {{ item.guru }}
                      </small>
                    </div>

                  </div>

                </td>

                <td class="border-0-mobile">

                  <div class="mobile-label d-md-none">
                    Kelas
                  </div>

                  <span class="badge-soft-indigo">
                    {{ item.kelas }}
                  </span>

                </td>

                <td class="border-0-mobile">

                  <div class="mobile-label d-md-none">
                    Waktu
                  </div>

                  <div class="fw-semibold text-secondary">
                    <i class="bi bi-clock me-1 opacity-50"></i>
                    {{ item.waktu }}
                  </div>

                </td>

                <td class="border-0-mobile">

                  <div class="mobile-label d-md-none">
                    Ruang
                  </div>

                  <div class="fw-semibold text-secondary">
                    <i class="bi bi-geo-alt me-1 opacity-50"></i>
                    {{ item.ruang }}
                  </div>

                </td>

                <td class="text-md-end pe-md-4 border-0-mobile">

                  <div class="d-flex justify-content-md-end gap-2 mt-2 mt-md-0">

                    <button
                      type="button"
                      class="btn-tool btn-e ripple"
                      @click.stop="openModal(item)"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>

                    <button
                      type="button"
                      class="btn-tool btn-d ripple"
                      @click.stop="openConfirm(item)"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>

                  </div>

                </td>

              </tr>

            </transition-group>

          </table>

          <div
            v-if="filteredJadwal.length === 0"
            class="p-5 text-center animate-pop"
          >
            <i class="bi bi-calendar-x fs-1 text-muted opacity-25"></i>

            <p class="mt-3 fw-bold text-muted">
              Jadwal tidak ditemukan...
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

  <transition name="modal-bounce">
    <div
      v-if="showModal"
      class="clean-modal-overlay"
      @click.self="closeModal"
    >
      <div class="clean-modal-box">

        <button
          class="clean-btn-close"
          @click="closeModal"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="clean-modal-header">
          <div class="clean-modal-icon-box">
            <i class="bi bi-journal-plus"></i>
          </div>
          <h3 class="clean-modal-title">Tambah Mata Pelajaran</h3>
        </div>

        <div class="clean-modal-body">
          
          <div class="clean-input-group">
            <label class="clean-label">NAMA MATA PELAJARAN</label>
            <div class="clean-input-wrapper">
              <i class="bi bi-book-half input-icon"></i>
              <input
                v-model="formGuru.mapel_nama"
                type="text"
                placeholder="Masukkan nama mata pelajaran..."
              >
            </div>
          </div>

          <div class="clean-input-group">
            <label class="clean-label">NAMA PENGAJAR / GURU</label>
            <div class="clean-input-wrapper">
              <i class="bi bi-person-badge input-icon"></i>
              <input
                v-model="formGuru.nama"
                type="text"
                placeholder="Masukkan nama lengkap guru..."
              >
            </div>
          </div>

          <div class="clean-input-group">
            <label class="clean-label">RUANG KELAS TUJUAN</label>
            <div class="clean-input-wrapper">
              <i class="bi bi-door-open input-icon"></i>
              <select v-model="formGuru.kelas">
                <option value="">Pilih Kelas</option>
                <option>X PPLG 1</option>
                <option>X PPLG 2</option>
                <option>XI PPLG 3</option>
              </select>
            </div>
          </div>

        </div>

        <div class="clean-modal-footer">
          <button
            class="btn-clean-cancel"
            @click="closeModal"
          >
            Kembali
          </button>

          <button class="btn-clean-save shadow-premium">
            Simpan Mapel
          </button>
        </div>

      </div>
    </div>
  </transition>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../service/axios.js'

const search = ref('')
const jadwalList = ref([])

const showModal = ref(false)

const formGuru = ref({
  mapel_nama: '',
  nama: '',
  kelas: ''
})

const filteredJadwal = computed(() => {
  const k = search.value.toLowerCase()

  return jadwalList.value.filter(j =>
    j.mapel.toLowerCase().includes(k) ||
    j.guru.toLowerCase().includes(k)
  )
})

onMounted(() => {
  getJadwal()
})

const getJadwal = async () => {
  try {
    const res = await api.get('/mapel')

    jadwalList.value = res.data.map(item => ({
      id: item.id || item.id_mapel,
      mapel: item.mapel || item.mata_pelajaran || '-',
      kelas: item.kelas || '-',
      waktu: item.waktu || item.jam || '-',
      ruang: item.ruang || '-',
      guru: item.guru || item.nama_guru || '-'
    }))
  } catch (e) {
    console.error(e)
  }
}

const openModal = (item = null) => {
  if (item) {
    formGuru.value.mapel_nama = item.mapel
    formGuru.value.nama = item.guru
    formGuru.value.kelas = item.kelas
  } else {
    formGuru.value.mapel_nama = ''
    formGuru.value.nama = ''
    formGuru.value.kelas = ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const openConfirm = (item) => {
  console.log(item)
}

const getInitials = (n) => {
  return n
    ? n
        .split(' ')
        .map(x => x[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : '?'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* =========================
   LAYOUT
========================= */

.app-container {
  height: 100vh;
  background: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
  position: fixed;
  inset: 0;
}

.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 120px);
  scroll-behavior: smooth;
}

.fw-800 {
  font-weight: 800;
}

.ls-wide {
  letter-spacing: 0.05em;
}

.shadow-premium {
  box-shadow: 0 10px 30px -5px rgba(79, 70, 229, 0.15);
}

.text-indigo {
  color: #4f46e5;
}

/* =========================
   HEADER
========================= */

.header-glass {
  background: white;
  border-bottom: 1px solid #f1f5f9;
  min-height: 100px;
}

.header-side-left,
.header-side-right {
  flex: 1;
}

.header-side-left {
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
}

.header-side-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-center {
  flex: 1;
  text-align: center;
}

.w-100-mobile {
  width: auto !important;
}

.avatar-aj {
  width: 44px;
  height: 44px;
  background: #4f46e5;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-bottom: 4px;
  border: 3px solid #eef2ff;
}

.h-line {
  width: 40px;
  height: 3px;
  background: #4f46e5;
  border-radius: 10px;
  margin-top: 4px;
}

/* =========================
   BUTTONS
========================= */

.ripple {
  transition: all 0.2s ease;
  cursor: pointer;
}

.ripple:active {
  transform: scale(0.95);
  opacity: 0.8;
}

.btn-back-modern {
  background: #eef2ff;
  color: #4f46e5;
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s;
}

.btn-back-modern:hover {
  background: #4f46e5;
  color: white;
  transform: translateY(-1px);
}

.btn-add-premium {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
}

.qs-badge {
  background: white;
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid #eef2ff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.qs-val {
  font-weight: 800;
  color: #4f46e5;
}

/* =========================
   SUMMARY
========================= */

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 16px;
}

.summary-card {
  background: white;
  border: 1px solid #eef2ff;
  border-radius: 18px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 12px 28px rgba(15,23,42,0.04);
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
  margin: 0;
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

.bg-indigo-soft {
  background: #eef2ff;
  color: #4f46e5;
}

.bg-amber-soft {
  background: #fffbeb;
  color: #f59e0b;
}

.bg-rose-soft {
  background: #fff1f2;
  color: #e11d48;
}

.text-amber {
  color: #f59e0b !important;
}

.text-rose {
  color: #e11d48 !important;
}

/* =========================
   SEARCH
========================= */

.search-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.search-inner-glass {
  background: rgba(255,255,255,0.6) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.8) !important;
  border-radius: 20px;
  padding: 16px 28px;
  display: flex;
  align-items: center;
  box-shadow: 0 15px 35px rgba(31,38,135,0.05) !important;
}

.btn-clear {
  border: none;
  background: transparent;
  color: #cbd5e1;
}

/* =========================
   TABLE
========================= */

.avatar-sm {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
}

.bg-indigo-grad {
  background: linear-gradient(135deg,#6366f1,#4f46e5);
}

.badge-soft-indigo {
  background: #eef2ff;
  color: #4f46e5;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
}

.btn-tool {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
}

.btn-e {
  background: #f0fdf4;
  color: #16a34a;
}

.btn-d {
  background: #fff1f2;
  color: #e11d48;
}

/* =========================
   ANIMATIONS
========================= */

.animate-page {
  animation: pageEnter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
}

.animate-pop {
  animation: pop 0.45s cubic-bezier(0.175,0.885,0.32,1.275) both;
}

.animate-slide-right {
  animation: slideRight 0.7s ease both;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: scale(1.02) translateY(20px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ========================================================
   CLEAN & PREMIUM MODAL STYLES (SAMA DENGAN TAMBAH SISWA)
======================================================== */

.clean-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.clean-modal-box {
  width: 92%;
  max-width: 480px;
  background: white;
  border-radius: 32px; /* Melengkung halus premium */
  padding: 35px;
  position: relative;
  box-shadow: 0 25px 60px -15px rgba(79, 70, 229, 0.12);
}

.clean-btn-close {
  position: absolute;
  right: 24px;
  top: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  border: none;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.clean-btn-close:hover {
  background: #eef2ff;
  color: #4f46e5;
}

.clean-modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
}

.clean-modal-icon-box {
  width: 50px;
  height: 50px;
  background: #f3f0ff;
  color: #4f46e5;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.clean-modal-title {
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.5px;
}

/* INPUT FORM FIELD STYLES */
.clean-modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.clean-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clean-label {
  font-size: 11px;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.05em;
}

.clean-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.clean-input-wrapper .input-icon {
  position: absolute;
  left: 18px;
  color: #4f46e5;
  font-size: 18px;
  pointer-events: none;
}

.clean-input-wrapper input,
.clean-input-wrapper select {
  width: 100%;
  height: 56px;
  background: #f8fafc;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 0 20px 0 52px;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  outline: none;
  transition: all 0.2s ease;
  appearance: none; /* Menghilangkan style default panah select native */
}

/* Menambahkan panah kustom khusus untuk element select */
.clean-input-wrapper select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%231e293b'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 20px) center;
  background-size: 12px;
}

.clean-input-wrapper input::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.clean-input-wrapper input:focus,
.clean-input-wrapper select:focus {
  background: #ffffff;
  border-color: rgba(79, 70, 229, 0.4);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
}

/* FOOTER BUTTON ACTIONS */
.clean-modal-footer {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-clean-cancel,
.btn-clean-save {
  flex: 1;
  height: 52px;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-clean-cancel {
  background: #f1f5f9;
  color: #64748b;
}

.btn-clean-cancel:hover {
  background: #e2e8f0;
  color: #334155;
}

.btn-clean-save {
  background: #4f46e5;
  color: white;
}

.btn-clean-save:hover {
  background: #3730a3;
  transform: translateY(-1px);
}

/* TRANZISI BOUNCE MODAL */
.modal-bounce-enter-active {
  animation: modalBounceIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-bounce-leave-active {
  transition: opacity 0.2s ease;
}
.modal-bounce-leave-to {
  opacity: 0;
}

@keyframes modalBounceIn {
  0% { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {
  .header-glass {
    padding: 15px !important;
    min-height: 130px;
  }
  .header-side-left,
  .header-side-right {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .header-center {
    order: -1;
    margin-bottom: 5px;
  }
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .mobile-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 15px;
  }
  .mobile-card {
    display: block !important;
    background: white;
    border-radius: 20px !important;
    padding: 20px;
    border: 1px solid #eef2ff !important;
  }
  .border-0-mobile {
    border: none !important;
    padding: 5px 0 !important;
  }
  .mobile-label {
    display: block !important;
    font-size: 10px;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
}
</style>