import { c, shadow } from './ds';
import { BottomNav } from './BottomNav';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { day: 'Mon', bookings: 8 },
  { day: 'Tue', bookings: 12 },
  { day: 'Wed', bookings: 7 },
  { day: 'Thu', bookings: 15 },
  { day: 'Fri', bookings: 11 },
  { day: 'Sat', bookings: 18 },
  { day: 'Sun', bookings: 5 },
];

const recentBookings = [
  { customer: 'Sarah Wijaya', service: 'Termite', technician: 'Ahmad K.', status: 'Done' as const },
  { customer: 'Budi Santoso', service: 'Mosquito', technician: 'Rizky M.', status: 'Process' as const },
  { customer: 'Linda Chen', service: 'Rat', technician: 'Dani S.', status: 'Paid' as const },
  { customer: 'Agus Prasetyo', service: 'Bedbug', technician: 'Ahmad K.', status: 'Done' as const },
  { customer: 'Dewi Rahayu', service: 'Flea', technician: 'Rizky M.', status: 'Cancelled' as const },
];

type Status = 'Done' | 'Process' | 'Paid' | 'Cancelled';

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, { bg: string; color: string }> = {
    Done: { bg: '#E6F4EA', color: c.success },
    Process: { bg: '#FEF9E7', color: '#B98900' },
    Paid: { bg: '#E6F4EA', color: c.success },
    Cancelled: { bg: '#FCE8E6', color: c.danger },
  };
  const s = styles[status];
  return <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

interface Props {
  onNav: (key: string) => void;
  activeNav: string;
}

export function AdminDashboard({ onNav, activeNav }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '48px 20px 20px', background: c.primary }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Good Morning,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Admin Panel</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚙️</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        {/* Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Total Bookings', value: '247', icon: '📋' },
            { label: 'Active Technicians', value: '12', icon: '👷' },
            { label: 'Avg Rating', value: '4.8 ★', icon: '⭐' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: c.primary }}>{m.value}</div>
              <div style={{ fontSize: 10, color: c.textSecondary, marginTop: 2, lineHeight: 1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Weekly Bookings</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} barSize={20}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: c.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: shadow.card, fontSize: 12 }} />
              <Bar dataKey="bookings" fill={c.primary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent bookings */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 10px', borderBottom: `1px solid ${c.border}`, fontSize: 14, fontWeight: 600, color: c.textPrimary }}>Recent Bookings</div>
          {recentBookings.map((b, i) => (
            <div key={i} style={{ padding: '12px 16px', borderBottom: i < recentBookings.length - 1 ? `1px solid ${c.border}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{b.customer}</div>
                <div style={{ fontSize: 11, color: c.textSecondary }}>{b.service} • {b.technician}</div>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav role="admin" active={activeNav} onSelect={onNav} />
    </div>
  );
}
