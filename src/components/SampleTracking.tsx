import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  ChevronRight, 
  AlertCircle, 
  Download, 
  User, 
  Building2, 
  MapPin, 
  Calendar, 
  CreditCard,
  History,
  ShieldCheck
} from 'lucide-react';
import { SampleRequest, SampleStatus } from '../types';
import { formatRupiah, formatDateIndo, getMatrixInfo, getStatusInfo, LAB_STEPS } from '../utils/helpers';
import { LHPModal } from './LHPModal';

interface SampleTrackingProps {
  samples: SampleRequest[];
  isOpen?: boolean;
  onClose?: () => void;
  initialCode?: string;
  isEmbedded?: boolean;
}

export const SampleTracking: React.FC<SampleTrackingProps> = ({
  samples,
  isOpen = true,
  onClose,
  initialCode = '',
  isEmbedded = false,
}) => {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [selectedSample, setSelectedSample] = useState<SampleRequest | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLHPModalOpen, setIsLHPModalOpen] = useState(false);

  // Auto search on initialCode or mount
  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      const found = samples.find(
        s => s.registrationNumber.toLowerCase() === initialCode.trim().toLowerCase()
      );
      if (found) {
        setSelectedSample(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } else if (samples.length > 0 && !selectedSample) {
      // Default to the first completed sample
      setSelectedSample(samples[0]);
    }
  }, [initialCode, samples]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const found = samples.find(
      s => s.registrationNumber.toLowerCase() === searchCode.trim().toLowerCase()
    );

    if (found) {
      setSelectedSample(found);
      setNotFound(false);
    } else {
      setSelectedSample(null);
      setNotFound(true);
    }
  };

  const handleSelectPredefined = (sample: SampleRequest) => {
    setSearchCode(sample.registrationNumber);
    setSelectedSample(sample);
    setNotFound(false);
  };

  const renderContent = () => {
    return (
      <div className="space-y-6">
        {/* Search Bar & Quick Filters */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Masukkan Nomor Registrasi Sampel (cth: LAB-BLG-2026-0042)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>Lacak Sekarang</span>
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">
              Pilih contoh nomor sampel uji aktif di Kabupaten Bulungan:
            </div>
            <div className="flex flex-wrap gap-2">
              {samples.slice(0, 5).map((s) => {
                const isSelected = selectedSample?.id === s.id;
                const statusMeta = getStatusInfo(s.status);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectPredefined(s)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-800 shadow-xs font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-teal-50 hover:border-teal-300'
                    }`}
                  >
                    <span>{s.registrationNumber}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
                      isSelected ? 'bg-teal-900 text-teal-100' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {statusMeta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">Nomor Registrasi "{searchCode}" Tidak Ditemukan</p>
              <p className="text-slate-600 text-xs mt-0.5">
                Pastikan nomor pendaftaran sesuai dengan yang tertera pada Tanda Terima atau coba pilih salah satu nomor sampel di atas.
              </p>
            </div>
          </div>
        )}

        {/* SAMPLE DETAILS & TIMELINE */}
        {selectedSample && (
          <div className="space-y-6">
            
            {/* Top Status Card */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-teal-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-600/40">
                    STATUS TAHAPAN PENGUJIAN
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono mt-1 text-white flex items-center gap-2">
                    {selectedSample.registrationNumber}
                  </h3>
                  <p className="text-xs text-teal-200 mt-0.5">
                    {selectedSample.institution} • {getMatrixInfo(selectedSample.matrix).label}
                  </p>
                </div>

                {/* Status Badge & CTA */}
                <div className="flex flex-col sm:items-end gap-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                    selectedSample.status === 'lhp_terbit'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>{getStatusInfo(selectedSample.status).label}</span>
                  </div>

                  {selectedSample.status === 'lhp_terbit' && (
                    <button
                      onClick={() => setIsLHPModalOpen(true)}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <FileCheck2 className="w-4 h-4 text-white" />
                      <span>Lihat & Unduh LHP Digital Sah</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Stepper Visual */}
              <div className="mt-8 pt-6 border-t border-teal-800/80">
                <div className="grid grid-cols-5 gap-2">
                  {LAB_STEPS.map((step, idx) => {
                    const currentStepNumber = getStatusInfo(selectedSample.status).step;
                    const isCompleted = stepNumberFromStatus(step.id) < currentStepNumber;
                    const isCurrent = stepNumberFromStatus(step.id) === currentStepNumber;

                    return (
                      <div key={step.id} className="text-center relative">
                        {/* Step circle */}
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 font-black'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        {/* Title */}
                        <div className="mt-2 hidden sm:block">
                          <div className={`text-[11px] font-bold leading-tight ${
                            isCurrent ? 'text-amber-300' : isCompleted ? 'text-teal-200' : 'text-slate-400'
                          }`}>
                            {step.title.split('. ')[1]}
                          </div>
                          <div className="text-[9px] text-slate-400 mt-0.5 truncate">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Information Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Data Pemohon & Lokasi */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm border-b border-slate-100 pb-2">
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <span>Informasi Pemohon & Titik Sampling</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Nama Pelanggan / PIC:</span>
                    <span className="font-semibold text-slate-800">{selectedSample.customerName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Instansi / Perusahaan:</span>
                    <span className="font-semibold text-slate-800">{selectedSample.institution}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Nomor Telepon:</span>
                    <span className="font-mono text-slate-800">{selectedSample.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Titik / Lokasi Sampling:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-xs">{selectedSample.samplingLocation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Tanggal Pengambilan:</span>
                    <span className="text-slate-800">{formatDateIndo(selectedSample.samplingDate)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Status Pembayaran SKRD:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      selectedSample.paymentStatus === 'Lunas'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedSample.paymentStatus === 'Bebas Retribusi / Program DLH'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedSample.paymentStatus} ({formatRupiah(selectedSample.totalCost)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Status Terkini & Catatan Lab */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm border-b border-slate-100 pb-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Keterangan Mutu & Catatan Analis</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500">Tahapan Saat Ini:</div>
                    <div className="text-sm font-bold text-teal-900 mt-0.5">
                      {getStatusInfo(selectedSample.status).label}
                    </div>
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                      {getStatusInfo(selectedSample.status).description}
                    </p>
                  </div>

                  {selectedSample.technicianNotes && (
                    <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-900">
                      <span className="font-bold block text-[11px]">Catatan Laboratorium:</span>
                      <p className="text-[11px] mt-0.5 leading-relaxed">{selectedSample.technicianNotes}</p>
                    </div>
                  )}

                  {selectedSample.lhpNumber && (
                    <div className="flex justify-between items-center py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div>
                        <div className="text-[10px] font-bold text-emerald-800 uppercase">Nomor LHP Sah:</div>
                        <div className="font-mono text-xs font-bold text-emerald-950">{selectedSample.lhpNumber}</div>
                      </div>
                      <button
                        onClick={() => setIsLHPModalOpen(true)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                      >
                        Buka LHP
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Riwayat Histori Perjalanan Sampel (Timeline Log) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm mb-4">
                <History className="w-4 h-4 text-teal-600" />
                <span>Rantai Lacak & Log Riwayat Pelayanan</span>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200">
                {selectedSample.statusHistory.map((hist, idx) => (
                  <div key={idx} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-teal-600 border-2 border-white shadow-xs"></div>
                    
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 text-xs">
                          {getStatusInfo(hist.status).label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {hist.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {hist.note}
                      </p>
                      <div className="text-[10px] text-teal-700 font-medium mt-1">
                        Petugas / Sistem: {hist.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* LHP Digital Modal Viewer */}
        <LHPModal
          sample={selectedSample}
          isOpen={isLHPModalOpen}
          onClose={() => setIsLHPModalOpen(false)}
        />
      </div>
    );
  };

  // Helper function to get numeric step
  function stepNumberFromStatus(st: SampleStatus): number {
    return getStatusInfo(st).step;
  }

  // If embedded in a page view
  if (isEmbedded) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold mb-2">
            <span>Sistem Pelacakan Pengujian Mandiri</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display">
            Tracking Status Sampel & Unduh LHP
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pantau posisi sampel lingkungan Anda secara transparan dari penerimaan hingga penerbitan sertifikat hasil uji.
          </p>
        </div>
        {renderContent()}
      </div>
    );
  }

  // If modal view
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-sky-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700/80 border border-teal-500/50 flex items-center justify-center text-amber-300">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Tracking Sampel Laboratorium Lingkungan
              </h2>
              <p className="text-xs text-teal-200">
                Pemerintah Kabupaten Bulungan — UPTD Lab Lingkungan DLH
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-teal-200 hover:text-white hover:bg-teal-700/50 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
