import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { c } from './ds';

interface Props {
  onLogin: (role: 'customer' | 'technician' | 'admin') => void;
}

function BugBusterLogo() {
  return (
    <div style={{ width: 64, height: 64, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px' }}>
      <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
        <path d="M26 4L8 12V26C8 36.5 16 45.5 26 48C36 45.5 44 36.5 44 26V12L26 4Z" fill="#fff" strokeWidth="1.5" />
        <ellipse cx="26" cy="27" rx="7" ry="9" fill={c.primaryLight} stroke={c.primary} strokeWidth="1.5" />
        <circle cx="26" cy="18" r="4" fill={c.primaryLight} stroke={c.primary} strokeWidth="1.5" />
        <line x1="24" y1="15" x2="21" y2="11" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="15" x2="31" y2="11" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="24" x2="14" y2="21" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="27" x2="14" y2="27" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="33" y1="27" x2="38" y2="27" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function InputField({ icon, placeholder, type = 'text', value, onChange, error, rightEl }: {
  icon: React.ReactNode; placeholder: string; type?: string; value: string; onChange: (v: string) => void; error?: boolean; rightEl?: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: error ? c.danger : c.textSecondary, display: 'flex' }}>{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', height: 52, background: c.surface,
          border: `1px solid ${error ? c.danger : c.border}`,
          borderRadius: 10, paddingLeft: 44, paddingRight: rightEl ? 44 : 16,
          fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box',
        }}
      />
      {rightEl && <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', cursor: 'pointer', color: c.textSecondary }}>{rightEl}</div>}
    </div>
  );
}

export function AuthScreens({ onLogin }: Props) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [role, setRole] = useState<'customer' | 'technician' | 'admin'>('customer');

  const handleLogin = () => {
    if (password === '' && email !== '') { setLoginError(true); return; }
    setLoginError(false);
    onLogin(role);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', overflowY: 'auto', padding: '32px 20px 32px', boxSizing: 'border-box' }}>
      <BugBusterLogo />
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: `1px solid ${c.border}` }}>
        {(['login', 'signup'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: 40, background: 'none', border: 'none', borderBottom: tab === t ? `2px solid ${c.primary}` : '2px solid transparent', color: tab === t ? c.primary : c.textSecondary, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: -1 }}>
            {t === 'login' ? 'Login' : 'Sign Up'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tab === 'signup' && (
          <InputField icon={<User size={18} />} placeholder="Full Name" value={name} onChange={setName} />
        )}
        <InputField icon={<Mail size={18} />} placeholder="Email Address" type="email" value={email} onChange={setEmail} />
        <div>
          <InputField
            icon={<Lock size={18} />}
            placeholder="Password"
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={v => { setPassword(v); setLoginError(false); }}
            error={loginError}
            rightEl={<span onClick={() => setShowPwd(x => !x)}>{showPwd ? <EyeOff size={18} /> : <Eye size={18} />}</span>}
          />
          {loginError && <div style={{ fontSize: 12, color: c.danger, marginTop: 4 }}>Password anda salah, silahkan ulangi!</div>}
        </div>

        {tab === 'login' && (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: c.primary, cursor: 'pointer' }}>Forgot Password?</span>
          </div>
        )}

        {/* Role selector */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {(['customer', 'technician', 'admin'] as const).map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ flex: 1, height: 34, borderRadius: 8, border: `1.5px solid ${role === r ? c.primary : c.border}`, background: role === r ? c.primaryLight : '#fff', color: role === r ? c.primary : c.textSecondary, fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
              {r}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 10, color: c.textSecondary, textAlign: 'center' }}>Select role to preview different dashboards</div>

        <button
          onClick={handleLogin}
          style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: 4 }}
        >
          {tab === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: c.textSecondary, textAlign: 'center', lineHeight: 1.6 }}>
        By {tab === 'login' ? 'logging in' : 'signing up'} you agree to our{' '}
        <span style={{ color: c.primary }}>Terms and Conditions</span> and{' '}
        <span style={{ color: c.primary }}>Privacy Policy</span>
      </div>
    </div>
  );
}
