import { c, shadow } from './ds';
import { PelangganNav } from './PelangganNav';
import { pesananDummy } from './mockData';
import { Bell, ChevronRight } from 'lucide-react';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Menunggu Konfirmasi': { bg: '#FEF9E7', color: '#B98900' },
    'Dijadwalkan':          { bg: c.primaryLight, color: c.primary },
    'Teknisi Ditugaskan':   { bg: '#EDE9FE', color: '#7C3AED' },
    'Sedang Berlangsung':   { bg: '#FFF4EF', color: c.accent },
    'Menunggu Feedback':    { bg: '#FEF9E7', color: '#B98900' },
    'Selesai':              { bg: '#E6F4EA', color: c.success },
  };
  const s = map[status] ?? { bg: c.surface, color: c.textSecondary };
  return <span style={{ ...s, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

interface Props { nama: string; onNav: (k: string) => void; activeNav: string; onPesan: () => void; onDetailPesanan: (id: string) => void; }

export function PelangganBeranda({ nama, onNav, activeNav, onPesan, onDetailPesanan }: Props) {
  const pesananAktif = pesananDummy.filter(p => p.status !== 'Selesai');
  const pesananTerakhir = pesananDummy.find(p => p.status === 'Selesai');

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div style={{ background: c.primary, padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Selamat Pagi,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>{nama.split(' ')[0]} 👋</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} color="#fff" />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
          </div>
        </div>

        {/* CTA */}
        <button onClick={onPesan}
          style={{ width: '100%', height: 46, borderRadius: 12, background: c.accent, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 16 }}>
          🛡️ Pesan Layanan Sekarang
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>

        {/* Pesanan Aktif */}
        {pesananAktif.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Pesanan Aktif</div>
            {pesananAktif.slice(0, 2).map(p => (
              <div key={p.id} onClick={() => onDetailPesanan(p.id)}
                style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{p.jenisHama}</div>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 3 }}>📅 {p.tanggal} · {p.waktu}</div>
                <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 3 }}>👷 Teknisi: {p.teknisi}</div>
                <div style={{ fontSize: 12, color: c.textSecondary }}>📍 {p.alamat}</div>
                {p.status === 'Menunggu Feedback' && (
                  <div style={{ marginTop: 10, background: '#FEF9E7', borderRadius: 8, padding: '8px 10px', fontSize: 12, color: '#B98900', fontWeight: 600 }}>
                    ⭐ Berikan ulasan untuk pesanan ini!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Jadwal Mendatang */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Jadwal Mendatang</div>
          <div style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🐀</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Pengendalian Tikus</div>
                <div style={{ fontSize: 12, color: c.textSecondary }}>28 Feb 2024 · 14:00–14:30</div>
                <div style={{ marginTop: 4 }}><StatusBadge status="Teknisi Ditugaskan" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Terakhir */}
        {pesananTerakhir && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Layanan Terakhir</div>
              <span onClick={() => onNav('riwayat')} style={{ fontSize: 12, color: c.primary, cursor: 'pointer' }}>Lihat semua</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onNav('riwayat')}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🦟</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{pesananTerakhir.jenisHama}</div>
                <div style={{ fontSize: 12, color: c.textSecondary }}>{pesananTerakhir.tanggal}</div>
                {pesananTerakhir.rating && <div style={{ fontSize: 12, color: '#B98900', marginTop: 2 }}>{'★'.repeat(pesananTerakhir.rating)} {pesananTerakhir.rating}/5</div>}
              </div>
              <StatusBadge status={pesananTerakhir.status} />
            </div>
          </div>
        )}

        {/* Promo */}
        <div style={{ background: `linear-gradient(135deg, ${c.primaryLight} 0%, #dbeafe 100%)`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.primary }}>🎉 Promo Spesial!</div>
          <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 4 }}>Diskon 20% untuk pemesanan Inspeksi Hama perdana. Gunakan kode <strong>HAMA20</strong></div>
        </div>

        {/* Tips */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>💡 Tips Pengendalian Hama</div>
          {[
            { icon: '🚰', tip: 'Tutup sumber air yang tergenang untuk cegah nyamuk berkembang biak.' },
            { icon: '🗑️', tip: 'Buang sampah setiap hari agar tidak menarik kecoa dan tikus.' },
            { icon: '🌿', tip: 'Pangkas tanaman di sekitar rumah untuk mengurangi persembunyian hama.' },
          ].map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '10px 12px', marginBottom: 8, display: 'flex', alignItems: 'flex-start', gap: 10, boxShadow: shadow.card }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={{ fontSize: 12, color: c.textSecondary, lineHeight: 1.5 }}>{t.tip}</span>
            </div>
          ))}
        </div>
      </div>

      <PelangganNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
