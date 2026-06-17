import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChevronDown } from 'lucide-react';
import { c } from './ds';
import { ACCOUNTS, Role } from './mockData';

interface Props {
  onLogin: (role: Role, nama: string) => void;
}

const roleLabels: Record<string, string> = { pelanggan: 'Pelanggan', teknisi: 'Teknisi', admin: 'Administrator' };
const roleColors: Record<string, string> = { pelanggan: c.primary, teknisi: c.accent, admin: c.textPrimary };

export function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('pelanggan');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) { setError('Email dan password wajib diisi.'); return; }
    const acc = ACCOUNTS.find(a => a.email === email && a.password === password && a.role === role);
    if (!acc) { setError('Email, password, atau role tidak sesuai.'); return; }
    setError('');
    onLogin(acc.role, acc.nama);
  };

  const accentColor = roleColors[role];

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Accent bar */}
      <div style={{ height: 4, background: accentColor, flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '28px 20px 32px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg width="38" height="38" viewBox="0 0 52 52" fill="none">
              <path d="M26 4L8 12V26C8 36.5 16 45.5 26 48C36 45.5 44 36.5 44 26V12L26 4Z" fill="#fff" />
              <ellipse cx="26" cy="27" rx="7" ry="9" fill={c.primaryLight} stroke={c.primary} strokeWidth="1.5" />
              <circle cx="26" cy="18" r="4" fill={c.primaryLight} stroke={c.primary} strokeWidth="1.5" />
              <line x1="24" y1="15" x2="21" y2="11" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="28" y1="15" x2="31" y2="11" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="19" y1="27" x2="14" y2="27" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="33" y1="27" x2="38" y2="27" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: c.textPrimary }}>BugBuster Pro</div>
          <div style={{ fontSize: 13, color: c.textSecondary, marginTop: 4 }}>Masuk ke akun Anda</div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
            <input type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
              style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${error ? c.danger : c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
            <input type={showPwd ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
              style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${error ? c.danger : c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 44, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={() => setShowPwd(x => !x)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: c.textSecondary, display: 'flex', padding: 0 }}>
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Role selector */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>Masuk sebagai</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['pelanggan', 'teknisi', 'admin'] as Role[]).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  style={{ flex: 1, height: 40, borderRadius: 10, border: `1.5px solid ${role === r ? roleColors[r] : c.border}`, background: role === r ? roleColors[r] : '#fff', color: role === r ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ background: '#FCE8E6', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: c.danger }}>{error}</div>
          )}

          <button onClick={handleLogin}
            style={{ width: '100%', height: 52, borderRadius: 12, background: accentColor, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 4 }}>
            Masuk
          </button>
        </div>

        {/* Hint */}
        <div style={{ marginTop: 20, background: c.surface, borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>Akun Demo:</div>
          {ACCOUNTS.map(a => (
            <div key={a.email} style={{ fontSize: 11, color: c.textSecondary, marginBottom: 3 }}>
              <span style={{ fontWeight: 600, color: roleColors[a.role] }}>{roleLabels[a.role]}</span>: {a.email} / {a.password}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: c.textSecondary, textAlign: 'center', lineHeight: 1.6 }}>
          Dengan masuk, Anda menyetujui <span style={{ color: c.primary }}>Syarat & Ketentuan</span> dan <span style={{ color: c.primary }}>Kebijakan Privasi</span> kami.
        </div>
      </div>
    </div>
  );
}
