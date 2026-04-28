<template>
  <div class="login-wrapper">
    <div class="login-card animate-in">
      <div class="brand-header">
        <div class="brand-icon">
          <i class="bi bi-shield-check"></i>
        </div>
        <h4 class="brand-name">Jeprut<span>School</span></h4>
      </div>

      <h5 class="title">Welcome Back</h5>
      <p class="subtitle">Sistem Manajemen Sekolah Terintegrasi</p>

      <div class="mb-3">
        <input type="email" class="form-control input" placeholder="Email">
      </div>

      <div class="mb-3">
        <input type="password" class="form-control input" placeholder="Password">
      </div>

      <div class="d-flex justify-content-between mb-4 small">
        <label class="remember">
          <input type="checkbox" class="form-check-input me-1"> Remember me
        </label>
        <router-link to="/forgot" class="forgot">Forgot password?</router-link>
      </div>

      <button @click="goToDashboard" class="login-btn w-100">Login</button>

      <p class="register-text mt-4">
        Don't have an account?
        <router-link to="/register" class="register-link">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    goToDashboard() {
      // Langsung pindah ke halaman dashboard/home
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  background-image: radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.05) 0, transparent 50%), 
                    radial-gradient(at 50% 0%, rgba(37, 99, 235, 0.05) 0, transparent 50%);
  font-family: 'Inter', sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.brand-header {
  margin-bottom: 30px;
}

.brand-icon {
  font-size: 40px;
  color: #2563eb;
  margin-bottom: 10px;
}

.brand-name {
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.brand-name span {
  color: #2563eb;
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
  border-color: #2563eb;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  outline: none;
}

.remember, .forgot {
  color: #64748b;
  text-decoration: none;
}

.forgot:hover {
  color: #2563eb;
  text-decoration: underline;
}

.login-btn {
  background-color: #2563eb;
  color: white;
  border-radius: 12px;
  padding: 14px;
  border: none;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.login-btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
}

.register-text {
  font-size: 14px;
  color: #64748b;
}

.register-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
</style>