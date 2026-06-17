import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { c, shadow } from './ds';
import { TeknisiNav } from './TeknisiNav';
import { feedbackDummy } from './mockData';

// ─── Laporan Pekerjaan (form after completing task) ───────────────────────────

interface LaporanProps { onBack: () => void; }

export function LaporanPekerjaan({ onBack }: LaporanProps) {
  const [peralatan, setPeralatan] = useState([{ nama: '', jumlah: '', satuan: '' }]);
  const [bahan, setBahan] = useState([{ nama: '', jumlah: '', satuan: '' }]);
  const [catatan, setCatatan] = useState('');
  const [rekomendasi, setRekomendasi] = useState('');

  const addRow = (setter: typeof setPeralatan) => setter(prev => [...prev, { nama: '', jumlah: '', satuan: '' }]);
  const removeRow = (setter: typeof setPeralatan, i: number) => setter(prev => prev.filter((_, idx) => idx !== i));
  const updateRow = (setter: typeof setPeralatan, i: number, field: string, val: string) =>
    setter(prev => prev.map((row, idx) => idx === i ? { ...row, [field]: val } : row));

  function ItemRow({ row, index, setter }: { row: { nama: string; jumlah: string; satuan: string }; index: number; setter: typeof setPeralatan }) {
    return (
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
        <input placeholder="Nama" value={row.nama} onChange={e => updateRow(setter, index, 'nama', e.target.value)}
          style={{ flex: 2, height: 40, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, paddingLeft: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        <input placeholder="Jml" value={row.jumlah} onChange={e => updateRow(setter, index, 'jumlah', e.target.value)}
          style={{ flex: 1, height: 40, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, paddingLeft: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        <input placeholder="Satuan" value={row.satuan} onChange={e => updateRow(setter, index, 'satuan', e.target.value)}
          style={{ flex: 1, height: 40, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, paddingLeft: 10, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        {index > 0 && (
          <button onClick={() => removeRow(setter, index)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.danger, display: 'flex', padding: 4 }}>
            <Trash2 size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Laporan Pekerjaan</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 100px' }}>
        {/* Peralatan */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>Peralatan yang Digunakan</div>
            <button onClick={() => addRow(setPeralatan)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: c.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={14} /> Tambah
            </button>
          </div>
          {peralatan.map((row, i) => <ItemRow key={i} row={row} index={i} setter={setPeralatan} />)}
        </div>

        {/* Bahan */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>Bahan yang Digunakan</div>
            <button onClick={() => addRow(setBahan)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: c.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={14} /> Tambah
            </button>
          </div>
          {bahan.map((row, i) => <ItemRow key={i} row={row} index={i} setter={setBahan} />)}
        </div>

        {/* Catatan */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 8 }}>Catatan Pekerjaan</div>
          <textarea value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Deskripsikan pekerjaan yang telah dilakukan..."
            style={{ width: '100%', minHeight: 90, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 12, fontSize: 13, color: c.textPrimary, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>

        {/* Rekomendasi */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 8 }}>Rekomendasi Tindak Lanjut</div>
          <textarea value={rekomendasi} onChange={e => setRekomendasi(e.target.value)} placeholder="Contoh: Follow up 3 bulan lagi untuk pencegahan..."
            style={{ width: '100%', minHeight: 80, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 12, fontSize: 13, color: c.textPrimary, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 20px 20px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button onClick={onBack}
          style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Simpan Laporan
        </button>
      </div>
    </div>
  );
}

// ─── Permintaan Peralatan ──────────────────────────────────────────────────────

interface PeralatanProps { onBack: () => void; }

export function PermintaanPeralatan({ onBack }: PeralatanProps) {
  const [alat, setAlat] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [prioritas, setPrioritas] = useState('Sedang');
  const [alasan, setAlasan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>✅</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: c.primary, marginBottom: 8 }}>Permintaan Terkirim!</div>
      <div style={{ fontSize: 13, color: c.textSecondary, marginBottom: 24 }}>Permintaan peralatan Anda telah dikirim ke administrator untuk ditinjau.</div>
      <button onClick={onBack} style={{ width: '100%', maxWidth: 280, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>Kembali</button>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Permintaan Peralatan</span>
      </div>
      <div style={{ flex: 1, padding: '16px 20px 100px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>Nama Peralatan</div>
          <input placeholder="Contoh: Semprotan Manual 5L" value={alat} onChange={e => setAlat(e.target.value)}
            style={{ width: '100%', height: 50, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 14, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>Jumlah</div>
          <input type="number" placeholder="0" value={jumlah} onChange={e => setJumlah(e.target.value)}
            style={{ width: '100%', height: 50, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 14, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 8 }}>Tingkat Prioritas</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Rendah', 'Sedang', 'Tinggi'].map(p => (
              <button key={p} onClick={() => setPrioritas(p)}
                style={{ flex: 1, height: 40, borderRadius: 10, border: `1.5px solid ${prioritas === p ? (p === 'Tinggi' ? c.danger : p === 'Sedang' ? c.warning : c.success) : c.border}`, background: prioritas === p ? (p === 'Tinggi' ? '#FCE8E6' : p === 'Sedang' ? '#FEF9E7' : '#E6F4EA') : '#fff', color: prioritas === p ? (p === 'Tinggi' ? c.danger : p === 'Sedang' ? '#B98900' : c.success) : c.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>Alasan Pengajuan</div>
          <textarea value={alasan} onChange={e => setAlasan(e.target.value)} placeholder="Jelaskan alasan permintaan peralatan ini..."
            style={{ width: '100%', minHeight: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 12, fontSize: 13, color: c.textPrimary, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 20px 20px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button onClick={() => { if (alat && jumlah && alasan) setSubmitted(true); }}
          style={{ width: '100%', height: 52, borderRadius: 12, background: alat && jumlah && alasan ? c.primary : c.border, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: alat && jumlah && alasan ? 'pointer' : 'default' }}>
          Kirim Permintaan
        </button>
      </div>
    </div>
  );
}

// ─── Halaman Laporan (tab view) ───────────────────────────────────────────────

interface LaporanPageProps { onNav: (k: string) => void; activeNav: string; onBuatLaporan: () => void; onPermintaan: () => void; }

export function TeknisiLaporanPage({ onNav, activeNav, onBuatLaporan, onPermintaan }: LaporanPageProps) {
  const [tab, setTab] = useState<'feedback' | 'permintaan'>('feedback');

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.accent, padding: '16px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Laporan</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {([['feedback', 'Feedback Pelanggan'], ['permintaan', 'Permintaan Peralatan']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{ flex: 1, height: 38, background: 'none', border: 'none', borderBottom: tab === k ? '3px solid #fff' : '3px solid transparent', color: tab === k ? '#fff' : 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        {tab === 'feedback' && (
          <>
            <div style={{ background: '#FFF4EF', borderRadius: 12, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: c.accent }}>
              ℹ️ Hanya pelanggan yang dapat memberikan feedback. Di sini Anda hanya dapat melihat ulasan yang diterima.
            </div>
            {feedbackDummy.filter(f => f.teknisi === 'Ahmad Kurniawan').map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{f.pelanggan}</div>
                  <div style={{ color: c.warning }}>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</div>
                </div>
                <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 6 }}>{f.layanan} · {f.tanggal}</div>
                <div style={{ fontSize: 13, color: c.textPrimary, fontStyle: 'italic' }}>"{f.komentar}"</div>
              </div>
            ))}
            <button onClick={onBuatLaporan}
              style={{ width: '100%', height: 48, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 8 }}>
              + Buat Laporan Pekerjaan Baru
            </button>
          </>
        )}
        {tab === 'permintaan' && (
          <>
            <button onClick={onPermintaan}
              style={{ width: '100%', height: 48, borderRadius: 12, background: c.accent, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', marginBottom: 16 }}>
              + Ajukan Permintaan Peralatan
            </button>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Riwayat Permintaan Saya</div>
            {[
              { alat: 'Semprotan Manual 5L', jumlah: 2, prioritas: 'Tinggi', status: 'Menunggu', bg: '#FEF9E7', color: '#B98900' },
              { alat: 'Umpan Rayap', jumlah: 3, prioritas: 'Sedang', status: 'Disetujui', bg: '#E6F4EA', color: c.success },
            ].map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{r.alat}</div>
                  <span style={{ background: r.bg, color: r.color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{r.status}</span>
                </div>
                <div style={{ fontSize: 12, color: c.textSecondary }}>Jumlah: {r.jumlah} · Prioritas: {r.prioritas}</div>
              </div>
            ))}
          </>
        )}
      </div>

      <TeknisiNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
