import { useState } from 'react';
import { ChevronRight, ArrowLeft, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { c } from './ds';
import { PelangganNav } from './PelangganNav';

const menuItems = [
  { label: 'Detail Profil', key: 'detail' },
  { label: 'Riwayat Pesanan', key: 'riwayat' },
  { label: 'Metode Pembayaran', key: 'payment' },
  { label: 'Notifikasi', key: 'notif' },
  { label: 'Bantuan & FAQ', key: 'faq' },
];

interface Props { nama: string; onNav: (k: string) => void; activeNav: string; onLogout: () => void; }

export function PelangganProfil({ nama, onNav, activeNav, onLogout }: Props) {
  const [view, setView] = useState<'main' | 'detail'>('main');
  const [showPwd, setShowPwd] = useState(false);

  if (view === 'detail') return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={() => setView('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Profil</span>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {[
          { label: 'Email', icon: <Mail size={18} />, value: 'customer@bugbuster.com', type: 'email' },
          { label: 'Nomor Telepon', icon: <Phone size={18} />, value: '0812-3456-7890', type: 'tel' },
          { label: 'Kata Sandi', icon: <Lock size={18} />, value: 'customer123', type: showPwd ? 'text' : 'password', right: (
            <button onClick={() => setShowPwd(x => !x)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textSecondary, display: 'flex', padding: 0 }}>
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )},
        ].map((f, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>{f.label}</div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary, display: 'flex' }}>{f.icon}</div>
              <input type={f.type} defaultValue={f.value}
                style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: f.right ? 44 : 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              {f.right && <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>{f.right}</div>}
            </div>
          </div>
        ))}
        <button style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Simpan Perubahan
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.primary, padding: '16px 20px 28px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 10px' }}>👤</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{nama}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>Pelanggan</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          {menuItems.map((item, i) => (
            <div key={i} onClick={() => { if (item.key === 'detail') setView('detail'); else if (item.key === 'riwayat') onNav('riwayat'); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: i < menuItems.length - 1 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: c.textPrimary }}>{item.label}</span>
              <ChevronRight size={16} color={c.textSecondary} />
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: '100%', height: 52, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Keluar
        </button>
      </div>

      <PelangganNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
