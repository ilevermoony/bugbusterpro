import { useState } from 'react';
import { ArrowLeft, ChevronRight, Eye, EyeOff, Mail, Phone, Lock, CreditCard } from 'lucide-react';
import { c } from './ds';
import { BottomNav } from './BottomNav';

const customerMenuItems = [
  'Detail Profil',
  'Booking Information',
  'Technician Assignment Details',
  'Service Completion Report',
  'Feedback Request',
];

const technicianMenuItems = [
  'Detail Profil',
  'Daily Schedule',
  'Customer Details and Address',
  'Service History for the Customer',
  'Navigation to Service Location',
];

interface ProfileProps {
  role: 'customer' | 'technician';
  onNav: (key: string) => void;
  activeNav: string;
  onDetail: () => void;
}

export function ProfileScreen({ role, onNav, activeNav, onDetail }: ProfileProps) {
  const menuItems = role === 'technician' ? technicianMenuItems : customerMenuItems;
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '48px 20px 24px', background: c.primary, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 12px' }}>👤</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Alexander</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{role === 'technician' ? 'Technician' : '@User123'}</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          {menuItems.map((item, i) => (
            <div key={i} onClick={() => { if (item === 'Detail Profil') onDetail(); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: i < menuItems.length - 1 ? `1px solid ${c.border}` : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: c.textPrimary }}>{item}</span>
              <ChevronRight size={16} color={c.textSecondary} />
            </div>
          ))}
        </div>

        <button style={{ width: '100%', height: 52, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <BottomNav role={role} active={activeNav} onSelect={onNav} />
    </div>
  );
}

interface DetailProps {
  role: 'customer' | 'technician';
  onBack: () => void;
}

export function DetailProfil({ role, onBack }: DetailProps) {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Profil</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
        {role === 'technician' && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 8px' }}>👤</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>Alexander</div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>Technician</div>
          </div>
        )}

        {[
          { label: 'Your Email', icon: <Mail size={18} />, value: 'alexander@email.com', type: 'email' },
          ...(role === 'technician' ? [{ label: 'Technician ID', icon: <CreditCard size={18} />, value: 'TECH-2024-0042', type: 'text' }] : []),
          { label: 'Phone Number', icon: <Phone size={18} />, value: '+62 812-3456-7890', type: 'tel' },
          { label: 'Password', icon: <Lock size={18} />, value: 'password123', type: showPwd ? 'text' : 'password', rightEl: <span onClick={() => setShowPwd(x => !x)}>{showPwd ? <EyeOff size={18} /> : <Eye size={18} />}</span> },
        ].map((field, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textSecondary, marginBottom: 6 }}>{field.label}</div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary, display: 'flex' }}>{field.icon}</div>
              <input type={field.type} defaultValue={field.value}
                style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: field.rightEl ? 44 : 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
              {field.rightEl && <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', cursor: 'pointer', color: c.textSecondary }}>{field.rightEl}</div>}
            </div>
          </div>
        ))}

        <button style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: 8 }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
