import { c, shadow } from './ds';
import { TeknisiNav } from './TeknisiNav';
import { tugasTeknisi, StatusLayanan } from './mockData';

const statusStyle: Record<string, { bg: string; color: string }> = {
  'Dijadwalkan':        { bg: c.primaryLight, color: c.primary },
  'Teknisi Ditugaskan': { bg: '#EDE9FE', color: '#7C3AED' },
  'Sedang Berlangsung': { bg: '#FFF4EF', color: c.accent },
  'Menunggu Feedback':  { bg: '#FEF9E7', color: '#B98900' },
  'Selesai':            { bg: '#E6F4EA', color: c.success },
};

function Badge({ status }: { status: string }) {
  const s = statusStyle[status] ?? { bg: c.surface, color: c.textSecondary };
  return <span style={{ ...s, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

interface Props { nama: string; onNav: (k: string) => void; activeNav: string; onDetailTugas: (id: string) => void; }

export function TeknisiBeranda({ nama, onNav, activeNav, onDetailTugas }: Props) {
  const hari = tugasTeknisi.filter(t => t.tanggal === '21 Feb 2024').length;
  const aktif = tugasTeknisi.filter(t => t.status !== 'Selesai').length;
  const selesai = tugasTeknisi.filter(t => t.status === 'Selesai').length;
  const berikutnya = tugasTeknisi.find(t => t.status === 'Teknisi Ditugaskan' || t.status === 'Dijadwalkan');

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header oranye */}
      <div style={{ background: c.accent, padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>Selamat Pagi,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>{nama.split(' ')[0]} 🔧</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Teknisi Pengendalian Hama</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        {/* Statistik */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Tugas Hari Ini', value: hari, color: c.accent },
            { label: 'Tugas Aktif', value: aktif, color: c.primary },
            { label: 'Selesai', value: selesai, color: c.success },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: c.textSecondary, marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Jadwal berikutnya */}
        {berikutnya && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Jadwal Berikutnya</div>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, borderLeft: `4px solid ${c.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{berikutnya.pelanggan}</div>
                <Badge status={berikutnya.status} />
              </div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>🐛 {berikutnya.jenisHama}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>📅 {berikutnya.tanggal} · {berikutnya.waktu}</div>
              <div style={{ fontSize: 12, color: c.textSecondary }}>📍 {berikutnya.alamat}</div>
            </div>
          </div>
        )}

        {/* Semua tugas aktif */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Tugas Saya</div>
          {tugasTeknisi.filter(t => t.status !== 'Selesai').map(t => (
            <div key={t.id} onClick={() => onDetailTugas(t.id)}
              style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{t.pelanggan}</div>
                <Badge status={t.status} />
              </div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>🐛 {t.jenisHama}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>📅 {t.tanggal} · {t.waktu}</div>
              <div style={{ fontSize: 12, color: c.textSecondary }}>📍 {t.alamat}</div>
            </div>
          ))}
        </div>
      </div>

      <TeknisiNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
