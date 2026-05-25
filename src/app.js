const express = require('express')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

// ROUTER
const authRoutes = require('./routes/auth.routes')
const kelasRoutes = require('./routes/kelas.routes')
const siswaRoutes = require('./routes/siswa.routes')
const userRoutes = require('./routes/user.routes')

// PREFIX
app.use('/auth', authRoutes)
app.use('/kelas', kelasRoutes)
app.use('/siswa', siswaRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.statusCode || 500).json({
    message: err.message || 'INTERNAL_SERVER_ERROR'
  })
})

module.exports = app
