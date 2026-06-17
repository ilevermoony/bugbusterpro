import { useState } from 'react';
import { ChevronRight, ArrowLeft, Mail, Phone, Lock, Eye, EyeOff, CreditCard } from 'lucide-react';
import { c } from './ds';
import { TeknisiNav } from './TeknisiNav';

const menuItems = [
  { label: 'Detail Profil', key: 'detail' },
  { label: 'Jadwal Kerja', key: 'jadwal' },
  { label: 'Riwayat Layanan', key: 'riwayat' },
  { label: 'Feedback Pelanggan', key: 'feedback' },
  { label: 'Bantuan', key: 'bantuan' },
];

interface Props { nama: string; onNav: (k: string) => void; activeNav: string; onLogout: () => void; }

export function TeknisiProfil({ nama, onNav, activeNav, onLogout }: Props) {
  const [view, setView] = useState<'main' | 'detail'>('main');
  const [showPwd, setShowPwd] = useState(false);

  if (view === 'detail') return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={() => setView('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Profil</span>
      </div>
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto' }}>
        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FFF4EF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 8px' }}>👤</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary }}>{nama}</div>
          <div style={{ fontSize: 12, color: c.textSecondary }}>Teknisi</div>
        </div>
        {[
          { label: 'Email', icon: <Mail size={18} />, value: 'teknisi@bugbuster.com', type: 'email' },
          { label: 'ID Teknisi', icon: <CreditCard size={18} />, value: 'TECH-2024-001', type: 'text' },
          { label: 'Nomor Telepon', icon: <Phone size={18} />, value: '0812-9988-7766', type: 'tel' },
          { label: 'Kata Sandi', icon: <Lock size={18} />, value: 'teknisi123', type: showPwd ? 'text' : 'password', right: (
            <button onClick={() => setShowPwd(x => !x)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textSecondary, display: 'flex', padding: 0 }}>
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )},
        ].map((f, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>{f.label}</div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary, display: 'flex' }}>{f.icon}</div>
              <input type={f.type} defaultValue={f.value}
                style={{ width: '100%', height: 50, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: (f as any).right ? 44 : 16, fontSize: 13, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              {(f as any).right && <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>{(f as any).right}</div>}
            </div>
          </div>
        ))}
        <button style={{ width: '100%', height: 50, borderRadius: 12, background: c.accent, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 8 }}>Simpan Perubahan</button>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.accent, padding: '16px 20px 28px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 10px' }}>👤</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{nama}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>Teknisi · ID: TECH-2024-001</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
          {[{ v: '42', l: 'Total Tugas' }, { v: '4.9', l: 'Rating' }, { v: '100%', l: 'Selesai' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          {menuItems.map((item, i) => (
            <div key={i} onClick={() => { if (item.key === 'detail') setView('detail'); else if (item.key === 'jadwal') onNav('jadwal'); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: i < menuItems.length - 1 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: c.textPrimary }}>{item.label}</span>
              <ChevronRight size={16} color={c.textSecondary} />
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: '100%', height: 52, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Keluar</button>
      </div>
      <TeknisiNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
