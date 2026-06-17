import { useState } from 'react';
import { ArrowLeft, CheckCircle, Tag } from 'lucide-react';
import { c } from './ds';

const paymentMethods = [
  { label: 'PayTM', icon: '💳', desc: 'Linked: ****7823' },
  { label: 'G Pay', icon: '🔵', desc: 'Linked: ****1293' },
  { label: 'Visa/Debit', icon: '💳', desc: 'Card ending ****4242' },
  { label: 'Pay after service', icon: '💵', desc: 'Cash on completion' },
];

interface Props {
  serviceName: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function PaymentScreen({ serviceName, onBack, onSuccess }: Props) {
  const [selectedMethod, setSelectedMethod] = useState(3);
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Payment</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        {/* Order summary */}
        <div style={{ background: c.surface, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Order Summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: c.textSecondary }}>
            <span>Service Total</span><span>Rp. 180.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: c.textSecondary }}>
            <span>Convenience Charges</span><span>Rp. 2.000</span>
          </div>
          {applied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: c.success }}>
              <span>Discount (FIRST100)</span><span>−Rp. 18.000</span>
            </div>
          )}
          <div style={{ height: 1, background: c.border, marginBottom: 8 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: c.textPrimary }}>
            <span>Service Amount Payable</span><span>{applied ? 'Rp. 164.000' : 'Rp. 182.000'}</span>
          </div>
        </div>

        {/* Coupon */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Tag size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
            <input placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)}
              style={{ width: '100%', height: 48, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 36, paddingRight: 12, fontSize: 13, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button onClick={() => { if (coupon) setApplied(true); }}
            style={{ padding: '0 16px', height: 48, borderRadius: 10, background: 'none', border: `1.5px solid ${c.primary}`, color: c.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            APPLY
          </button>
        </div>

        {/* Payment methods */}
        <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Pay Using</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {paymentMethods.map((m, i) => (
            <div key={i} onClick={() => setSelectedMethod(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${selectedMethod === i ? c.primary : c.border}`, background: selectedMethod === i ? c.primaryLight : '#fff', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary }}>{m.label}</div>
                <div style={{ fontSize: 12, color: c.textSecondary }}>{m.desc}</div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${selectedMethod === i ? c.primary : c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selectedMethod === i && <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.primary }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: c.textSecondary }}>{serviceName}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>{applied ? 'Rp. 164.000' : 'Rp. 182.000'}</div>
        </div>
        <button onClick={onSuccess} style={{ flex: 1, maxWidth: 140, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Pay
        </button>
      </div>
    </div>
  );
}

export function PaymentSuccess({ onHome }: { onHome: () => void }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <CheckCircle size={52} color="#fff" strokeWidth={2} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: c.primary, marginBottom: 12 }}>Order was placed Successfully!</div>
      <div style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.6, maxWidth: 280, marginBottom: 32 }}>
        Your pest control service has been booked. A technician will contact you within 24 hours to confirm your appointment.
      </div>
      <button onClick={onHome} style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );
}
