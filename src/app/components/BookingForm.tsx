import { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Mail } from 'lucide-react';
import { c } from './ds';

const dates = [
  { label: 'Today', day: '16', active: false },
  { label: 'Tomorrow', day: '17', active: false },
  { label: 'Wed', day: '18', active: false },
  { label: 'Thu', day: '19', active: false },
  { label: 'Fri', day: '20', active: false },
];

const timeSlots = ['8:00–8:30am', '8:30–9:00am', '9:00–9:30am', '9:30–10:00am', '10:00–10:30am', '10:30–11:00am', '11:00–11:30am', '11:30–12:00pm'];

interface Props {
  serviceName: string;
  onBack: () => void;
  onConfirm: () => void;
}

function InputField({ icon, placeholder, value, onChange }: { icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary, display: 'flex' }}>{icon}</div>
      <input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', height: 52, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, paddingLeft: 44, paddingRight: 16, fontSize: 14, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
    </div>
  );
}

export function BookingForm({ serviceName, onBack, onConfirm }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Booking Service</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        <InputField icon={<User size={18} />} placeholder="Add Name" value={name} onChange={setName} />
        <InputField icon={<Phone size={18} />} placeholder="Add Phone Number" value={phone} onChange={setPhone} />
        <InputField icon={<MapPin size={18} />} placeholder="Add Address" value={address} onChange={setAddress} />
        <InputField icon={<Mail size={18} />} placeholder="Add E-mail" value={email} onChange={setEmail} />

        <div style={{ marginTop: 8, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>When do you want the service?</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {dates.map((d, i) => (
              <button key={i} onClick={() => setSelectedDate(i)}
                style={{ flexShrink: 0, minWidth: 60, padding: '8px 12px', borderRadius: 20, border: `1.5px solid ${selectedDate === i ? c.primary : c.border}`, background: selectedDate === i ? c.primary : '#fff', color: selectedDate === i ? '#fff' : c.textSecondary, cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 500 }}>{d.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{d.day}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Select Pick-up Time Slot</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {timeSlots.map((slot, i) => (
              <button key={i} onClick={() => setSelectedTime(i)}
                style={{ height: 40, borderRadius: 20, border: `1.5px solid ${selectedTime === i ? c.primary : c.border}`, background: selectedTime === i ? c.primary : '#fff', color: selectedTime === i ? '#fff' : c.textSecondary, fontSize: 13, fontWeight: selectedTime === i ? 600 : 400, cursor: 'pointer' }}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: c.textSecondary }}>{serviceName}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>Rp. 180.000</div>
        </div>
        <button onClick={onConfirm} style={{ flex: 1, maxWidth: 140, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Book
        </button>
      </div>
    </div>
  );
}
