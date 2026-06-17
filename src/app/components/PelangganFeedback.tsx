import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { c } from './ds';

const quickTags = ['Teknisi Ramah', 'Hasil Memuaskan', 'Tepat Waktu', 'Harga Sesuai', 'Komunikatif'];

interface Props { onBack: () => void; onKirim: () => void; }

export function PelangganFeedback({ onBack, onKirim }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [komentar, setKomentar] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const disp = hovered || rating;
  const toggle = (t: string) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: c.textPrimary }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Berikan Ulasan</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        {/* Ringkasan layanan */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🐛</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Pengendalian Rayap</div>
            <div style={{ fontSize: 12, color: c.textSecondary }}>21 Feb 2024 · Ahmad Kurniawan</div>
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 600, color: c.textPrimary, marginBottom: 16 }}>Bagaimana pengalaman Anda?</div>

        {/* Rating bintang */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setRating(i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                <Star size={38} fill={i <= disp ? c.warning : 'none'} color={i <= disp ? c.warning : c.border} strokeWidth={1.5} />
              </button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: c.textSecondary }}>
            {rating > 0 ? `${rating}.0 / 5.0 · ${['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Sangat Bagus'][rating]}` : 'Pilih rating Anda'}
          </div>
        </div>

        {/* Komentar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Komentar</div>
          <textarea placeholder="Ceritakan pengalaman Anda..." value={komentar} onChange={e => setKomentar(e.target.value)}
            style={{ width: '100%', minHeight: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 14, fontSize: 14, color: c.textPrimary, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.5 }} />
        </div>

        {/* Tag */}
        <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 10 }}>Tag Cepat</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {quickTags.map(t => {
            const sel = tags.includes(t);
            return (
              <button key={t} onClick={() => toggle(t)}
                style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${sel ? c.primary : c.border}`, background: sel ? c.primary : '#fff', color: sel ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button onClick={() => { if (rating > 0) onKirim(); }}
          style={{ width: '100%', height: 52, borderRadius: 12, background: rating > 0 ? c.primary : c.border, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: rating > 0 ? 'pointer' : 'default' }}>
          Kirim Ulasan
        </button>
      </div>
    </div>
  );
}

export function FeedbackBerhasil({ onHome }: { onHome: () => void }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🌟</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: c.primary, marginBottom: 10 }}>Terima Kasih!</div>
      <div style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.6, maxWidth: 280, marginBottom: 24 }}>
        Ulasan Anda membantu kami terus meningkatkan kualitas layanan.
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
        {[1,2,3,4,5].map(i => <Star key={i} size={28} fill={c.warning} color={c.warning} />)}
      </div>
      <div style={{ background: '#E6F4EA', borderRadius: 12, padding: '10px 16px', marginBottom: 24, fontSize: 13, color: c.success, fontWeight: 600 }}>
        ✅ Status pesanan berubah menjadi "Selesai"
      </div>
      <button onClick={onHome} style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
        Kembali ke Beranda
      </button>
    </div>
  );
}
