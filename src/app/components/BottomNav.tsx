import { Home, Briefcase, Clock, User, LayoutDashboard, Users, FileText } from 'lucide-react';
import { c, shadow } from './ds';

type NavItem = { icon: React.ReactNode; label: string; key: string };

const customerNav: NavItem[] = [
  { icon: <Home size={22} />, label: 'Home', key: 'home' },
  { icon: <Briefcase size={22} />, label: 'Services', key: 'services' },
  { icon: <Clock size={22} />, label: 'History', key: 'history' },
  { icon: <User size={22} />, label: 'Profile', key: 'profile' },
];

const technicianNav: NavItem[] = [
  { icon: <Home size={22} />, label: 'Home', key: 'home' },
  { icon: <Briefcase size={22} />, label: 'Services', key: 'services' },
  { icon: <Clock size={22} />, label: 'History', key: 'history' },
  { icon: <User size={22} />, label: 'Profile', key: 'profile' },
];

const adminNav: NavItem[] = [
  { icon: <LayoutDashboard size={22} />, label: 'Dashboard', key: 'home' },
  { icon: <Users size={22} />, label: 'Technicians', key: 'services' },
  { icon: <Briefcase size={22} />, label: 'Bookings', key: 'history' },
  { icon: <FileText size={22} />, label: 'Reports', key: 'profile' },
];

interface Props {
  role: 'customer' | 'technician' | 'admin';
  active: string;
  onSelect: (key: string) => void;
}

export function BottomNav({ role, active, onSelect }: Props) {
  const items = role === 'admin' ? adminNav : role === 'technician' ? technicianNav : customerNav;
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: '#fff', boxShadow: shadow.bottomNav, display: 'flex', zIndex: 100 }}>
      {items.map(item => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, border: 'none', background: 'none', cursor: 'pointer', color: isActive ? c.primary : c.textSecondary, paddingBottom: 4 }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
            {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.primary, marginTop: 1 }} />}
          </button>
        );
      })}
    </div>
  );
}
