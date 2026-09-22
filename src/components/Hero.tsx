import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  PlusCircle, 
  ShieldCheck, 
  FileText, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Award,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenSubmissionModal: () => void;
  onOpenTrackingModal: (initialCode?: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSubmissionModal,
  onOpenTrackingModal,
  onNavigateToTab,
}) => {
  const [quickTrackingCode, setQuickTrackingCode] = useState('');

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackingCode.trim()) {
      onOpenTrackingModal(quickTrackingCode.trim());
    } else {
      onOpenTrackingModal();
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-850 to-slate-900 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-sky-500 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-amber-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-14 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-800/80 border border-teal-500/40 text-xs text-teal-100 backdrop-blur-xs shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Laboratorium Penguji Terakreditasi KAN:</span>
              <strong className="text-white font-mono bg-teal-950/80 px-2 py-0.5 rounded text-amber-300">
                LP-1234-IDN
              </strong>
              <span className="text-teal-300 hidden sm:inline">• SNI ISO/IEC 17025:2017</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif-display">
              Layanan Pengujian Sampel Lingkungan <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-200 to-amber-300">
                Kabupaten Bulungan
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              Mewujudkan kepastian data mutu lingkungan yang <strong>akurat, transparan, dan berdaya hukum</strong> untuk mendukung kelestarian Daerah Aliran Sungai (DAS) Kayan, industri sawit, tambang, dan kualitas hidup masyarakat Bumi Benuanta.
            </p>

            {/* Quick Tracking Search Box */}
            <div className="bg-white/10 p-2 sm:p-2.5 rounded-2xl border border-white/20 backdrop-blur-md max-w-xl shadow-xl">
              <form onSubmit={handleQuickTrackSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-200" />
                  <input
                    type="text"
                    placeholder="Masukkan Nomor Registrasi (cth: LAB-BLG-2026-0042)"
                    value={quickTrackingCode}
                    onChange={(e) => setQuickTrackingCode(e.target.value)}
                    className="w-full pl-11 pr-3 py-2.5 bg-white/15 text-white placeholder-slate-300 text-sm rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/20 transition-all font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Activity className="w-4 h-4 text-slate-900" />
                  <span>Cek Status</span>
                </button>
              </form>
              <div className="mt-2 px-2 flex items-center justify-between text-[11px] text-teal-200">
                <span>Coba nomor sampel demo:</span>
                <div className="flex items-center gap-2 font-mono">
                  <button 
                    type="button" 
                    onClick={() => { setQuickTrackingCode('LAB-BLG-2026-0042'); onOpenTrackingModal('LAB-BLG-2026-0042'); }}
                    className="underline hover:text-amber-300 transition-colors"
                  >
                    LAB-BLG-2026-0042 (LHP Terbit)
                  </button>
                  <span>•</span>
                  <button 
                    type="button" 
                    onClick={() => { setQuickTrackingCode('LAB-BLG-2026-0051'); onOpenTrackingModal('LAB-BLG-2026-0051'); }}
                    className="underline hover:text-amber-300 transition-colors"
                  >
                    LAB-BLG-2026-0051 (Analisis Lab)
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSubmissionModal}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <PlusCircle className="w-5 h-5 text-amber-300 group-hover:rotate-90 transition-transform" />
                <span>Pendaftaran Sampel Online</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateToTab('layanan_tarif')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>Simulasi Tarif Retribusi Perda</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-teal-800/60 max-w-xl text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SNI & APHA Standar Metode</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TTE & QR Code Resmi</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bebas Pungli / Perda Legal</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-amber-500 rounded-3xl blur-xl opacity-30"></div>

              {/* Main Laboratory Card */}
              <div className="relative bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-5">
                
                {/* Header of the Card */}
                <div className="flex items-center justify-between border-b border-teal-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-800/80 flex items-center justify-center border border-teal-600/50">
                      <FlaskConical className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">UPTD Lab Lingkungan Bulungan</h2>
                      <p className="text-xs text-teal-300">Sistem Informasi Pengujian Mutu (SIM-LAB)</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-600/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Sistem Aktif
                  </span>
                </div>

                {/* Service Highlights Box */}
                <div className="space-y-3">
                  <div className="bg-teal-950/60 p-3 rounded-xl border border-teal-800/60 flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Terakreditasi KAN (ISO/IEC 17025:2017)</div>
                      <div className="text-[11px] text-slate-300">
                        Hasil uji diakui secara nasional untuk dokumen AMDAL, UKL-UPL, dan pelaporan SIMPEL KLHK.
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-950/60 p-3 rounded-xl border border-teal-800/60 flex items-start gap-3">
                    <FileText className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Laporan Hasil Pengujian (LHP) Digital</div>
                      <div className="text-[11px] text-slate-300">
                        Dilengkapi Tanda Tangan Elektronik (TTE) tersertifikasi BSrE dan QR code verifikasi anti-pemalsuan.
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-950/60 p-3 rounded-xl border border-teal-800/60 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Sampling Lapangan & Pengantaran Mandiri</div>
                      <div className="text-[11px] text-slate-300">
                        Didukung petugas pengambil contoh (PPC) bersertifikasi untuk air sungai, air limbah, dan udara ambien.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats in Bulungan */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-teal-800/80 text-center">
                  <div className="bg-slate-800/60 p-2 rounded-xl">
                    <div className="text-lg font-black text-amber-300">18+</div>
                    <div className="text-[10px] text-slate-400">Parameter KAN</div>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded-xl">
                    <div className="text-lg font-black text-teal-300">5-7</div>
                    <div className="text-[10px] text-slate-400">Hari Kerja LHP</div>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded-xl">
                    <div className="text-lg font-black text-sky-300">88.6</div>
                    <div className="text-[10px] text-slate-400">Indeks SKM (A)</div>
                  </div>
                </div>

                {/* Fast Action to Browse Packages */}
                <button
                  onClick={() => onNavigateToTab('layanan_tarif')}
                  className="w-full py-2.5 bg-teal-700/60 hover:bg-teal-700 text-xs font-bold text-teal-100 hover:text-white rounded-xl border border-teal-500/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Lihat Seluruh Matriks & Paket Pengujian</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
