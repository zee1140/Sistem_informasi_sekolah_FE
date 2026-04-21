<template>
  <div class="container py-4">

    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3>Data Kelas</h3>
      <button class="btn-main" @click="openModal()">+ Tambah Kelas</button>
    </div>

    <!-- SEARCH -->
    <div class="search-box mb-4">
      <input type="text" v-model="search" placeholder="Cari kelas..." />
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Nama Kelas</th>
            <th>Wali Kelas</th>
            <th>Jumlah Siswa</th>
            <th width="160">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(kelas, index) in filteredKelas" :key="index">
            <td>{{ kelas.nama }}</td>
            <td>{{ kelas.wali }}</td>
            <td>{{ kelas.jumlah }}</td>
            <td>
              <button class="btn-action" @click="editData(index)">Edit</button>
              <button class="btn-action danger" @click="deleteData(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-box">

        <h4>{{ isEdit ? 'Edit' : 'Tambah' }} Kelas</h4>

        <input class="custom-input" v-model="form.nama" placeholder="Nama Kelas">
        <input class="custom-input" v-model="form.wali" placeholder="Wali Kelas">
        <input class="custom-input" type="number" v-model="form.jumlah" placeholder="Jumlah Siswa">

        <div class="d-flex gap-2 mt-3">
          <button class="btn-main w-100" @click="saveData">Simpan</button>
          <button class="btn-main secondary w-100" @click="closeModal">Batal</button>
        </div>

      </div>
    </div>

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

      kelasList: [
        { nama: "10A", wali: "Pak Budi", jumlah: 30 },
        { nama: "11B", wali: "Bu Siti", jumlah: 28 }
      ],

      form: {
        nama: "",
        wali: "",
        jumlah: ""
      }
    }
  },

  computed: {
    filteredKelas() {
      return this.kelasList.filter(k =>
        k.nama.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },

  methods: {
    openModal() {
      this.showModal = true
      this.isEdit = false
      this.form = { nama: "", wali: "", jumlah: "" }
    },

    closeModal() {
      this.showModal = false
    },

    saveData() {
      if (this.isEdit) {
        this.kelasList[this.editIndex] = { ...this.form }
      } else {
        this.kelasList.push({ ...this.form })
      }
      this.closeModal()
    },

    editData(index) {
      this.form = { ...this.kelasList[index] }
      this.editIndex = index
      this.isEdit = true
      this.showModal = true
    },

    deleteData(index) {
      this.kelasList.splice(index, 1)
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

/* BUTTON */
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

/* ACTION */
.btn-action {
  background: #e4e6eb;
  border: none;
  padding: 6px 10px;
  border-radius: 10px;
  margin-right: 5px;
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
</style>