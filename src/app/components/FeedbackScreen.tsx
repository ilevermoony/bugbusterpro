import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { c } from './ds';

const quickTags = ['Teknisi Ramah', 'Hasil Memuaskan', 'Tepat Waktu', 'Harga Sesuai', 'Perlu Perbaikan'];

interface FeedbackProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function FeedbackScreen({ onBack, onSubmit }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const displayRating = hovered || rating;

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 20px 16px', borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.textPrimary, display: 'flex', padding: 0 }}><ArrowLeft size={22} /></button>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary }}>Berikan Ulasan</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 100px' }}>
        {/* Service summary card */}
        <div style={{ background: c.surface, borderRadius: 14, padding: 14, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🐛</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.textPrimary }}>Termites Service</div>
            <div style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>Selasa, 21 Feb 2024</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
            <span style={{ fontSize: 12, color: c.textSecondary }}>Andikha V.</span>
          </div>
        </div>

        <div style={{ fontSize: 16, fontWeight: 600, color: c.textPrimary, marginBottom: 16 }}>Bagaimana pengalaman kamu?</div>

        {/* Star rating */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} onClick={() => setRating(i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                <Star size={36} fill={i <= displayRating ? c.warning : 'none'} color={i <= displayRating ? c.warning : c.border} strokeWidth={1.5} />
              </button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: c.textSecondary }}>
            {rating > 0 ? `${rating}.0 / 5.0 · ${['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Sempurna'][rating]}` : 'Pilih rating'}
          </div>
        </div>

        {/* Comment */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 8 }}>Komentar</div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Ceritakan pengalamanmu..."
            style={{ width: '100%', minHeight: 100, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 14, fontSize: 14, color: c.textPrimary, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.5 }} />
        </div>

        {/* Quick tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {quickTags.map(tag => {
            const sel = selectedTags.includes(tag);
            return (
              <button key={tag} onClick={() => toggleTag(tag)}
                style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${sel ? c.primary : c.border}`, background: sel ? c.primary : '#fff', color: sel ? '#fff' : c.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: '#fff', borderTop: `1px solid ${c.border}` }}>
        <button onClick={onSubmit}
          style={{ width: '100%', height: 52, borderRadius: 12, background: rating > 0 ? c.primary : c.border, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: rating > 0 ? 'pointer' : 'default' }}>
          Kirim Ulasan
        </button>
      </div>
    </div>
  );
}

export function FeedbackSuccess({ onHome }: { onHome: () => void }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🌟</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: c.primary, marginBottom: 10 }}>Terima Kasih!</div>
      <div style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.6, maxWidth: 280, marginBottom: 24 }}>
        Ulasan kamu membantu kami terus berkembang.
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} size={28} fill={c.warning} color={c.warning} />
        ))}
      </div>
      <button onClick={onHome}
        style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 12, background: c.primary, color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
        Kembali ke Beranda
      </button>
    </div>
  );
}
