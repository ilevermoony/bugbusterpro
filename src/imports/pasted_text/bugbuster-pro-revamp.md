Perbaiki dan sempurnakan prototype aplikasi mobile BugBuster Pro tanpa mengubah desain visual, warna, layout, ikon, tipografi, maupun struktur tampilan yang sudah ada. Fokus hanya pada perbaikan fitur, alur bisnis, hak akses pengguna, navigasi, dan penggunaan bahasa.

Seluruh aplikasi wajib menggunakan Bahasa Indonesia.

Aplikasi memiliki 3 jenis pengguna:

1. Pelanggan
2. Teknisi
3. Administrator

Pastikan setiap jenis pengguna memiliki dashboard, menu, data, dan hak akses yang berbeda sesuai tugas masing-masing.

==================================================
LOGIN DAN KEAMANAN
==================

Saat ini pengguna dapat langsung masuk hanya dengan memilih role.

Perbaiki agar pengguna wajib login menggunakan email dan password.

Halaman login harus berisi:

* Email
* Password
* Pilihan Role
* Tombol Masuk

Gunakan akun dummy berikut:

PELANGGAN
Email: [customer@bugbuster.com](mailto:customer@bugbuster.com)
Password: customer123

TEKNISI
Email: [teknisi@bugbuster.com](mailto:teknisi@bugbuster.com)
Password: teknisi123

ADMINISTRATOR
Email: [admin@bugbuster.com](mailto:admin@bugbuster.com)
Password: admin123

Setelah login berhasil, pengguna diarahkan ke dashboard sesuai rolenya.

==================================================
ROLE PELANGGAN
==============

Navigasi bawah:

* Beranda
* Layanan
* Riwayat
* Profil

---

## BERANDA

Beranda pelanggan berfungsi sebagai dashboard pelanggan.

Tampilkan:

* Ringkasan pesanan aktif
* Status layanan terbaru
* Teknisi yang ditugaskan
* Jadwal layanan mendatang
* Tombol "Pesan Layanan"
* Riwayat layanan terakhir
* Promo layanan
* Tips pengendalian hama

Jangan menampilkan katalog layanan penuh pada halaman ini.

---

## LAYANAN

Halaman ini berfungsi sebagai katalog layanan.

Tampilkan layanan:

* Pengendalian Kecoa
* Pengendalian Rayap
* Pengendalian Tikus
* Pengendalian Nyamuk
* Pengendalian Semut
* Inspeksi Hama

Setiap layanan memiliki:

* Nama layanan
* Deskripsi layanan
* Estimasi harga
* Tombol Pesan

---

## FORM PEMESANAN

Form pemesanan berisi:

* Nama pelanggan
* Nomor telepon
* Alamat layanan
* Jenis hama
* Tanggal layanan
* Waktu layanan
* Catatan tambahan

Setelah berhasil memesan:

Status = Menunggu Konfirmasi

---

## PEMBAYARAN

Metode pembayaran:

* Virtual Account
* GoPay
* ShopeePay
* QRIS
* Bayar Setelah Layanan

Setelah pembayaran berhasil:

* Tampilkan nomor pesanan
* Tampilkan bukti pembayaran
* Simpan transaksi

---

## RIWAYAT

Pelanggan hanya dapat:

* Melihat riwayat layanan
* Melihat status layanan
* Melihat teknisi yang ditugaskan
* Melihat status pembayaran

Pelanggan tidak dapat:

* Mengubah status layanan
* Mengubah laporan teknisi
* Mengubah data inventaris

Gunakan status berikut:

* Menunggu Konfirmasi
* Dijadwalkan
* Teknisi Ditugaskan
* Sedang Berlangsung
* Menunggu Feedback
* Selesai

---

## FEEDBACK PELANGGAN

Ketika teknisi menyelesaikan pekerjaan:

Status berubah menjadi:

"Menunggu Feedback"

Pelanggan menerima notifikasi.

Pelanggan dapat memberikan:

* Rating 1–5 bintang
* Komentar

Setelah feedback dikirim:

Status berubah menjadi:

"Selesai"

Hanya pelanggan yang dapat memberikan feedback.

==================================================
ROLE TEKNISI
============

Navigasi bawah:

* Beranda
* Jadwal
* Laporan
* Profil

Teknisi hanya dapat melihat tugas yang ditugaskan kepadanya.

---

## BERANDA

Beranda teknisi berfungsi sebagai dashboard kerja.

Tampilkan:

* Jumlah tugas hari ini
* Jumlah tugas aktif
* Jumlah tugas selesai
* Jadwal layanan berikutnya

Pada setiap tugas tampilkan:

* Nama pelanggan
* Jenis hama
* Lokasi layanan
* Tanggal layanan
* Waktu layanan
* Status pekerjaan

Jangan menggunakan tampilan yang sama dengan pelanggan.

---

## JADWAL

Menampilkan seluruh tugas yang ditugaskan kepada teknisi.

Detail tugas:

* Nama pelanggan
* Nomor telepon
* Alamat layanan
* Jenis layanan
* Catatan pelanggan
* Tanggal layanan
* Waktu layanan

Teknisi dapat:

* Memulai layanan
* Mengubah status layanan

Alur status:

Teknisi Ditugaskan
→ Sedang Berlangsung
→ Menunggu Feedback

---

## BUKTI PEKERJAAN

Sebelum layanan dinyatakan selesai, teknisi wajib mengunggah:

* Foto sebelum pengerjaan
* Foto sesudah pengerjaan

Status tidak dapat diubah menjadi selesai tanpa bukti pekerjaan.

---

## LAPORAN PEKERJAAN

Setelah pekerjaan selesai, teknisi wajib mengisi laporan:

* Peralatan yang digunakan
* Bahan yang digunakan
* Jumlah penggunaan
* Catatan pekerjaan
* Rekomendasi tindak lanjut

Data ini digunakan untuk pemantauan inventaris.

---

## PERMINTAAN PERALATAN

Tambahkan fitur Permintaan Peralatan.

Teknisi dapat mengajukan:

* Peralatan baru
* Penggantian alat
* Tambahan stok

Form berisi:

* Nama peralatan
* Jumlah
* Tingkat prioritas
* Alasan pengajuan

Teknisi hanya dapat mengajukan permintaan.

Teknisi tidak dapat menyetujui permintaan.

---

## FEEDBACK

Teknisi tidak dapat memberikan feedback pelanggan.

Teknisi hanya dapat melihat feedback yang telah diberikan pelanggan.

==================================================
ROLE ADMINISTRATOR
==================

Navigasi bawah:

* Dashboard
* Teknisi
* Laporan
* Profil

Administrator berfungsi sebagai pengelola sistem.

---

## DASHBOARD

Tampilkan:

* Total pelanggan
* Total teknisi
* Total pesanan
* Pesanan aktif
* Pesanan selesai
* Rating rata-rata layanan

Tambahkan grafik dan ringkasan kinerja.

---

## MENU TEKNISI

Menampilkan seluruh teknisi.

Informasi yang ditampilkan:

* Nama teknisi
* Spesialisasi
* Status ketersediaan
* Jumlah tugas aktif

Detail teknisi:

* Jadwal kerja
* Riwayat layanan
* Rating rata-rata
* Feedback pelanggan

Administrator dapat:

* Menambah teknisi
* Mengubah data teknisi
* Menonaktifkan teknisi
* Melihat jadwal teknisi

---

## PENUGASAN TEKNISI

Administrator dapat menugaskan teknisi berdasarkan:

* Ketersediaan
* Spesialisasi
* Lokasi layanan

Administrator dapat mengubah penugasan bila diperlukan.

---

## LAPORAN

Ganti menu Booking menjadi menu Laporan.

Laporan terdiri dari:

1. Laporan Kinerja Teknisi

* Jumlah tugas
* Jumlah tugas selesai
* Rating rata-rata

2. Laporan Pemesanan

* Menunggu Konfirmasi
* Dijadwalkan
* Sedang Berlangsung
* Selesai

3. Laporan Feedback

* Rating pelanggan
* Komentar pelanggan

4. Laporan Inventaris

* Penggunaan peralatan
* Sisa stok
* Permintaan peralatan

Administrator dapat:

* Menyetujui permintaan peralatan
* Menolak permintaan peralatan

==================================================
HAK AKSES
=========

PELANGGAN:

* Membuat pesanan
* Melakukan pembayaran
* Melihat progres layanan
* Memberikan feedback

PELANGGAN TIDAK DAPAT:

* Mengubah status layanan
* Mengelola teknisi
* Mengelola inventaris
* Membuat laporan teknisi

TEKNISI:

* Melihat tugas yang ditugaskan
* Mengubah progres layanan
* Mengunggah bukti pekerjaan
* Membuat laporan penggunaan peralatan
* Mengajukan permintaan peralatan

TEKNISI TIDAK DAPAT:

* Memberikan feedback pelanggan
* Mengelola teknisi
* Menyetujui permintaan peralatan
* Mengakses seluruh laporan perusahaan

ADMINISTRATOR:

* Mengelola teknisi
* Menugaskan teknisi
* Memantau pesanan
* Melihat laporan
* Menyetujui permintaan peralatan

ADMINISTRATOR TIDAK DAPAT:

* Memberikan feedback pelanggan
* Melakukan pekerjaan teknisi
* Membuat pesanan sebagai pelanggan

==================================================
ALUR STATUS LAYANAN
===================

Menunggu Konfirmasi
→ Dijadwalkan
→ Teknisi Ditugaskan
→ Sedang Berlangsung
→ Menunggu Feedback
→ Selesai

Gunakan data dummy yang realistis dan pastikan seluruh role memiliki tampilan, fitur, data, serta hak akses yang berbeda sesuai proses bisnis BugBuster Pro.
