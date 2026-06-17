import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { Role } from './components/mockData';
import { katalogLayanan } from './components/mockData';

// Pelanggan
import { PelangganBeranda } from './components/PelangganBeranda';
import { PelangganLayanan } from './components/PelangganLayanan';
import { FormPemesanan } from './components/FormPemesanan';
import { PembayaranScreen, BuktiPembayaran } from './components/PembayaranScreen';
import { PelangganRiwayat } from './components/PelangganRiwayat';
import { PelangganFeedback, FeedbackBerhasil } from './components/PelangganFeedback';
import { PelangganProfil } from './components/PelangganProfil';

// Teknisi
import { TeknisiBeranda } from './components/TeknisiBeranda';
import { TeknisiJadwal } from './components/TeknisiJadwal';
import { TeknisiLaporanPage, LaporanPekerjaan, PermintaanPeralatan } from './components/TeknisiLaporan';
import { TeknisiProfil } from './components/TeknisiProfil';

// Admin
import { AdminDashboardNew } from './components/AdminDashboardNew';
import { AdminTeknisi } from './components/AdminTeknisi';
import { AdminLaporan } from './components/AdminLaporan';
import { AdminProfil } from './components/AdminProfil';

type Screen =
  | 'splash1' | 'splash2' | 'login'
  // Pelanggan
  | 'p-beranda' | 'p-layanan' | 'p-pesan' | 'p-bayar' | 'p-bukti'
  | 'p-riwayat' | 'p-feedback' | 'p-fb-ok' | 'p-profil'
  // Teknisi
  | 't-beranda' | 't-jadwal' | 't-laporan' | 't-laporan-form' | 't-permintaan' | 't-profil'
  // Admin
  | 'a-dashboard' | 'a-teknisi' | 'a-laporan' | 'a-profil';

const blueHeaderScreens: Screen[] = ['p-beranda', 'p-layanan', 'p-riwayat'];
const accentHeaderScreens: Screen[] = ['t-beranda', 't-jadwal', 't-laporan'];
const darkHeaderScreens: Screen[] = ['splash2', 'a-dashboard', 'a-teknisi', 'a-laporan', 'a-profil'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash1');
  const [role, setRole] = useState<Role>('pelanggan');
  const [nama, setNama] = useState('');
  const [navKey, setNavKey] = useState('beranda');
  const [selectedLayanan, setSelectedLayanan] = useState(katalogLayanan[0]);

  const go = (s: Screen) => setScreen(s);

  // ── Pelanggan nav ──────────────────────────────────────────────────────────
  const pelangganNav = (k: string) => {
    setNavKey(k);
    go(k === 'beranda' ? 'p-beranda' : k === 'layanan' ? 'p-layanan' : k === 'riwayat' ? 'p-riwayat' : 'p-profil');
  };

  // ── Teknisi nav ────────────────────────────────────────────────────────────
  const teknisiNav = (k: string) => {
    setNavKey(k);
    go(k === 'beranda' ? 't-beranda' : k === 'jadwal' ? 't-jadwal' : k === 'laporan' ? 't-laporan' : 't-profil');
  };

  // ── Admin nav ──────────────────────────────────────────────────────────────
  const adminNav = (k: string) => {
    setNavKey(k);
    go(k === 'dashboard' ? 'a-dashboard' : k === 'teknisi' ? 'a-teknisi' : k === 'laporan' ? 'a-laporan' : 'a-profil');
  };

  const handleLogin = (r: Role, n: string) => {
    setRole(r);
    setNama(n);
    setNavKey(r === 'admin' ? 'dashboard' : 'beranda');
    go(r === 'pelanggan' ? 'p-beranda' : r === 'teknisi' ? 't-beranda' : 'a-dashboard');
  };

  const logout = () => { go('login'); setNavKey('beranda'); };

  // ── Status bar color ───────────────────────────────────────────────────────
  const statusBg =
    darkHeaderScreens.includes(screen) ? '#1A1A2E' :
    accentHeaderScreens.includes(screen) ? '#FF6B2B' :
    blueHeaderScreens.includes(screen) ? '#1A73E8' :
    screen === 'splash2' ? '#1A73E8' : '#fff';
  const statusColor = statusBg !== '#fff' ? '#fff' : '#1A1A2E';

  function renderScreen() {
    switch (screen) {
      case 'splash1': return <SplashScreen variant="light" onNext={() => go('splash2')} />;
      case 'splash2': return <SplashScreen variant="dark" onNext={() => go('login')} />;
      case 'login':   return <LoginScreen onLogin={handleLogin} />;

      // ── Pelanggan ──────────────────────────────────────────────────────────
      case 'p-beranda':
        return <PelangganBeranda nama={nama} activeNav={navKey} onNav={pelangganNav} onPesan={() => go('p-layanan')} onDetailPesanan={() => go('p-riwayat')} />;
      case 'p-layanan':
        return <PelangganLayanan activeNav={navKey} onNav={pelangganNav} onPesan={l => { setSelectedLayanan(l); go('p-pesan'); }} />;
      case 'p-pesan':
        return <FormPemesanan layananAwal={selectedLayanan} namaPelanggan={nama} onBack={() => go('p-layanan')} onSelesai={() => go('p-bayar')} />;
      case 'p-bayar':
        return <PembayaranScreen harga={selectedLayanan.harga} layanan={selectedLayanan.nama} onBack={() => go('p-pesan')} onBayar={() => go('p-bukti')} />;
      case 'p-bukti':
        return <BuktiPembayaran nomorPesanan="BB-2024-0058" onHome={() => { setNavKey('beranda'); go('p-beranda'); }} />;
      case 'p-riwayat':
        return <PelangganRiwayat activeNav={navKey} onNav={pelangganNav} onFeedback={() => go('p-feedback')} />;
      case 'p-feedback':
        return <PelangganFeedback onBack={() => go('p-riwayat')} onKirim={() => go('p-fb-ok')} />;
      case 'p-fb-ok':
        return <FeedbackBerhasil onHome={() => { setNavKey('beranda'); go('p-beranda'); }} />;
      case 'p-profil':
        return <PelangganProfil nama={nama} activeNav={navKey} onNav={pelangganNav} onLogout={logout} />;

      // ── Teknisi ────────────────────────────────────────────────────────────
      case 't-beranda':
        return <TeknisiBeranda nama={nama} activeNav={navKey} onNav={teknisiNav} onDetailTugas={() => go('t-jadwal')} />;
      case 't-jadwal':
        return <TeknisiJadwal activeNav={navKey} onNav={teknisiNav} onLaporan={() => go('t-laporan-form')} />;
      case 't-laporan':
        return <TeknisiLaporanPage activeNav={navKey} onNav={teknisiNav} onBuatLaporan={() => go('t-laporan-form')} onPermintaan={() => go('t-permintaan')} />;
      case 't-laporan-form':
        return <LaporanPekerjaan onBack={() => go('t-laporan')} />;
      case 't-permintaan':
        return <PermintaanPeralatan onBack={() => go('t-laporan')} />;
      case 't-profil':
        return <TeknisiProfil nama={nama} activeNav={navKey} onNav={teknisiNav} onLogout={logout} />;

      // ── Admin ──────────────────────────────────────────────────────────────
      case 'a-dashboard':
        return <AdminDashboardNew activeNav={navKey} onNav={adminNav} />;
      case 'a-teknisi':
        return <AdminTeknisi activeNav={navKey} onNav={adminNav} />;
      case 'a-laporan':
        return <AdminLaporan activeNav={navKey} onNav={adminNav} />;
      case 'a-profil':
        return <AdminProfil nama={nama} activeNav={navKey} onNav={adminNav} onLogout={logout} />;

      default: return null;
    }
  }

  // Quick-jump shortcuts for demo
  const jumps: { key: Screen; label: string; role?: Role }[] = [
    { key: 'splash1',    label: 'Splash' },
    { key: 'login',      label: 'Login' },
    { key: 'p-beranda',  label: 'Pelanggan', role: 'pelanggan' },
    { key: 't-beranda',  label: 'Teknisi', role: 'teknisi' },
    { key: 'a-dashboard', label: 'Admin', role: 'admin' },
  ];

  const demoNames: Record<string, string> = { pelanggan: 'Alexander Wirawan', teknisi: 'Ahmad Kurniawan', admin: 'Budi Admin' };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A73E8 0%, #0d4db5 50%, #1557B0 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: '24px 16px',
    }}>
      <div style={{ position: 'fixed', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

      {/* Phone frame */}
      <div style={{ width: 390, height: 844, borderRadius: 48, background: '#1A1A2E', padding: 10, boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', right: -3, top: 120, width: 3, height: 60, background: '#2a2a3e', borderRadius: '0 3px 3px 0' }} />
        <div style={{ position: 'absolute', left: -3, top: 100, width: 3, height: 36, background: '#2a2a3e', borderRadius: '3px 0 0 3px' }} />
        <div style={{ position: 'absolute', left: -3, top: 148, width: 3, height: 36, background: '#2a2a3e', borderRadius: '3px 0 0 3px' }} />
        <div style={{ position: 'absolute', left: -3, top: 196, width: 3, height: 60, background: '#2a2a3e', borderRadius: '3px 0 0 3px' }} />

        <div style={{ width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden', background: '#fff', position: 'relative' }}>
          {/* Status bar */}
          <div style={{ height: 44, background: statusBg, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, position: 'relative', zIndex: 10, transition: 'background 0.2s' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: statusColor }}>9:41</span>
            <div style={{ width: 120, height: 28, background: '#1A1A2E', borderRadius: 14, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6 }} />
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {[3, 4, 5, 6].map(h => <div key={h} style={{ width: 3, height: h, background: statusColor === '#fff' ? 'rgba(255,255,255,0.9)' : '#1A1A2E', borderRadius: 1 }} />)}
              </div>
              <span style={{ fontSize: 11, color: statusColor }}>■</span>
            </div>
          </div>
          <div style={{ height: 'calc(100% - 44px)', position: 'relative', overflow: 'hidden' }}>
            {renderScreen()}
          </div>
        </div>
      </div>

      {/* Quick-jump pills */}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(14px)', borderRadius: 24, padding: '8px 12px' }}>
        {jumps.map(j => (
          <button key={j.key} onClick={() => {
            if (j.role) {
              setRole(j.role);
              setNama(demoNames[j.role]);
              setNavKey(j.role === 'admin' ? 'dashboard' : 'beranda');
            }
            go(j.key);
          }}
            style={{ padding: '5px 12px', borderRadius: 16, background: screen === j.key ? '#fff' : 'transparent', color: screen === j.key ? '#1A73E8' : 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            {j.label}
          </button>
        ))}
      </div>
    </div>
  );
}
