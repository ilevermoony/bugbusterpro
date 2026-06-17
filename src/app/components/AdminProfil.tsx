import { ChevronRight } from 'lucide-react';
import { c } from './ds';
import { AdminNav } from './AdminNav';

const menuItems = ['Pengaturan Akun', 'Manajemen Pengguna', 'Log Aktivitas', 'Keamanan Sistem', 'Bantuan Admin'];

interface Props { nama: string; onNav: (k: string) => void; activeNav: string; onLogout: () => void; }

export function AdminProfil({ nama, onNav, activeNav, onLogout }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.textPrimary, padding: '16px 20px 28px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 10px' }}>⚙️</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{nama}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>Administrator · admin@bugbuster.com</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          {menuItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: i < menuItems.length - 1 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: c.textPrimary }}>{item}</span>
              <ChevronRight size={16} color={c.textSecondary} />
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: '100%', height: 52, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Keluar
        </button>
      </div>
      <AdminNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
