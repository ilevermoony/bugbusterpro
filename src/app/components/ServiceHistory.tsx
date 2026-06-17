import { ArrowLeft } from 'lucide-react';
import { c, shadow } from './ds';
import { BottomNav } from './BottomNav';

const history = [
  { name: 'Sarah Wijaya', date: 'Mon, 02 Jun 2025', time: '8:00–8:30am', status: 'Done' as const },
  { name: 'Budi Santoso', date: 'Tue, 03 Jun 2025', time: '9:30–10:00am', status: 'Process' as const },
  { name: 'Linda Chen', date: 'Wed, 04 Jun 2025', time: '10:00–10:30am', status: 'Done' as const },
  { name: 'Agus Prasetyo', date: 'Thu, 05 Jun 2025', time: '2:00–2:30pm', status: 'Cancelled' as const },
  { name: 'Dewi Rahayu', date: 'Sat, 07 Jun 2025', time: '11:00–11:30am', status: 'Done' as const },
];

function StatusBadge({ status }: { status: 'Done' | 'Process' | 'Cancelled' }) {
  const styles = {
    Done: { bg: '#E6F4EA', color: '#34A853' },
    Process: { bg: '#FEF9E7', color: '#B98900' },
    Cancelled: { bg: '#FCE8E6', color: '#EA4335' },
  };
  const s = styles[status];
  return <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{status}</span>;
}

interface Props {
  role: 'customer' | 'technician';
  onBack: () => void;
  onNav: (key: string) => void;
  activeNav: string;
}

export function ServiceHistory({ role, onBack, onNav, activeNav }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', background: '#fff', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Service History</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {history.map((h, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary }}>{h.name}</div>
              <StatusBadge status={h.status} />
            </div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>{h.date}</div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 12 }}>{h.time}</div>
            <button style={{ width: '100%', height: 40, borderRadius: 10, background: h.status === 'Cancelled' ? c.surface : c.primary, color: h.status === 'Cancelled' ? c.textSecondary : '#fff', fontSize: 13, fontWeight: 600, border: 'none', cursor: h.status === 'Cancelled' ? 'default' : 'pointer' }}>
              {h.status === 'Cancelled' ? 'Cancelled' : 'Update Status'}
            </button>
          </div>
        ))}
      </div>

      <BottomNav role={role} active={activeNav} onSelect={onNav} />
    </div>
  );
}
