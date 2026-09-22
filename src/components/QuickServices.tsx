import React from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Calculator, 
  ShieldCheck, 
  GitFork, 
  Smile, 
  ArrowUpRight 
} from 'lucide-react';

interface QuickServicesProps {
  onOpenSubmissionModal: () => void;
  onOpenTrackingModal: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const QuickServices: React.FC<QuickServicesProps> = ({
  onOpenSubmissionModal,
  onOpenTrackingModal,
  onNavigateToTab,
}) => {
  const quickCards = [
    {
      id: 'sub-sample',
      title: 'Pendaftaran Pengujian Online',
      subtitle: 'Form Permohonan & Jadwal',
      description: 'Pengajuan sampel air sungai, limbah industri, air minum, dan udara ambien dengan perhitungan biaya otomatis.',
      icon: FileSpreadsheet,
      accentColor: 'from-teal-500 to-emerald-600',
      action: onOpenSubmissionModal,
      buttonText: 'Daftar Sekarang'
    },
    {
      id: 'track-sample',
      title: 'Tracking Status Sampel',
      subtitle: 'Pantau Progres & Unduh LHP',
      description: 'Cek tahapan uji laboratorium (Pendaftaran, Analisis, Verifikasi, hingga LHP terbit dengan Tanda Tangan Elektronik).',
      icon: Search,
      accentColor: 'from-sky-500 to-blue-600',
      action: onOpenTrackingModal,
      buttonText: 'Lacak Nomor Tiket'
    },
    {
      id: 'calc-tariff',
      title: 'Daftar Tarif Retribusi Perda',
      subtitle: 'Kalkulator Simulasi Biaya',
      description: 'Rincian tarif resmi sesuai Perda Retribusi Daerah Kab. Bulungan lengkap dengan metode pengujian SNI standar.',
      icon: Calculator,
      accentColor: 'from-amber-500 to-orange-600',
      action: () => onNavigateToTab('layanan_tarif'),
      buttonText: 'Hitung Estimasi'
    },
    {
      id: 'kan-cert',
      title: 'Legalitas & Akreditasi KAN',
      subtitle: 'ISO/IEC 17025:2017 LP-1234-IDN',
      description: 'Salinan sertifikat akreditasi Komite Akreditasi Nasional dan lampiran 18+ parameter ruang lingkup resmi.',
      icon: ShieldCheck,
      accentColor: 'from-emerald-500 to-teal-700',
      action: () => onNavigateToTab('profil'),
      buttonText: 'Lihat Sertifikat'
    },
    {
      id: 'sop-flow',
      title: 'Alur Layanan & Dokumen SOP',
      subtitle: 'Mekanisme & Standar Pelayanan',
      description: 'Panduan tata cara pengujian sampel, penyerahan, kaji ulang, hingga penanganan keluhan dan komplain pelanggan.',
      icon: GitFork,
      accentColor: 'from-indigo-500 to-purple-600',
      action: () => onNavigateToTab('sop_alur'),
      buttonText: 'Buka Alur & SOP'
    },
    {
      id: 'skm-survey',
      title: 'Survei Kepuasan (SKM)',
      subtitle: 'PermenPAN-RB No. 14/2017',
      description: 'Beri penilaian dan masukan terhadap kualitas pelayanan laboratorium untuk perbaikan berkelanjutan.',
      icon: Smile,
      accentColor: 'from-rose-500 to-pink-600',
      action: () => onNavigateToTab('skm_pengaduan'),
      buttonText: 'Isi Survei SKM'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <span>Akses Cepat Layanan Publik</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            Kemudahan Layanan Laboratorium Lingkungan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Pusat layanan digital terpadu untuk masyarakat, pelaku usaha, konsultan lingkungan, dan Organisasi Perangkat Daerah (OPD) di Kabupaten Bulungan.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                      {card.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <button
                  onClick={card.action}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white group-hover:bg-teal-600 group-hover:text-white border border-slate-200 group-hover:border-teal-600 shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{card.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
