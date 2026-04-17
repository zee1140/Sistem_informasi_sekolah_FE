<template>
  <div class="container py-4">

    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-4 fade-in">
      <h3>Data Siswa</h3>
      <button class="btn-main" @click="openModal()">+ Tambah Siswa</button>
    </div>

    <!-- SEARCH -->
    <div class="search-box mb-4 fade-in-delay">
      <input type="text" v-model="search" placeholder="Cari siswa..." />
    </div>

    <!-- TABLE -->
    <div class="table-card fade-up">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Kelas</th>
            <th width="160">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(siswa, index) in filteredSiswa" :key="index" class="row-anim">
            <td>{{ siswa.nama }}</td>
            <td>{{ siswa.email }}</td>
            <td>{{ siswa.kelas }}</td>
            <td>
              <button class="btn-action" @click="editData(index)">Edit</button>
              <button class="btn-action danger" @click="deleteData(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <transition name="fade">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-box scale-in">

          <h4>{{ isEdit ? 'Edit' : 'Tambah' }} Siswa</h4>

          <input class="custom-input" v-model="form.nama" placeholder="Nama">
          <input class="custom-input" v-model="form.email" placeholder="Email">
          <input class="custom-input" v-model="form.kelas" placeholder="Kelas">

          <div class="d-flex gap-2 mt-3">
            <button class="btn-main w-100" @click="saveData">Simpan</button>
            <button class="btn-main secondary w-100" @click="closeModal">Batal</button>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      showModal: false,
      isEdit: false,
      editIndex: null,

      siswaList: [
        { nama: "Budi", email: "budi@gmail.com", kelas: "10A" },
        { nama: "Siti", email: "siti@gmail.com", kelas: "11B" }
      ],

      form: {
        nama: "",
        email: "",
        kelas: ""
      }
    }
  },

  computed: {
    filteredSiswa() {
      return this.siswaList.filter(s =>
        s.nama.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },

  methods: {
    openModal() {
      this.showModal = true
      this.isEdit = false
      this.form = { nama: "", email: "", kelas: "" }
    },

    closeModal() {
      this.showModal = false
    },

    saveData() {
      if (this.isEdit) {
        this.siswaList[this.editIndex] = { ...this.form }
      } else {
        this.siswaList.push({ ...this.form })
      }
      this.closeModal()
    },

    editData(index) {
      this.form = { ...this.siswaList[index] }
      this.editIndex = index
      this.isEdit = true
      this.showModal = true
    },

    deleteData(index) {
      this.siswaList.splice(index, 1)
    }
  }
}
</script>

<style>
/* SEARCH */
.search-box input {
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  border: none;
  background: #fff;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
}

/* CARD */
.table-card {
  background: #f7f8fa;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

/* BUTTON GLOBAL (SAMA DASHBOARD) */
.btn-main {
  background: linear-gradient(135deg, #2d2f33, #3a3d42);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  transition: 0.3s;
}

.btn-main:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

/* BUTTON AKSI */
.btn-action {
  background: #e4e6eb;
  border: none;
  padding: 6px 10px;
  border-radius: 10px;
  margin-right: 5px;
  transition: 0.3s;
}

.btn-action:hover {
  transform: translateY(-2px);
  background: #dcdfe3;
}

.btn-action.danger {
  background: #ff4d4d;
  color: white;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background: #f7f8fa;
  padding: 25px;
  border-radius: 25px;
  width: 300px;
}

/* INPUT */
.custom-input {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border-radius: 15px;
  border: none;
  background: white;
}

/* ANIMASI */
.fade-in {
  animation: fadeIn 0.6s ease;
}
.fade-in-delay {
  animation: fadeIn 1s ease;
}
.fade-up {
  animation: fadeUp 0.8s ease;
}
.scale-in {
  animation: scaleIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes fadeUp {
  from { transform: translateY(30px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0 }
  to { transform: scale(1); opacity: 1 }
}
</style>