import { c, shadow } from './ds';
import { PelangganNav } from './PelangganNav';
import { katalogLayanan } from './mockData';

interface Props { onNav: (k: string) => void; activeNav: string; onPesan: (layanan: typeof katalogLayanan[0]) => void; }

export function PelangganLayanan({ onNav, activeNav, onPesan }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.primary, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Katalog Layanan</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Pilih layanan yang Anda butuhkan</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {katalogLayanan.map(l => (
          <div key={l.id} style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, display: 'flex', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{l.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>{l.nama}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.5, marginBottom: 10 }}>{l.deskripsi}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: c.textSecondary }}>Mulai dari</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.primary }}>Rp {l.harga.toLocaleString('id-ID')}</div>
                </div>
                <button onClick={() => onPesan(l)}
                  style={{ padding: '8px 18px', borderRadius: 10, background: c.primary, color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  Pesan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PelangganNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
