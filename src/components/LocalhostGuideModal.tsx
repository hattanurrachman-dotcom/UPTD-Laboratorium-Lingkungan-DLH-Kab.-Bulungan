import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  DownloadCloud, 
  FolderArchive, 
  CheckCircle2, 
  Laptop, 
  ExternalLink,
  Copy,
  Check,
  Server,
  FileCode,
  Sparkles,
  Info,
  Database
} from 'lucide-react';

interface LocalhostGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalhostGuideModal: React.FC<LocalhostGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const [activeOption, setActiveOption] = useState<'xampp' | 'mysql' | 'node'>('xampp');

  if (!isOpen) return null;

  const copyNodeCommands = () => {
    navigator.clipboard.writeText(`npm install\nnpm run dev`);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copyXamppPath = () => {
    navigator.clipboard.writeText(`C:\\xampp\\htdocs\\lab-bulungan`);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  SIAP PAKAI XAMPP & LOCALHOST
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                  Format .ZIP
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 font-serif-display">
                Jalankan di Localhost XAMPP Komputer Anda
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

        {/* Big Action Download Button for XAMPP */}
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-teal-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-300 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Paket Lengkap Website + Database MySQL</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Download ZIP XAMPP & Script database.sql
              </h4>
              <p className="text-xs text-teal-200 leading-relaxed max-w-md">
                Sudah berisi compiled HTML, CSS, JS, <code className="bg-teal-950 px-1 rounded text-amber-200">database.sql</code>, <code className="bg-teal-950 px-1 rounded text-amber-200">index.php</code>, dan API PHP siap letak di folder <code className="text-white">htdocs</code>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <a
                href="./lab-dlh-bulungan-xampp-siap-pakai.zip"
                download="lab-dlh-bulungan-xampp-siap-pakai.zip"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <DownloadCloud className="w-4 h-4 text-slate-950" />
                <span>UNDUH ZIP XAMPP</span>
              </a>

              <a
                href="./database.sql"
                download="database.sql"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all active:scale-95 cursor-pointer shrink-0"
                title="Unduh file SQL untuk phpMyAdmin"
              >
                <Database className="w-4 h-4 text-amber-400" />
                <span>database.sql</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 text-xs">
          <button
            onClick={() => setActiveOption('xampp')}
            className={`flex-1 py-2.5 font-bold border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeOption === 'xampp'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>1. Pasang di XAMPP</span>
          </button>
          <button
            onClick={() => setActiveOption('mysql')}
            className={`flex-1 py-2.5 font-bold border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeOption === 'mysql'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>2. Setup Database MySQL</span>
          </button>
          <button
            onClick={() => setActiveOption('node')}
            className={`flex-1 py-2.5 font-bold border-b-2 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeOption === 'node'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>3. Opsi Node.js</span>
          </button>
        </div>

        {/* Content Tab 1: XAMPP */}
        {activeOption === 'xampp' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Langkah Menjalankan di XAMPP (3 Langkah Cepat):</span>
            </h4>

            <div className="space-y-3 text-xs">
              
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-xl bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="flex-1 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">
                    Ekstrak ZIP ke Direktori XAMPP htdocs
                  </strong>
                  <p className="text-slate-600">
                    Ekstrak file <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">lab-dlh-bulungan-xampp-siap-pakai.zip</code> ke dalam folder:
                  </p>
                  
                  <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-xl font-mono text-[11px] text-teal-900">
                    <span>C:\xampp\htdocs\lab-bulungan</span>
                    <button
                      onClick={copyXamppPath}
                      className="text-[10px] text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPath ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPath ? 'Disalin' : 'Salin Path'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Pastikan di dalam folder tersebut terdapat file <code className="text-slate-700">index.html</code>, <code className="text-slate-700">index.php</code>, dan folder <code className="text-slate-700">assets/</code>.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-xl bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="flex-1 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">
                    Buka XAMPP Control Panel & Start Apache
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    Buka program <strong>XAMPP Control Panel</strong> di laptop/komputer Anda. Pada baris <strong>Apache</strong>, klik tombol <strong>[Start]</strong> hingga latar belakang teks berubah hijau.
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    (Tidak perlu mengaktifkan MySQL karena aplikasi sudah mandiri dengan basis data lokal persisten).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="flex-1 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">
                    Buka Web Browser Anda
                  </strong>
                  <p className="text-slate-700">
                    Buka Google Chrome, Microsoft Edge, atau Firefox dan buka alamat:
                  </p>
                  <div className="bg-white border border-emerald-300 p-2.5 rounded-xl font-mono font-bold text-teal-800 text-sm flex items-center justify-between">
                    <span>http://localhost/lab-bulungan</span>
                    <a
                      href="http://localhost/lab-bulungan"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-teal-700 hover:text-teal-950 flex items-center gap-1 font-sans font-semibold"
                    >
                      <span>Buka Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Content Tab 2: MySQL Setup */}
        {activeOption === 'mysql' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-amber-600" />
              <span>Cara Menghubungkan & Mengedit Database MySQL di phpMyAdmin:</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-teal-800 text-white text-[11px] flex items-center justify-center font-mono">1</span>
                  <span>Buka phpMyAdmin</span>
                </div>
                <p className="text-slate-600 pl-7">
                  Akses <code className="bg-teal-100 text-teal-900 px-1 rounded font-bold font-mono">http://localhost/phpmyadmin/</code> di browser Anda (pastikan Apache & MySQL aktif di XAMPP).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-teal-800 text-white text-[11px] flex items-center justify-center font-mono">2</span>
                  <span>Buat Database Bernama <code className="font-mono text-teal-800">db_lab_bulungan</code></span>
                </div>
                <p className="text-slate-600 pl-7">
                  Klik menu <strong>New / Baru</strong> pada panel kiri, masukkan nama database <code className="font-bold text-teal-900">db_lab_bulungan</code>, dan klik <strong>Create / Buat</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-teal-800 text-white text-[11px] flex items-center justify-center font-mono">3</span>
                  <span>Import File <code className="font-mono text-teal-800">database.sql</code></span>
                </div>
                <p className="text-slate-600 pl-7">
                  Pilih database <code className="font-mono font-bold">db_lab_bulungan</code>, klik tab <strong>Import</strong> di bagian atas, pilih file <code className="font-bold text-slate-900">database.sql</code> yang Anda unduh, lalu klik <strong>Import / Kirim</strong> di bagian bawah.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1 text-emerald-950">
                <strong className="block font-bold text-emerald-900">
                  Cara Mengedit Data:
                </strong>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Semua data kini dapat diedit langsung: baik lewat antarmuka phpMyAdmin (tabel <code className="font-bold">parameters</code>, <code className="font-bold">samples</code>, <code className="font-bold">site_settings</code>), maupun melalui tab <strong>Database MySQL</strong> di Dashboard Admin website.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 3: Node.js */}
        {activeOption === 'node' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider">
              Langkah Menjalankan Kode Sumber Lengkap dengan Node.js:
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-600 mb-2">
                  Jika Anda ingin mengedit kode sumber React & TypeScript secara langsung:
                </p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs relative">
                  <div className="text-slate-400 mb-1"># 1. Install semua dependensi</div>
                  <div className="text-emerald-400">npm install</div>
                  <div className="text-slate-400 my-1"># 2. Jalankan server lokal (Vite)</div>
                  <div className="text-amber-300">npm run dev</div>

                  <button
                    onClick={copyNodeCommands}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <p className="text-slate-600 mt-2">
                  Akses di peramban pada alamat: <code className="font-bold text-teal-800">http://localhost:3000</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 text-teal-950 text-xs space-y-1.5">
          <strong className="font-bold flex items-center gap-1.5 text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kelebihan Paket XAMPP Ini:</span>
          </strong>
          <ul className="list-disc pl-5 text-[11px] space-y-1 text-slate-700">
            <li><strong>Path Relatif Otomatis:</strong> Dapat ditempatkan di subfolder htdocs manapun tanpa error 404 (sudah dikonfigurasi dengan <code className="bg-teal-100 px-1 rounded">base: './'</code>).</li>
            <li><strong>Dukungan File .htaccess:</strong> Mengaktifkan navigasi SPA dan kompresi MIME type di Apache.</li>
            <li><strong>Fitur Cetak LHP Standar A4:</strong> Siap dicetak langsung ke PDF atau printer fisik dari browser tanpa memerlukan server tambahan.</li>
            <li><strong>Bisa Dijalankan Offline:</strong> Tidak memerlukan koneksi internet untuk menguji simulasi tarif dan sistem registrasi sampel.</li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <a
              href="./PANDUAN_XAMPP.txt"
              target="_blank"
              download="PANDUAN_XAMPP.txt"
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>PANDUAN_XAMPP.txt</span>
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="./database.sql"
              download="database.sql"
              className="text-xs text-amber-700 hover:text-amber-900 font-semibold underline flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5" />
              <span>database.sql</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
