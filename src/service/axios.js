// src/services/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // ganti kalau backend kamu beda
  headers: {
    'Content-Type': 'application/json'
  }
})

// OPTIONAL: kalau mau pakai token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api