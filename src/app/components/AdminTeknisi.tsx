import { useState } from 'react';
import { Search, ArrowLeft, Plus, ChevronRight } from 'lucide-react';
import { c, shadow } from './ds';
import { AdminNav } from './AdminNav';
import { teknisiDummy, feedbackDummy, tugasTeknisi } from './mockData';

type StatusTeknisi = 'Tersedia' | 'Sibuk' | 'Tidak Aktif';

function StatusBadge({ status }: { status: StatusTeknisi }) {
  const s: Record<StatusTeknisi, { bg: string; color: string }> = {
    Tersedia: { bg: '#E6F4EA', color: c.success },
    Sibuk: { bg: '#FEF9E7', color: '#B98900' },
    'Tidak Aktif': { bg: '#F3F4F6', color: c.textSecondary },
  };
  return <span style={{ background: s[status].bg, color: s[status].color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

function DetailTeknisi({ id, onBack }: { id: string; onBack: () => void }) {
  const t = teknisiDummy.find(x => x.id === id)!;
  const feedback = feedbackDummy.filter(f => f.teknisi === t.nama);
  const tugas = tugasTeknisi.filter(tu => true); // show all in demo

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: '#fff', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Teknisi</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 24px' }}>
        {/* Header */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: shadow.card, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 10px' }}>👤</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>{t.nama}</div>
          <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>{t.spesialisasi}</div>
          <div style={{ marginTop: 8 }}><StatusBadge status={t.status} /></div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14 }}>
            {[{ v: t.totalTugas, l: 'Total Tugas' }, { v: t.tugasAktif, l: 'Aktif' }, { v: `${t.rating}★`, l: 'Rating' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: c.primary }}>{s.v}</div>
                <div style={{ fontSize: 10, color: c.textSecondary }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal */}
        <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 8 }}>Jadwal Kerja</div>
        {tugas.slice(0, 2).map((tu, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, boxShadow: shadow.card }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{tu.pelanggan} · {tu.jenisHama}</div>
            <div style={{ fontSize: 11, color: c.textSecondary }}>{tu.tanggal} · {tu.waktu}</div>
          </div>
        ))}

        {/* Feedback */}
        <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginTop: 16, marginBottom: 8 }}>Feedback Pelanggan</div>
        {feedback.length === 0 && <div style={{ fontSize: 12, color: c.textSecondary }}>Belum ada feedback.</div>}
        {feedback.map((f, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, boxShadow: shadow.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{f.pelanggan}</span>
              <span style={{ color: c.warning }}>{'★'.repeat(f.rating)}</span>
            </div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>{f.komentar}</div>
          </div>
        ))}

        {/* Aksi */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Edit Data Teknisi
          </button>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: '#fff', border: `1.5px solid ${c.danger}`, color: c.danger, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Nonaktifkan Teknisi
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props { onNav: (k: string) => void; activeNav: string; }

export function AdminTeknisi({ onNav, activeNav }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [detail, setDetail] = useState<string | null>(null);
  const filters = ['Semua', 'Tersedia', 'Sibuk', 'Tidak Aktif'];

  if (detail) return <DetailTeknisi id={detail} onBack={() => setDetail(null)} />;

  const displayed = teknisiDummy.filter(t =>
    (filter === 'Semua' || t.status === filter) &&
    t.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.textPrimary, padding: '16px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Manajemen Teknisi</div>
          <button style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={18} color="#fff" />
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.textSecondary }} />
          <input placeholder="Cari teknisi..." value={query} onChange={e => setQuery(e.target.value)}
            style={{ width: '100%', height: 40, background: '#fff', border: 'none', borderRadius: 10, paddingLeft: 36, paddingRight: 12, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
      </div>
      <div style={{ padding: '10px 20px', display: 'flex', gap: 8, background: '#fff', borderBottom: `1px solid ${c.border}`, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${filter === f ? c.textPrimary : c.border}`, background: filter === f ? c.textPrimary : '#fff', color: filter === f ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {displayed.map(t => (
          <div key={t.id} onClick={() => setDetail(t.id)}
            style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{t.nama}</div>
              <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 4 }}>{t.spesialisasi} · {t.tugasAktif} tugas aktif</div>
              <StatusBadge status={t.status} />
            </div>
            <ChevronRight size={16} color={c.textSecondary} />
          </div>
        ))}
      </div>
      <AdminNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
