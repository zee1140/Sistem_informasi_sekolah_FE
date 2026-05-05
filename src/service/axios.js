import axios from 'axios'

const api = axios.create({
  baseURL: 'http://172.20.10.2:3000', // sesuaikan IP backend lu
  headers: {
    'Content-Type': 'application/json'
  }
})

// otomatis kirim token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api