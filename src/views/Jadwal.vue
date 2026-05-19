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

                <div class="card-actions shadow-lg">
                  <button class="btn-card-tool" @click="editJadwal(item, index)" title="Edit Sesi">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn-card-tool del" @click="hapusJadwal(index)" title="Hapus Sesi">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </div>
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

            <div class="row g-3">
              <div class="col-12">
                <label class="small fw-800 text-muted mb-2 ls-wide">MATA PELAJARAN</label>
                <div class="input-premium">
                  <i class="bi bi-book text-indigo"></i>
                  <input v-model="form.mapel" type="text" placeholder="Contoh: Matematika">
                </div>
              </div>
              <div class="col-md-6">
                <label class="small fw-800 text-muted mb-2 ls-wide">WAKTU (00:00 - 00:00)</label>
                <div class="input-premium">
                  <i class="bi bi-clock text-indigo"></i>
                  <input v-model="form.waktu" type="text" placeholder="07:00 - 08:30">
                </div>
              </div>
              <div class="col-md-6">
                <label class="small fw-800 text-muted mb-2 ls-wide">RUANG</label>
                <div class="input-premium">
                  <i class="bi bi-geo-alt text-indigo"></i>
                  <input v-model="form.ruang" type="text" placeholder="LAB-01">
                </div>
              </div>
              <div class="col-12">
                <label class="small fw-800 text-muted mb-2 ls-wide">GURU PENGAMPU</label>
                <div class="input-premium">
                  <i class="bi bi-person-badge text-indigo"></i>
                  <input v-model="form.guru" type="text" placeholder="Nama Guru">
                </div>
              </div>
            </div>

      <div class="form-group mb-4">
        <label>GURU</label>
        <div class="input-modern">
          <i class="bi bi-person"></i>
          <input v-model="form.guru" placeholder="Nama Guru">
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
      showConfirm: false,
      selectedIndex: null,
      isEdit: false,
      editIndex: null,
      form: { id: null, waktu: '', mapel: '', kelas: '12 IPA 1', guru: '', ruang: '' },
      errors: { mapel: false, waktu: false, ruang: false, guru: false },
      jadwalList: [
        { id: 1, waktu: '07:00 - 08:30', mapel: 'Matematika', kelas: '12 IPA 1', guru: 'Budi Santoso', ruang: 'LAB-01' },
        { id: 2, waktu: '08:30 - 10:00', mapel: 'Bahasa Inggris', kelas: '11 IPS 2', guru: 'Dewi Lestari', ruang: 'R.102' },
        { id: 3, waktu: '10:15 - 11:45', mapel: 'Informatika', kelas: '10 IPA 2', guru: 'Rian Hidayat', ruang: 'LAB-KOM' }
      ]
    }
  },
  methods: {
    getIcon(mapel) {
      const m = mapel.toLowerCase();
      if (m.includes('mat')) return 'bi-calculator';
      if (m.includes('inggris')) return 'bi-translate';
      if (m.includes('info') || m.includes('kom')) return 'bi-cpu';
      if (m.includes('fisika')) return 'bi-rocket-takeoff';
      return 'bi-book';
    },
    openModal() {
      this.isEdit = false;
      this.form = { id: Date.now(), waktu: '', mapel: '', kelas: '12 IPA 1', guru: '', ruang: '' };
      this.showModal = true;
    },
    closeModal() { this.showModal = false },
    editJadwal(item, index) {
      this.isEdit = true;
      this.editIndex = index;
      this.form = { ...item };
      this.showModal = true;
    },
    saveJadwal() {
      // Validasi
      this.errors.mapel = !this.form.mapel.trim();
      this.errors.waktu = !this.form.waktu.trim();
      this.errors.ruang = !this.form.ruang.trim();
      this.errors.guru = !this.form.guru.trim();

      if (Object.values(this.errors).some(e => e)) return;

      if (this.isEdit) {
        this.jadwalList[this.editIndex] = { ...this.form }
      } else {
        this.jadwalList.push({ ...this.form })
      }
      this.closeModal()
    },
    hapusJadwal(index) {
      if (confirm("Hapus jadwal ini?")) {
        this.jadwalList.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');

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

.card-glass-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6)); z-index: 1; }
.icon-box-floating { width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; position: relative; z-index: 2; }

/* Colors */
.card-color-0 .icon-box-floating { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.card-color-1 .icon-box-floating { background: linear-gradient(135deg, #f59e0b, #d97706); }
.card-color-2 .icon-box-floating { background: linear-gradient(135deg, #10b981, #059669); }
.card-color-3 .icon-box-floating { background: linear-gradient(135deg, #f43f5e, #e11d48); }

.mapel-title { font-weight: 800; color: #1e293b; font-size: 1.25rem; margin: 0; }
.badge-status-mini { font-size: 0.65rem; font-weight: 800; background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 4px 10px; border-radius: 8px; }
.info-row { display: flex; align-items: center; gap: 15px; font-weight: 600; color: #64748b; font-size: 0.85rem; }
.teacher-avatar { width: 40px; height: 40px; border-radius: 50%; background: #eef2ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 2px solid white; }
.teacher-name { font-size: 0.7rem; font-weight: 800; color: #475569; }

/* Actions */
.card-actions { 
  position: absolute; top: 50%; right: -60px; transform: translateY(-50%); 
  display: flex; flex-direction: column; gap: 10px; padding: 10px; 
  background: white; border-radius: 15px 0 0 15px; transition: 0.3s; z-index: 10;
}
.agenda-card:hover .card-actions { right: 0; }
.btn-card-tool { width: 35px; height: 35px; border-radius: 10px; border: none; background: #f1f5f9; color: #4f46e5; transition: 0.2s; }
.btn-card-tool:hover { background: #4f46e5; color: white; transform: scale(1.1); }
.btn-card-tool.del:hover { background: #fee2e2; color: #ef4444; }

/* --- MODAL --- */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-box { width: 100%; max-width: 500px; position: relative; }
.btn-close-modern { position: absolute; top: 25px; right: 25px; border: none; background: #f1f5f9; width: 40px; height: 40px; border-radius: 50%; color: #94a3b8; z-index: 10; }
.modal-icon-header { width: 50px; height: 50px; background: #eef2ff; color: #4f46e5; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.input-premium { background: #f8fafc; border: 2px solid #f1f5f9; padding: 12px 18px; border-radius: 16px; display: flex; align-items: center; gap: 12px; transition: 0.3s; }
.input-premium:focus-within { border-color: #4f46e5; background: white; }
.input-premium input { border: none; background: transparent; outline: none; width: 100%; font-weight: 600; }
.btn-save-modern { background: #4f46e5; color: white; border: none; border-radius: 16px; padding: 15px; }
.btn-cancel-modern { background: #f1f5f9; color: #64748b; border: none; border-radius: 16px; padding: 15px; }

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