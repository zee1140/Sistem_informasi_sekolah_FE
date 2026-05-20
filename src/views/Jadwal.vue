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
            <h2 class="fw-800 text-dark mb-0 fs-4-mobile">Agenda Belajar</h2>
            <div class="h-line"></div>
          </div>
        </div>
        <div class="header-side-right d-flex align-items-center justify-content-end gap-3 w-100-mobile">
           <div class="qs-badge shadow-sm d-none d-md-flex">
            <span class="qs-lab">TOTAL:</span><span class="qs-val">{{ jadwalList.length }} Sesi</span>
          </div>
           <button class="btn btn-add-premium ripple shadow-sm" @click="openModal()">
            <i class="bi bi-calendar-plus"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="content-scroll-area p-3 p-md-5">
      <div class="agenda-wrapper mx-auto">
        
        <div class="day-marker animate-slide-right">
          <span class="day-text">JADWAL AKTIF</span>
          <div class="day-line"></div>
        </div>

        <div v-if="pageMessage" class="alert-data mb-4 animate-pop">
          <i class="bi bi-exclamation-circle"></i>
          <span>{{ pageMessage }}</span>
          <button type="button" @click="pageMessage = ''"><i class="bi bi-x"></i></button>
        </div>

        <div class="timeline-container">
          <transition-group name="list">
            <div v-for="(item, index) in jadwalList" :key="item.id" class="timeline-item">
              <div class="time-col">
                <div class="time-bubble shadow-sm">{{ getStartTime(item.waktu) }}</div>
                <div class="time-line" v-if="index !== jadwalList.length - 1"></div>
              </div>

              <div class="agenda-card shadow-premium ripple" :class="'card-color-' + (index % 4)">
                <div class="card-glass-overlay"></div>
                
                <div class="d-flex justify-content-between align-items-start position-relative z-2">
                  <div class="d-flex gap-3">
                    <div class="icon-box-floating">
                      <i :class="getIcon(item.mapel)"></i>
                    </div>
                    <div>
                      <span class="badge-status-mini">SESI {{ index + 1 }}</span>
                      <h4 class="mapel-title">{{ item.mapel }}</h4>
                      <div class="info-row mt-2">
                        <span class="info-item"><i class="bi bi-geo-alt"></i> {{ item.ruang }}</span>
                        <span class="info-sep"></span>
                        <span class="info-item"><i class="bi bi-people"></i> {{ item.kelas }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="teacher-block text-end d-none d-sm-block">
                     <div class="teacher-avatar ms-auto">{{ getInitial(item.guru) }}</div>
                     <div class="teacher-name mt-2">{{ item.guru }}</div>
                  </div>
                </div>

                <div class="card-actions shadow-lg">
                  <button class="btn-card-tool" @click="editJadwal(item)" title="Edit Sesi">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn-card-tool del" @click="confirmDelete(item)" title="Hapus Sesi">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <div v-if="jadwalList.length === 0" class="text-center py-5 animate-pop">
           <i class="bi bi-journal-x fs-1 text-muted opacity-25"></i>
           <p class="mt-3 fw-bold text-muted">Belum ada jadwal yang dibuat.</p>
           <button class="btn btn-outline-indigo btn-sm rounded-pill" @click="openModal">Tambah Sekarang</button>
        </div>
      </div>
    </div>

    <transition name="modal-zoom">
      <div v-if="showModal" class="modal-overlay px-3" @click.self="closeModal">
        <div class="modal-box bg-white shadow-2xl rounded-5 overflow-hidden position-relative animate-pop">
          <button class="btn-close-modern ripple" @click="closeModal"><i class="bi bi-x-lg"></i></button>
          
          <div class="p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4">
                <div class="modal-icon-header"><i class="bi bi-pencil-square"></i></div>
                <h4 class="fw-800 mb-0">{{ isEdit ? 'Edit Sesi' : 'Sesi Baru' }}</h4>
            </div>

            <div class="row g-3">
              <div class="col-12">
                <label class="small fw-800 text-muted mb-2 ls-wide">MATA PELAJARAN</label>
                <div class="input-premium" :class="{'border-danger-custom': errors.mapel}">
                  <i class="bi bi-book text-indigo"></i>
                  <input v-model="form.mapel" type="text" placeholder="Contoh: Matematika">
                </div>
                <small v-if="errors.mapel" class="text-danger-custom fw-bold mt-1 d-block animate-pop">Wajib diisi!</small>
              </div>

              <div class="col-12">
                <label class="small fw-800 text-muted mb-2 ls-wide">KELAS</label>
                <div class="input-premium" :class="{'border-danger-custom': errors.kelas}">
                  <i class="bi bi-people text-indigo"></i>
                  <input v-model="form.kelas" type="text" placeholder="Contoh: XI-PPLG-1">
                </div>
                <small v-if="errors.kelas" class="text-danger-custom fw-bold mt-1 d-block animate-pop">Kelas harus diisi!</small>
              </div>

              <div class="col-md-6">
                <label class="small fw-800 text-muted mb-2 ls-wide">WAKTU (00:00 - 00:00)</label>
                <div class="input-premium" :class="{'border-danger-custom': errors.waktu}">
                  <i class="bi bi-clock text-indigo"></i>
                  <input v-model="form.waktu" type="text" placeholder="07:00 - 08:30">
                </div>
                <small v-if="errors.waktu" class="text-danger-custom fw-bold mt-1 d-block animate-pop">Waktu tidak valid!</small>
              </div>

              <div class="col-md-6">
                <label class="small fw-800 text-muted mb-2 ls-wide">RUANG</label>
                <div class="input-premium" :class="{'border-danger-custom': errors.ruang}">
                  <i class="bi bi-geo-alt text-indigo"></i>
                  <input v-model="form.ruang" type="text" placeholder="LAB-01">
                </div>
                <small v-if="errors.ruang" class="text-danger-custom fw-bold mt-1 d-block animate-pop">Ruang harus diisi!</small>
              </div>

              <div class="col-12">
                <label class="small fw-800 text-muted mb-2 ls-wide">GURU PENGAMPU</label>
                <div class="input-premium" :class="{'border-danger-custom': errors.guru}">
                  <i class="bi bi-person-badge text-indigo"></i>
                  <input v-model="form.guru" type="text" placeholder="Nama Guru">
                </div>
                <small v-if="errors.guru" class="text-danger-custom fw-bold mt-1 d-block animate-pop">Wajib mencantumkan guru!</small>
              </div>
            </div>

            <div class="d-flex gap-3 mt-5">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="closeModal">Batal</button>
              <button class="btn btn-save-modern flex-grow-1 fw-bold ripple shadow-lg" :disabled="isSaving" @click="saveJadwal">
                {{ isSaving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambahkan') }}
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
              <div class="mx-auto rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 80px; height: 80px; background: #fff1f2; color: #e11d48;">
                <i class="bi bi-calendar-x-fill fs-1"></i>
              </div>
            </div>
            <h4 class="fw-800 text-dark mb-2">Hapus Jadwal?</h4>
            <p class="text-muted mb-4">Sesi ini akan dihapus permanen dari agenda harian. Lanjutkan?</p>
            <div class="d-flex gap-3">
              <button class="btn btn-cancel-modern flex-grow-1 fw-bold ripple" @click="showConfirm = false">Batal</button>
              <button class="btn btn-save-modern flex-grow-1 fw-bold ripple shadow-sm" style="background: #e11d48;" :disabled="isDeleting" @click="hapusJadwal">
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
      showModal: false,
      showConfirm: false,
      selectedJadwal: null,
      isEdit: false,
      isSaving: false,
      isDeleting: false,
      pageMessage: '',
      form: { id: null, waktu: '', mapel: '', kelas: '', guru: '', ruang: '' },
      errors: { mapel: false, waktu: false, ruang: false, guru: false, kelas: false },
      jadwalList: []
    }
  },
  mounted() {
    this.getJadwal()
  },
  methods: {
    async getJadwal() {
      try {
        const response = await api.get('/jadwal')
        this.jadwalList = Array.isArray(response.data)
          ? response.data.map(this.normalizeJadwal)
          : []
      } catch (error) {
        console.log('GET JADWAL ERROR:', error.response || error)
        this.pageMessage = this.getErrorMessage(error, 'Data jadwal gagal dimuat.')
      }
    },
    normalizeJadwal(item) {
      return {
        id: item?.id || item?.id_jadwal || '',
        waktu: item?.waktu || item?.jam || this.joinWaktu(item?.jam_mulai, item?.jam_selesai),
        mapel: item?.mapel || item?.mata_pelajaran || item?.pelajaran || '-',
        kelas: item?.kelas || item?.kode_kelas || '-',
        guru: item?.guru || item?.nama_guru || item?.pengampu || '-',
        ruang: item?.ruang || item?.ruangan || item?.lokasi || '-'
      }
    },
    joinWaktu(mulai, selesai) {
      if (mulai && selesai) return `${mulai} - ${selesai}`
      return mulai || selesai || '-'
    },
    getStartTime(waktu) {
      return String(waktu || '-').split(' - ')[0]
    },
    getInitial(name) {
      return String(name || '?').charAt(0).toUpperCase()
    },
    getIcon(mapel) {
      if(!mapel) return 'bi-book';
      const m = mapel.toLowerCase();
      if (m.includes('mat')) return 'bi-calculator';
      if (m.includes('inggris')) return 'bi-translate';
      if (m.includes('info') || m.includes('kom')) return 'bi-cpu';
      if (m.includes('fisika')) return 'bi-rocket-takeoff';
      return 'bi-book';
    },
    openModal() {
      this.isEdit = false;
      this.selectedJadwal = null
      this.form = { id: null, waktu: '', mapel: '', kelas: '', guru: '', ruang: '' };
      this.errors = { mapel: false, waktu: false, ruang: false, guru: false, kelas: false };
      this.showModal = true;
    },
    closeModal() { this.showModal = false; },
    editJadwal(item) {
      this.isEdit = true;
      this.selectedJadwal = item;
      this.form = { ...item };
      this.errors = { mapel: false, waktu: false, ruang: false, guru: false, kelas: false };
      this.showModal = true;
    },
    async saveJadwal() {
      this.errors.mapel = !this.form.mapel.trim();
      this.errors.waktu = !this.form.waktu.trim();
      this.errors.ruang = !this.form.ruang.trim();
      this.errors.guru = !this.form.guru.trim();
      this.errors.kelas = !this.form.kelas.trim();

      if (Object.values(this.errors).some(e => e)) return;

      try {
        this.isSaving = true
        const payload = {
          id: this.form.id || (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}`),
          waktu: this.form.waktu.trim(),
          mapel: this.form.mapel.trim(),
          mata_pelajaran: this.form.mapel.trim(),
          kelas: this.form.kelas.trim(),
          kode_kelas: this.form.kelas.trim(),
          guru: this.form.guru.trim(),
          nama_guru: this.form.guru.trim(),
          ruang: this.form.ruang.trim()
        }

        if (this.isEdit) {
          await api.put(`/jadwal/${encodeURIComponent(this.selectedJadwal.id)}`, payload)
        } else {
          await api.post('/jadwal', payload)
        }

        await this.getJadwal()
        this.closeModal();
      } catch (error) {
        console.log('SAVE JADWAL ERROR:', error.response || error)
        this.pageMessage = this.getErrorMessage(error, 'Data jadwal gagal disimpan.')
      } finally {
        this.isSaving = false
      }
    },
    confirmDelete(item) {
      this.selectedJadwal = item;
      this.showConfirm = true;
    },
    async hapusJadwal() {
      try {
        this.isDeleting = true
        await api.delete(`/jadwal/${encodeURIComponent(this.selectedJadwal.id)}`)
        this.jadwalList = this.jadwalList.filter(item => item.id !== this.selectedJadwal.id)
        this.showConfirm = false;
        this.selectedJadwal = null;
        await this.getJadwal()
      } catch (error) {
        console.log('DELETE JADWAL ERROR:', error.response || error)
        this.pageMessage = this.getErrorMessage(error, 'Data jadwal gagal dihapus.')
        this.showConfirm = false
      } finally {
        this.isDeleting = false
      }
    },
    getErrorMessage(error, fallback) {
      const data = error.response?.data
      if (data?.message) return data.message
      if (typeof data === 'string') return data.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      return fallback
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* --- VALIDATION --- */
.border-danger-custom { 
  border-color: #ef4444 !important;
  background: #fff5f5 !important; 
}
.text-danger-custom {
   color: #ef4444 !important;
   font-size: 0.7rem; 
  }

/* --- LAYOUT --- */
.app-container { 
  height: 100vh;
  background: #f4f7fe;
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

/* --- HEADER --- */
.header-glass { background: white; border-bottom: 1px solid #f1f5f9; min-height: 100px; }
.avatar-aj { width: 44px; height: 44px; background: #4f46e5; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 4px; border: 3px solid #eef2ff; }
.h-line { width: 40px; height: 3px; background: #4f46e5; border-radius: 10px; margin-top: 4px; }
.btn-back-modern { background: #f1f5f9; border: none; border-radius: 12px; font-weight: 700; font-size: 0.75rem; padding: 10px 18px; color: #64748b; }
.btn-add-premium { background: #4f46e5; color: white; border: none; width: 48px; height: 48px; border-radius: 14px; font-weight: 700; }
.qs-badge { background: white; padding: 8px 15px; border-radius: 12px; border: 1px solid #eef2ff; gap: 8px; }
.qs-val { font-weight: 800; color: #4f46e5; }
.text-indigo { color: #4f46e5; }

/* --- TIMELINE --- */
.agenda-wrapper { max-width: 850px; position: relative; padding-bottom: 50px; }
.day-marker { display: flex; align-items: center; gap: 15px; margin-bottom: 40px; }
.day-text { font-weight: 800; color: #4f46e5; letter-spacing: 2px; font-size: 0.85rem; }
.day-line { height: 2px; flex: 1; background: linear-gradient(90deg, #4f46e5, transparent); }
.alert-data { background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 0.85rem; }
.alert-data button { margin-left: auto; border: none; background: transparent; color: #e11d48; font-size: 1.1rem; }

.timeline-item { display: flex; gap: 25px; }
.time-col { display: flex; flex-direction: column; align-items: center; min-width: 85px; }
.time-bubble { background: white; color: #1e293b; font-weight: 800; padding: 10px 14px; border-radius: 15px; font-size: 0.8rem; z-index: 2; border: 1px solid #e2e8f0; }
.time-line { width: 4px; flex: 1; background: #e2e8f0; min-height: 80px; margin: 5px 0; }

.agenda-card {
  flex: 1; background: white; border-radius: 28px; padding: 25px; margin-bottom: 30px;
  position: relative; overflow: hidden; transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(255,255,255,0.8); cursor: default;
}
.agenda-card:hover { transform: scale(1.02); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1) !important; }

.card-glass-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6)); z-index: 1; }
.icon-box-floating { width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white; position: relative; z-index: 2; }

/* Dynamic Card Themes */
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
.btn-save-modern { background: #4f46e5; color: white; border: none; border-radius: 16px; padding: 15px; transition: 0.3s; }
.btn-cancel-modern { background: #f1f5f9; color: #64748b; border: none; border-radius: 16px; padding: 15px; }

/* --- ANIMATIONS --- */
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(0.9); }
.animate-fade-in { animation: fadeIn 0.6s ease; }
.animate-pop { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
</style>
