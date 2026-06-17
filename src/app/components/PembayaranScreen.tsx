import { useState } from 'react';
import { ArrowLeft, CheckCircle, Tag } from 'lucide-react';
import { c } from './ds';

const metodePembayaran = [
  { key: 'va',    label: 'Virtual Account', icon: '🏦', desc: 'BNI / BCA / Mandiri' },
  { key: 'gopay', label: 'GoPay',           icon: '💚', desc: 'Dompet digital GoPay' },
  { key: 'spay',  label: 'ShopeePay',       icon: '🟠', desc: 'Dompet digital ShopeePay' },
  { key: 'qris',  label: 'QRIS',            icon: '📱', desc: 'Scan kode QR' },
  { key: 'cod',   label: 'Bayar Setelah Layanan', icon: '💵', desc: 'Tunai setelah selesai' },
];

interface Props { harga: number; layanan: string; onBack: () => void; onBayar: () => void; }

export function PembayaranScreen({ harga, layanan, onBack, onBayar }: Props) {
  const [metode, setMetode] = useState('cod');
  const [kupon, setKupon] = useState('');
  const [diskon, setDiskon] = useState(0);

  const applyKupon = () => {
    if (kupon.toUpperCase() === 'HAMA20') setDiskon(Math.round(harga * 0.2));
  };
  const total = harga + 2000 - diskon;

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Pembayaran</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 100px' }}>
        {/* Ringkasan */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Ringkasan Pesanan</div>
          {[
            { label: layanan, value: `Rp ${harga.toLocaleString('id-ID')}` },
            { label: 'Biaya Layanan', value: 'Rp 2.000' },
            ...(diskon > 0 ? [{ label: 'Diskon Kupon', value: `−Rp ${diskon.toLocaleString('id-ID')}` }] : []),
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: i === 0 ? c.textPrimary : diskon > 0 && i === 2 ? c.success : c.textSecondary }}>
              <span>{r.label}</span><span style={{ fontWeight: i === 0 ? 600 : 400 }}>{r.value}</span>
            </div>
          ))}
          <div style={{ height: 1, background: c.border, margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: c.textPrimary }}>
            <span>Total Pembayaran</span>
            <span style={{ color: c.primary }}>Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Kupon */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Tag size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
            <input placeholder="Kode promo" value={kupon} onChange={e => setKupon(e.target.value)}
              style={{ width: '100%', height: 46, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 34, paddingRight: 12, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button onClick={applyKupon}
            style={{ padding: '0 16px', height: 46, borderRadius: 10, background: 'none', border: `1.5px solid ${c.primary}`, color: c.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            PAKAI
          </button>
        </div>

        {/* Metode Pembayaran */}
        <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Metode Pembayaran</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {metodePembayaran.map(m => (
            <div key={m.key} onClick={() => setMetode(m.key)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${metode === m.key ? c.primary : c.border}`, background: metode === m.key ? c.primaryLight : '#fff', cursor: 'pointer' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{m.label}</div>
                <div style={{ fontSize: 11, color: c.textSecondary }}>{m.desc}</div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${metode === m.key ? c.primary : c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {metode === m.key && <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.primary }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: c.textSecondary }}>Total</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.primary }}>Rp {total.toLocaleString('id-ID')}</div>
        </div>
        <button onClick={onBayar} style={{ flex: 1, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}

export function BuktiPembayaran({ nomorPesanan, onHome }: { nomorPesanan: string; onHome: () => void }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ width: 84, height: 84, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <CheckCircle size={48} color="#fff" strokeWidth={2.5} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: c.primary, marginBottom: 8 }}>Pembayaran Berhasil!</div>
      <div style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.6, marginBottom: 20 }}>Pesanan Anda telah dikonfirmasi. Tim kami akan segera menghubungi Anda.</div>

      <div style={{ background: c.surface, borderRadius: 14, padding: 16, width: '100%', marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 6 }}>Nomor Pesanan</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: c.primary, letterSpacing: 1 }}>{nomorPesanan}</div>
        <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 8 }}>Status: <span style={{ color: '#B98900', fontWeight: 600 }}>Menunggu Konfirmasi</span></div>
      </div>

      <div style={{ background: '#E6F4EA', borderRadius: 12, padding: '10px 14px', width: '100%', marginBottom: 24, fontSize: 12, color: c.success }}>
        ✅ Bukti pembayaran telah disimpan ke riwayat Anda
      </div>

      <button onClick={onHome} style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
        Kembali ke Beranda
      </button>
    </div>
  );
}
