import { CheckCircle } from 'lucide-react';
import { c, shadow } from './ds';

interface Props {
  onDetail: () => void;
  onHome: () => void;
}

const summaryRows = [
  { label: 'Layanan', value: 'Termites Service' },
  { label: 'Tanggal', value: 'Selasa, 21 Feb 2024' },
  { label: 'Waktu', value: '09:00 – 09:30' },
  { label: 'Teknisi', value: 'Andikha Virza' },
];

export function BookingConfirmation({ onDetail, onHome }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 20px 32px', boxSizing: 'border-box', overflowY: 'auto' }}>
      {/* Icon */}
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <CheckCircle size={44} color="#fff" strokeWidth={2.5} />
      </div>

      <div style={{ fontSize: 24, fontWeight: 700, color: c.primary, textAlign: 'center', marginBottom: 8 }}>Pemesanan Berhasil!</div>
      <div style={{ fontSize: 14, color: c.textSecondary, textAlign: 'center', lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>
        Terima kasih! Pesanan kamu telah dikonfirmasi.
      </div>

      {/* Summary card */}
      <div style={{ width: '100%', background: '#fff', borderRadius: 16, boxShadow: shadow.card, border: `1px solid ${c.border}`, padding: '4px 0', marginBottom: 28 }}>
        {summaryRows.map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < summaryRows.length - 1 ? `1px solid ${c.border}` : 'none' }}>
            <span style={{ fontSize: 13, color: c.textSecondary }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{row.value}</span>
          </div>
        ))}
        {/* Status row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
          <span style={{ fontSize: 13, color: c.textSecondary }}>Status</span>
          <span style={{ background: '#E6F4EA', color: c.success, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>Confirmed</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <button onClick={onDetail}
          style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Lihat Detail Pesanan
        </button>
        <button onClick={onHome}
          style={{ width: '100%', height: 52, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.primary}`, color: c.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}
