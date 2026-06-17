// ─── Dummy Accounts ────────────────────────────────────────────────────────────
export const ACCOUNTS = [
  { email: 'customer@bugbuster.com', password: 'customer123', role: 'pelanggan' as const, nama: 'Alexander Wirawan' },
  { email: 'teknisi@bugbuster.com',  password: 'teknisi123',  role: 'teknisi'   as const, nama: 'Ahmad Kurniawan' },
  { email: 'admin@bugbuster.com',    password: 'admin123',    role: 'admin'     as const, nama: 'Budi Admin' },
];

export type Role = 'pelanggan' | 'teknisi' | 'admin';

export type StatusLayanan =
  | 'Menunggu Konfirmasi'
  | 'Dijadwalkan'
  | 'Teknisi Ditugaskan'
  | 'Sedang Berlangsung'
  | 'Menunggu Feedback'
  | 'Selesai';

export interface Pesanan {
  id: string;
  nomorPesanan: string;
  pelanggan: string;
  jenisHama: string;
  alamat: string;
  tanggal: string;
  waktu: string;
  teknisi: string;
  status: StatusLayanan;
  harga: number;
  metodePembayaran: string;
  statusPembayaran: 'Lunas' | 'Belum Bayar' | 'Bayar Setelah Layanan';
  catatan: string;
  rating?: number;
  komentar?: string;
}

export const pesananDummy: Pesanan[] = [
  {
    id: '1', nomorPesanan: 'BB-2024-0042',
    pelanggan: 'Alexander Wirawan', jenisHama: 'Rayap',
    alamat: 'Jl. Sudirman No. 42, Jakarta Pusat',
    tanggal: '21 Feb 2024', waktu: '09:00–09:30',
    teknisi: 'Ahmad Kurniawan', status: 'Menunggu Feedback',
    harga: 180000, metodePembayaran: 'GoPay', statusPembayaran: 'Lunas',
    catatan: 'Fokus di area kamar mandi dan dapur',
  },
  {
    id: '2', nomorPesanan: 'BB-2024-0039',
    pelanggan: 'Alexander Wirawan', jenisHama: 'Nyamuk',
    alamat: 'Jl. Sudirman No. 42, Jakarta Pusat',
    tanggal: '15 Feb 2024', waktu: '10:00–10:30',
    teknisi: 'Rizky Mahendra', status: 'Selesai',
    harga: 150000, metodePembayaran: 'Virtual Account', statusPembayaran: 'Lunas',
    catatan: '', rating: 5, komentar: 'Pelayanan sangat memuaskan!',
  },
  {
    id: '3', nomorPesanan: 'BB-2024-0051',
    pelanggan: 'Alexander Wirawan', jenisHama: 'Tikus',
    alamat: 'Jl. Sudirman No. 42, Jakarta Pusat',
    tanggal: '28 Feb 2024', waktu: '14:00–14:30',
    teknisi: 'Ahmad Kurniawan', status: 'Teknisi Ditugaskan',
    harga: 200000, metodePembayaran: 'QRIS', statusPembayaran: 'Lunas',
    catatan: 'Ada tanda-tanda tikus di gudang',
  },
];

// Tugas untuk teknisi Ahmad Kurniawan
export const tugasTeknisi = [
  {
    id: 't1', nomorPesanan: 'BB-2024-0042',
    pelanggan: 'Alexander Wirawan', telepon: '0812-3456-7890',
    jenisHama: 'Rayap', alamat: 'Jl. Sudirman No. 42, Jakarta Pusat',
    tanggal: '21 Feb 2024', waktu: '09:00–09:30',
    status: 'Menunggu Feedback' as StatusLayanan,
    catatan: 'Fokus di area kamar mandi dan dapur',
  },
  {
    id: 't2', nomorPesanan: 'BB-2024-0051',
    pelanggan: 'Alexander Wirawan', telepon: '0812-3456-7890',
    jenisHama: 'Tikus', alamat: 'Jl. Sudirman No. 42, Jakarta Pusat',
    tanggal: '28 Feb 2024', waktu: '14:00–14:30',
    status: 'Teknisi Ditugaskan' as StatusLayanan,
    catatan: 'Ada tanda-tanda tikus di gudang',
  },
  {
    id: 't3', nomorPesanan: 'BB-2024-0055',
    pelanggan: 'Sari Dewi', telepon: '0821-9876-5432',
    jenisHama: 'Kecoa', alamat: 'Jl. Kebon Jeruk No. 7, Jakarta Barat',
    tanggal: '01 Mar 2024', waktu: '11:00–11:30',
    status: 'Dijadwalkan' as StatusLayanan,
    catatan: '',
  },
  {
    id: 't4', nomorPesanan: 'BB-2024-0030',
    pelanggan: 'Budi Santoso', telepon: '0813-5555-4444',
    jenisHama: 'Semut', alamat: 'Jl. Mangga Dua No. 15, Jakarta Utara',
    tanggal: '10 Feb 2024', waktu: '08:00–08:30',
    status: 'Selesai' as StatusLayanan,
    catatan: '',
  },
];

export const teknisiDummy = [
  { id: 'tech1', nama: 'Ahmad Kurniawan',   spesialisasi: 'Rayap & Tikus',   status: 'Tersedia'   as const, tugasAktif: 2, rating: 4.9, totalTugas: 42 },
  { id: 'tech2', nama: 'Rizky Mahendra',    spesialisasi: 'Nyamuk & Kutu',   status: 'Sibuk'      as const, tugasAktif: 3, rating: 4.8, totalTugas: 38 },
  { id: 'tech3', nama: 'Dani Susanto',      spesialisasi: 'Umum',            status: 'Tersedia'   as const, tugasAktif: 1, rating: 4.7, totalTugas: 31 },
  { id: 'tech4', nama: 'Ferdi Wijaya',      spesialisasi: 'Rayap',           status: 'Sibuk'      as const, tugasAktif: 2, rating: 4.6, totalTugas: 27 },
  { id: 'tech5', nama: 'Eko Prasetyo',      spesialisasi: 'Semut & Kecoa',   status: 'Tidak Aktif' as const, tugasAktif: 0, rating: 4.5, totalTugas: 12 },
];

export const katalogLayanan = [
  { id: 'l1', nama: 'Pengendalian Kecoa', deskripsi: 'Eliminasi kecoa secara menyeluruh di seluruh sudut rumah dengan pestisida aman.', harga: 150000, emoji: '🪳' },
  { id: 'l2', nama: 'Pengendalian Rayap', deskripsi: 'Inspeksi & pengobatan rayap struktural termasuk garansi 12 bulan.', harga: 180000, emoji: '🐛' },
  { id: 'l3', nama: 'Pengendalian Tikus', deskripsi: 'Pengendalian tikus profesional dengan perangkap & penghalang masuk.', harga: 200000, emoji: '🐀' },
  { id: 'l4', nama: 'Pengendalian Nyamuk', deskripsi: 'Fogging & larvasida untuk basmi nyamuk pembawa penyakit.', harga: 120000, emoji: '🦟' },
  { id: 'l5', nama: 'Pengendalian Semut', deskripsi: 'Pengendalian koloni semut dalam & luar ruangan ramah lingkungan.', harga: 100000, emoji: '🐜' },
  { id: 'l6', nama: 'Inspeksi Hama', deskripsi: 'Audit menyeluruh kondisi properti & rekomendasi penanganan hama.', harga: 75000, emoji: '🔍' },
];

export const inventarisDummy = [
  { nama: 'Semprotan Manual 5L', stok: 8, digunakan: 12, satuan: 'unit' },
  { nama: 'Masker Respirator',   stok: 15, digunakan: 20, satuan: 'pcs' },
  { nama: 'Pestisida Kecoa',     stok: 5, digunakan: 30, satuan: 'liter' },
  { nama: 'Umpan Rayap',         stok: 3, digunakan: 14, satuan: 'kotak' },
  { nama: 'Sarung Tangan',       stok: 20, digunakan: 40, satuan: 'pasang' },
];

export const permintaanPeralatanDummy = [
  { id: 'pp1', teknisi: 'Ahmad Kurniawan', alat: 'Semprotan Manual 5L', jumlah: 2, prioritas: 'Tinggi' as const, alasan: 'Alat lama rusak, butuh pengganti segera', status: 'Menunggu' as const },
  { id: 'pp2', teknisi: 'Rizky Mahendra',  alat: 'Pestisida Kecoa', jumlah: 5, prioritas: 'Sedang' as const, alasan: 'Stok hampir habis', status: 'Disetujui' as const },
  { id: 'pp3', teknisi: 'Dani Susanto',    alat: 'Masker Respirator', jumlah: 10, prioritas: 'Rendah' as const, alasan: 'Penambahan stok rutin', status: 'Menunggu' as const },
];

export const feedbackDummy = [
  { pelanggan: 'Alexander Wirawan', layanan: 'Pengendalian Nyamuk', rating: 5, komentar: 'Teknisi sangat profesional dan tepat waktu!', tanggal: '15 Feb 2024', teknisi: 'Rizky Mahendra' },
  { pelanggan: 'Sari Dewi',          layanan: 'Pengendalian Kecoa',  rating: 4, komentar: 'Hasil bagus, tapi sedikit terlambat', tanggal: '08 Feb 2024', teknisi: 'Ahmad Kurniawan' },
  { pelanggan: 'Budi Santoso',       layanan: 'Pengendalian Semut',  rating: 5, komentar: 'Memuaskan, akan pakai lagi!', tanggal: '10 Feb 2024', teknisi: 'Ahmad Kurniawan' },
];
