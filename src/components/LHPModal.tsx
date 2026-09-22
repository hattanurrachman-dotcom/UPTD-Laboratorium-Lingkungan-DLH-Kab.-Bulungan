import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Building2, 
  FileCheck2,
  Calendar,
  Award
} from 'lucide-react';
import { SampleRequest } from '../types';
import { getMatrixInfo, formatDateIndo } from '../utils/helpers';

interface LHPModalProps {
  sample: SampleRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LHPModal: React.FC<LHPModalProps> = ({ sample, isOpen, onClose }) => {
  if (!isOpen || !sample) return null;

  const handlePrint = () => {
    window.print();
  };

  const matrixInfo = getMatrixInfo(sample.matrix);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-4 max-h-[96vh] flex flex-col">
        
        {/* Top Control Bar (Hidden when printed) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>Pratinjau Dokumen Sah Laporan Hasil Pengujian (LHP) Digital</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LHP DOCUMENT BODY (Designed for authentic official Indonesian government letterhead) */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-slate-900 print:p-0">
          
          {/* Watermark Background */}
          <div className="relative border-4 border-double border-slate-300 p-6 sm:p-8 rounded-xl shadow-xs print:border-none print:p-0">
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-6xl sm:text-8xl font-black uppercase rotate-[-30deg] tracking-widest text-slate-900">
                LAB DLH BULUNGAN
              </span>
            </div>

            {/* KOP SURAT PEMERINTAH DAERAH */}
            <div className="border-b-4 border-slate-900 pb-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                
                {/* Logo Daerah Lambang Bulungan Placeholder Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-teal-800 text-amber-300 flex flex-col items-center justify-center font-bold text-center p-1 border-2 border-amber-400 shrink-0 shadow-sm">
                  <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="text-[8px] leading-tight text-white font-mono mt-0.5">BULUNGAN</span>
                </div>

                {/* Teks Kop Surat */}
                <div className="text-center flex-1 space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">
                    PEMERINTAH KABUPATEN BULUNGAN
                  </h3>
                  <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-950 uppercase font-serif-display">
                    DINAS LINGKUNGAN HIDUP
                  </h2>
                  <h1 className="text-xs sm:text-base font-extrabold text-teal-800 uppercase tracking-wide">
                    UPTD LABORATORIUM LINGKUNGAN HIDUP
                  </h1>
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-tight">
                    Jl. Kolonel Soetadji No. 1, Tanjung Selor Hilir, Kec. Tanjung Selor, Kab. Bulungan, Kalimantan Utara 77212
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Telepon: (0552) 21124 • Email: lablingkungan@bulungan.go.id • Laman: dlh.bulungan.go.id
                  </p>
                </div>

                {/* Logo Akreditasi KAN */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-50 border-2 border-slate-400 p-1 flex flex-col items-center justify-center text-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-teal-700" />
                  <span className="text-[10px] font-black text-slate-900 tracking-tighter">KAN</span>
                  <span className="text-[8px] text-slate-600 font-mono font-bold leading-tight">LP-1234-IDN</span>
                </div>

              </div>
              <div className="h-0.5 bg-slate-900 mt-1"></div>
            </div>

            {/* Judul Laporan */}
            <div className="text-center mb-6">
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 underline underline-offset-4 font-serif-display">
                LAPORAN HASIL PENGUJIAN
              </h2>
              <p className="text-xs font-bold text-slate-700 italic mt-0.5 font-mono">
                CERTIFICATE OF ANALYSIS (COA)
              </p>
              <div className="text-xs font-mono font-semibold text-slate-800 mt-1">
                Nomor: <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-300 font-bold">{sample.lhpNumber || '660.1/148/LHP-LAB/DLH-BLG/IX/2026'}</span>
              </div>
            </div>

            {/* Informasi Identitas Pengujian */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-1.5">
                <div className="flex">
                  <span className="w-36 text-slate-500">Nomor Registrasi:</span>
                  <span className="font-mono font-bold text-slate-900">{sample.registrationNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-slate-500">Nama Pemohon:</span>
                  <span className="font-bold text-slate-900">{sample.customerName}</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-slate-500">Instansi / Perusahaan:</span>
                  <span className="font-semibold text-slate-800">{sample.institution}</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-slate-500">Alamat:</span>
                  <span className="text-slate-800">{sample.address}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex">
                  <span className="w-36 text-slate-500">Jenis Matriks Sampel:</span>
                  <span className="font-bold text-teal-800 uppercase">{matrixInfo.label}</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-slate-500">Titik / Lokasi Sampling:</span>
                  <span className="text-slate-800">{sample.samplingLocation} {sample.samplingCoordinates ? `(${sample.samplingCoordinates})` : ''}</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-slate-500">Tanggal Sampling:</span>
                  <span className="text-slate-800">{formatDateIndo(sample.samplingDate)}</span>
                </div>
                <div className="flex">
                  <span className="w-36 text-slate-500">Tanggal Pengesahan LHP:</span>
                  <span className="font-semibold text-slate-900">{sample.lhpReleaseDate ? formatDateIndo(sample.lhpReleaseDate) : formatDateIndo(sample.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* TABEL HASIL PENGUJIAN PARAMETER */}
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-teal-900 text-white border border-teal-950">
                    <th className="py-2.5 px-3 border border-teal-800 text-center w-10">No</th>
                    <th className="py-2.5 px-3 border border-teal-800">Parameter Uji</th>
                    <th className="py-2.5 px-3 border border-teal-800 text-center w-16">Satuan</th>
                    <th className="py-2.5 px-3 border border-teal-800 text-center">Baku Mutu *</th>
                    <th className="py-2.5 px-3 border border-teal-800">Metode Pengujian</th>
                    <th className="py-2.5 px-3 border border-teal-800 text-center font-bold">Hasil Uji</th>
                    <th className="py-2.5 px-3 border border-teal-800 text-center w-24">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.testResults && sample.testResults.length > 0 ? (
                    sample.testResults.map((item, idx) => (
                      <tr 
                        key={idx} 
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100'}
                      >
                        <td className="py-2 px-3 border border-slate-300 text-center font-mono">{idx + 1}</td>
                        <td className="py-2 px-3 border border-slate-300 font-semibold text-slate-900">{item.parameterName}</td>
                        <td className="py-2 px-3 border border-slate-300 text-center font-mono">{item.unit}</td>
                        <td className="py-2 px-3 border border-slate-300 text-center font-mono">{item.standardLimit}</td>
                        <td className="py-2 px-3 border border-slate-300 font-mono text-[11px] text-slate-600">{item.method}</td>
                        <td className="py-2 px-3 border border-slate-300 text-center font-mono font-bold text-teal-900">{item.result}</td>
                        <td className="py-2 px-3 border border-slate-300 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {item.compliance}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-slate-500 italic border border-slate-300">
                        Hasil uji sedang diproses dan diinput oleh tim analis laboratorium.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Catatan Teknis Laboratorium */}
            <div className="text-[11px] text-slate-600 space-y-1 mb-8 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <p className="font-bold text-slate-800">Catatan Pengujian:</p>
              <p>1. Hasil pengujian hanya berlaku untuk sampel yang diterima dan diuji di laboratorium.</p>
              <p>2. (*) Nilai Baku Mutu mengacu pada Peraturan Pemerintah No. 22 Tahun 2021 / Permen LHK No. 5 Tahun 2014 / Permenkes No. 2 Tahun 2023.</p>
              <p>3. Laporan Hasil Pengujian ini tidak boleh digandakan sebagian tanpa persetujuan tertulis dari UPTD Laboratorium Lingkungan DLH Kab. Bulungan.</p>
              {sample.technicianNotes && (
                <p className="text-teal-900 font-medium">Catatan Khusus: {sample.technicianNotes}</p>
              )}
            </div>

            {/* BLOK PENGESAHAN DOKUMEN & TANDA TANGAN ELEKTRONIK */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-4 border-t border-slate-300 text-xs">
              
              {/* QR Code Verifikasi Dokumen */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
                <div className="p-2 border-2 border-dashed border-teal-600 rounded-xl bg-teal-50/50 inline-block shadow-xs">
                  <QrCode className="w-20 h-20 text-teal-900" />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  <span className="font-bold text-teal-800 block">VERIFIKASI DIGITAL BSrE</span>
                  Pindai QR Code untuk memvalidasi keaslian dokumen di server resmi DLH Bulungan.
                </div>
              </div>

              {/* Manajer Teknis */}
              <div className="text-center space-y-1">
                <p className="text-slate-500">Telah Diverifikasi Oleh,</p>
                <p className="font-semibold text-slate-800">Manajer Teknis</p>
                <div className="h-16 flex items-center justify-center">
                  <div className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-300">
                    ✓ TERVALIDASI SISTEM
                  </div>
                </div>
                <p className="font-bold text-slate-900 underline">Ahmad Fauzi, S.T</p>
                <p className="text-[10px] text-slate-500 font-mono">NIP. 19840920 201001 1 018</p>
              </div>

              {/* Kepala UPTD & Stempel Resmi */}
              <div className="text-center space-y-1 relative">
                <p className="text-slate-500">Tanjung Selor, {sample.lhpReleaseDate ? formatDateIndo(sample.lhpReleaseDate) : formatDateIndo(sample.createdAt)}</p>
                <p className="font-semibold text-slate-800">Kepala UPTD Laboratorium Lingkungan</p>
                
                {/* Official Digital Stamp Simulation */}
                <div className="h-16 relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center opacity-70">
                    <div className="w-16 h-16 rounded-full border-2 border-teal-600 flex items-center justify-center text-[7px] font-black text-teal-700 uppercase rotate-[-15deg] p-1 text-center">
                      UPTD LAB LINGKUNGAN BULUNGAN
                    </div>
                  </div>
                  <div className="relative z-10 text-[11px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-300">
                    ✓ TTE TERSERTIFIKASI
                  </div>
                </div>

                <p className="font-bold text-slate-900 underline">Dra. Hj. Wahyuni, M.Si</p>
                <p className="text-[10px] text-slate-500 font-mono">NIP. 19750415 199903 2 005</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
