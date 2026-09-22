import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Clock, 
  Heart,
  ChevronRight
} from 'lucide-react';

import { SiteSettings } from '../types';
import { DEFAULT_SITE_SETTINGS } from '../data/labData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
  onOpenLocalhostGuide?: () => void;
  settings?: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenAdmin, 
  onOpenLocalhostGuide,
  settings = DEFAULT_SITE_SETTINGS 
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 no-print">
      
      {/* Top Footer Banner */}
      <div className="bg-teal-900/60 border-b border-teal-800/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-teal-200">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Terakreditasi Komite Akreditasi Nasional (KAN) <strong>SNI ISO/IEC 17025:2017 {settings.kanAccreditationNumber ? `No. ${settings.kanAccreditationNumber}` : 'No. LP-1234-IDN'}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span>Bumi Benuanta Bersih & Berkelanjutan</span>
            <span>•</span>
            <span>Zona Bebas Korupsi & Pungli</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Identity & Legal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-800 text-amber-300 flex items-center justify-center font-bold shrink-0 border border-teal-600">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight uppercase">
                  {settings.agencyName || 'UPTD LABORATORIUM LINGKUNGAN HIDUP'}
                </h3>
                <p className="text-xs text-teal-400 font-semibold mt-0.5 uppercase">
                  {settings.agencySub || 'DINAS LINGKUNGAN HIDUP KAB. BULUNGAN'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Unit Pelaksana Teknis Daerah yang bertugas melaksanakan pengujian mutu air limbah, air permukaan sungai, air minum, udara ambien, dan kebisingan berstandar KAN ISO/IEC 17025.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400 text-xs font-black">
                KAN
              </div>
              <div className="text-[10px] text-slate-400">
                <span className="text-white font-bold block">Laboratorium Penguji</span>
                {settings.kanAccreditationNumber || 'LP-1234-IDN'} • BSrE TTE
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Layanan Utama & Tracking
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Beranda Portal Resmi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Tracking Status Sampel & Unduh LHP</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tarif')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Daftar Parameter & Simulasi Tarif Retribusi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alur')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Alur Pengujian & Katalog Dokumen SOP</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profil')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Profil Lembaga & Struktur Organisasi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skm')}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Survei Kepuasan (SKM) & Pengaduan</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Mitra Terkait */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Tautan Portal Terkait
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://bulungan.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Pemerintah Kabupaten Bulungan</span>
                </a>
              </li>
              <li>
                <a
                  href="https://kaltaraprov.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Pemerintah Provinsi Kalimantan Utara</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.menlhk.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Kementerian Lingkungan Hidup & Kehutanan</span>
                </a>
              </li>
              <li>
                <a
                  href="https://kan.or.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Komite Akreditasi Nasional (KAN)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.lapor.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>SP4N - LAPOR! KemenPAN-RB</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Lokasi & Kontak Loket */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Loket Pelayanan
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>{settings.address || 'Jl. Kolonel Soetadji No. 1, Tanjung Selor Hilir, Kab. Bulungan, Kaltara 77212'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="font-mono">{settings.phone || '(0552) 21124'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="font-mono text-teal-400">{settings.email || 'lablingkungan@bulungan.go.id'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Senin - Jumat (08.00 - 15.30 WITA)</span>
              </div>
            </div>

            <div className="pt-2 space-y-1.5">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer block"
              >
                Login Petugas Laboratorium (CMS DLH)
              </button>

              {onOpenLocalhostGuide && (
                <button
                  onClick={onOpenLocalhostGuide}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <span>📦 Unduh ZIP Siap Pakai XAMPP (htdocs)</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 UPTD Laboratorium Lingkungan Hidup Dinas Lingkungan Hidup Kabupaten Bulungan. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Standar SNI ISO/IEC 17025:2017</span>
            <span>•</span>
            <span>Kalimantan Utara</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
