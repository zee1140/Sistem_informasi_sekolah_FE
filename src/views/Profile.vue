<template>
  <div class="app-container">
    <nav class="custom-nav d-flex justify-content-between align-items-center px-5">
      <div class="brand">JeprutSchool</div>
      <router-link to="/dashboard" class="btn-profile">Back to Dashboard</router-link>
    </nav>

    <main class="content-wrapper p-5">
      <div class="container">
        <div class="main-profile-card">
          <div class="row g-0">
            
            <div class="col-lg-4 side-info p-5">
              <div class="avatar-box mb-4">
                <div class="avatar-text">JS</div>
                <button class="edit-badge"><i class="bi bi-pencil-fill"></i></button>
              </div>
              <h2 class="admin-name">{{ adminData.name }}</h2>
              <p class="admin-role">{{ adminData.role }}</p>
              
              <div class="mini-stats mt-5">
                <div class="stat-box">
                  <span class="val">1,200</span>
                  <span class="lab">Siswa</span>
                </div>
                <div class="stat-box">
                  <span class="val">75</span>
                  <span class="lab">Guru</span>
                </div>
              </div>
            </div>

            <div class="col-lg-8 p-5">
              <div class="form-header mb-4">
                <h3>Edit Profile Information</h3>
                <p class="text-muted">Perbarui data diri dan preferensi sistem Anda.</p>
              </div>

              <div class="row g-4">
                <div class="col-md-6">
                  <label class="custom-label">Nama Lengkap</label>
                  <input type="text" class="custom-input" v-model="adminData.name">
                </div>
                <div class="col-md-6">
                  <label class="custom-label">Email Address</label>
                  <input type="email" class="custom-input" v-model="adminData.email">
                </div>
                <div class="col-12">
                  <label class="custom-label">Biografi Singkat</label>
                  <textarea class="custom-input" rows="4" v-model="adminData.bio"></textarea>
                </div>
                <div class="col-md-6">
                  <label class="custom-label">Jabatan</label>
                  <select class="custom-input">
                    <option>Kepala Sistem Informasi</option>
                    <option>Administrator Utama</option>
                    <option>Tim IT</option>
                  </select>
                </div>
                <div class="col-12 mt-5">
                  <button class="btn-save-action">Simpan Perubahan</button>
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
  }
}
</script>

<style scoped>
/* Base Theme - Mengikuti Dashboard */
.app-container {
  min-height: 100vh;
  background-color: #f4f7fe; /* Warna bg yang sama dengan dashboard */
  font-family: 'Inter', sans-serif;
}

.custom-nav {
  height: 80px;
  background: white;
  margin-bottom: 20px;
}

.brand {
  font-weight: 700;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.btn-profile {
  background: #252525;
  color: white;
  padding: 10px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
}


/* Single Card Styling */
.main-profile-card {
  background: white;
  border-radius: 35px; /* Rounded besar sesuai gambar */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border: none;
}

.side-info {
  background: #fafbfc;
  border-right: 1px solid #f0f0f0;
  text-align: center;
}

/* Avatar Style */
.avatar-box {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto;
}

.avatar-text {
  width: 100%;
  height: 100%;
  background: #252525;
  color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 800;
}

.edit-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: white;
  border: 1px solid #eee;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.admin-name {
  font-weight: 700;
  margin-top: 20px;
  color: #1a1a1a;
}

.admin-role {
  color: #888;
  font-size: 0.95rem;
}

/* Mini Stats */
.mini-stats {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.stat-box {
  background: white;
  padding: 15px 25px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.stat-box .val {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
}

.stat-box .lab {
  font-size: 0.8rem;
  color: #aaa;
}

/* Form Styling */
.custom-label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #444;
}

.custom-input {
  width: 100%;
  border: 2px solid #f0f0f0;
  background: #fcfcfc;
  border-radius: 15px;
  padding: 12px 18px;
  outline: none;
  transition: 0.3s;
}

.custom-input:focus {
  border-color: #252525;
  background: white;
}

.btn-save-action {
  width: 100%;
  background: #252525;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 18px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: 0.3s;
}

.btn-save-action:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

</style>