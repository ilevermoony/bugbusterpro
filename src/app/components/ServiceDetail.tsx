import { ArrowLeft } from 'lucide-react';
import { c, shadow } from './ds';

const termiteSteps = [
  { title: 'Termite Inspection', points: ['Full structural inspection of property', 'Moisture meter readings at key points', 'Identify entry points and colonies'] },
  { title: 'Termite Treatment', points: ['Liquid termiticide barrier application', 'Bait station installation', 'Direct colony elimination spray'] },
  { title: 'Wood Protection', points: ['Borate wood treatment for at-risk timber', 'Seal cracks and entry points', 'Preventative coating on foundations'] },
  { title: 'Monitoring & Follow-up', points: ['30-day follow-up inspection included', 'Bait station monitoring quarterly', '12-month warranty on treatment'] },
];

interface Props {
  serviceName: string;
  onBack: () => void;
  onBook: () => void;
}

export function ServiceDetail({ serviceName, onBack, onBook }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>{serviceName} Service</span>
      </div>

      {/* Hero */}
      <div style={{ padding: '20px 20px 0', background: c.primaryLight }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.primary }}>{serviceName} Control</div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 4 }}>Professional elimination service</div>
          </div>
          <div style={{ fontSize: 48 }}>🐛</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <div style={{ background: '#E6F4EA', color: c.success, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>★ 4.9 Rating</div>
          <div style={{ background: c.primaryLight, color: c.primary, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>2-4 Hours</div>
          <div style={{ background: '#FEF9E7', color: '#B98900', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Rp. 180.000</div>
        </div>

        {termiteSteps.map((step, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: c.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{step.title}</div>
            </div>
            <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {step.points.map((p, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: c.textSecondary, lineHeight: 1.5 }}>
                  <span style={{ color: c.primary, flexShrink: 0 }}>•</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button onClick={onBook} style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Book Now
        </button>
      </div>
    </div>
  );
}
