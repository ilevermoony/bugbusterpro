import { Home, Grid, Clock, User } from 'lucide-react';
import { c, shadow } from './ds';

const items = [
  { key: 'beranda', label: 'Beranda', icon: Home },
  { key: 'layanan', label: 'Layanan', icon: Grid },
  { key: 'riwayat', label: 'Riwayat', icon: Clock },
  { key: 'profil',  label: 'Profil',  icon: User  },
];

interface Props { active: string; onSelect: (k: string) => void; }

export function PelangganNav({ active, onSelect }: Props) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: '#fff', boxShadow: shadow.bottomNav, display: 'flex', zIndex: 100 }}>
      {items.map(({ key, label, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button key={key} onClick={() => onSelect(key)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, border: 'none', background: 'none', cursor: 'pointer', color: isActive ? c.primary : c.textSecondary, paddingBottom: 4 }}>
            <Icon size={22} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{label}</span>
            {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.primary }} />}
          </button>
        );
      })}
    </div>
  );
}
