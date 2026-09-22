import React, { useState } from 'react';
import { 
  GitFork, 
  FileText, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Eye,
  BookOpen
} from 'lucide-react';
import { SOP_DOCUMENTS } from '../data/labData';
import { SOPDocument } from '../types';

interface FlowAndSOPSectionProps {
  onOpenSubmissionModal: () => void;
  sopDocuments?: SOPDocument[];
}

export const FlowAndSOPSection: React.FC<FlowAndSOPSectionProps> = ({
  onOpenSubmissionModal,
  sopDocuments = SOP_DOCUMENTS,
}) => {
  const [selectedSOP, setSelectedSOP] = useState<SOPDocument | null>(null);

  const flowSteps = [
    {
      step: 1,
      title: 'Pendaftaran & Pengajuan Sampel',
      subtitle: 'Online / Loket Laboratorium',
      desc: 'Pelanggan mengisi formulir permohonan pengujian secara online atau datang langsung ke loket UPTD Lab Lingkungan DLH Bulungan. Memilih matriks dan parameter pengujian.',
      duration: '15 - 30 Menit',
      color: 'teal'
    },
    {
      step: 2,
      title: 'Kaji Ulang & Penerbitan SKRD',
      subtitle: 'Verifikasi Reagen & Retribusi',
      desc: 'Petugas loket dan Manajer Teknis melakukan kaji ulang permintaan (kesiapan alat, reagen, dan jadwal sampling). Menerbitkan Surat Ketetapan Retribusi Daerah (SKRD).',
      duration: '1 Hari Kerja',
      color: 'sky'
    },
    {
      step: 3,
      title: 'Sampling Lapangan & Analisis Lab',
      subtitle: 'Pengujian SNI & ISO 17025',
      desc: 'Pengambilan sampel oleh tim PPC atau penyerahan sampel mandiri. Analis melakukan preparasi destruksi, titrasi, spektrometri UV-Vis, AAS, atau inkubasi mikrobiologi.',
      duration: '3 - 5 Hari Kerja',
      color: 'indigo'
    },
    {
      step: 4,
      title: 'Verifikasi & Validasi Mutu (QC)',
      subtitle: 'Supervisi Manajer Teknis',
      desc: 'Pemeriksaan kurva kalibrasi, blanko metode, duplikasi, dan akurasi hasil uji. Manajer Teknis dan Manajer Mutu menyetujui draft Laporan Hasil Pengujian.',
      duration: '1 Hari Kerja',
      color: 'purple'
    },
    {
      step: 5,
      title: 'Penerbitan LHP Digital Sah',
      subtitle: 'TTE & Unduh Mandiri',
      desc: 'Pengesahan Tanda Tangan Elektronik resmi oleh Kepala UPTD. Dokumen LHP digital siap diunduh pelanggan via portal tracking online ber-QR Code.',
      duration: 'Selesai',
      color: 'emerald'
    }
  ];

  return (
    <section className="py-12 bg-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <GitFork className="w-3.5 h-3.5 text-teal-600" />
            <span>Transparansi Prosedur Layanan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            Alur & Standar Operasional Prosedur (SOP)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Panduan sistematis mekanisme pengujian sampel lingkungan dari awal pendaftaran hingga penyerahan Laporan Hasil Pengujian (LHP).
          </p>
        </div>

        {/* INTERACTIVE FLOW STEPS INFOGRAPHIC */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {flowSteps.map((item, idx) => (
              <div 
                key={item.step} 
                className="relative bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-full bg-teal-800 text-amber-300 font-black text-xs flex items-center justify-center shadow-xs">
                      0{item.step}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600" />
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-[10px] font-semibold text-teal-700 uppercase tracking-wider mt-0.5">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center text-[10px] text-teal-700 font-semibold">
                  <span>Tahap {item.step} dari 5</span>
                  {idx < 4 && <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA to start flow */}
          <div className="mt-8 text-center">
            <button
              onClick={onOpenSubmissionModal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Mulai Pendaftaran Tahap 1 Secara Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SOP DOCUMENTS CATALOG */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span>Katalog Dokumen Standar Operasional Prosedur (SOP)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dokumen kendali mutu yang menjamin konsistensi pelayanan dan pengujian laboratorium UPTD Lingkungan Bulungan.
              </p>
            </div>
            <div className="text-xs font-semibold text-teal-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              Terverifikasi ISO/IEC 17025
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sopDocuments.map((sop) => (
              <div
                key={sop.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {sop.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {sop.revision} • Berlaku: {sop.effectiveDate}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {sop.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {sop.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Ukuran: {sop.fileSize} (PDF)</span>
                  <button
                    type="button"
                    onClick={() => setSelectedSOP(sop)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Ringkasan SOP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOP Detail Modal */}
        {selectedSOP && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {selectedSOP.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {selectedSOP.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSOP(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Status Revisi:</span>
                    <strong className="text-slate-800">{selectedSOP.revision}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tanggal Efektif:</span>
                    <strong className="text-slate-800">{selectedSOP.effectiveDate}</strong>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1">Ruang Lingkup Prosedur:</span>
                  <p className="leading-relaxed">{selectedSOP.description}</p>
                </div>

                <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-900">
                  <span className="font-bold block text-[11px]">Pengendalian Dokumen Mutu:</span>
                  <p className="text-[11px] mt-0.5">
                    Dokumen ini berada di bawah kendali Manajer Mutu UPTD Lab Lingkungan DLH Kabupaten Bulungan. Salinan resmi tersedia di arsip kantor loket pelayanan.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedSOP(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Simulasi pengunduhan ${selectedSOP.code}. Dokumen SOP siap dicetak atau disimpan.`);
                    setSelectedSOP(null);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
