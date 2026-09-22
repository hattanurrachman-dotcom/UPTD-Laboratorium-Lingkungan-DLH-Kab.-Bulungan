import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Settings, 
  Newspaper, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  Search, 
  Edit3, 
  Plus, 
  Trash2, 
  Save, 
  FileSpreadsheet, 
  Download,
  AlertCircle,
  Eye,
  Check,
  TrendingUp,
  DollarSign,
  Building2,
  GitFork,
  MessageSquareWarning,
  LogOut,
  Globe,
  Sliders
} from 'lucide-react';
import { 
  SampleRequest, 
  SampleStatus, 
  TestParameter, 
  NewsArticle, 
  AdminUser, 
  SiteSettings, 
  StaffMember, 
  LabFacility, 
  SOPDocument, 
  ComplaintTicket, 
  SKMFeedback 
} from '../types';
import { formatRupiah, formatDateIndo, getStatusInfo, getMatrixInfo } from '../utils/helpers';
import { LHPModal } from './LHPModal';
import { AdminSiteSettingsTab } from './admin/AdminSiteSettingsTab';
import { AdminProfileTab } from './admin/AdminProfileTab';
import { AdminSOPTab } from './admin/AdminSOPTab';
import { AdminComplaintsTab } from './admin/AdminComplaintsTab';

interface AdminDashboardProps {
  currentUser?: AdminUser | null;
  onLogout: () => void;
  onExitAdmin: () => void;
  // Menu 1 & 7: Site Settings
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  // Menu 2: Profile & Staff & Facilities
  staffMembers: StaffMember[];
  onUpdateStaffMembers: (staff: StaffMember[]) => void;
  labFacilities: LabFacility[];
  onUpdateLabFacilities: (facilities: LabFacility[]) => void;
  // Menu 3: Parameters
  parameters: TestParameter[];
  onUpdateParameters: (params: TestParameter[]) => void;
  // Menu 4: SOP Documents
  sopDocuments: SOPDocument[];
  onUpdateSOPDocuments: (sops: SOPDocument[]) => void;
  // Menu 5: Samples Tracking
  samples: SampleRequest[];
  onUpdateSample: (sample: SampleRequest) => void;
  // Menu 6: News
  news: NewsArticle[];
  onUpdateNews: (news: NewsArticle[]) => void;
  // Menu 7: Complaints & SKM
  complaints: ComplaintTicket[];
  onUpdateComplaints: (complaints: ComplaintTicket[]) => void;
  feedbacks: SKMFeedback[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onExitAdmin,
  siteSettings,
  onUpdateSiteSettings,
  staffMembers,
  onUpdateStaffMembers,
  labFacilities,
  onUpdateLabFacilities,
  parameters,
  onUpdateParameters,
  sopDocuments,
  onUpdateSOPDocuments,
  samples,
  onUpdateSample,
  news,
  onUpdateNews,
  complaints,
  onUpdateComplaints,
  feedbacks,
}) => {
  const [activeTab, setActiveTab] = useState<'samples' | 'parameters' | 'profile' | 'sop' | 'news' | 'skm_complaints' | 'site_settings' | 'stats'>('samples');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [matrixFilter, setMatrixFilter] = useState<string>('all');
  
  // Selected sample for editing
  const [editingSample, setEditingSample] = useState<SampleRequest | null>(null);
  const [previewSample, setPreviewSample] = useState<SampleRequest | null>(null);

  // New News Modal
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<'Berita' | 'Pengumuman' | 'Laporan'>('Berita');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  // Filtered samples
  const filteredSamples = samples.filter((s) => {
    const matchSearch = 
      s.registrationNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.institution.toLowerCase().includes(searchFilter.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchMatrix = matrixFilter === 'all' || s.matrix === matrixFilter;
    return matchSearch && matchStatus && matchMatrix;
  });

  // Calculate statistics
  const totalRevenue = samples.reduce((sum, s) => s.paymentStatus === 'Lunas' ? sum + s.totalCost : sum, 0);
  const completedSamples = samples.filter(s => s.status === 'lhp_terbit').length;
  const inProgressSamples = samples.filter(s => s.status === 'analisis_lab' || s.status === 'verifikasi' || s.status === 'verifikasi_mutu').length;
  const newSamples = samples.filter(s => s.status === 'pendaftaran' || s.status === 'kaji_ulang_bayar').length;

  const handleStatusChange = (newStatus: SampleStatus) => {
    if (!editingSample) return;

    const currentNotes = editingSample.technicianNotes || '';
    const now = new Date();
    const formattedDate = `${now.getDate()} September 2026 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newHistoryItem = {
      status: newStatus,
      timestamp: formattedDate,
      actor: 'Admin / Petugas Laboratorium DLH',
      note: `Status diperbarui menjadi ${getStatusInfo(newStatus).label}.`
    };

    let updatedSample: SampleRequest = {
      ...editingSample,
      status: newStatus,
      statusHistory: [...editingSample.statusHistory, newHistoryItem]
    };

    // If completed, ensure LHP number is generated
    if (newStatus === 'lhp_terbit' && !updatedSample.lhpNumber) {
      updatedSample.lhpNumber = `660.1/${Math.floor(100 + Math.random() * 900)}/LHP-LAB/DLH-BLG/IX/2026`;
      updatedSample.lhpReleaseDate = '2026-09-22';
    }

    setEditingSample(updatedSample);
    onUpdateSample(updatedSample);
  };

  const handleSaveSampleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSample) return;
    onUpdateSample(editingSample);
    setEditingSample(null);
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;

    const article: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newNewsTitle,
      category: newNewsCategory,
      excerpt: newNewsExcerpt || newNewsTitle,
      content: newNewsContent || newNewsExcerpt,
      date: '2026-09-21',
      author: 'Redaksi UPTD Lab Lingkungan DLH Bulungan',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
      tags: ['lablingkungan', 'dlhbulungan', 'kalimantanutara']
    };

    onUpdateNews([article, ...news]);
    setIsAddingNews(false);
    setNewNewsTitle('');
    setNewNewsExcerpt('');
    setNewNewsContent('');
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-16">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 border-b border-slate-800 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center font-bold text-white shadow-xs border border-teal-600/30">
              <LayoutDashboard className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white font-serif-display">
                  Sistem Informasi & Manajemen Laboratorium (SIM-LAB)
                </h1>
                <span className="text-[10px] font-mono bg-teal-900/80 text-teal-300 border border-teal-700 px-2 py-0.5 rounded font-bold">
                  {currentUser?.role || 'ADMIN DLH'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                UPTD Laboratorium Lingkungan Hidup Kabupaten Bulungan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {currentUser && (
              <div className="hidden md:flex flex-col text-right pr-2 border-r border-slate-700">
                <span className="text-xs font-bold text-slate-200">{currentUser.name}</span>
                <span className="text-[10px] text-teal-400 font-mono">
                  {currentUser.nip ? `NIP: ${currentUser.nip}` : `@${currentUser.username}`}
                </span>
              </div>
            )}

            <button
              onClick={onExitAdmin}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Kembali ke halaman publik pengunjung"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>Tampilan Publik</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-200 text-xs font-semibold rounded-xl border border-rose-800 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Keluar dari sesi administrator"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        
        {/* KPI Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-slate-400 text-xs block">Total Sampel Masuk</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{samples.length}</div>
            <span className="text-[10px] text-teal-700 font-semibold mt-1 block">
              Registrasi Sistem Aktif
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-slate-400 text-xs block">Dalam Pengujian Lab</span>
            <div className="text-2xl font-black text-amber-600 mt-1 font-mono">{inProgressSamples}</div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Analisis & Validasi Mutu
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-slate-400 text-xs block">LHP Selesai Terbit</span>
            <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">{completedSamples}</div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
              Siap Unduh Pelanggan
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-slate-400 text-xs block">Retribusi Daerah Masuk</span>
            <div className="text-xl sm:text-2xl font-black text-teal-800 mt-1 font-mono">{formatRupiah(totalRevenue)}</div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Disetor ke Kas Daerah
            </span>
          </div>
        </div>

        {/* Navigation Tabs - All Menus of DLH Bulungan */}
        <div className="flex border-b border-slate-300 gap-1.5 mb-6 overflow-x-auto text-xs font-bold scrollbar-thin pb-1">
          <button
            onClick={() => setActiveTab('samples')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'samples'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-teal-600" />
            <span>Sampel & LHP ({samples.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('parameters')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'parameters'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <Settings className="w-4 h-4 text-teal-600" />
            <span>Tarif & Parameter ({parameters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'profile'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>Profil, Staf & Alat ({staffMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sop')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sop'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <GitFork className="w-4 h-4 text-teal-600" />
            <span>Alur & SOP KAN ({sopDocuments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'news'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <Newspaper className="w-4 h-4 text-teal-600" />
            <span>Berita & Publikasi ({news.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skm_complaints')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'skm_complaints'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <MessageSquareWarning className="w-4 h-4 text-teal-600" />
            <span>SKM & Pengaduan ({complaints.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('site_settings')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'site_settings'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <Sliders className="w-4 h-4 text-teal-600" />
            <span>Beranda & Kontak</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-2.5 px-3.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'stats'
                ? 'bg-white text-teal-900 border-t-2 border-teal-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-200/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <span>Laporan Retribusi</span>
          </button>
        </div>

        {/* TAB 1: SAMPLES MANAGEMENT */}
        {activeTab === 'samples' && (
          <div className="space-y-4">
            
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex-1 w-full flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari no. registrasi, nama pemohon, atau instansi..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
                >
                  <option value="all">Semua Status Tahapan</option>
                  <option value="pendaftaran">Pendaftaran Baru</option>
                  <option value="kaji_ulang_bayar">Kaji Ulang & SKRD</option>
                  <option value="analisis_lab">Analisis Laboratorium</option>
                  <option value="verifikasi_mutu">Verifikasi Mutu</option>
                  <option value="lhp_terbit">LHP Selesai Terbit</option>
                </select>

                <select
                  value={matrixFilter}
                  onChange={(e) => setMatrixFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
                >
                  <option value="all">Semua Matriks</option>
                  <option value="air_limbah">Air Limbah</option>
                  <option value="air_permukaan">Air Permukaan</option>
                  <option value="air_minum">Air Minum</option>
                  <option value="udara_ambien">Udara Ambien</option>
                  <option value="kebisingan">Kebisingan</option>
                  <option value="emisi">Emisi</option>
                </select>
              </div>

              <div className="text-xs text-slate-500 shrink-0">
                Menampilkan <strong>{filteredSamples.length}</strong> data sampel
              </div>
            </div>

            {/* Samples Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">No. Registrasi</th>
                      <th className="py-3 px-4">Pemohon & Instansi</th>
                      <th className="py-3 px-4">Matriks</th>
                      <th className="py-3 px-4">Status Pengujian</th>
                      <th className="py-3 px-4 text-right">Retribusi</th>
                      <th className="py-3 px-4 text-center">No. LHP</th>
                      <th className="py-3 px-4 text-center w-32">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSamples.map((sample) => {
                      const statusMeta = getStatusInfo(sample.status);
                      const matrixMeta = getMatrixInfo(sample.matrix);
                      return (
                        <tr key={sample.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-teal-900">
                            {sample.registrationNumber}
                            <span className="block text-[10px] text-slate-400 font-normal font-sans">
                              {formatDateIndo(sample.createdAt)}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{sample.customerName}</div>
                            <div className="text-[11px] text-slate-500">{sample.institution}</div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                              {matrixMeta.label.split(' ')[0]}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              sample.status === 'lhp_terbit'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              <span>{statusMeta.label}</span>
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                            {formatRupiah(sample.totalCost)}
                            <span className={`block text-[9px] font-sans font-normal ${
                              sample.paymentStatus === 'Lunas' ? 'text-emerald-600 font-bold' : 'text-amber-600'
                            }`}>
                              {sample.paymentStatus}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center font-mono text-[11px]">
                            {sample.lhpNumber ? (
                              <span className="text-teal-900 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                {sample.lhpNumber}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic text-[10px]">Belum Terbit</span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingSample(sample)}
                                className="p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg transition-colors cursor-pointer"
                                title="Edit status & hasil uji"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setPreviewSample(sample)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                                title="Pratinjau Dokumen LHP"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PARAMETERS & TARIFFS */}
        {activeTab === 'parameters' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Daftar Master Parameter Uji & Tarif Retribusi Perda
                </h3>
                <p className="text-xs text-slate-500">
                  Parameter baku mutu pengujian laboratorium lingkungan hidup Kabupaten Bulungan.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg">
                Total: {parameters.length} Parameter
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Kode</th>
                    <th className="py-2.5 px-3">Nama Parameter</th>
                    <th className="py-2.5 px-3">Matriks</th>
                    <th className="py-2.5 px-3">Metode Standar SNI</th>
                    <th className="py-2.5 px-3">Baku Mutu</th>
                    <th className="py-2.5 px-3 text-right">Tarif Retribusi</th>
                    <th className="py-2.5 px-3 text-center">Akreditasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parameters.map((param) => (
                    <tr key={param.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-teal-800">{param.code}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{param.name}</td>
                      <td className="py-2.5 px-3 text-slate-600">{getMatrixInfo(param.matrix).label.split(' ')[0]}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{param.methodSNI}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{param.standardLimit}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-teal-900">
                        {formatRupiah(param.price)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {param.isAccreditedKAN ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            KAN
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Dalam Proses</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: NEWS MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Manajemen Berita & Publikasi</h3>
                <p className="text-xs text-slate-500">Kelola artikel kegiatan laboratorium dan informasi lingkungan.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingNews(true)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Berita Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded inline-block">
                    {item.category}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
                    <span>{item.date}</span>
                    <span>Oleh: {item.author.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add News Modal */}
            {isAddingNews && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
                <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4">
                  <h4 className="text-base font-bold text-slate-900">Tambah Publikasi Baru</h4>
                  <form onSubmit={handleAddNews} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold mb-1">Judul Berita / Pengumuman</label>
                      <input
                        type="text"
                        required
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        placeholder="Contoh: Pemantauan Kualitas Air Sungai Kayan Periode Triwulan III"
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Kategori</label>
                      <select
                        value={newNewsCategory}
                        onChange={(e) => setNewNewsCategory(e.target.value as any)}
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      >
                        <option value="Berita">Kegiatan & Berita</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Laporan">Laporan Kualitas Lingkungan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Ringkasan Singkat</label>
                      <textarea
                        rows={2}
                        value={newNewsExcerpt}
                        onChange={(e) => setNewNewsExcerpt(e.target.value)}
                        placeholder="Ringkasan berita..."
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Isi Artikel Lengkap</label>
                      <textarea
                        rows={4}
                        value={newNewsContent}
                        onChange={(e) => setNewNewsContent(e.target.value)}
                        placeholder="Uraian isi artikel lengkap..."
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingNews(false)}
                        className="px-4 py-2 text-slate-600"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl"
                      >
                        Publikasikan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STATS & REPORT EXPORT */}
        {activeTab === 'stats' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Rekapitulasi Layanan & Pendapatan Retribusi</h3>
              <p className="text-xs text-slate-500">Laporan pertanggungjawaban operasional pengujian laboratorium DLH Bulungan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Total Sampel Air Limbah</span>
                <div className="text-xl font-black text-teal-800 mt-1 font-mono">
                  {samples.filter(s => s.matrix === 'air_limbah').length} Sampel
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Total Sampel Air Minum & Permukaan</span>
                <div className="text-xl font-black text-sky-800 mt-1 font-mono">
                  {samples.filter(s => s.matrix === 'air_minum' || s.matrix === 'air_permukaan').length} Sampel
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">Total Sampel Udara & Kebisingan</span>
                <div className="text-xl font-black text-indigo-800 mt-1 font-mono">
                  {samples.filter(s => s.matrix === 'udara_ambien' || s.matrix === 'kebisingan').length} Titik
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Format siap cetak untuk laporan audit BPK / Inspektorat Daerah.
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Cetak / Ekspor Rekapitulasi Data</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE, STAFF & FACILITIES */}
        {activeTab === 'profile' && (
          <AdminProfileTab
            settings={siteSettings}
            onUpdateSettings={onUpdateSiteSettings}
            staffMembers={staffMembers}
            onUpdateStaffMembers={onUpdateStaffMembers}
            labFacilities={labFacilities}
            onUpdateLabFacilities={onUpdateLabFacilities}
          />
        )}

        {/* TAB 6: ALUR & SOP KAN */}
        {activeTab === 'sop' && (
          <AdminSOPTab
            sopDocuments={sopDocuments}
            onUpdateSOPDocuments={onUpdateSOPDocuments}
          />
        )}

        {/* TAB 7: SKM & COMPLAINTS */}
        {activeTab === 'skm_complaints' && (
          <AdminComplaintsTab
            complaints={complaints}
            onUpdateComplaints={onUpdateComplaints}
            feedbacks={feedbacks}
          />
        )}

        {/* TAB 8: BERANDA & SITE SETTINGS */}
        {activeTab === 'site_settings' && (
          <AdminSiteSettingsTab
            settings={siteSettings}
            onSaveSettings={onUpdateSiteSettings}
          />
        )}

      </div>

      {/* SAMPLE EDIT MODAL */}
      {editingSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  {editingSample.registrationNumber}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  Ubah Status & Data Analisis Sampel
                </h4>
              </div>
              <button
                onClick={() => setEditingSample(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSampleEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Status Pengujian</label>
                  <select
                    value={editingSample.status}
                    onChange={(e) => handleStatusChange(e.target.value as SampleStatus)}
                    className="w-full p-2 border border-slate-300 rounded-xl font-bold text-teal-900"
                  >
                    <option value="pendaftaran">1. Pendaftaran Baru</option>
                    <option value="kaji_ulang_bayar">2. Kaji Ulang & SKRD</option>
                    <option value="analisis_lab">3. Analisis Laboratorium</option>
                    <option value="verifikasi_mutu">4. Verifikasi & Validasi Mutu</option>
                    <option value="lhp_terbit">5. LHP Selesai Terbit</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Status Pembayaran SKRD</label>
                  <select
                    value={editingSample.paymentStatus}
                    onChange={(e) => setEditingSample({ ...editingSample, paymentStatus: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="Belum Lunas">Belum Lunas</option>
                    <option value="Lunas">Lunas (SKRD Valid)</option>
                    <option value="Bebas Retribusi / Program DLH">Bebas Retribusi / Program DLH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Catatan Analis / Keterangan Lab</label>
                <textarea
                  rows={3}
                  value={editingSample.technicianNotes || ''}
                  onChange={(e) => setEditingSample({ ...editingSample, technicianNotes: e.target.value })}
                  placeholder="Catatan hasil pengujian, reagen, atau kondisi sampel..."
                  className="w-full p-2 border border-slate-300 rounded-xl"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nomor LHP Resmi (jika terbit)</label>
                <input
                  type="text"
                  value={editingSample.lhpNumber || ''}
                  onChange={(e) => setEditingSample({ ...editingSample, lhpNumber: e.target.value })}
                  placeholder="660.1/xxx/LHP-LAB/DLH-BLG/IX/2026"
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSample(null)}
                  className="px-4 py-2 text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LHP PREVIEW MODAL */}
      <LHPModal
        sample={previewSample}
        isOpen={Boolean(previewSample)}
        onClose={() => setPreviewSample(null)}
      />

    </div>
  );
};
