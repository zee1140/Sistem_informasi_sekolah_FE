<template>
  <div class="app-wrapper animate-home">
    <nav class="navbar navbar-expand-lg px-4">
      <div class="container-fluid">
        <span class="navbar-brand">JeprutSchool | Profile</span>
        <router-link to="/" class="login-btn">Back to Dashboard</router-link>
      </div>
    </nav>

    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="glass-card p-5 text-center">
            <div class="avatar-wrapper mb-4">
              <div class="avatar-circle">JS</div>
            </div>
            <h2 class="mb-1">Admin Jeprut</h2>
            <p class="text-muted mb-4">Administrator Utama</p>
            
            <div class="text-start mb-4">
              <div class="info-item mb-3">
                <small class="text-uppercase text-muted d-block">Email</small>
                <strong>admin@jeprutschool.sch.id</strong>
              </div>
              <div class="info-item">
                <small class="text-uppercase text-muted d-block">Jabatan</small>
                <strong>Kepala Sistem Informasi</strong>
              </div>
            </div>

            <button class="quick-btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #1c1c1e, #3a3a3c);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.info-item {
  background: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 15px;
}
</style>