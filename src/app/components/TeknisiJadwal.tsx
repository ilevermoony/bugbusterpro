import { useState } from 'react';
import { ArrowLeft, Phone, Upload, CheckCircle } from 'lucide-react';
import { c, shadow } from './ds';
import { TeknisiNav } from './TeknisiNav';
import { tugasTeknisi } from './mockData';

const statusStyle: Record<string, { bg: string; color: string }> = {
  'Dijadwalkan':        { bg: c.primaryLight, color: c.primary },
  'Teknisi Ditugaskan': { bg: '#EDE9FE', color: '#7C3AED' },
  'Sedang Berlangsung': { bg: '#FFF4EF', color: c.accent },
  'Menunggu Feedback':  { bg: '#FEF9E7', color: '#B98900' },
  'Selesai':            { bg: '#E6F4EA', color: c.success },
};

function Badge({ status }: { status: string }) {
  const s = statusStyle[status] ?? { bg: c.surface, color: c.textSecondary };
  return <span style={{ ...s, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>;
}

// Map next status transition
const nextStatus: Record<string, string | null> = {
  'Teknisi Ditugaskan': 'Sedang Berlangsung',
  'Dijadwalkan':        'Sedang Berlangsung',
  'Sedang Berlangsung': 'Menunggu Feedback',
  'Menunggu Feedback':  null,
  'Selesai':            null,
};

function DetailTugas({ tugasId, onBack, onLaporan }: { tugasId: string; onBack: () => void; onLaporan: (id: string) => void }) {
  const t = tugasTeknisi.find(x => x.id === tugasId)!;
  const [status, setStatus] = useState(t.status);
  const [fotoBefore, setFotoBefore] = useState(false);
  const [fotoAfter, setFotoAfter] = useState(false);

  const next = nextStatus[status];
  const canAdvance = status !== 'Sedang Berlangsung' || (fotoBefore && fotoAfter);

  const advance = () => {
    if (next && canAdvance) setStatus(next as any);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Detail Tugas</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 100px' }}>
        {/* Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary }}>{t.nomorPesanan}</div>
          <Badge status={status} />
        </div>

        {/* Info pelanggan */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Data Pelanggan</div>
          {[
            { l: 'Nama', v: t.pelanggan },
            { l: 'Telepon', v: t.telepon },
            { l: 'Jenis Hama', v: t.jenisHama },
            { l: 'Tanggal', v: t.tanggal },
            { l: 'Waktu', v: t.waktu },
            { l: 'Alamat', v: t.alamat },
            ...(t.catatan ? [{ l: 'Catatan', v: t.catatan }] : []),
          ].map((r, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: 12, color: c.textSecondary, width: 70, flexShrink: 0 }}>{r.l}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: c.textPrimary }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* Bukti pekerjaan (only when Sedang Berlangsung) */}
        {(status === 'Sedang Berlangsung') && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.textPrimary, marginBottom: 10 }}>Bukti Pekerjaan <span style={{ color: c.danger }}>*</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Foto Sebelum', done: fotoBefore, set: setFotoBefore },
                { label: 'Foto Sesudah', done: fotoAfter, set: setFotoAfter },
              ].map((f, i) => (
                <button key={i} onClick={() => f.set(true)}
                  style={{ height: 90, borderRadius: 12, border: `2px dashed ${f.done ? c.success : c.border}`, background: f.done ? '#E6F4EA' : c.surface, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
                  {f.done ? <CheckCircle size={24} color={c.success} /> : <Upload size={24} color={c.textSecondary} />}
                  <span style={{ fontSize: 12, color: f.done ? c.success : c.textSecondary, fontWeight: 600 }}>{f.label}</span>
                </button>
              ))}
            </div>
            {!fotoBefore && !fotoAfter && (
              <div style={{ fontSize: 11, color: c.danger, marginTop: 6 }}>⚠ Foto sebelum & sesudah wajib diunggah sebelum mengubah status</div>
            )}
          </div>
        )}

        {/* Kontak pelanggan */}
        <div style={{ background: c.surface, borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>Hubungi Pelanggan</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{t.telepon}</div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={18} color="#fff" />
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 20px 20px', background: '#fff', borderTop: `1px solid ${c.border}`, display: 'flex', gap: 10 }}>
        {status === 'Menunggu Feedback' || status === 'Selesai' ? (
          <button onClick={() => onLaporan(t.id)}
            style={{ flex: 1, height: 50, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Isi Laporan Pekerjaan
          </button>
        ) : next ? (
          <button onClick={advance} disabled={!canAdvance}
            style={{ flex: 1, height: 50, borderRadius: 12, background: canAdvance ? c.accent : c.border, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: canAdvance ? 'pointer' : 'default' }}>
            → {next}
          </button>
        ) : null}
      </div>
    </div>
  );
}

interface Props { onNav: (k: string) => void; activeNav: string; onLaporan: (id: string) => void; }

export function TeknisiJadwal({ onNav, activeNav, onLaporan }: Props) {
  const [detail, setDetail] = useState<string | null>(null);

  if (detail) return <DetailTugas tugasId={detail} onBack={() => setDetail(null)} onLaporan={id => { setDetail(null); onLaporan(id); }} />;

  return (
    <div style={{ width: '100%', height: '100%', background: c.surface, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: c.accent, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Jadwal Tugas</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>{tugasTeknisi.length} tugas ditugaskan</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tugasTeknisi.map(t => (
          <div key={t.id} onClick={() => setDetail(t.id)}
            style={{ background: '#fff', borderRadius: 14, boxShadow: shadow.card, padding: 16, cursor: 'pointer', borderLeft: `4px solid ${statusStyle[t.status]?.color ?? c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>{t.pelanggan}</div>
              <Badge status={t.status} />
            </div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>🐛 {t.jenisHama}</div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginBottom: 2 }}>📅 {t.tanggal} · {t.waktu}</div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>📍 {t.alamat}</div>
          </div>
        ))}
      </div>
      <TeknisiNav active={activeNav} onSelect={onNav} />
    </div>
  );
}
