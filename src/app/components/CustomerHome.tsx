import { c, shadow } from './ds';
import { BottomNav } from './BottomNav';

const services = [
  { name: 'Mosquito', desc: 'Eliminate dengue-carrying mosquitoes from your home', emoji: '🦟' },
  { name: 'Rat', desc: 'Professional rodent control & exclusion services', emoji: '🐀' },
  { name: 'Bedbug', desc: 'Heat treatment & pesticide for complete eradication', emoji: '🪲' },
  { name: 'Flea', desc: 'Pet-safe flea elimination for your household', emoji: '🦗' },
  { name: 'Termite', desc: 'Structural termite inspection & treatment', emoji: '🐛' },
  { name: 'Aphid', desc: 'Garden & indoor plant aphid control solutions', emoji: '🌿' },
];

interface Props {
  role: 'customer' | 'technician';
  onSelectService: (name: string) => void;
  onNav: (key: string) => void;
  activeNav: string;
}

export function CustomerHome({ role, onSelectService, onNav, activeNav }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '48px 20px 16px', background: c.primary }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Good Morning,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2 }}>Alexander</div>
            {role === 'technician' && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Technician</div>}
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 80px' }}>
        {/* Banner */}
        <div style={{ borderRadius: 16, background: `linear-gradient(135deg, ${c.primaryLight} 0%, #dbeafe 100%)`, padding: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.primary }}>First Service Free!</div>
            <div style={{ fontSize: 11, color: c.textSecondary, marginTop: 2 }}>Use code FIRST100 at checkout</div>
          </div>
          <div style={{ fontSize: 32 }}>🎉</div>
        </div>

        <div style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary, marginBottom: 14 }}>Our Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {services.map(s => (
            <div
              key={s.name}
              onClick={() => onSelectService(s.name)}
              style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, cursor: 'pointer', transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 10 }}>{s.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.primary, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: c.textSecondary, lineHeight: 1.4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav role={role} active={activeNav} onSelect={onNav} />
    </div>
  );
}
