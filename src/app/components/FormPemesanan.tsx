import { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Calendar, Clock, FileText } from 'lucide-react';
import { c } from './ds';
import { katalogLayanan } from './mockData';

const jenisHama = ['Kecoa', 'Rayap', 'Tikus', 'Nyamuk', 'Semut', 'Inspeksi Umum'];
const timeSlots = ['08:00–08:30', '08:30–09:00', '09:00–09:30', '09:30–10:00', '10:00–10:30', '11:00–11:30', '13:00–13:30', '14:00–14:30'];

interface Props { layananAwal?: typeof katalogLayanan[0]; onBack: () => void; onSelesai: () => void; namaPelanggan: string; }

function Field({ icon, placeholder, value, onChange, type }: { icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary, display: 'flex' }}>{icon}</div>
      <input type={type || 'text'} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );
}

export function FormPemesanan({ layananAwal, onBack, onSelesai, namaPelanggan }: Props) {
  const [nama, setNama] = useState(namaPelanggan);
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [hama, setHama] = useState(layananAwal ? layananAwal.nama.replace('Pengendalian ', '').replace('Inspeksi Hama', 'Inspeksi Umum') : '');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [catatan, setCatatan] = useState('');

  const valid = nama && telp && alamat && hama && tanggal && waktu;

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Form Pemesanan</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 100px' }}>
        <Field icon={<User size={18} />} placeholder="Nama Pelanggan" value={nama} onChange={setNama} />
        <Field icon={<Phone size={18} />} placeholder="Nomor Telepon" value={telp} onChange={setTelp} type="tel" />
        <Field icon={<MapPin size={18} />} placeholder="Alamat Layanan" value={alamat} onChange={setAlamat} />

        {/* Jenis Hama */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textSecondary, marginBottom: 8 }}>Jenis Hama</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {jenisHama.map(h => (
              <button key={h} onClick={() => setHama(h)}
                style={{ padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${hama === h ? c.primary : c.border}`, background: hama === h ? c.primary : '#fff', color: hama === h ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Tanggal */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <Calendar size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
          <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)}
            style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Waktu */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textSecondary, marginBottom: 8 }}>Pilih Waktu Layanan</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {timeSlots.map(t => (
              <button key={t} onClick={() => setWaktu(t)}
                style={{ height: 40, borderRadius: 20, border: `1.5px solid ${waktu === t ? c.primary : c.border}`, background: waktu === t ? c.primary : '#fff', color: waktu === t ? '#fff' : c.textSecondary, fontSize: 13, fontWeight: waktu === t ? 600 : 400, cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Catatan */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textSecondary, marginBottom: 8 }}>Catatan Tambahan (opsional)</div>
          <div style={{ position: 'relative' }}>
            <FileText size={16} style={{ position: 'absolute', left: 12, top: 14, color: c.textSecondary }} />
            <textarea placeholder="Contoh: fokus di dapur dan kamar mandi..." value={catatan} onChange={e => setCatatan(e.target.value)}
              style={{ width: '100%', minHeight: 80, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '12px 12px 12px 36px', fontSize: 14, color: c.textPrimary, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button onClick={() => { if (valid) onSelesai(); }}
          style={{ width: '100%', height: 52, borderRadius: 12, background: valid ? c.primary : c.border, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: valid ? 'pointer' : 'default' }}>
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  );
}
