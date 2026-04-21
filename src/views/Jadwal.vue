<template>
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <h1>Data Jadwal</h1>
      <button class="btn-add" @click="openForm()">+ Tambah Jadwal</button>
    </div>

    <!-- SEARCH -->
    <input v-model="search" placeholder="Cari jadwal..." class="search" />

    <!-- TABLE -->
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Hari</th>
            <th>Jam</th>
            <th>Mata Pelajaran</th>
            <th>Guru</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in filteredData" :key="index">
            <td>{{ item.hari }}</td>
            <td>{{ item.jam }}</td>
            <td>{{ item.mapel }}</td>
            <td>{{ item.guru }}</td>
            <td>{{ item.kelas }}</td>
            <td class="center">
              <button class="btn-edit" @click="openForm(item, index)">Edit</button>
              <button class="btn-delete" @click="hapus(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL FORM -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>{{ editIndex !== null ? "Edit" : "Tambah" }} Jadwal</h3>

        <input v-model="form.hari" placeholder="Hari" />
        <input v-model="form.jam" placeholder="Jam (07:00 - 08:00)" />
        <input v-model="form.mapel" placeholder="Mata Pelajaran" />
        <input v-model="form.guru" placeholder="Nama Guru" />
        <input v-model="form.kelas" placeholder="Kelas" />

        <div class="modal-action">
          <button @click="simpan">Simpan</button>
          <button @click="closeForm">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");
const showForm = ref(false);
const editIndex = ref(null);

const data = ref([
  {
    hari: "Senin",
    jam: "07:00 - 08:00",
    mapel: "pw & bs",
    guru: "Pak bani",
    kelas: "10A",
  },
  {
    hari: "Selasa",
    jam: "07:00 - 08:00",
    mapel: "jasmani",
    guru: "Pak zidan",
    kelas: "10A",
  },
  {
    hari: "rabu",
    jam: "07:00 - 08:00",
    mapel: "DKV",
    guru: "bu nuha",
    kelas: "10A",
  },
  {
    hari: "kamis",
    jam: "07:00 - 08:00",
    mapel: "PPKN",
    guru: "Pak akbar",
    kelas: "10A",
  },
  {
    hari: "jumat",
    jam: "07:00 - 08:00",
    mapel: "matematika",
    guru: "Pak anwar",
    kelas: "10A",
  }
]);

const form = ref({
  hari: "",
  jam: "",
  mapel: "",
  guru: "",
  kelas: "",
});

const filteredData = computed(() => {
  return data.value.filter((d) =>
    d.mapel.toLowerCase().includes(search.value.toLowerCase())
  );
});

const openForm = (item = null, index = null) => {
  showForm.value = true;

  if (item) {
    form.value = { ...item };
    editIndex.value = index;
  } else {
    form.value = { hari: "", jam: "", mapel: "", guru: "", kelas: "" };
    editIndex.value = null;
  }
};

const closeForm = () => {
  showForm.value = false;
};

const simpan = () => {
  if (editIndex.value !== null) {
    data.value[editIndex.value] = { ...form.value };
  } else {
    data.value.push({ ...form.value });
  }
  closeForm();
};

const hapus = (index) => {
  if (confirm("Hapus data?")) {
    data.value.splice(index, 1);
  }
};
</script>

<style scoped>
.container {
  padding: 30px;
  background: #f5f6f8;
  min-height: 100vh;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-add {
  background: #2d2f36;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
}

/* SEARCH */
.search {
  margin: 20px 0;
  padding: 12px;
  width: 100%;
  border-radius: 20px;
  border: none;
  background: #eaeaea;
}

/* CARD */
.card {
  background: white;
  padding: 20px;
  border-radius: 20px;
}

/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th, td {
  padding: 14px;
  text-align: left;
}

td {
  border-top: 1px solid #eee;
}

.center {
  text-align: center;
}

/* BUTTON */
.btn-edit {
  background: #ccc;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  margin-right: 5px;
}

.btn-delete {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
}

/* MODAL */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: 300px;
}

.modal-content input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}

.modal-action {
  display: flex;
  justify-content: space-between;
}
</style>