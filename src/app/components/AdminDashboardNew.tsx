import { c, shadow } from './ds';
import { AdminNav } from './AdminNav';
import { pesananDummy, teknisiDummy } from './mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { hari: 'Sen', v: 8 }, { hari: 'Sel', v: 14 }, { hari: 'Rab', v: 9 },
  { hari: 'Kam', v: 17 }, { hari: 'Jum', v: 13 }, { hari: 'Sab', v: 20 }, { hari: 'Min', v: 6 },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  'Menunggu Konfirmasi': { bg: '#FEF9E7', color: '#B98900' },
  'Dijadwalkan':          { bg: c.primaryLight, color: c.primary },
  'Teknisi Ditugaskan':   { bg: '#EDE9FE', color: '#7C3AED' },
  'Sedang Berlangsung':   { bg: '#FFF4EF', color: c.accent },
  'Menunggu Feedback':    { bg: '#FEF9E7', color: '#B98900' },
  'Selesai':              { bg: '#E6F4EA', color: c.success },
};

function Badge({ status }: { status: string }) {
  const s = statusStyle[status] ?? { bg: c.surface, color: c.textSecondary };
  return <span style={{ ...s, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

interface Props { onNav: (k: string) => void; activeNav: string; }

export function AdminDashboardNew({ onNav, activeNav }: Props) {
  const totalPelanggan = 47;
  const totalTeknisi = teknisiDummy.length;
  const totalPesanan = 247;
  const aktif = pesananDummy.filter(p => p.status !== 'Selesai').length;
  const selesai = pesananDummy.filter(p => p.status === 'Selesai').length;

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.textPrimary, padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Selamat Pagi,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Admin Panel ⚙️</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        {/* Metrik utama */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Total Pelanggan', value: totalPelanggan, icon: '👥' },
            { label: 'Total Teknisi', value: totalTeknisi, icon: '👷' },
            { label: 'Total Pesanan', value: totalPesanan, icon: '📋' },
            { label: 'Pesanan Aktif', value: aktif, icon: '🔄' },
            { label: 'Selesai', value: selesai, icon: '✅' },
            { label: 'Rata-rata Rating', value: '4.8 ★', icon: '⭐' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: i === 5 ? 14 : 18, fontWeight: 700, color: c.primary }}>{m.value}</div>
              <div style={{ fontSize: 9, color: c.textSecondary, marginTop: 2, lineHeight: 1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 12 }}>Pemesanan Minggu Ini</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weeklyData} barSize={18}>
              <XAxis dataKey="hari" tick={{ fontSize: 11, fill: c.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: shadow.card, fontSize: 12 }} />
              <Bar dataKey="v" fill={c.primary} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pesanan terbaru */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}`, fontSize: 13, fontWeight: 700, color: c.textPrimary }}>Pesanan Terbaru</div>
          {pesananDummy.map((p, i) => (
            <div key={p.id} style={{ padding: '12px 16px', borderBottom: i < pesananDummy.length - 1 ? `1px solid ${c.border}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{p.pelanggan}</div>
                <div style={{ fontSize: 11, color: c.textSecondary }}>{p.jenisHama} · {p.teknisi}</div>
              </div>
              <Badge status={p.status} />
            </div>
          ))}
        </div>
      </div>

      <AdminNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
