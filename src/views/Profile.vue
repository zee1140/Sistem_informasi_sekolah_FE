<template>
  <div class="app-container">
    <nav class="custom-nav sticky-top d-flex justify-content-between align-items-center px-lg-5 px-3">
      <div class="brand">
        <span class="brand-accent">Jeprut</span>School
      </div>
      <a href="#" @click.prevent="$router.push('/dashboard')" class="btn-back">
        <i class="bi bi-arrow-left-short"></i> Kembali ke Dashboard
      </a>
    </nav>

    <main class="content-wrapper p-lg-5 p-3">
      <div class="container">
        <div class="main-profile-card">
          <div class="row g-0">
            
            <div class="col-lg-4 side-info p-5">
              <div class="avatar-container mb-4">
                <div class="avatar-glow"></div>
                <div class="profile-image-wrapper">
                  <img 
                    src="https://ui-avatars.com/api/?name=Admin+Jeprut&background=1e293b&color=fff&size=200" 
                    alt="Profile" 
                    class="profile-img-circle"
                  >
                </div>
                <div class="edit-badge">
                  <i class="bi bi-camera-fill"></i>
                </div>
              </div>
              
              <h2 class="admin-name">{{ adminData.name }}</h2>
              <div class="mb-4">
                <span class="badge-role">{{ adminData.role }}</span>
              </div>
              
              <div class="mini-stats-grid mt-5">
                <div class="stat-card">
                  <span class="stat-val">1,200</span>
                  <span class="stat-lab">Siswa</span>
                </div>
                <div class="stat-card">
                  <span class="stat-val">75</span>
                  <span class="stat-lab">Guru</span>
                </div>
              </div>
            </div>

            <div class="col-lg-8 p-lg-5 p-4 bg-white">
              <div class="form-header mb-5">
                <h3 class="fw-bold">Edit Informasi Profil</h3>
                <p class="text-muted">Kelola detail akun Anda untuk sistem JeprutSchool.</p>
              </div>

              <div class="row g-4">
                <div class="col-md-6">
                  <label class="custom-label">Nama Lengkap</label>
                  <input type="text" class="custom-input" v-model="adminData.name">
                </div>
                <div class="col-md-6">
                  <label class="custom-label">Alamat Email</label>
                  <input type="email" class="custom-input" v-model="adminData.email">
                </div>
                <div class="col-12">
                  <label class="custom-label">Biografi Singkat</label>
                  <textarea class="custom-input" rows="3" v-model="adminData.bio"></textarea>
                </div>
                <div class="col-md-12">
                  <label class="custom-label">Jabatan</label>
                  <select class="custom-input" v-model="adminData.role">
                    <option>Administrator Utama</option>
                    <option>Kepala Sistem Informasi</option>
                    <option>Tim IT</option>
                  </select>
                </div>
                <div class="col-12 mt-5">
                  <div class="d-flex gap-3">
                    <button @click="saveData" class="btn-save-action">Update Profil</button>
                    <button class="btn-cancel">Batal</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminData: {
        name: 'Admin Jeprut',
        role: 'Administrator Utama',
        email: 'admin@jeprutschool.sch.id',
        bio: 'Fokus pada pengembangan infrastruktur IT digital sekolah yang modern dan efisien.'
      }
    }
  },
  methods: {
    saveData() {
      alert('Profil ' + this.adminData.name + ' berhasil diperbarui!');
    }
  }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.app-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #1e293b;
}

/* Nav */
.custom-nav {
  height: 80px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.brand {
  font-weight: 800;
  font-size: 1.6rem;
}

.brand-accent {
  color: #6366f1;
}

.btn-back {
  background: white;
  color: #1e293b;
  padding: 10px 18px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  transition: 0.3s;
}

.btn-back:hover {
  background: #f8fafc;
  color: #6366f1;
  transform: translateX(-3px);
}

/* Profile Card */
.main-profile-card {
  background: white;
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.side-info {
  background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
  text-align: center;
}

/* Avatar Lingkaran */
.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.profile-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  z-index: 2;
}

.profile-img-circle {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.avatar-container:hover .profile-img-circle {
  transform: scale(1.1);
}

.avatar-glow {
  position: absolute;
  top: 10%; left: 10%;
  width: 80%; height: 80%;
  background: #6366f1;
  filter: blur(25px);
  opacity: 0.35;
  z-index: 1;
}

.edit-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #6366f1;
  color: white;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  z-index: 3;
  cursor: pointer;
}

/* Typography & Badges */
.admin-name {
  font-weight: 800;
  font-size: 1.7rem;
  margin-top: 20px;
}

.badge-role {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 700;
}

/* Stats */
.mini-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-card {
  background: white;
  padding: 15px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
}

.stat-val {
  font-weight: 800;
  font-size: 1.2rem;
  display: block;
}

.stat-lab {
  font-size: 0.7rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 700;
}

/* Form Styles */
.custom-label {
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #64748b;
  display: block;
}

.custom-input {
  width: 100%;
  border: 2px solid #f1f5f9;
  background: #f8fafc;
  border-radius: 14px;
  padding: 12px 18px;
  font-weight: 500;
  transition: 0.3s;
}

.custom-input:focus {
  border-color: #6366f1;
  background: white;
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Buttons */
.btn-save-action {
  flex: 2;
  background: #1e293b;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-weight: 700;
  transition: 0.3s;
}

.btn-save-action:hover {
  background: #334155;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.btn-cancel {
  flex: 1;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-weight: 700;
  transition: 0.3s;
}

.btn-cancel:hover {
  background: #e2e8f0;
  color: #1e293b;
}
</style>