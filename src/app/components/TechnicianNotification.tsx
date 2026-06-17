import { Bell, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { c, shadow } from './ds';

interface Props {
  onAccept: () => void;
  onReject: () => void;
}

export function TechnicianNotification({ onAccept, onReject }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>
      {/* Push notification banner preview */}
      <div style={{ background: '#fff', margin: '0 0 0 0', borderBottom: `1px solid ${c.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Bell size={16} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: c.textPrimary }}>BugBuster Pro</div>
          <div style={{ fontSize: 11, color: c.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Tugas baru dari Alexander — Termites Service, 09:00</div>
        </div>
        <div style={{ fontSize: 10, color: c.textSecondary, flexShrink: 0 }}>now</div>
      </div>

      {/* Orange notification banner */}
      <div style={{ background: c.accent, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Bell size={22} color="#fff" />
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Tugas Baru Diterima!</span>
      </div>

      <div style={{ flex: 1, padding: '16px 20px 20px' }}>
        {/* Task detail card */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>Alexander Wirawan</div>
          <div style={{ fontSize: 13, color: c.textSecondary, marginBottom: 16 }}>Termites Service</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Calendar size={16} color={c.primary} />
              <span style={{ fontSize: 13, color: c.textPrimary }}>Selasa, 21 Feb 2024</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock size={16} color={c.primary} />
              <span style={{ fontSize: 13, color: c.textPrimary }}>09:00 – 09:30</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <MapPin size={16} color={c.primary} />
              <span style={{ fontSize: 13, color: c.textPrimary }}>Jl. Sudirman No. 42, Jakarta Pusat</span>
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: c.primaryLight, color: c.primary, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Jenis Hama: Rayap</span>
            <span style={{ background: '#FFF4EF', color: c.accent, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Prioritas Tinggi</span>
          </div>
        </div>

        {/* Customer location card */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 14, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>Jarak dari lokasi kamu</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary }}>3.2 km · ~12 menit</div>
          </div>
          <ChevronRight size={18} color={c.textSecondary} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onAccept}
            style={{ width: '100%', height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            Terima Tugas
          </button>
          <button onClick={onReject}
            style={{ width: '100%', height: 52, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Tolak Tugas
          </button>
        </div>
      </div>
    </div>
  );
}
