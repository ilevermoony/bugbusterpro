import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { c, shadow } from './ds';
import { BottomNav } from './BottomNav';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// ─── Technician Management ────────────────────────────────────────────────────

const technicians = [
  { name: 'Ahmad Kurniawan', specialty: 'Termite & Rat Specialist', status: 'Tersedia' as const, jobs: 42 },
  { name: 'Rizky Mahendra', specialty: 'Mosquito & Bedbug Expert', status: 'Sibuk' as const, jobs: 38 },
  { name: 'Dani Susanto', specialty: 'General Pest Control', status: 'Tersedia' as const, jobs: 31 },
  { name: 'Eko Prasetyo', specialty: 'Flea & Aphid Specialist', status: 'Tidak Aktif' as const, jobs: 12 },
  { name: 'Ferdi Wijaya', specialty: 'Termite Inspector', status: 'Sibuk' as const, jobs: 27 },
];

type StatusType = 'Tersedia' | 'Sibuk' | 'Tidak Aktif';

function TechBadge({ status }: { status: StatusType }) {
  const s = { Tersedia: { bg: '#E6F4EA', color: c.success }, Sibuk: { bg: '#FEF9E7', color: '#B98900' }, 'Tidak Aktif': { bg: '#F3F4F6', color: c.textSecondary } };
  return <span style={{ background: s[status].bg, color: s[status].color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

export function TechnicianManagement({ onBack, onNav, activeNav }: { onBack: () => void; onNav: (k: string) => void; activeNav: string }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const filters = ['Semua', 'Tersedia', 'Sibuk', 'Tidak Aktif'];
  const filtered = technicians.filter(t =>
    (filter === 'Semua' || t.status === filter) &&
    t.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '48px 20px 16px', background: c.primary }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Manajemen Teknisi</div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
          <input placeholder="Cari teknisi..." value={query} onChange={e => setQuery(e.target.value)}
            style={{ width: '100%', height: 40, background: '#fff', border: 'none', borderRadius: 10, paddingLeft: 36, paddingRight: 12, fontSize: 13, color: c.textPrimary, outline: 'none', boxSizing: 'border-box' }} />
        </div>
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
        {filtered.map((t, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{t.name}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>{t.specialty}</div>
            </div>
            <TechBadge status={t.status} />
          </div>
        ))}
      </div>
      <BottomNav role="admin" active={activeNav} onSelect={onNav} />
    </div>
  );
}

// ─── Booking Monitor ──────────────────────────────────────────────────────────

const bookings = [
  { id: '#BK-2024-001', customer: 'Sarah Wijaya', service: 'Termite', date: '21 Feb 2024', tech: 'Ahmad K.', status: 'Selesai' as const },
  { id: '#BK-2024-002', customer: 'Budi Santoso', service: 'Mosquito', date: '21 Feb 2024', tech: 'Rizky M.', status: 'Proses' as const },
  { id: '#BK-2024-003', customer: 'Linda Chen', service: 'Rat', date: '22 Feb 2024', tech: 'Dani S.', status: 'Pending' as const },
  { id: '#BK-2024-004', customer: 'Agus Prasetyo', service: 'Bedbug', date: '22 Feb 2024', tech: 'Ahmad K.', status: 'Dibatalkan' as const },
  { id: '#BK-2024-005', customer: 'Dewi Rahayu', service: 'Flea', date: '23 Feb 2024', tech: 'Ferdi W.', status: 'Selesai' as const },
];

type BookingStatus = 'Pending' | 'Proses' | 'Selesai' | 'Dibatalkan';

function BookingBadge({ status }: { status: BookingStatus }) {
  const s: Record<BookingStatus, { bg: string; color: string }> = {
    Pending: { bg: '#FEF9E7', color: '#B98900' },
    Proses: { bg: c.primaryLight, color: c.primary },
    Selesai: { bg: '#E6F4EA', color: c.success },
    Dibatalkan: { bg: '#FCE8E6', color: c.danger },
  };
  return <span style={{ ...s[status], borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

export function BookingMonitor({ onNav, activeNav }: { onNav: (k: string) => void; activeNav: string }) {
  const [filter, setFilter] = useState('Semua');
  const filters = ['Semua', 'Pending', 'Proses', 'Selesai', 'Dibatalkan'];
  const filtered = bookings.filter(b => filter === 'Semua' || b.status === filter);
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '48px 20px 16px', background: c.primary }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Semua Pemesanan</div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 6, background: '#fff', borderBottom: `1px solid ${c.border}`, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${filter === f ? c.primary : c.border}`, background: filter === f ? c.primary : '#fff', color: filter === f ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((b, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: c.textSecondary }}>{b.id}</span>
              <BookingBadge status={b.status} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>{b.customer}</div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>{b.service} · {b.date}</div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>Teknisi: {b.tech}</div>
          </div>
        ))}
      </div>
      <BottomNav role="admin" active={activeNav} onSelect={onNav} />
    </div>
  );
}

// ─── Performance Report ────────────────────────────────────────────────────────

const weeklyData = [
  { day: 'Sen', v: 8 }, { day: 'Sel', v: 14 }, { day: 'Rab', v: 9 },
  { day: 'Kam', v: 17 }, { day: 'Jum', v: 13 }, { day: 'Sab', v: 20 }, { day: 'Min', v: 6 },
];

const topTechs = [
  { name: 'Ahmad Kurniawan', rating: 4.9, jobs: 42, medal: '🥇' },
  { name: 'Rizky Mahendra', rating: 4.8, jobs: 38, medal: '🥈' },
  { name: 'Dani Susanto', rating: 4.7, jobs: 31, medal: '🥉' },
];

export function PerformanceReport({ onNav, activeNav }: { onNav: (k: string) => void; activeNav: string }) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '48px 20px 16px', background: c.primary }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Laporan Kinerja</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        {/* Date range */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: shadow.card, padding: '10px 14px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: c.textSecondary }}>Periode</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.primary }}>15 Feb – 22 Feb 2024 ▾</span>
        </div>
        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total Layanan', value: '87', icon: '📋' },
            { label: 'Rata-rata Rating', value: '4.8 ★', icon: '⭐' },
            { label: 'Teknisi Terbaik', value: 'Ahmad K.', icon: '🏆' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: i === 2 ? 11 : 16, fontWeight: 700, color: c.primary }}>{m.value}</div>
              <div style={{ fontSize: 10, color: c.textSecondary, marginTop: 2, lineHeight: 1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 12 }}>Pemesanan per Minggu</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weeklyData} barSize={18}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: c.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: shadow.card, fontSize: 12 }} />
              <Bar dataKey="v" fill={c.primary} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Ranking */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}`, fontSize: 13, fontWeight: 600, color: c.textPrimary }}>Peringkat Teknisi</div>
          {topTechs.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < topTechs.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: 22 }}>{t.medal}</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{t.name}</div>
                <div style={{ fontSize: 11, color: c.textSecondary }}>{t.jobs} tugas selesai</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#B98900' }}>★ {t.rating}</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav role="admin" active={activeNav} onSelect={onNav} />
    </div>
  );
}
