import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { c } from './ds';

type Role = 'customer' | 'technician' | 'admin';

interface Props {
  role: Role;
  onBack: () => void;
  onLogin: () => void;
}

const roleConfig: Record<Role, { label: string; badgeColor: string; badgeText: string; accentBar: string }> = {
  customer: {
    label: 'Customer',
    badgeColor: c.primary,
    badgeText: 'Customer',
    accentBar: c.primary,
  },
  technician: {
    label: 'Teknisi',
    badgeColor: c.accent,
    badgeText: 'Teknisi',
    accentBar: c.accent,
  },
  admin: {
    label: 'Admin',
    badgeColor: c.textPrimary,
    badgeText: 'Admin',
    accentBar: c.textPrimary,
  },
};

export function RoleLogin({ role, onBack, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(false);
  const cfg = roleConfig[role];

  const handleLogin = () => {
    if (!email) { setError(true); return; }
    setError(false);
    onLogin();
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>
      {/* 4px accent bar */}
      <div style={{ height: 4, background: cfg.accentBar, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 4, marginLeft: -4 }}>
          <ArrowLeft size={22} />
        </button>
      </div>

      <div style={{ flex: 1, padding: '24px 20px 32px', boxSizing: 'border-box' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
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

          {/* Role badge */}
          <div style={{ marginBottom: 8 }}>
            <span style={{ background: cfg.badgeColor, color: '#fff', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>
              {cfg.badgeText}
            </span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Masuk ke BugBuster Pro</div>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
            <input type="email" placeholder="Alamat Email" value={email} onChange={e => { setEmail(e.target.value); setError(false); }}
              style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${error ? c.danger : c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
              <input type={showPwd ? 'text' : 'password'} placeholder="Kata Sandi" value={password} onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 44, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              <button onClick={() => setShowPwd(x => !x)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: c.textSecondary, display: 'flex', padding: 0 }}>
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <div style={{ fontSize: 12, color: c.danger, marginTop: 4 }}>Email tidak boleh kosong.</div>}
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: c.primary, cursor: 'pointer' }}>Lupa Kata Sandi?</span>
          </div>

          <button onClick={handleLogin}
            style={{ width: '100%', height: 52, borderRadius: 12, background: cfg.accentBar, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: 8 }}>
            Masuk sebagai {cfg.label}
          </button>
        </div>

        <div style={{ marginTop: 24, fontSize: 11, color: c.textSecondary, textAlign: 'center', lineHeight: 1.6 }}>
          Dengan masuk, kamu menyetujui{' '}
          <span style={{ color: c.primary }}>Syarat & Ketentuan</span> dan{' '}
          <span style={{ color: c.primary }}>Kebijakan Privasi</span> kami.
        </div>
      </div>
    </div>
  );
}
