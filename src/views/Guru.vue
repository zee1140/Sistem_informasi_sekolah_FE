<template>
  <div class="container">
    <div class="header">
      <h1>Data Guru</h1>
      <button class="btn-add" @click="tambahGuru">+ Tambah Guru</button>
    </div>

    <input
      type="text"
      v-model="search"
      placeholder="Cari guru..."
      class="search"
    />

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Nama Guru</th>
            <th>Mata Pelajaran</th>
            <th>Jumlah Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(guru, index) in filteredGuru" :key="index">
            <td>{{ guru.nama }}</td>
            <td>{{ guru.mapel }}</td>
            <td>{{ guru.jumlahKelas }}</td>
            <td>
              <button class="btn-edit" @click="editGuru(index)">Edit</button>
              <button class="btn-delete" @click="hapusGuru(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="filteredGuru.length === 0">Data tidak ditemukan</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");

const dataGuru = ref([
  { nama: "Pak Andi", mapel: "Matematika", jumlahKelas: 3 },
  { nama: "Bu Rina", mapel: "Bahasa Indonesia", jumlahKelas: 2 },
  { nama: "pa iqbal", mapel: "bahasa jepang", jumlahKelas: 4 },
  
]);

const filteredGuru = computed(() => {
  return dataGuru.value.filter((g) =>
    g.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

const tambahGuru = () => {
  alert("Fitur tambah guru");
};

const editGuru = (index) => {
  alert("Edit guru: " + dataGuru.value[index].nama);
};

const hapusGuru = (index) => {
  if (confirm("Yakin ingin menghapus?")) {
    dataGuru.value.splice(index, 1);
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background: #f5f6f8;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-add {
  background: #2d2f36;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.search {
  margin: 20px 0;
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  border: none;
  background: #eaeaea;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* penting biar kolom sejajar */
}

th, td {
  padding: 16px;
}

th {
  text-align: left;
}

/* Atur posisi tiap kolom */
th:nth-child(1),
td:nth-child(1) {
  width: 25%;
  text-align: center;
}

th:nth-child(2),
td:nth-child(2) {
  width: 35%;
  text-align: center;
}

th:nth-child(3),
td:nth-child(3) {
  width: 20%;
  text-align: center;
}

th:nth-child(4),
td:nth-child(4) {
  width: 20%;
  text-align: center;
}

.btn-edit {
  background: #ccc;
  border: none;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-delete {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}
</style>