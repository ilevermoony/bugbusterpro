import { useState } from 'react';
import { ArrowLeft, ChevronRight, Phone, CheckCircle, Circle, Clock } from 'lucide-react';
import { c, shadow } from './ds';
import { BottomNav } from './BottomNav';

const historyItems = [
  { id: 1, service: 'Termites Service', date: '21 Feb 2024', time: '09:00–09:30', tech: 'Ahmad Kurniawan', status: 'Selesai' as const },
  { id: 2, service: 'Mosquito Service', date: '15 Feb 2024', time: '10:00–10:30', tech: 'Rizky Mahendra', status: 'Proses' as const },
  { id: 3, service: 'Rat Control', date: '10 Feb 2024', time: '14:00–14:30', tech: 'Dani Susanto', status: 'Selesai' as const },
  { id: 4, service: 'Bedbug Elimination', date: '03 Feb 2024', time: '08:30–09:00', tech: 'Ferdi Wijaya', status: 'Dibatalkan' as const },
];

type HStatus = 'Proses' | 'Selesai' | 'Dibatalkan';

function StatusBadge({ status }: { status: HStatus }) {
  const s: Record<HStatus, { bg: string; color: string }> = {
    Proses: { bg: '#FEF9E7', color: '#B98900' },
    Selesai: { bg: '#E6F4EA', color: c.success },
    Dibatalkan: { bg: '#FCE8E6', color: c.danger },
  };
  return <span style={{ background: s[status].bg, color: s[status].color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

// Tracking steps
type StepState = 'done' | 'active' | 'pending';
const trackingSteps: { label: string; state: StepState }[] = [
  { label: 'Pemesanan Dikonfirmasi', state: 'done' },
  { label: 'Teknisi Ditetapkan', state: 'done' },
  { label: 'Teknisi dalam Perjalanan', state: 'active' },
  { label: 'Layanan Berlangsung', state: 'pending' },
  { label: 'Selesai', state: 'pending' },
];

interface HistoryProps {
  onNav: (k: string) => void;
  activeNav: string;
  onDetail: () => void;
}

export function BookingHistoryScreen({ onNav, activeNav, onDetail }: HistoryProps) {
  const [filter, setFilter] = useState('Semua');
  const filters = ['Semua', 'Aktif', 'Selesai', 'Dibatalkan'];
  const filtered = historyItems.filter(b =>
    filter === 'Semua' ||
    (filter === 'Aktif' && b.status === 'Proses') ||
    (filter === 'Selesai' && b.status === 'Selesai') ||
    (filter === 'Dibatalkan' && b.status === 'Dibatalkan')
  );
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '48px 20px 16px', background: c.primary }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Riwayat Pemesanan</div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8, background: '#fff', borderBottom: `1px solid ${c.border}` }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${filter === f ? c.primary : c.border}`, background: filter === f ? c.primary : '#fff', color: filter === f ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((b) => (
          <div key={b.id} onClick={onDetail} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary, marginBottom: 3 }}>{b.service}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>{b.date} · {b.time}</div>
              <div style={{ fontSize: 12, color: c.textSecondary }}>Teknisi: {b.tech}</div>
              <div style={{ marginTop: 8 }}><StatusBadge status={b.status} /></div>
            </div>
            <ChevronRight size={16} color={c.textSecondary} />
          </div>
        ))}
      </div>
      <BottomNav role="customer" active={activeNav} onSelect={onNav} />
    </div>
  );
}

interface DetailProps {
  onBack: () => void;
}

export function BookingDetailTracking({ onBack }: DetailProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Pemesanan</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 24px' }}>
        {/* Summary card */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, marginBottom: 24 }}>
          {[
            { label: 'Layanan', value: 'Termites Service' },
            { label: 'Tanggal', value: '21 Feb 2024' },
            { label: 'Waktu', value: '09:00 – 09:30' },
            { label: 'Alamat', value: 'Jl. Sudirman No. 42, Jakarta' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: 13, color: c.textSecondary }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Stepper */}
        <div style={{ fontSize: 14, fontWeight: 600, color: c.textPrimary, marginBottom: 16 }}>Status Pesanan</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 24 }}>
          {trackingSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
              {/* Line */}
              {i < trackingSteps.length - 1 && (
                <div style={{ position: 'absolute', left: 11, top: 24, width: 2, height: 32, background: step.state === 'done' ? c.success : c.border }} />
              )}
              <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                {step.state === 'done' ? (
                  <CheckCircle size={22} color={c.success} fill={c.success} strokeWidth={0} />
                ) : step.state === 'active' ? (
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: `3px solid ${c.primary}`, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.primary }} />
                  </div>
                ) : (
                  <Circle size={22} color={c.border} />
                )}
              </div>
              <div style={{ paddingBottom: 28 }}>
                <div style={{ fontSize: 13, fontWeight: step.state !== 'pending' ? 600 : 400, color: step.state === 'pending' ? c.textSecondary : c.textPrimary, marginTop: 2 }}>{step.label}</div>
                {step.state === 'active' && <div style={{ fontSize: 11, color: c.primary, marginTop: 2 }}>Sedang berlangsung...</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Technician card */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Ahmad Kurniawan</div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>Termite & Rat Specialist</div>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
            <Phone size={18} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
