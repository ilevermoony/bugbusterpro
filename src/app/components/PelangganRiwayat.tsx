import { useState } from 'react';
import { ArrowLeft, ChevronRight, Phone, CheckCircle, Circle } from 'lucide-react';
import { c, shadow } from './ds';
import { PelangganNav } from './PelangganNav';
import { pesananDummy, StatusLayanan } from './mockData';

const statusStyle: Record<StatusLayanan, { bg: string; color: string }> = {
  'Menunggu Konfirmasi': { bg: '#FEF9E7', color: '#B98900' },
  'Dijadwalkan':          { bg: c.primaryLight, color: c.primary },
  'Teknisi Ditugaskan':   { bg: '#EDE9FE', color: '#7C3AED' },
  'Sedang Berlangsung':   { bg: '#FFF4EF', color: c.accent },
  'Menunggu Feedback':    { bg: '#FEF9E7', color: '#B98900' },
  'Selesai':              { bg: '#E6F4EA', color: c.success },
};

function Badge({ status }: { status: StatusLayanan }) {
  const s = statusStyle[status];
  return <span style={{ ...s, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

const trackingSteps: { label: string; statusList: StatusLayanan[] }[] = [
  { label: 'Pesanan Dikonfirmasi',   statusList: ['Dijadwalkan', 'Teknisi Ditugaskan', 'Sedang Berlangsung', 'Menunggu Feedback', 'Selesai'] },
  { label: 'Teknisi Ditetapkan',     statusList: ['Teknisi Ditugaskan', 'Sedang Berlangsung', 'Menunggu Feedback', 'Selesai'] },
  { label: 'Teknisi dalam Perjalanan', statusList: ['Sedang Berlangsung', 'Menunggu Feedback', 'Selesai'] },
  { label: 'Layanan Berlangsung',    statusList: ['Menunggu Feedback', 'Selesai'] },
  { label: 'Selesai',               statusList: ['Selesai'] },
];

interface DetailProps { pesananId: string; onBack: () => void; onFeedback: (id: string) => void; }

function DetailPesanan({ pesananId, onBack, onFeedback }: DetailProps) {
  const p = pesananDummy.find(x => x.id === pesananId)!;
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Pesanan</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 24px' }}>
        {/* Info */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, marginBottom: 16 }}>
          {[
            { l: 'No. Pesanan', v: p.nomorPesanan },
            { l: 'Layanan', v: p.jenisHama },
            { l: 'Tanggal', v: p.tanggal },
            { l: 'Waktu', v: p.waktu },
            { l: 'Alamat', v: p.alamat },
            { l: 'Pembayaran', v: `${p.metodePembayaran} · ${p.statusPembayaran}` },
          ].map((r, i, arr) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none', gap: 12 }}>
              <span style={{ fontSize: 12, color: c.textSecondary, flexShrink: 0 }}>{r.l}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary, textAlign: 'right' }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* Tracking */}
        <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 12 }}>Status Pesanan</div>
        <div style={{ marginBottom: 20 }}>
          {trackingSteps.map((step, i) => {
            const done = step.statusList.includes(p.status);
            const active = step.statusList[0] === p.status;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                {i < trackingSteps.length - 1 && (
                  <div style={{ position: 'absolute', left: 10, top: 24, width: 2, height: 32, background: done ? c.success : c.border }} />
                )}
                <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {done ? <CheckCircle size={22} color={c.success} fill={c.success} strokeWidth={0} /> :
                   active ? <div style={{ width: 22, height: 22, borderRadius: '50%', border: `3px solid ${c.primary}`, background: c.primaryLight }} /> :
                   <Circle size={22} color={c.border} />}
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <div style={{ fontSize: 13, fontWeight: done ? 600 : 400, color: done ? c.textPrimary : c.textSecondary }}>{step.label}</div>
                  {active && <div style={{ fontSize: 11, color: c.primary }}>Sedang berlangsung...</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Teknisi */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{p.teknisi}</div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>Teknisi Pengendalian Hama</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={16} color="#fff" />
          </div>
        </div>

        {/* Feedback CTA */}
        {p.status === 'Menunggu Feedback' && (
          <button onClick={() => onFeedback(p.id)}
            style={{ width: '100%', height: 52, borderRadius: 12, background: c.accent, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            ⭐ Berikan Ulasan
          </button>
        )}
        {p.status === 'Selesai' && p.rating && (
          <div style={{ background: '#E6F4EA', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.success, marginBottom: 4 }}>Ulasan Anda</div>
            <div style={{ color: '#B98900' }}>{'★'.repeat(p.rating)}{'☆'.repeat(5 - p.rating)}</div>
            {p.komentar && <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 4 }}>{p.komentar}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

interface Props { onNav: (k: string) => void; activeNav: string; onFeedback: (id: string) => void; }

export function PelangganRiwayat({ onNav, activeNav, onFeedback }: Props) {
  const [filter, setFilter] = useState('Semua');
  const [detail, setDetail] = useState<string | null>(null);
  const filters = ['Semua', 'Aktif', 'Selesai'];

  if (detail) return <DetailPesanan pesananId={detail} onBack={() => setDetail(null)} onFeedback={id => { setDetail(null); onFeedback(id); }} />;

  const displayed = pesananDummy.filter(p =>
    filter === 'Semua' ? true :
    filter === 'Aktif' ? p.status !== 'Selesai' :
    p.status === 'Selesai'
  );

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.primary, padding: '16px 20px 16px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Riwayat Pemesanan</div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8, background: '#fff', borderBottom: `1px solid ${c.border}` }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '5px 14px', borderRadius: 20, border: `1.5px solid ${filter === f ? c.primary : c.border}`, background: filter === f ? c.primary : '#fff', color: filter === f ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {displayed.map(p => (
          <div key={p.id} onClick={() => setDetail(p.id)}
            style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 16, cursor: 'pointer', display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 3 }}>{p.jenisHama}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>{p.tanggal} · {p.waktu}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 8 }}>👷 {p.teknisi}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Badge status={p.status} />
                <span style={{ background: p.statusPembayaran === 'Lunas' ? '#E6F4EA' : '#FEF9E7', color: p.statusPembayaran === 'Lunas' ? c.success : '#B98900', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{p.statusPembayaran}</span>
              </div>
            </div>
            <ChevronRight size={16} color={c.textSecondary} style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>
      <PelangganNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
