<template>
  <div class="login-wrapper">
    <div class="login-card animate-in">
      <div class="brand-header">
        <div class="brand-icon">
          <i class="bi bi-person-plus"></i>
        </div>
        <h4 class="brand-name">Jeprut<span>School</span></h4>
      </div>

      <h5 class="title">Create Account</h5>
      <p class="subtitle">Daftar untuk mulai mengelola data sekolah</p>

      <div class="mb-3">
        <input type="text" class="form-control input" placeholder="Full Name">
      </div>

      <div class="mb-3">
        <input type="email" class="form-control input" placeholder="Email Address">
      </div>

      <div class="mb-3">
        <input type="password" class="form-control input" placeholder="Password">
      </div>

      <div class="mb-4">
        <input type="password" class="form-control input" placeholder="Confirm Password">
      </div>

      <button @click="handleRegister" class="login-btn w-100">Register Now</button>

      <p class="register-text mt-4">
        Already have an account?
        <router-link to="/login" class="register-link">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  methods: {
    handleRegister() {
      // Langsung arahkan ke halaman login
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Fix Full Layar */
.login-wrapper {
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  /* Warna Indigo Dashboard */
  background-image: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0, transparent 50%), 
                    radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.05) 0, transparent 50%);
  font-family: 'Inter', sans-serif;
  overflow-y: auto; /* Agar bisa scroll jika layar HP pendek */
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 20px; /* Jaga jarak aman di layar kecil */
}

.brand-header {
  margin-bottom: 25px;
}

.brand-icon {
  font-size: 40px;
  color: #6366f1; /* Indigo */
  margin-bottom: 10px;
}

.brand-name {
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.brand-name span {
  color: #6366f1; /* Indigo */
}

.animate-in {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 30px;
}

.input {
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  transition: all 0.2s;
}

.input:focus {
  border-color: #6366f1;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  outline: none;
}

.login-btn {
  background-color: #6366f1;
  color: white;
  border-radius: 12px;
  padding: 14px;
  border: none;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
}

.login-btn:hover {
  background-color: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
}

.register-text {
  font-size: 14px;
  color: #64748b;
}

.register-link {
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>