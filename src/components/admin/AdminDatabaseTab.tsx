import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  FileCode, 
  Table, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Terminal, 
  HelpCircle,
  HardDrive,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  SiteSettings, 
  SampleRequest, 
  TestParameter, 
  StaffMember, 
  LabFacility, 
  SOPDocument, 
  NewsItem, 
  ComplaintTicket, 
  SKMFeedback 
} from '../../types';
import { checkMySqlConnection, generateSqlDump, downloadSqlFile, DbStatus } from '../../services/dbService';

interface AdminDatabaseTabProps {
  siteSettings: SiteSettings;
  samples: SampleRequest[];
  parameters: TestParameter[];
  staffMembers: StaffMember[];
  labFacilities: LabFacility[];
  sopDocuments: SOPDocument[];
  news: NewsItem[];
  complaints: ComplaintTicket[];
  feedbacks: SKMFeedback[];
}

export const AdminDatabaseTab: React.FC<AdminDatabaseTabProps> = ({
  siteSettings,
  samples,
  parameters,
  staffMembers,
  labFacilities,
  sopDocuments,
  news,
  complaints,
  feedbacks,
}) => {
  const [dbStatus, setDbStatus] = useState<DbStatus>({
    connected: false,
    source: 'local_storage',
    host: 'localhost:3306',
    database: 'db_lab_bulungan',
    tableCount: 10,
    message: 'Memeriksa koneksi database MySQL...'
  });
  const [isChecking, setIsChecking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'tables' | 'guide' | 'sql_view'>('overview');
  const [searchTable, setSearchTable] = useState('');

  const checkConnection = async () => {
    setIsChecking(true);
    const status = await checkMySqlConnection();
    setDbStatus(status);
    setIsChecking(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleDownloadSql = () => {
    const sql = generateSqlDump(
      siteSettings,
      samples,
      parameters,
      staffMembers,
      labFacilities,
      sopDocuments,
      news,
      complaints,
      feedbacks
    );
    downloadSqlFile(sql, `db_lab_bulungan_backup_${new Date().toISOString().slice(0, 10)}.sql`);
  };

  const handleCopySql = () => {
    const sql = generateSqlDump(
      siteSettings,
      samples,
      parameters,
      staffMembers,
      labFacilities,
      sopDocuments,
      news,
      complaints,
      feedbacks
    );
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Table summary data
  const tableList = [
    { 
      name: 'site_settings', 
      desc: 'Pengaturan identitas, akreditasi KAN, kontak dinas, visi misi, maklumat', 
      rows: 1, 
      category: 'Konfigurasi',
      primaryKey: 'id (INT)' 
    },
    { 
      name: 'admin_users', 
      desc: 'Akun pengelola & hak akses role (Admin, Mutu, Teknis, Loket)', 
      rows: 4, 
      category: 'Autentikasi',
      primaryKey: 'id (INT), username (UNIQUE)' 
    },
    { 
      name: 'parameters', 
      desc: 'Daftar parameter uji, metode SNI/APHA, baku mutu, tarif retribusi Perda', 
      rows: parameters.length || 18, 
      category: 'Pelayanan Lab',
      primaryKey: 'id (INT), code (UNIQUE)' 
    },
    { 
      name: 'samples', 
      desc: 'Permohonan uji sampel, data pelanggan, titik lokasi, pipeline status LIMS', 
      rows: samples.length, 
      category: 'Pelayanan Lab',
      primaryKey: 'id (INT), tracking_code (UNIQUE)' 
    },
    { 
      name: 'sample_results', 
      desc: 'Rincian angka hasil uji laboratorium per parameter & verifikasi baku mutu', 
      rows: samples.reduce((acc, s) => acc + (s.testResults?.length || 0), 0), 
      category: 'Pelayanan Lab',
      primaryKey: 'id (INT), sample_id (FK)' 
    },
    { 
      name: 'staff_members', 
      desc: 'Personel laboratorium, NIP, jabatan teknis, sertifikasi PPC & analis', 
      rows: staffMembers.length, 
      category: 'Profil Lembaga',
      primaryKey: 'id (INT)' 
    },
    { 
      name: 'lab_facilities', 
      desc: 'Peralatan instrumentasi canggih (AAS, UV-Vis, HVAS, Sound Level Meter)', 
      rows: labFacilities.length, 
      category: 'Profil Lembaga',
      primaryKey: 'id (INT)' 
    },
    { 
      name: 'sop_documents', 
      desc: 'Dokumen SOP alur pelayanan, teknis pengujian, dan penanganan sampel KAN', 
      rows: sopDocuments.length, 
      category: 'Tata Kelola',
      primaryKey: 'id (INT)' 
    },
    { 
      name: 'news_articles', 
      desc: 'Publikasi artikel, pemantauan Sungai Kayan, dan siaran pers lingkungan', 
      rows: news.length, 
      category: 'Informasi Publik',
      primaryKey: 'id (INT), slug (UNIQUE)' 
    },
    { 
      name: 'complaint_tickets', 
      desc: 'Tiket aduan masyarakat/pelanggan dan status tindak lanjut petugas', 
      rows: complaints.length, 
      category: 'Pengaduan',
      primaryKey: 'id (INT), ticket_number (UNIQUE)' 
    },
    { 
      name: 'skm_feedbacks', 
      desc: 'Data responden Survei Kepuasan Masyarakat (IKM) & indeks transparansi', 
      rows: feedbacks.length, 
      category: 'Evaluasi Publik',
      primaryKey: 'id (INT)' 
    },
  ];

  const filteredTables = tableList.filter(t => 
    t.name.toLowerCase().includes(searchTable.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchTable.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTable.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Status Koneksi Database MySQL */}
      <div className={`p-6 rounded-3xl border shadow-xs transition-all ${
        dbStatus.connected 
          ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-emerald-500/40 text-white' 
          : 'bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 border-teal-500/30 text-white'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                dbStatus.connected 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${dbStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {dbStatus.connected ? 'MySQL XAMPP AKTIF & TERHUBUNG' : 'MODE PENYIMPANAN LOCALSTORAGE & SQL READY'}
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
                Port 3306 • MySQL 8.x / MariaDB
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif-display flex items-center gap-2.5">
              <Database className="w-6 h-6 text-amber-300" />
              <span>Manajemen Database MySQL: <code className="text-amber-300 text-lg font-mono">db_lab_bulungan</code></span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Database ini menampung seluruh data dinamis sistem UPTD Laboratorium Lingkungan: Pengaturan website, katalog tarif retribusi, tracking sampel, profil personel, dokumen SOP, berita, pengaduan, dan survei kepuasan.
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300 font-mono">
              <div>Host: <strong className="text-white">localhost</strong></div>
              <div>•</div>
              <div>Database: <strong className="text-amber-300">db_lab_bulungan</strong></div>
              <div>•</div>
              <div>User: <strong className="text-white">root</strong></div>
              <div>•</div>
              <div>Password: <strong className="text-slate-400">(kosong / default)</strong></div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleDownloadSql}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              title="Unduh file SQL siap import ke phpMyAdmin"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Unduh database.sql</span>
            </button>

            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span>{copied ? 'Tersalin!' : 'Salin SQL'}</span>
            </button>

            <button
              onClick={checkConnection}
              disabled={isChecking}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-teal-200 text-xs font-semibold border border-teal-600 transition-all cursor-pointer"
              title="Uji ulang koneksi ke endpoint PHP / MySQL"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Tes Koneksi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'overview'
              ? 'bg-teal-800 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Status & Arsitektur</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tables')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'tables'
              ? 'bg-teal-800 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Daftar Tabel ({tableList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('guide')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'guide'
              ? 'bg-teal-800 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Panduan Import phpMyAdmin</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sql_view')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'sql_view'
              ? 'bg-teal-800 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Preview Script SQL</span>
        </button>
      </div>

      {/* SUBTAB 1: OVERVIEW & CARDS */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Informasi Konfigurasi */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  KONEKSI DATABASE
                </span>
                <Server className="w-5 h-5 text-teal-700" />
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Database Driver:</span>
                  <span className="font-semibold text-slate-900">PHP PDO MySQL</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Nama Database:</span>
                  <span className="font-mono font-bold text-teal-800">db_lab_bulungan</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Default Host:</span>
                  <span className="font-mono text-slate-800">localhost:3306</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Default User:</span>
                  <span className="font-mono text-slate-800">root</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Charset:</span>
                  <span className="font-mono text-slate-800">utf8mb4 (Unicode)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="http://localhost/phpmyadmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka phpMyAdmin (Localhost)</span>
                </a>
              </div>
            </div>

            {/* Card 2: Sinkronisasi & File SQL */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  FILE SEEDER & DUMP
                </span>
                <HardDrive className="w-5 h-5 text-amber-600" />
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  File database lengkap sudah disertakan dalam paket ZIP XAMPP:
                </p>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
                  <div>📁 <code className="font-bold text-teal-800">database.sql</code> (Root)</div>
                  <div>📁 <code className="font-bold text-teal-800">public/database.sql</code></div>
                  <div>📁 <code className="font-bold text-teal-800">public/api/config.php</code></div>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Ketika Anda mengedit data di panel admin ini, klik tombol <strong>"Unduh database.sql"</strong> untuk mendapatkan dump SQL terkini yang langsung memuat perubahan terbaru Anda!
                </p>
              </div>

              <button
                onClick={handleDownloadSql}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh SQL Backup Terkini</span>
              </button>
            </div>

            {/* Card 3: Keamanan & Role */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  AUTENTIKASI & KEAMANAN
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <p>
                  Tabel <code className="text-teal-800 font-bold bg-teal-50 px-1 py-0.5 rounded">admin_users</code> telah di-seed dengan 4 akun resmi sesuai standar ISO 17025:
                </p>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900">admin / admin123</span>
                    <span className="text-teal-700 font-medium">Administrator</span>
                  </div>
                  <div className="flex justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900">manajer.mutu / mutu123</span>
                    <span className="text-teal-700 font-medium">Manajer Mutu</span>
                  </div>
                  <div className="flex justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900">manajer.teknis / teknis123</span>
                    <span className="text-teal-700 font-medium">Manajer Teknis</span>
                  </div>
                  <div className="flex justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900">petugas.loket / loket123</span>
                    <span className="text-teal-700 font-medium">Petugas Loket/TU</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Step Guide Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  LANGKAH CEPAT DI XAMPP
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif-display">
                  Ingin Mengedit Langsung Melalui phpMyAdmin?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Cukup nyalakan MySQL di XAMPP, buka <code className="text-amber-300">http://localhost/phpmyadmin</code>, buat database <code className="text-amber-300">db_lab_bulungan</code>, lalu import file <code className="text-amber-300">database.sql</code>. Setelah itu Anda bebas mengedit tabel mana saja secara visual!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => setActiveSubTab('guide')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Baca Petunjuk Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DAFTAR TABEL & STRUKTUR */}
      {activeSubTab === 'tables' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Struktur Tabel MySQL <code className="text-teal-800 font-mono text-sm">db_lab_bulungan</code>
              </h3>
              <p className="text-xs text-slate-500">
                Total {tableList.length} tabel relasional dengan integritas data dan indexing performa.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                placeholder="Cari tabel..."
                className="w-full text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-700"
              />
              <Table className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="py-3 px-4">Nama Tabel</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Deskripsi Fungsi</th>
                  <th className="py-3 px-4 text-center">Jumlah Baris</th>
                  <th className="py-3 px-4">Kunci Utama (Primary Key)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTables.map((t, idx) => (
                  <tr key={idx} className="hover:bg-teal-50/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-teal-800 flex items-center gap-2">
                      <Table className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs">{t.desc}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-teal-50 text-teal-800 text-[11px]">
                        {t.rows} baris
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{t.primaryKey}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: PANDUAN IMPORT PHPMYADMIN */}
      {activeSubTab === 'guide' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-serif-display">
              Panduan Langkah Demi Langkah: Menyiapkan Database di XAMPP phpMyAdmin
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Ikuti 5 langkah sederhana berikut agar database MySQL siap digunakan dan dapat di-edit langsung melalui browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Langkah 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-teal-800 text-amber-300 font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <h4 className="text-sm font-bold text-slate-900">Aktifkan Apache & MySQL di XAMPP</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9.5">
                Buka <strong>XAMPP Control Panel</strong> di komputer Anda. Klik tombol <strong>Start</strong> di sebelah modul <strong>Apache</strong> dan tombol <strong>Start</strong> di sebelah modul <strong>MySQL</strong> hingga kedua teks berwarna hijau (PID & Port aktif).
              </p>
            </div>

            {/* Langkah 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-teal-800 text-amber-300 font-bold flex items-center justify-center text-xs">
                  2
                </span>
                <h4 className="text-sm font-bold text-slate-900">Buka phpMyAdmin di Browser</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9.5">
                Buka browser (Google Chrome, Firefox, Edge) lalu akses tautan:
                <br />
                <code className="text-teal-800 font-mono font-bold bg-teal-100/60 px-1 rounded">http://localhost/phpmyadmin/</code>
              </p>
            </div>

            {/* Langkah 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-teal-800 text-amber-300 font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <h4 className="text-sm font-bold text-slate-900">Buat Database Baru</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9.5">
                Di bilah samping kiri phpMyAdmin, klik <strong>New / Baru</strong>.
                Ketik nama database: <code className="text-teal-800 font-bold font-mono">db_lab_bulungan</code>.
                Pilih Collation: <strong>utf8mb4_unicode_ci</strong>, lalu klik tombol <strong>Create / Buat</strong>.
              </p>
            </div>

            {/* Langkah 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-teal-800 text-amber-300 font-bold flex items-center justify-center text-xs">
                  4
                </span>
                <h4 className="text-sm font-bold text-slate-900">Import File database.sql</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9.5">
                Klik database <code className="font-mono text-teal-800 font-bold">db_lab_bulungan</code> yang baru dibuat, lalu pilih tab <strong>Import</strong> di bagian atas. Klik <strong>Choose File / Pilih Berkas</strong> dan pilih file <code className="font-bold text-slate-900">database.sql</code>, kemudian klik tombol <strong>Import / Kirim</strong> di bagian bawah.
              </p>
            </div>

          </div>

          {/* Selesai & Cara Edit */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Selesai! Cara Mengedit Data di phpMyAdmin:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-900 list-disc list-inside pl-2">
              <li>Untuk mengedit nama dinas / visi misi: Klik tabel <code className="font-bold">site_settings</code> $\rightarrow$ klik tombol <strong>Edit</strong> pada baris pertama.</li>
              <li>Untuk menambah / mengubah tarif pengujian: Klik tabel <code className="font-bold">parameters</code> $\rightarrow$ Anda bisa mengubah kolom <code className="font-bold">price</code>, <code className="font-bold">unit</code>, atau <code className="font-bold">method</code>.</li>
              <li>Untuk mengubah status sampel atau nomor LHP: Klik tabel <code className="font-bold">samples</code> $\rightarrow$ pilih baris nomor tracking yang diinginkan $\rightarrow$ ubah kolom <code className="font-bold">status</code> atau <code className="font-bold">lhp_number</code>.</li>
            </ul>
          </div>
        </div>
      )}

      {/* SUBTAB 4: PREVIEW SCRIPT SQL */}
      {activeSubTab === 'sql_view' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Pratinjau Kode SQL (MySQL DDL & DML Seeder):
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copied ? 'Tersalin!' : 'Salin Semua'}</span>
              </button>
              <button
                onClick={handleDownloadSql}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh File .sql</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-[11px] leading-relaxed max-h-[500px] overflow-y-auto border border-slate-800 shadow-inner">
            <pre className="whitespace-pre-wrap select-all">
{generateSqlDump(
  siteSettings,
  samples,
  parameters,
  staffMembers,
  labFacilities,
  sopDocuments,
  news,
  complaints,
  feedbacks
).slice(0, 4500)}
              {'\n\n-- [Menampilkan 4.500 karakter pertama. Klik "Unduh database.sql" untuk file penuh]'}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
