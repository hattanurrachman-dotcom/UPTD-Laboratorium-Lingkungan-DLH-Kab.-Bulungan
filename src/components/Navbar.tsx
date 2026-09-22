import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  PlusCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  DownloadCloud,
  UserCog,
  FileCheck2,
  ChevronDown,
  Building2,
  BookOpen,
  Lock,
  LogOut,
  Radio
} from 'lucide-react';
import { AdminUser, SiteSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSubmissionModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenLocalhostGuide: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  currentUser: AdminUser | null;
  onOpenAdminLogin: () => void;
  onLogout: () => void;
  siteSettings?: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSubmissionModal,
  onOpenTrackingModal,
  onOpenLocalhostGuide,
  isAdminMode,
  setIsAdminMode,
  currentUser,
  onOpenAdminLogin,
  onLogout,
  siteSettings,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  const navItemClass = (tabName: string) => 
    `px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
      activeTab === tabName 
        ? 'text-teal-800 bg-teal-50 border-b-2 border-teal-600 font-semibold' 
        : 'text-slate-600 hover:text-teal-700 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      {/* Top Banner Pemerintah Kabupaten Bulungan & KAN */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-850 to-slate-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-200">PEMERINTAH KABUPATEN BULUNGAN</span>
            <span className="hidden md:inline text-teal-300">|</span>
            <span className="hidden md:inline text-teal-100">
              {siteSettings?.agencySub || 'Dinas Lingkungan Hidup'} — {siteSettings?.agencyName || 'UPTD Laboratorium Lingkungan'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-teal-100">
            <div className="flex items-center gap-1.5 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-600/40 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Akreditasi KAN: <strong className="text-white">{siteSettings?.kanAccreditationNumber || 'LP-1234-IDN'}</strong> ({siteSettings?.kanAccreditationStd || 'ISO/IEC 17025'})</span>
            </div>
            <a 
              href={`tel:${siteSettings?.phone || '055221155'}`} 
              className="hidden lg:flex items-center gap-1 text-teal-200 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span>Hotline: {siteSettings?.phone || '(0552) 21155'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Running Text Announcement Marquee (If active) */}
      {siteSettings?.announcementActive && siteSettings?.runningText && (
        <div className="bg-amber-400 text-slate-950 text-[11px] font-bold py-1 px-4 border-b border-amber-500 overflow-hidden flex items-center shadow-inner">
          <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-amber-600 font-mono uppercase tracking-wider text-[10px] text-amber-950">
            <Radio className="w-3 h-3 text-red-700 animate-pulse" />
            <span>PENGUMUMAN:</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap pl-3 w-full">
            <div className="inline-block animate-marquee">
              {siteSettings.runningText}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand with Official Emblems */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('beranda')}
          >
            {/* Logo Emblem Icon */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-sky-700 p-0.5 shadow-md flex items-center justify-center text-white">
              <div className="w-full h-full bg-teal-800 rounded-[10px] flex items-center justify-center">
                <FlaskConical className="w-7 h-7 text-amber-300 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-teal-950 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-xs">
                KAN
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-teal-700 uppercase">
                {siteSettings?.agencyName || 'UPTD LAB LINGKUNGAN HIDUP'}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                {siteSettings?.agencySub || 'DINAS LINGKUNGAN HIDUP'}
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                Kabupaten Bulungan, Kalimantan Utara
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('beranda')} 
              className={navItemClass('beranda')}
            >
              Beranda
            </button>

            {/* Profil Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button 
                onClick={() => setActiveTab('profil')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'profil' ? 'text-teal-800 bg-teal-50 font-semibold' : 'text-slate-600 hover:text-teal-700'
                }`}
              >
                <span>Profil</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => { setActiveTab('profil'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>Visi, Misi & Sejarah</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('profil'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                  >
                    <UserCog className="w-4 h-4 text-teal-600" />
                    <span>Struktur Organisasi UPTD</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('profil'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Sertifikat & Ruang Lingkup KAN</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('profil'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                  >
                    <FlaskConical className="w-4 h-4 text-sky-600" />
                    <span>SDM & Fasilitas Instrumen</span>
                  </button>
                </div>
              )}
            </div>

            {/* Layanan & Tarif Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServiceDropdownOpen(true)}
              onMouseLeave={() => setServiceDropdownOpen(false)}
            >
              <button 
                onClick={() => setActiveTab('layanan_tarif')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                  activeTab === 'layanan_tarif' || activeTab === 'sop_alur' 
                    ? 'text-teal-800 bg-teal-50 font-semibold' 
                    : 'text-slate-600 hover:text-teal-700'
                }`}
              >
                <span>Layanan & Tarif</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {serviceDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => { setActiveTab('layanan_tarif'); setServiceDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-teal-600" />
                    <span>Daftar Parameter & Tarif Perda</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('sop_alur'); setServiceDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>Alur Pelayanan & Dokumen SOP</span>
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveTab('skm_pengaduan')} 
              className={navItemClass('skm_pengaduan')}
            >
              SKM & Aduan
            </button>

            <button 
              onClick={() => setActiveTab('berita')} 
              className={navItemClass('berita')}
            >
              Berita
            </button>

            <button 
              onClick={() => setActiveTab('kontak')} 
              className={navItemClass('kontak')}
            >
              Kontak
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenTrackingModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all shadow-2xs cursor-pointer"
              title="Lacak Progres Sampel / Unduh LHP"
            >
              <Search className="w-3.5 h-3.5 text-teal-600" />
              <span>Lacak Sampel</span>
            </button>

            <button
              onClick={onOpenSubmissionModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Daftar Sampel</span>
            </button>

            {/* Localhost / XAMPP ZIP Siap Pakai Button */}
            <button
              onClick={onOpenLocalhostGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-all cursor-pointer shadow-2xs group"
              title="Unduh Paket ZIP Siap Pakai untuk Localhost XAMPP (htdocs)"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">ZIP XAMPP</span>
            </button>

            {/* Admin Login / CMS Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 pl-1">
                <button
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                    isAdminMode 
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-400 font-bold' 
                      : 'bg-teal-900 hover:bg-teal-800 text-amber-300 border-teal-700'
                  }`}
                  title={isAdminMode ? 'Kembali ke Tampilan Publik' : 'Buka Dashboard Kelola Menu'}
                >
                  <UserCog className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden xl:inline">{isAdminMode ? 'Kembali ke Publik' : 'Kelola Semua Menu'}</span>
                  <span className="xl:hidden">Admin</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title={`Logout (${currentUser.name})`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-all cursor-pointer shadow-2xs"
                title="Login Petugas / Administrator untuk Mengedit Semua Menu"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Login Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onOpenTrackingModal}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg"
              title="Lacak"
            >
              <Search className="w-4 h-4 text-teal-700" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => { onOpenSubmissionModal(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Daftar Sampel</span>
            </button>
            <button
              onClick={() => { onOpenTrackingModal(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-300"
            >
              <Search className="w-4 h-4 text-teal-700" />
              <span>Lacak Sampel</span>
            </button>
          </div>

          <button
            onClick={() => { setActiveTab('beranda'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'beranda' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Beranda
          </button>
          <button
            onClick={() => { setActiveTab('profil'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'profil' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Profil, Struktur & Fasilitas Lab
          </button>
          <button
            onClick={() => { setActiveTab('layanan_tarif'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'layanan_tarif' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Daftar Parameter & Tarif Retribusi
          </button>
          <button
            onClick={() => { setActiveTab('sop_alur'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'sop_alur' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Alur Layanan & SOP
          </button>
          <button
            onClick={() => { setActiveTab('skm_pengaduan'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'skm_pengaduan' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Survei Kepuasan (SKM) & Pengaduan
          </button>
          <button
            onClick={() => { setActiveTab('berita'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'berita' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Berita & Pengumuman
          </button>
          <button
            onClick={() => { setActiveTab('kontak'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${activeTab === 'kontak' ? 'bg-teal-50 text-teal-800 font-bold' : 'text-slate-700'}`}
          >
            Kontak & Lokasi Laboratorium
          </button>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between bg-teal-50 p-2.5 rounded-xl border border-teal-200">
                <div>
                  <div className="font-bold text-teal-950 text-xs">{currentUser.name}</div>
                  <div className="text-[10px] text-teal-700">{currentUser.role}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => { setIsAdminMode(!isAdminMode); setIsMobileMenuOpen(false); }}
                    className="px-2.5 py-1.5 bg-teal-800 text-white rounded-lg text-xs font-bold"
                  >
                    {isAdminMode ? 'Tampilan Publik' : 'Kelola Menu'}
                  </button>
                  <button
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg text-xs"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAdminLogin(); setIsMobileMenuOpen(false); }}
                className="w-full text-xs text-amber-900 bg-amber-100 px-3 py-2.5 rounded-lg font-bold border border-amber-300 flex items-center justify-center gap-1.5"
              >
                <Lock className="w-4 h-4 text-amber-700" />
                <span>Login Admin (Edit Semua Menu Website)</span>
              </button>
            )}

            <button
              onClick={() => { onOpenLocalhostGuide(); setIsMobileMenuOpen(false); }}
              className="w-full text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg font-bold border border-emerald-300 flex items-center justify-center gap-1.5"
            >
              <DownloadCloud className="w-4 h-4 text-emerald-600" />
              <span>Unduh ZIP XAMPP (Localhost)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
