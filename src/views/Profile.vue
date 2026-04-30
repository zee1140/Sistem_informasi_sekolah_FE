<template>
  <div class="app-container animate-profile">
    <nav class="navbar navbar-expand-lg px-4 bg-white border-bottom shadow-sm">
      <div class="container-fluid p-0">
        <span class="navbar-brand d-flex align-items-center m-0">
          <i class="bi bi-shield-check me-2 text-indigo"></i>
          <span class="fw-bold text-dark">JeprutSchool</span>
          <span class="badge-admin ms-2">ADMIN</span>
        </span>
        <div class="d-flex align-items-center gap-3">
          <button @click="$router.push('/dashboard')" class="btn btn-back shadow-sm">
            <i class="bi bi-arrow-left me-2"></i> Kembali ke Dashboard
          </button>
        </div>
      </div>
    </nav>

    <div class="content-scroll-area p-4 p-md-5">
      <div class="container max-width-profile">
        <div class="main-profile-card shadow-lg border-0">
          <div class="row g-0">
            
            <div class="col-lg-4 side-info p-5">
              <div class="avatar-container mb-4">
                <div class="avatar-glow"></div>
                <div class="profile-image-wrapper">
                  <img 
                    :src="adminData.profileImage" 
                    alt="Profile" 
                    class="profile-img-circle"
                  >
                </div>
                
                <div class="edit-badge" @click="triggerFileInput" title="Ganti Foto">
                  <i class="bi bi-camera-fill"></i>
                </div>

                <input 
                  type="file" 
                  ref="fileInput" 
                  @change="onFileChange" 
                  accept="image/*" 
                  style="display: none"
                >
              </div>
              
              <h2 class="admin-name text-dark">{{ adminData.name }}</h2>
              <div class="mb-4">
                <span class="badge-role">{{ adminData.role }}</span>
              </div>
              
              <div class="mini-stats-grid mt-5">
                <div class="stat-card shadow-sm border-0">
                  <span class="stat-val text-indigo">1,200</span>
                  <span class="stat-lab">Siswa</span>
                </div>
                <div class="stat-card shadow-sm border-0">
                  <span class="stat-val text-indigo">75</span>
                  <span class="stat-lab">Guru</span>
                </div>
              </div>
            </div>

            <div class="col-lg-8 p-lg-5 p-4 bg-white">
              <div class="form-header mb-5">
                <h3 class="fw-bold text-dark">Informasi Akun</h3>
                <p class="text-muted">Perbarui data profil dan biografi Anda di bawah ini.</p>
              </div>

              <div class="row g-4">
                <div class="col-md-6">
                  <label class="custom-label">NAMA LENGKAP</label>
                  <input type="text" class="custom-input" v-model="adminData.name">
                </div>
                <div class="col-md-6">
                  <label class="custom-label">ALAMAT EMAIL</label>
                  <input type="email" class="custom-input" v-model="adminData.email">
                </div>
                <div class="col-12">
                  <label class="custom-label">BIOGRAFI SINGKAT</label>
                  <textarea class="custom-input" rows="3" v-model="adminData.bio"></textarea>
                </div>
                <div class="col-md-12">
                  <label class="custom-label">JABATAN SISTEM</label>
                  <select class="custom-input form-select" v-model="adminData.role">
                    <option>Administrator Utama</option>
                    <option>Kepala Sistem Informasi</option>
                    <option>Tim IT Jeprut</option>
                  </select>
                </div>
                <div class="col-12 mt-5">
                  <div class="d-flex gap-3">
                    <button @click="saveData" class="btn-save-action shadow-sm">
                      <i class="bi bi-check-circle-fill me-2"></i>Simpan Perubahan
                    </button>
                    <button @click="$router.push('/dashboard')" class="btn-cancel">Batal</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileAdmin',
  data() {
    return {
      adminData: {
        name: 'Admin Jeprut',
        role: 'Administrator Utama',
        email: 'admin@jeprutschool.sch.id',
        bio: 'Fokus pada pengembangan infrastruktur IT digital sekolah yang modern dan efisien.',
        profileImage: 'https://ui-avatars.com/api/?name=Admin+Jeprut&background=4f46e5&color=fff&size=200'
      }
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("Ukuran file terlalu besar! Maksimal 2MB.");
          return;
        }
        // Membuat preview URL secara instan
        this.adminData.profileImage = URL.createObjectURL(file);
      }
    },
    saveData() {
      alert('Data ' + this.adminData.name + ' telah diperbarui di sistem.');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap');

/* ANTI-MELESAT: Layout Lock */
.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  overflow: hidden;
  position: fixed;
  top: 0; left: 0;
  font-family: 'Public Sans', sans-serif;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
}

.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f8fafc;
}

/* Navbar */
.navbar { height: 75px; z-index: 1000; }
.text-indigo { color: #4f46e5; }
.badge-admin { background: #eef2ff; color: #4f46e5; font-size: 11px; padding: 5px 12px; border-radius: 8px; font-weight: 800; }

.btn-back {
  background: white; color: #475569; border: 1px solid #e2e8f0;
  border-radius: 12px; padding: 10px 20px; font-weight: 700; transition: 0.3s;
}
.btn-back:hover { background: #f1f5f9; color: #4f46e5; transform: translateX(-5px); }

/* Profile Card Structure */
.max-width-profile { max-width: 1100px; }
.main-profile-card {
  background: white;
  border-radius: 40px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.side-info {
  background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
  text-align: center;
}

/* Avatar & Fitur Kamera */
.avatar-container { position: relative; width: 160px; height: 160px; margin: 0 auto; }
.profile-image-wrapper {
  position: relative; width: 100%; height: 100%; border-radius: 50%;
  overflow: hidden; border: 6px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 2;
}
.profile-img-circle { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
.avatar-glow {
  position: absolute; top: 10%; left: 10%; width: 80%; height: 80%;
  background: #4f46e5; filter: blur(25px); opacity: 0.3; z-index: 1;
}
.edit-badge {
  position: absolute; bottom: 5px; right: 5px; background: #4f46e5; color: white;
  width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; border: 4px solid white; z-index: 3; cursor: pointer;
  transition: 0.2s;
}
.edit-badge:hover { transform: scale(1.1); background: #3730a3; }

/* Typography */
.admin-name { font-weight: 800; font-size: 1.8rem; margin-top: 15px; }
.badge-role { background: #eef2ff; color: #4f46e5; padding: 8px 20px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; }

/* Stats Mini */
.mini-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.stat-card { background: white; padding: 20px; border-radius: 24px; border: 1px solid #f1f5f9; }
.stat-val { font-weight: 800; font-size: 1.4rem; display: block; }
.stat-lab { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; }

/* Form Elements */
.custom-label { font-weight: 800; font-size: 0.7rem; letter-spacing: 1px; color: #94a3b8; margin-bottom: 8px; display: block; }
.custom-input {
  width: 100%; border: 2px solid #f1f5f9; background: #f8fafc; border-radius: 16px;
  padding: 14px 20px; font-weight: 600; color: #1e293b; transition: 0.3s;
}
.custom-input:focus { border-color: #4f46e5; background: white; outline: none; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }

/* Action Buttons */
.btn-save-action {
  flex: 2; background: #4f46e5; color: white; border: none;
  padding: 18px; border-radius: 20px; font-weight: 700; transition: 0.3s;
}
.btn-save-action:hover { background: #3730a3; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3); }
.btn-cancel {
  flex: 1; background: #f1f5f9; color: #64748b; border: none;
  padding: 18px; border-radius: 20px; font-weight: 700; transition: 0.3s;
}
.btn-cancel:hover { background: #e2e8f0; color: #1e293b; }

/* Global Fade In */
.animate-profile { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>