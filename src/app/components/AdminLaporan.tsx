import { useState } from 'react';
import { c, shadow } from './ds';
import { AdminNav } from './AdminNav';
import { teknisiDummy, pesananDummy, feedbackDummy, inventarisDummy, permintaanPeralatanDummy } from './mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { hari: 'Sen', v: 8 }, { hari: 'Sel', v: 14 }, { hari: 'Rab', v: 9 },
  { hari: 'Kam', v: 17 }, { hari: 'Jum', v: 13 }, { hari: 'Sab', v: 20 }, { hari: 'Min', v: 6 },
];

type Tab = 'kinerja' | 'pemesanan' | 'feedback' | 'inventaris';

interface Props { onNav: (k: string) => void; activeNav: string; }

export function AdminLaporan({ onNav, activeNav }: Props) {
  const [tab, setTab] = useState<Tab>('kinerja');
  const [permintaan, setPermintaan] = useState(permintaanPeralatanDummy.map(p => ({ ...p })));

  const setujui = (id: string) => setPermintaan(prev => prev.map(p => p.id === id ? { ...p, status: 'Disetujui' as const } : p));
  const tolak = (id: string) => setPermintaan(prev => prev.map(p => p.id === id ? { ...p, status: 'Ditolak' as const } : p));

  const tabs: { key: Tab; label: string }[] = [
    { key: 'kinerja',    label: 'Kinerja' },
    { key: 'pemesanan',  label: 'Pesanan' },
    { key: 'feedback',   label: 'Feedback' },
    { key: 'inventaris', label: 'Inventaris' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.textPrimary, padding: '16px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 14 }}>Laporan</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ flex: 1, height: 38, background: 'none', border: 'none', borderBottom: tab === t.key ? '3px solid #fff' : '3px solid transparent', color: tab === t.key ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 80px' }}>
        {/* ── Laporan Kinerja ── */}
        {tab === 'kinerja' && (
          <>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: shadow.card, padding: 16, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 12 }}>Pemesanan per Minggu</div>
              <ResponsiveContainer width="100%" height={130}>
                <BarChart data={chartData} barSize={16}>
                  <XAxis dataKey="hari" tick={{ fontSize: 10, fill: c.textSecondary }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11 }} />
                  <Bar dataKey="v" fill={c.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Kinerja Teknisi</div>
            {teknisiDummy.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: shadow.card, padding: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{t.nama}</div>
                  <div style={{ fontSize: 11, color: c.textSecondary }}>{t.totalTugas} tugas · {t.tugasAktif} aktif</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#B98900' }}>★ {t.rating}</div>
              </div>
            ))}
          </>
        )}

        {/* ── Laporan Pemesanan ── */}
        {tab === 'pemesanan' && (
          <>
            {(['Menunggu Konfirmasi', 'Dijadwalkan', 'Sedang Berlangsung', 'Selesai'] as const).map(status => {
              const count = status === 'Selesai' ? 1 : status === 'Menunggu Konfirmasi' ? 0 : 1;
              return (
                <div key={status} style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', marginBottom: 10, boxShadow: shadow.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: c.textPrimary }}>{status}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: c.primary }}>{count}</span>
                </div>
              );
            })}
            <div style={{ marginTop: 8 }}>
              {pesananDummy.map((p, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, boxShadow: shadow.card }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 2 }}>{p.nomorPesanan} · {p.pelanggan}</div>
                  <div style={{ fontSize: 11, color: c.textSecondary }}>{p.jenisHama} · {p.tanggal}</div>
                  <div style={{ fontSize: 11, color: c.textSecondary }}>Teknisi: {p.teknisi}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Laporan Feedback ── */}
        {tab === 'feedback' && (
          <>
            <div style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, marginBottom: 14, display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: c.primary }}>4.8</div>
                <div style={{ fontSize: 10, color: c.textSecondary }}>Rata-rata Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: c.success }}>{feedbackDummy.length}</div>
                <div style={{ fontSize: 10, color: c.textSecondary }}>Total Ulasan</div>
              </div>
            </div>
            {feedbackDummy.map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, boxShadow: shadow.card }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{f.pelanggan}</div>
                    <div style={{ fontSize: 11, color: c.textSecondary }}>{f.layanan} · {f.teknisi}</div>
                  </div>
                  <div style={{ color: c.warning }}>{'★'.repeat(f.rating)}</div>
                </div>
                <div style={{ fontSize: 12, color: c.textSecondary, fontStyle: 'italic' }}>"{f.komentar}"</div>
              </div>
            ))}
          </>
        )}

        {/* ── Laporan Inventaris ── */}
        {tab === 'inventaris' && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Stok Inventaris</div>
            {inventarisDummy.map((inv, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 8, boxShadow: shadow.card }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{inv.nama}</div>
                  <span style={{ background: inv.stok < 5 ? '#FCE8E6' : '#E6F4EA', color: inv.stok < 5 ? c.danger : c.success, borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>
                    {inv.stok} {inv.satuan}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: c.textSecondary }}>Digunakan: {inv.digunakan} {inv.satuan}</div>
              </div>
            ))}

            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginTop: 16, marginBottom: 10 }}>Permintaan Peralatan</div>
            {permintaan.map((p, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, boxShadow: shadow.card }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary }}>{p.alat}</div>
                    <div style={{ fontSize: 11, color: c.textSecondary }}>{p.teknisi} · {p.jumlah} unit · {p.prioritas}</div>
                    <div style={{ fontSize: 11, color: c.textSecondary, marginTop: 2 }}>{p.alasan}</div>
                  </div>
                  <span style={{ background: p.status === 'Menunggu' ? '#FEF9E7' : p.status === 'Disetujui' ? '#E6F4EA' : '#FCE8E6', color: p.status === 'Menunggu' ? '#B98900' : p.status === 'Disetujui' ? c.success : c.danger, borderRadius: 20, padding: '3px 8px', fontSize: 11, fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
                    {p.status}
                  </span>
                </div>
                {p.status === 'Menunggu' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button onClick={() => setujui(p.id)}
                      style={{ flex: 1, height: 36, borderRadius: 8, background: c.primary, color: '#fff', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      Setujui
                    </button>
                    <button onClick={() => tolak(p.id)}
                      style={{ flex: 1, height: 36, borderRadius: 8, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                      Tolak
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <AdminNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
