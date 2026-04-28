<template>
  <div class="dashboard-container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold mb-1">Daftar Tenaga Pengajar</h3>
        <p class="text-secondary small">Kelola dan pantau data guru JeprutSchool</p>
      </div>
      <button class="btn-add">
        <i class="bi bi-plus-lg me-2"></i>Tambah Guru
      </button>
    </div>

    <div class="row mb-4 g-3">
      <div class="col-md-4">
        <div class="stats-card">
          <div class="icon-box"><i class="bi bi-people-fill"></i></div>
          <div>
            <div class="num">75</div>
            <div class="label">Total Guru</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="guru in daftarGuru" :key="guru.id" class="col-md-6 col-lg-4 col-xl-3">
        <div class="guru-card animate-in">
          <div class="guru-image">
            <i class="bi bi-person-fill"></i>
          </div>
          <h5 class="guru-name">{{ guru.nama }}</h5>
          <span class="guru-subject">{{ guru.mapel }}</span>
          
          <hr class="my-3 opacity-25">
          
          <div class="d-flex justify-content-around">
            <button class="btn-action edit"><i class="bi bi-pencil-square"></i></button>
            <button class="btn-action view"><i class="bi bi-eye"></i></button>
            <button class="btn-action delete"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuruInfo',
  data() {
    return {
      // Data dummy untuk contoh
      daftarGuru: [
        { id: 1, nama: 'Budi Santoso, S.Pd', mapel: 'Matematika' },
        { id: 2, nama: 'Siti Aminah, M.Si', mapel: 'Fisika' },
        { id: 3, nama: 'Rian Hidayat, S.Kom', mapel: 'Informatika' },
        { id: 4, nama: 'Dewi Lestari, M.Pd', mapel: 'Bahasa Inggris' },
        { id: 5, nama: 'Ahmad Fauzi, S.T', mapel: 'Kimia' },
        { id: 6, nama: 'Linda Sari, S.Pd', mapel: 'Biologi' },
      ]
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Button Tambah */
.btn-add {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.3s;
}
.btn-add:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

/* Stats Card */
.stats-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
.icon-box {
  width: 50px;
  height: 50px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.num { font-size: 22px; font-weight: 700; color: #1e293b; }
.label { font-size: 13px; color: #64748b; }

/* Guru Card */
.guru-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
.guru-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
}

.guru-image {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  color: #cbd5e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 15px;
}

.guru-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 5px;
}

.guru-subject {
  font-size: 13px;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

/* Action Buttons */
.btn-action {
  width: 35px;
  height: 35px;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}
.edit { background: #fef9c3; color: #a16207; }
.view { background: #dcfce7; color: #15803d; }
.delete { background: #fee2e2; color: #b91c1c; }

.btn-action:hover { opacity: 0.8; transform: scale(1.1); }

/* Animation */
.animate-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>