import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { c, shadow } from './ds';
import { BottomNav } from './BottomNav';

const bookings = [
  { name: 'Sarah Wijaya', date: 'Mon, 16 Jun 2025', time: '8:00–8:30am', status: 'Paid' as const },
  { name: 'Budi Santoso', date: 'Tue, 17 Jun 2025', time: '9:30–10:00am', status: 'Process' as const },
  { name: 'Linda Chen', date: 'Wed, 18 Jun 2025', time: '10:00–10:30am', status: 'Paid' as const },
  { name: 'Agus Prasetyo', date: 'Thu, 19 Jun 2025', time: '2:00–2:30pm', status: 'Process' as const },
];

function StatusBadge({ status }: { status: 'Paid' | 'Process' | 'Done' | 'Cancelled' }) {
  const styles = {
    Paid: { bg: '#E6F4EA', color: c.success },
    Process: { bg: '#FEF9E7', color: '#B98900' },
    Done: { bg: '#E6F4EA', color: c.success },
    Cancelled: { bg: '#FCE8E6', color: c.danger },
  };
  const s = styles[status];
  return <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{status}</span>;
}

interface ServiceListProps {
  serviceName: string;
  onBack: () => void;
  onUpdateStatus: (name: string) => void;
  onNav: (key: string) => void;
  activeNav: string;
}

export function ServiceList({ serviceName, onBack, onUpdateStatus, onNav, activeNav }: ServiceListProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', background: '#fff', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>{serviceName} Service</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bookings.map((b, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary }}>{b.name}</div>
              <StatusBadge status={b.status} />
            </div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>{b.date}</div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 12 }}>{b.time}</div>
            <button onClick={() => onUpdateStatus(b.name)}
              style={{ width: '100%', height: 40, borderRadius: 10, background: c.primary, color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              Update Status
            </button>
          </div>
        ))}
      </div>

      <BottomNav role="technician" active={activeNav} onSelect={onNav} />
    </div>
  );
}

interface UpdateStatusProps {
  customerName: string;
  onBack: () => void;
}

export function UpdateStatus({ customerName, onBack }: UpdateStatusProps) {
  const [status, setStatus] = useState('');
  const [report, setReport] = useState('');
  const [feedback, setFeedback] = useState('');
  const [followUp, setFollowUp] = useState('');

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>{customerName}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Add Status</div>
          <select value={status} onChange={e => setStatus(e.target.value)}
            style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: status ? c.textPrimary : c.textSecondary, outline: 'none', appearance: 'none', boxSizing: 'border-box' }}>
            <option value="" disabled>Completion Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Follow Up Required">Follow Up Required</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Service Report</div>
          <textarea value={report} onChange={e => setReport(e.target.value)} placeholder="Add Description..."
            style={{ width: '100%', minHeight: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 14, fontSize: 14, color: c.textPrimary, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Feedback Form</div>
          <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Customer feedback notes..."
            style={{ width: '100%', minHeight: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 14, fontSize: 14, color: c.textPrimary, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Follow Up Date</div>
          <div style={{ position: 'relative' }}>
            <input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)}
              style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 14, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
            <Calendar size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Save Update
        </button>
      </div>
    </div>
  );
}
