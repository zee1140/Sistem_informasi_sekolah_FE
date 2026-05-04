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

      <!-- USERNAME -->
      <div class="mb-3">
        <input
          v-model="username"
          type="text"
          class="form-control input"
          placeholder="Username"
        />
      </div>

      <!-- PASSWORD -->
      <div class="mb-3">
        <input
          v-model="password"
          type="password"
          class="form-control input"
          placeholder="Password"
        />
      </div>

      <div class="d-flex justify-content-between mb-4 small">
        <label class="remember">
          <input type="checkbox" class="form-check-input me-1" />
          Remember me
        </label>
        <router-link to="/forgot" class="forgot">
          Forgot password?
        </router-link>
      </div>

      <!-- BUTTON -->
      <button
        @click="handleLogin"
        class="login-btn w-100"
        :disabled="loading"
      >
        {{ loading ? 'Loading...' : 'Login' }}
      </button>

      <!-- ERROR -->
      <p v-if="error" class="error-text">
        {{ error }}
      </p>

      <p class="register-text mt-4">
        Don't have an account?
        <router-link to="/register" class="register-link">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from '../service/auth'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      this.loading = true

      // 🔍 DEBUG INPUT
      console.log('INPUT USERNAME:', this.username)
      console.log('INPUT PASSWORD:', this.password)

      try {
        const res = await login({
          username: this.username,
          password: this.password
        })

        // 🔍 DEBUG RESPONSE
        console.log('RESPONSE BACKEND:', res.data)

        // simpan token
        localStorage.setItem('token', res.data.token)

        // simpan user (kalau ada)
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user))
        }

        console.log('TOKEN DISIMPAN:', localStorage.getItem('token'))

        // redirect
        this.$router.push('/dashboard')

      } catch (err) {
        // 🔍 DEBUG ERROR
        console.log('ERROR FULL:', err)
        console.log('ERROR RESPONSE:', err.response)
        console.log('ERROR DATA:', err.response?.data)

        this.error =
          err.response?.data?.message ||
          'Login gagal, cek username/password'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.login-wrapper {
  position: fixed;
  inset: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  background-image: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0, transparent 50%),
                    radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.05) 0, transparent 50%);
  font-family: 'Inter', sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.brand-icon {
  font-size: 40px;
  color: #6366f1;
}

.brand-name span {
  color: #6366f1;
}

.input {
  border-radius: 12px;
  padding: 12px;
}

.login-btn {
  background-color: #6366f1;
  color: white;
  border-radius: 12px;
  padding: 12px;
}

.error-text {
  color: red;
  font-size: 13px;
  margin-top: 10px;
}
</style>