<template>
  <div class="login-wrapper">
    <div class="login-card animate-in">
      <div class="avatar">
        <i class="bi bi-person-plus"></i>
      </div>

      <h5 class="title">Create Account</h5>
      <p class="subtitle">Register to get started</p>

      <div class="mb-3">
        <input v-model="name" type="text" class="form-control input" placeholder="Full Name">
      </div>

      <div class="mb-3">
        <input v-model="email" type="email" class="form-control input" placeholder="Email">
      </div>

      <div class="mb-3">
        <input v-model="password" type="password" class="form-control input" placeholder="Password">
      </div>

      <div class="mb-3">
        <input v-model="confirmPassword" type="password" class="form-control input" placeholder="Confirm Password">
      </div>

      <button @click="register" class="login-btn w-100">Register</button>

      <p class="register-text mt-3">
        Already have account?
        <router-link to="/login" class="register-link">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('Password tidak sama ❌')
        return
      }

      try {
        const res = await axios.post('http://localhost:3000/api/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })

        alert(res.data.message)

        if (res.data.success) {
          this.$router.push('/login')
        }

      } catch (err) {
        console.error(err)
        alert('Server error 😢')
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* SAME BACKGROUND */
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #f2f2f4, #e5e5ea, #f2f2f4, #dcdce1);
  background-size: 400% 400%;
  animation: bgMove 18s ease infinite;
  font-family: 'Inter', sans-serif;
}

@keyframes bgMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* CARD */
.login-card {
  width: 360px;
  padding: 40px 30px 30px;
  border-radius: 28px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(30px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  text-align: center;
  position: relative;
}

/* ANIMATION */
.animate-in {
  animation: fadeZoom 0.7s ease;
}

@keyframes fadeZoom {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* AVATAR */
.avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #1c1c1e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* TEXT */
.title {
  margin-top: 30px;
  font-weight: 600;
}

.subtitle {
  color: #6e6e73;
  font-size: 14px;
  margin-bottom: 20px;
}

/* INPUT */
.input {
  border-radius: 14px;
  padding: 12px;
  border: 1px solid #ddd;
  transition: 0.3s;
}

.input:focus {
  border-color: #1c1c1e;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
}

/* BUTTON */
.login-btn {
  background: linear-gradient(135deg, #1c1c1e, #3a3a3c);
  color: white;
  border-radius: 16px;
  padding: 12px;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* LINK */
.register-text {
  font-size: 13px;
  color: #6e6e73;
}

.register-link {
  color: #1c1c1e;
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>