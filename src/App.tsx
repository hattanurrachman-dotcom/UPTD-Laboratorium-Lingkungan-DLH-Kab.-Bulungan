import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickServices } from './components/QuickServices';
import { SampleSubmissionModal } from './components/SampleSubmissionModal';
import { SampleTracking } from './components/SampleTracking';
import { TariffCalculator } from './components/TariffCalculator';
import { ProfileSection } from './components/ProfileSection';
import { FlowAndSOPSection } from './components/FlowAndSOPSection';
import { NewsSection } from './components/NewsSection';
import { SKMAndComplaintSection } from './components/SKMAndComplaintSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { LocalhostGuideModal } from './components/LocalhostGuideModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_SAMPLE_REQUESTS, 
  LAB_PARAMETERS, 
  NEWS_ITEMS 
} from './data/labData';
import { SampleRequest, TestParameter, NewsItem } from './types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Download, 
  Building2, 
  ShieldCheck, 
  GitFork, 
  Calculator,
  Newspaper
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  
  // Application Data States
  const [samples, setSamples] = useState<SampleRequest[]>(INITIAL_SAMPLE_REQUESTS);
  const [parameters, setParameters] = useState<TestParameter[]>(LAB_PARAMETERS);
  const [news, setNews] = useState<NewsItem[]>(NEWS_ITEMS);

  // Modals
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isLocalhostGuideOpen, setIsLocalhostGuideOpen] = useState(false);
  const [trackingInitialCode, setTrackingInitialCode] = useState('');
  
  // Notification toast for newly registered sample
  const [newlyRegisteredCode, setNewlyRegisteredCode] = useState<string | null>(null);

  const handleOpenSubmission = () => {
    setIsSubmissionModalOpen(true);
  };

  const handleOpenTrackingWithCode = (code?: string) => {
    setTrackingInitialCode(code || '');
    setIsTrackingModalOpen(true);
  };

  const handleSubmissionSuccess = (newSample: SampleRequest) => {
    setSamples([newSample, ...samples]);
    setNewlyRegisteredCode(newSample.registrationNumber);
  };

  const handleUpdateSample = (updatedSample: SampleRequest) => {
    setSamples(prev => prev.map(s => s.id === updatedSample.id ? updatedSample : s));
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification for New Registration */}
      {newlyRegisteredCode && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-teal-900 text-white p-4 rounded-2xl shadow-2xl border-2 border-teal-500 flex items-center justify-between gap-4 animate-slideUp">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-amber-300">Pendaftaran Berhasil!</div>
              <div className="text-xs font-mono font-bold mt-0.5">{newlyRegisteredCode}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleOpenTrackingWithCode(newlyRegisteredCode);
                setNewlyRegisteredCode(null);
              }}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Lacak Sekarang
            </button>
            <button
              onClick={() => setNewlyRegisteredCode(null)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        onOpenSubmissionModal={handleOpenSubmission}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        onOpenLocalhostGuide={() => setIsLocalhostGuideOpen(true)}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      {/* ADMIN DASHBOARD OR PUBLIC PORTAL */}
      {isAdminMode ? (
        <AdminDashboard
          samples={samples}
          onUpdateSample={handleUpdateSample}
          parameters={parameters}
          onUpdateParameters={setParameters}
          news={news}
          onUpdateNews={setNews}
          onExitAdmin={() => setIsAdminMode(false)}
        />
      ) : (
        <main className="flex-1">
          
          {/* TAB 1: BERANDA */}
          {activeTab === 'beranda' && (
            <div>
              {/* Hero Banner with Instant Tracking Search */}
              <Hero
                onOpenSubmissionModal={handleOpenSubmission}
                onOpenTrackingModal={(code?: string) => handleOpenTrackingWithCode(code || '')}
                onNavigateToTab={navigateTo}
              />

              {/* 4 Quick Access Feature Cards */}
              <QuickServices
                onOpenSubmissionModal={handleOpenSubmission}
                onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
                onNavigateToTab={navigateTo}
              />

              {/* Home Teaser: Highlight Layanan & Tarif Retribusi */}
              <div className="py-12 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
                        <Calculator className="w-3.5 h-3.5 text-teal-600" />
                        <span>Katalog Parameter & Tarif Perda</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display">
                        Parameter Pengujian Lingkungan Terakreditasi
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                        Mendukung pemenuhan baku mutu air limbah industri sawit, air minum, air sungai, dan udara ambien di seluruh wilayah Bulungan.
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('tarif')}
                      className="px-5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl border border-teal-200 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>Buka Simulasi & Daftar Lengkap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 4 Mini Matrix Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: 'Air Limbah Industri & Domestik',
                        desc: 'Pengujian BOD5, COD, TSS, Minyak Lemak, Logam Berat, dan Amoniak sesuai Permen LHK No. 5/2014.',
                        code: '18+ Parameter',
                        accreditation: 'SNI ISO/IEC 17025',
                      },
                      {
                        title: 'Air Permukaan (Sungai Kayan)',
                        desc: 'Pemantauan kualitas air badan air kelas II, DO, Kekeruhan, Nitrat, Fosfat, dan Logam Terlarut.',
                        code: '15+ Parameter',
                        accreditation: 'SNI ISO/IEC 17025',
                      },
                      {
                        title: 'Air Minum & Higiene Sanitasi',
                        desc: 'Uji Depot Air Minum Isi Ulang (DAMIU), E. Coli, Total Koliform, dan Logam Berbahaya Permenkes 2/2023.',
                        code: '12+ Parameter',
                        accreditation: 'SNI ISO/IEC 17025',
                      },
                      {
                        title: 'Udara Ambien & Kebisingan',
                        desc: 'Pengujian partikulat debu TSP, PM10, SO2, NO2, dan tingkat kebisingan lingkungan siang malam.',
                        code: '8+ Parameter',
                        accreditation: 'Standar SNI & PP 22/2021',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase text-teal-700 font-mono">
                            {item.code}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200/60 text-[10px] font-semibold text-teal-800 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                          <span>{item.accreditation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Teaser: Alur Pelayanan 5 Langkah */}
              <div className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display">
                      Alur Pengujian Sampel yang Transparan & Akuntabel
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Seluruh tahapan pengujian dapat dipantau langsung secara real-time melalui sistem tracking online.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                    {[
                      { num: '01', title: 'Pendaftaran', sub: 'Online / Loket Lab' },
                      { num: '02', title: 'Kaji Ulang', sub: 'SKRD Retribusi' },
                      { num: '03', title: 'Analisis Lab', sub: 'Pengujian SNI' },
                      { num: '04', title: 'Verifikasi Mutu', sub: 'Validasi Manajer' },
                      { num: '05', title: 'LHP Digital Sah', sub: 'TTE & Unduh PDF' },
                    ].map((step, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                        <div className="w-8 h-8 rounded-full bg-teal-800 text-amber-300 font-black text-xs mx-auto flex items-center justify-center">
                          {step.num}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-2">{step.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{step.sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => navigateTo('alur')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
                    >
                      <span>Lihat Rincian Alur Lengkap & SOP Mutu Laboratorium</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Home Teaser: Berita & Publikasi Terkini */}
              <div className="py-12 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display">
                        Publikasi & Kabar Terkini Laboratorium
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Transparansi hasil pemantauan lingkungan dan kegiatan UPTD DLH Bulungan.
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('berita')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
                    >
                      <Newspaper className="w-3.5 h-3.5 text-teal-600" />
                      <span>Semua Berita</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.slice(0, 3).map((article) => (
                      <div
                        key={article.id}
                        onClick={() => navigateTo('berita')}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-400 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col group"
                      >
                        <div className="h-44 overflow-hidden relative">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-teal-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                            {article.category}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <div className="text-[10px] text-slate-400">{article.date}</div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-2 group-hover:text-teal-800 transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                              {article.summary || article.excerpt}
                            </p>
                          </div>
                          <div className="pt-2 text-[11px] font-bold text-teal-700 flex items-center gap-1">
                            <span>Baca Selengkapnya</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PROFIL */}
          {activeTab === 'profil' && <ProfileSection />}

          {/* TAB 3: TARIF & PARAMETER */}
          {activeTab === 'tarif' && (
            <TariffCalculator onOpenSubmissionModal={handleOpenSubmission} />
          )}

          {/* TAB 4: ALUR & SOP */}
          {activeTab === 'alur' && (
            <FlowAndSOPSection onOpenSubmissionModal={handleOpenSubmission} />
          )}

          {/* TAB 5: TRACKING STATUS */}
          {activeTab === 'tracking' && (
            <SampleTracking
              samples={samples}
              isEmbedded={true}
            />
          )}

          {/* TAB 6: BERITA & PUBLIKASI */}
          {activeTab === 'berita' && <NewsSection />}

          {/* TAB 7: SKM & PENGADUAN */}
          {activeTab === 'skm' && <SKMAndComplaintSection />}

          {/* TAB 8: KONTAK */}
          {activeTab === 'kontak' && <ContactSection />}

        </main>
      )}

      {/* POPUP MODAL: SAMPLE REGISTRATION FORM */}
      <SampleSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onSampleCreated={handleSubmissionSuccess}
        onOpenTracking={(regNumber: string) => handleOpenTrackingWithCode(regNumber)}
      />

      {/* POPUP MODAL: SAMPLE TRACKING (LAUNCHED FROM HERO OR NAVBAR) */}
      <SampleTracking
        samples={samples}
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        initialCode={trackingInitialCode}
        isEmbedded={false}
      />

      {/* POPUP MODAL: LOCALHOST ZIP GUIDE */}
      <LocalhostGuideModal
        isOpen={isLocalhostGuideOpen}
        onClose={() => setIsLocalhostGuideOpen(false)}
      />

      {/* Government Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdmin={() => {
          setIsAdminMode(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
