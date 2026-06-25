# TODO

## Jadwal.vue - Tambah Jadwal tampil modal
- [x] Analisis: tombol sudah memanggil `openModal()` tapi hanya `console.log`, belum ada modal UI
- [ ] Tambahkan state modal: `showModal`, `isEdit`, `isSaving`, `formJadwal`, `errors`, `selectedId`
- [ ] Buat markup modal (transition + overlay) di dalam `Jadwal.vue` mengikuti gaya `Guru.vue`/`Kelas.vue`
- [ ] Implement `openModal()` untuk mode tambah (reset form)
- [ ] Implement `simpanJadwal()` untuk POST `/jadwal` dan refresh via `getJadwal()`
- [ ] Jalankan dev server / cek UI: klik **Tambah Jadwal** harus tampil modal
