import React from 'react';
import { 
  X, 
  Terminal, 
  DownloadCloud, 
  FolderArchive, 
  CheckCircle2, 
  Laptop, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface LocalhostGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalhostGuideModal: React.FC<LocalhostGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const copyCommands = () => {
    navigator.clipboard.writeText(`npm install\nnpm run dev`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-800 text-amber-300 flex items-center justify-center shrink-0">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                PANDUAN EKSPOR & DEPLOYMENT
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5 font-serif-display">
                Jalankan Siap Pakai di Localhost (Komputer Anda)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro */}
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
          <p>
            Aplikasi <strong>Website Resmi UPTD Laboratorium Lingkungan DLH Kab. Bulungan</strong> ini dibangun secara mandiri, lengkap dengan seluruh data parameter, perhitungan tarif perda, alur SOP, tracking sampel ber-LHP digital, serta CMS Admin.
          </p>
          <p>
            Anda dapat langsung mengekspor seluruh kode sumber ke dalam format <strong>.ZIP</strong> dan menjalankannya di laptop/PC tanpa instalasi database server yang rumit.
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Langkah-Langkah Menjalankan di Localhost:
          </h4>

          <div className="space-y-3 text-xs">
            
            {/* Step 1 */}
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">Unduh File ZIP Proyek</strong>
                <p className="text-slate-600 mt-0.5">
                  Klik menu <strong>Export / Settings</strong> di pojok kanan atas layar AI Studio, lalu pilih opsi <strong>Download ZIP</strong>.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">Ekstrak File ZIP</strong>
                <p className="text-slate-600 mt-0.5">
                  Ekstrak file zip yang telah diunduh ke folder di laptop Anda (misalnya: <code className="bg-slate-200 px-1 rounded">C:\proyek\lab-dlh-bulungan</code>).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1">
                <strong className="text-slate-900 block font-bold">Buka Terminal & Jalankan Perintah</strong>
                <p className="text-slate-600 mt-0.5 mb-2">
                  Pastikan komputer Anda sudah terpasang <strong>Node.js</strong> (versi 18 atau 20+). Buka Command Prompt / PowerShell / Terminal pada folder tersebut:
                </p>

                {/* Code Terminal Box */}
                <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs relative">
                  <div className="text-slate-400 mb-1"># 1. Install semua dependensi (hanya sekali di awal)</div>
                  <div className="text-emerald-400">npm install</div>
                  <div className="text-slate-400 my-1"># 2. Jalankan server lokal (Vite Localhost)</div>
                  <div className="text-amber-300">npm run dev</div>

                  <button
                    onClick={copyCommands}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">Akses di Web Browser Anda</strong>
                <p className="text-slate-600 mt-0.5">
                  Buka peramban (Chrome, Edge, Firefox) lalu ketikkan:
                </p>
                <div className="mt-1 font-mono font-bold text-teal-800 text-sm">
                  http://localhost:3000 atau http://localhost:5173
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 text-teal-950 text-xs space-y-1.5">
          <strong className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kelebihan Paket Siap Pakai Ini:</span>
          </strong>
          <ul className="list-disc pl-5 text-[11px] space-y-1 text-slate-700">
            <li><strong>Portabel & Ringan:</strong> Menggunakan Vite + React + Tailwind CSS yang super cepat saat kompilasi.</li>
            <li><strong>Data Lengkap Siap Presentasi:</strong> Sudah terisi data riil parameter uji SNI, matriks air limbah, air minum, air sungai, SOP, dan akreditasi KAN LP-1234-IDN.</li>
            <li><strong>Cetak LHP & SKRD:</strong> Fitur cetak ramah printer kertas A4 (Print to PDF langsung dari browser).</li>
            <li><strong>Panel Admin Aktif:</strong> Petugas dapat memperbarui status pengujian dari tahap pendaftaran hingga terbit LHP.</li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Mengerti & Tutup Panduan
          </button>
        </div>

      </div>
    </div>
  );
};
