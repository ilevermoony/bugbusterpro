import { c } from './ds';

interface Props {
  variant: 'light' | 'dark';
  onNext: () => void;
}

function BugBusterLogo({ dark }: { dark?: boolean }) {
  return (
    <div style={{ width: 96, height: 96, borderRadius: '50%', background: dark ? '#fff' : c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(26,115,232,0.25)' }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        {/* Shield */}
        <path d="M26 4L8 12V26C8 36.5 16 45.5 26 48C36 45.5 44 36.5 44 26V12L26 4Z" fill={dark ? c.primary : '#fff'} stroke={dark ? c.primaryDark : 'rgba(255,255,255,0.3)'} strokeWidth="1.5" />
        {/* Bug body */}
        <ellipse cx="26" cy="27" rx="7" ry="9" fill={dark ? c.primaryLight : c.primaryLight} stroke={dark ? c.primary : c.primary} strokeWidth="1.5" />
        {/* Bug head */}
        <circle cx="26" cy="18" r="4" fill={dark ? c.primaryLight : c.primaryLight} stroke={dark ? c.primary : c.primary} strokeWidth="1.5" />
        {/* Antennae */}
        <line x1="24" y1="15" x2="21" y2="11" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="15" x2="31" y2="11" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        {/* Legs */}
        <line x1="19" y1="24" x2="14" y2="21" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="27" x2="14" y2="27" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="30" x2="14" y2="33" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="33" y1="24" x2="38" y2="21" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="33" y1="27" x2="38" y2="27" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="33" y1="30" x2="38" y2="33" stroke={dark ? c.primary : c.primary} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function SplashScreen({ variant, onNext }: Props) {
  const isDark = variant === 'dark';
  return (
    <div
      onClick={onNext}
      style={{ width: '100%', height: '100%', background: isDark ? c.primary : '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, cursor: 'pointer', userSelect: 'none' }}
    >
      <BugBusterLogo dark={isDark} />
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: isDark ? '#fff' : c.textPrimary, letterSpacing: '-0.3px' }}>BugBuster Pro</div>
        <div style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.75)' : c.textSecondary, marginTop: 6 }}>Your Trusted Pest Control Partner</div>
      </div>
      <div style={{ position: 'absolute', bottom: 48, fontSize: 12, color: isDark ? 'rgba(255,255,255,0.5)' : c.textSecondary }}>Tap to continue</div>
    </div>
  );
}
