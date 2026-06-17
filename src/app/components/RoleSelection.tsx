import { ChevronRight, User, Wrench, Shield } from 'lucide-react';
import { c, shadow } from './ds';

type Role = 'customer' | 'technician' | 'admin';

interface Props {
  onSelect: (role: Role) => void;
}

const roles: { role: Role; icon: React.ReactNode; label: string; caption: string; color: string }[] = [
  { role: 'customer', icon: <User size={22} color="#fff" />, label: 'Customer', caption: 'Pesan layanan pest control', color: c.primary },
  { role: 'technician', icon: <Wrench size={22} color="#fff" />, label: 'Teknisi', caption: 'Kelola tugas harian kamu', color: c.accent },
  { role: 'admin', icon: <Shield size={22} color="#fff" />, label: 'Administrator', caption: 'Awasi seluruh operasional', color: c.textPrimary },
];

export function RoleSelection({ onSelect }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', padding: '48px 20px 32px', boxSizing: 'border-box' }}>
      {/* Logo area */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
            <path d="M26 4L8 12V26C8 36.5 16 45.5 26 48C36 45.5 44 36.5 44 26V12L26 4Z" fill="#fff" />
            <ellipse cx="26" cy="27" rx="7" ry="9" fill={c.primaryLight} stroke={c.primary} strokeWidth="1.5" />
            <circle cx="26" cy="18" r="4" fill={c.primaryLight} stroke={c.primary} strokeWidth="1.5" />
            <line x1="24" y1="15" x2="21" y2="11" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="28" y1="15" x2="31" y2="11" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="19" y1="27" x2="14" y2="27" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="33" y1="27" x2="38" y2="27" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: c.textPrimary }}>Login sebagai</div>
        <div style={{ fontSize: 13, color: c.textSecondary, marginTop: 6 }}>Pilih peran kamu untuk melanjutkan</div>
      </div>

      {/* Role cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {roles.map(r => (
          <button
            key={r.role}
            onClick={() => onSelect(r.role)}
            style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: '18px 16px', border: `1.5px solid ${c.border}`, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 14, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {r.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>{r.label}</div>
              <div style={{ fontSize: 13, color: c.textSecondary, marginTop: 2 }}>{r.caption}</div>
            </div>
            <ChevronRight size={18} color={c.textSecondary} />
          </button>
        ))}
      </div>

      <div style={{ marginTop: 32, fontSize: 11, color: c.textSecondary, textAlign: 'center' }}>
        BugBuster Pro v1.0 · Trusted Pest Control
      </div>
    </div>
  );
}
