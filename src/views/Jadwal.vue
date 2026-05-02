<template>
  <div class="app-container animate-fade-in">

    <!-- HEADER -->
    <div class="header-glass py-3 py-md-4 px-3 px-md-5 bg-white border-bottom shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

        <!-- BACK -->
        <div class="header-side-left">
          <button class="btn btn-back-modern ripple" @click="$router.push('/dashboard')">
            <i class="bi bi-arrow-left"></i> Dashboard
          </button>
        </div>

        <!-- TITLE -->
        <div class="header-center text-center animate-pop">
          <div class="d-flex flex-column align-items-center gap-2">
            <div class="avatar-aj shadow-premium">AJ</div>
            <h2 class="fw-800 text-dark mb-0">Agenda Belajar</h2>
            <div class="h-line"></div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="header-side-right d-flex align-items-center gap-2">
          <div class="qs-badge shadow-sm">
            <span class="qs-lab">TOTAL:</span>
            <span class="qs-val">{{ jadwalList.length }}</span>
          </div>

          <button class="btn btn-add-premium ripple shadow-sm" @click="openModal">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- CONTENT -->
    <div class="content-scroll-area p-3 p-md-5">
      <div class="agenda-wrapper mx-auto">

        <div class="timeline-container">
          <transition-group name="list">

            <div v-for="(item, index) in jadwalList"
                 :key="item.id"
                 class="agenda-row animate-slide-up"
                 :style="`animation-delay:${index * 0.05}s`">

              <!-- LEFT -->
              <div class="d-flex align-items-center gap-3">
                <div class="avatar-sm bg-indigo-grad">
                  <i :class="getIcon(item.mapel)"></i>
                </div>

                <div>
                  <div class="fw-bold text-dark">{{ item.mapel }}</div>
                  <small class="text-muted">
                    {{ item.waktu }} • {{ item.ruang }} • {{ item.kelas }}
                  </small>
                </div>
              </div>

              <!-- GURU -->
              <div class="d-none d-md-block text-muted fw-600">
                {{ item.guru }}
              </div>

              <!-- ACTION (SAMA PERSIS SISWA) -->
              <div class="d-flex gap-2">
                <button class="btn-tool btn-e ripple" @click="editJadwal(item, index)">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn-tool btn-d ripple" @click="hapusJadwal(index)">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>

            </div>

          </transition-group>
        </div>

      </div>
    </div>

    <transition name="modal-zoom">
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">

    <div class="modal-box animate-pop">

      <!-- CLOSE -->
      <button class="btn-close-modern" @click="closeModal">
        <i class="bi bi-x-lg"></i>
      </button>

      <!-- HEADER -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <div class="modal-icon">
          <i class="bi bi-calendar-event"></i>
        </div>
        <h4 class="fw-800 mb-0">
          {{ isEdit ? 'Edit Jadwal' : 'Tambah Jadwal' }}
        </h4>
      </div>

      <!-- FORM -->
      <div class="form-group mb-3">
        <label>MAPEL</label>
        <div class="input-modern">
          <i class="bi bi-book"></i>
          <input v-model="form.mapel" placeholder="Contoh: Matematika">
        </div>
      </div>

      <div class="form-group mb-3">
        <label>WAKTU</label>
        <div class="input-modern">
          <i class="bi bi-clock"></i>
          <input v-model="form.waktu" placeholder="07:00 - 08:30">
        </div>
      </div>

      <div class="form-group mb-3">
        <label>RUANG</label>
        <div class="input-modern">
          <i class="bi bi-geo-alt"></i>
          <input v-model="form.ruang" placeholder="LAB-01">
        </div>
      </div>

      <div class="form-group mb-4">
        <label>GURU</label>
        <div class="input-modern">
          <i class="bi bi-person"></i>
          <input v-model="form.guru" placeholder="Nama Guru">
        </div>
      </div>

      <!-- BUTTON -->
      <div class="d-flex gap-3">
        <button class="btn-cancel w-100" @click="closeModal">
          Kembali
        </button>
        <button class="btn-save w-100" @click="saveJadwal">
          {{ isEdit ? 'Update Data' : 'Simpan' }}
        </button>
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
      showModal: false,
      isEdit: false,
      editIndex: null,
      form: { id: null, waktu: '', mapel: '', kelas: '12 IPA 1', guru: '', ruang: '' },
      jadwalList: [
        { id: 1, waktu: '07:00 - 08:30', mapel: 'Matematika', kelas: '12 IPA 1', guru: 'Budi Santoso', ruang: 'LAB-01' },
        { id: 2, waktu: '08:30 - 10:00', mapel: 'Bahasa Inggris', kelas: '11 IPS 2', guru: 'Dewi Lestari', ruang: 'R.102' },
        { id: 3, waktu: '10:15 - 11:45', mapel: 'Informatika', kelas: '10 IPA 2', guru: 'Rian Hidayat', ruang: 'LAB-KOM' }
      ]
    }
  },
  methods: {
    getIcon(mapel) {
      const m = mapel.toLowerCase()
      if (m.includes('mat')) return 'bi-calculator'
      if (m.includes('inggris')) return 'bi-translate'
      if (m.includes('info')) return 'bi-cpu'
      return 'bi-book'
    },
    openModal() {
      this.isEdit = false
      this.form = { id: Date.now(), waktu: '', mapel: '', kelas: '12 IPA 1', guru: '', ruang: '' }
      this.showModal = true
    },
    closeModal() { this.showModal = false },
    editJadwal(item, index) {
      this.isEdit = true
      this.editIndex = index
      this.form = { ...item }
      this.showModal = true
    },
    saveJadwal() {
      if (!this.form.mapel) return
      if (this.isEdit) {
        this.jadwalList[this.editIndex] = { ...this.form }
      } else {
        this.jadwalList.push({ ...this.form })
      }
      this.closeModal()
    },
    hapusJadwal(index) {
      if (confirm("Hapus jadwal?")) this.jadwalList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

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

.app-container {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}

/* HEADER FIX */
.header-side-left { display:flex; justify-content:flex-start; }
.header-center { flex:1; text-align:center; }
.header-side-right { display:flex; justify-content:flex-end; }

/* BUTTON */
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

.btn-add-premium {
  background: #4f46e5;
  color: white;
  border-radius: 14px;
  width: 42px;
  height: 42px;
}

.qs-badge {
  background: white;
  padding: 10px 16px;
  border-radius: 14px;
}

.qs-val { color:#4f46e5; font-weight:800; }

/* ROW */
.agenda-row {
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:white;
  padding:18px;
  border-radius:18px;
  margin-bottom:12px;
  border:1px solid #eef2ff;
}

.avatar-sm {
  width:46px;
  height:46px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
}

.bg-indigo-grad {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

/* BUTTON TOOL (SAMA SISWA) */
.btn-tool {
  width:38px;
  height:38px;
  border-radius:12px;
  border:none;
}

.btn-e { background:#f0fdf4; color:#16a34a; }
.btn-d { background:#fff1f2; color:#e11d48; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-box { width: 100%; max-width: 480px; }
.btn-close-modern {
  position: absolute; top: 25px; right: 25px; width: 40px; height: 40px; border-radius: 50%;
  background: #f1f5f9; border: none; color: #94a3b8;
  display: flex; align-items: center; justify-content: center;
  transition: 0.3s; z-index: 10;
}
.btn-close-modern:hover { background: #fee2e2; color: #ef4444; transform: rotate(90deg); }

/* INPUT */
.input-premium {
  background:#f8fafc;
  padding:12px;
  border-radius:14px;
}

.input-premium input {
  border:none;
  outline:none;
  width:100%;
}

/* ANIMATION */
.animate-slide-up {
  animation: slideUp 0.5s ease both;
}

/* OVERLAY */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* BOX */
.modal-box {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 30px;
  border-radius: 24px;
  position: relative;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
}

/* CLOSE BUTTON */
.btn-close-modern {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ICON */
.modal-icon {
  width: 45px;
  height: 45px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

/* INPUT */
.input-modern {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 2px solid #f1f5f9;
  padding: 12px 15px;
  border-radius: 14px;
}

.input-modern input {
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
}

/* BUTTON */
.btn-save {
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 12px;
  font-weight: 600;
}

.btn-cancel {
  background: #f1f5f9;
  border: none;
  border-radius: 14px;
  padding: 12px;
  font-weight: 600;
}

/* 🔥 ANIMASI ZOOM (INI YANG LU MAU) */
.modal-zoom-enter-active {
  animation: zoomIn 0.3s ease;
}

.modal-zoom-leave-active {
  animation: zoomOut 0.2s ease;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.7);
    opacity: 0;
  }
}
@keyframes slideUp {
  from { opacity:0; transform:translateY(20px); }
  to { opacity:1; transform:translateY(0); }
}
</style>