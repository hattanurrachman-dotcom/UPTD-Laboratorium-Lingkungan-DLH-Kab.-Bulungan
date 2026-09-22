import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  UserCheck, 
  CheckCircle2, 
  Users, 
  FileText,
  ChevronRight,
  Eye,
  Sparkles
} from 'lucide-react';
import { STAFF_MEMBERS, LAB_FACILITIES } from '../data/labData';

export const ProfileSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'tentang' | 'struktur' | 'akreditasi' | 'fasilitas'>('tentang');

  return (
    <section className="py-12 bg-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Profil Lembaga & Legalitas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            UPTD Laboratorium Lingkungan Hidup Kab. Bulungan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Unit Pelaksana Teknis Daerah yang bertugas melaksanakan pengujian laboratorium kualitas lingkungan hidup yang kredibel, terstandar, dan berintegritas.
          </p>

          {/* Sub Navigation Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-slate-100 rounded-2xl max-w-2xl mx-auto text-xs">
            <button
              onClick={() => setActiveSubTab('tentang')}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeSubTab === 'tentang'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visi, Misi & Maklumat
            </button>
            <button
              onClick={() => setActiveSubTab('struktur')}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeSubTab === 'struktur'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Struktur Organisasi
            </button>
            <button
              onClick={() => setActiveSubTab('akreditasi')}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeSubTab === 'akreditasi'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sertifikasi & KAN
            </button>
            <button
              onClick={() => setActiveSubTab('fasilitas')}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeSubTab === 'fasilitas'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SDM & Instrumen Lab
            </button>
          </div>
        </div>

        {/* SUBTAB 1: TENTANG KAMI, VISI, MISI, MAKLUMAT */}
        {activeSubTab === 'tentang' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Story & Background */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Sejarah & Peran Strategis
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display">
                  Mengawal Kualitas Lingkungan Bumi Benuanta Sejak Era Pembentukan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  UPTD Laboratorium Lingkungan Dinas Lingkungan Hidup Kabupaten Bulungan dibentuk sebagai wujud komitmen Pemerintah Daerah dalam menjawab tantangan pesatnya industrialisasi di Kalimantan Utara, khususnya perkebunan kelapa sawit, pertambangan batu bara, serta pengembangan Kawasan Industri Hijau Indonesia (KIHI) Tanah Kuning - Mangkupadi.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Berlokasi strategis di ibukota Tanjung Selor, laboratorium ini bertugas memantau kualitas air Daerah Aliran Sungai (DAS) Kayan yang menjadi urat nadi peradaban masyarakat Bulungan, memverifikasi kepatuhan Instalasi Pengolahan Air Limbah (IPAL) industri, dan menguji kelayakan air minum bagi konsumsi publik.
                </p>
                
                {/* Maklumat Pelayanan MANTAP */}
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-5 mt-4">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-sm mb-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Maklumat Pelayanan "MANTAP"</span>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan pengujian laboratorium lingkungan sesuai standar pelayanan yang telah ditetapkan, serta siap menerima sanksi sesuai peraturan perundang-undangan apabila pelayanan yang diberikan tidak memuaskan."
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-4 pt-3 border-t border-teal-200/60 text-center">
                    <div className="bg-white p-2 rounded-xl shadow-2xs">
                      <strong className="text-teal-800 text-sm block">M</strong>
                      <span className="text-[10px] text-slate-600 font-medium">Melayani</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow-2xs">
                      <strong className="text-teal-800 text-sm block">A</strong>
                      <span className="text-[10px] text-slate-600 font-medium">Akurat</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow-2xs">
                      <strong className="text-teal-800 text-sm block">N</strong>
                      <span className="text-[10px] text-slate-600 font-medium">Nyaman</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow-2xs">
                      <strong className="text-teal-800 text-sm block">T</strong>
                      <span className="text-[10px] text-slate-600 font-medium">Transparan</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow-2xs">
                      <strong className="text-teal-800 text-sm block">A</strong>
                      <span className="text-[10px] text-slate-600 font-medium">Akuntabel</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl shadow-2xs">
                      <strong className="text-teal-800 text-sm block">P</strong>
                      <span className="text-[10px] text-slate-600 font-medium">Profesional</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: Lab Facility Visual Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                    alt="Laboratorium Lingkungan DLH Bulungan"
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Fasilitas Resmi Pemerintah Daerah
                    </span>
                    <h4 className="text-base font-bold">Gedung UPTD Laboratorium Lingkungan</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Dilengkapi ruang instrumen AAS, spektrofotometri, ruang preparasi basah, dan inkubasi mikrobiologi.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xl font-black text-teal-800">100%</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">SOP Berstandar KAN</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <span className="text-xl font-black text-amber-600">BSrE</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">Sertifikasi TTE Resmi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visi & Misi Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-teal-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-teal-950/80 px-2.5 py-0.5 rounded-full border border-teal-600/40">
                  VISI KAMI
                </span>
                <h4 className="text-lg sm:text-xl font-bold mt-3 font-serif-display leading-snug">
                  "Menjadi Laboratorium Penguji Lingkungan yang Unggul, Akurat, dan Terpercaya di Wilayah Kalimantan Bagian Utara."
                </h4>
                <p className="text-xs text-teal-100 mt-3 leading-relaxed">
                  Berorientasi pada kepuasan pelanggan, kepatuhan baku mutu nasional, dan perlindungan ekologis ekosistem Sungai Kayan dan pesisir Bulungan.
                </p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/60 px-2.5 py-0.5 rounded-full border border-teal-300">
                  MISI LABORATORIUM
                </span>
                <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Menerapkan Sistem Manajemen Mutu laboratorium penguji secara konsisten sesuai SNI ISO/IEC 17025:2017.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Menghasilkan data pengujian kualitas lingkungan yang valid, teliti, dan memiliki kepastian hukum.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Meningkatkan kompetensi sumber daya manusia analis dan petugas pengambil contoh (PPC) secara berkelanjutan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Memberikan pelayanan publik yang transparan, mudah, dan bebas dari gratifikasi bagi seluruh pemangku kepentingan.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 2: STRUKTUR ORGANISASI */}
        {activeSubTab === 'struktur' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/60 px-3 py-1 rounded-full border border-teal-300">
                Bagan Struktur Organisasi
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-serif-display">
                Susunan Personel UPTD Laboratorium Lingkungan Hidup
              </h3>
              <p className="text-xs text-slate-500 max-w-xl mx-auto mt-1">
                Berdasarkan Peraturan Bupati Bulungan tentang Pembentukan, Kedudukan, dan Tugas UPTD Laboratorium Lingkungan pada Dinas Lingkungan Hidup.
              </p>

              {/* Hierarchy Tree Visual */}
              <div className="mt-8 space-y-6 max-w-4xl mx-auto">
                
                {/* Level 1: Kepala Dinas */}
                <div className="max-w-md mx-auto bg-gradient-to-r from-teal-900 to-sky-900 text-white p-4 rounded-2xl shadow-md border border-teal-600">
                  <div className="text-[10px] uppercase font-bold text-amber-300">Pembina / Penanggung Jawab</div>
                  <h4 className="text-sm sm:text-base font-bold">Drs. H. M. Said, M.Si</h4>
                  <p className="text-xs text-teal-200">Kepala Dinas Lingkungan Hidup Kab. Bulungan</p>
                  <p className="text-[10px] text-slate-300 font-mono mt-0.5">NIP. 19700812 199603 1 003</p>
                </div>

                <div className="w-0.5 h-6 bg-teal-400 mx-auto"></div>

                {/* Level 2: Kepala UPTD */}
                <div className="max-w-md mx-auto bg-white p-4 rounded-2xl shadow-md border-2 border-teal-600">
                  <div className="text-[10px] uppercase font-bold text-teal-700">Kepala Laboratorium</div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Dra. Hj. Wahyuni, M.Si</h4>
                  <p className="text-xs text-slate-600">Kepala UPTD Laboratorium Lingkungan</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">NIP. 19750415 199903 2 005</p>
                </div>

                <div className="w-0.5 h-6 bg-teal-400 mx-auto"></div>

                {/* Level 3: Kasubag TU, Manajer Mutu, Manajer Teknis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-400 transition-all text-center">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Administrasi & Keuangan</div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Rahmadi, S.E</h5>
                    <p className="text-[11px] text-teal-800 font-medium">Kasubag Tata Usaha</p>
                    <p className="text-[10px] text-slate-400 font-mono">NIP. 19820311 200801 1 012</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-400 transition-all text-center">
                    <div className="text-[10px] uppercase font-bold text-teal-600">Penjaminan Mutu KAN</div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Nur Aini, S.Si</h5>
                    <p className="text-[11px] text-teal-800 font-medium">Manajer Mutu</p>
                    <p className="text-[10px] text-slate-400 font-mono">NIP. 19880228 201402 2 001</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-400 transition-all text-center">
                    <div className="text-[10px] uppercase font-bold text-sky-600">Operasional Pengujian</div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Ahmad Fauzi, S.T</h5>
                    <p className="text-[11px] text-teal-800 font-medium">Manajer Teknis</p>
                    <p className="text-[10px] text-slate-400 font-mono">NIP. 19840920 201001 1 018</p>
                  </div>
                </div>

                {/* Level 4: Tim Analis & PPC */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-700 mb-3">Kelompok Jabatan Fungsional Teknis & Analis Laboratorium:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-teal-50/50 p-3 rounded-xl border border-teal-200 text-left">
                      <div className="font-bold text-xs text-slate-900">Nurul Hidayati, S.Si</div>
                      <div className="text-[11px] text-teal-800">Koord. Analis Kimia & Logam (AAS)</div>
                      <div className="text-[10px] text-slate-500 mt-1">Sertifikasi Personel Penguji KAN</div>
                    </div>

                    <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-200 text-left">
                      <div className="font-bold text-xs text-slate-900">Bayu Prasetyo, S.Tr.Kes</div>
                      <div className="text-[11px] text-sky-800">Koord. Petugas Sampling (PPC)</div>
                      <div className="text-[10px] text-slate-500 mt-1">Sertifikasi BNSP Pengambil Contoh</div>
                    </div>

                    <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 text-left">
                      <div className="font-bold text-xs text-slate-900">Rina Marlina, A.Md.AK</div>
                      <div className="text-[11px] text-emerald-800">Analis Mikrobiologi & Fisika</div>
                      <div className="text-[10px] text-slate-500 mt-1">Sertifikasi Pengujian E. Coli & BOD</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: AKREDITASI KAN & RUANG LINGKUP */}
        {activeSubTab === 'akreditasi' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Accreditation Showcase Banner */}
            <div className="bg-gradient-to-r from-teal-900 via-teal-850 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SERTIFIKAT AKREDITASI KAN RESMI</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-display">
                    Nomor Akreditasi: LP-1234-IDN
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    UPTD Laboratorium Lingkungan Hidup Kabupaten Bulungan telah memenuhi persyaratan <strong>SNI ISO/IEC 17025:2017</strong> (General requirements for the competence of testing and calibration laboratories).
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-teal-200 pt-2 font-mono">
                    <div>Masa Berlaku: <strong className="text-white">Hingga 2029</strong></div>
                    <div>•</div>
                    <div>Lembaga Akreditasi: <strong className="text-white">Komite Akreditasi Nasional</strong></div>
                  </div>
                </div>

                {/* KAN Badge Graphic */}
                <div className="w-32 h-32 rounded-2xl bg-white p-3 flex flex-col items-center justify-center text-center shadow-lg shrink-0 border-4 border-amber-400">
                  <ShieldCheck className="w-12 h-12 text-teal-800" />
                  <span className="text-xs font-black text-slate-900 mt-1">KAN</span>
                  <span className="text-[9px] font-mono font-bold text-slate-600">LP-1234-IDN</span>
                </div>
              </div>
            </div>

            {/* Scope Summary Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Lampiran Ruang Lingkup Akreditasi KAN (Testing Scope)</span>
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Berikut adalah parameter-parameter yang telah diases dan dinyatakan kompeten secara resmi oleh Komite Akreditasi Nasional:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200">
                  <strong className="text-teal-900 block font-bold mb-1">Air Permukaan (Sungai)</strong>
                  <ul className="text-slate-600 space-y-1 text-[11px]">
                    <li>• pH (SNI 6989.11:2019)</li>
                    <li>• TSS / Padatan Tersuspensi (SNI 6989.3:2019)</li>
                    <li>• DO / Oksigen Terlarut (SNI 06-6989.14-2004)</li>
                    <li>• BOD5 (SNI 6989.72:2009)</li>
                    <li>• COD Refluks (SNI 6989.2:2019)</li>
                    <li>• Besi (Fe) & Mangan (Mn) AAS</li>
                  </ul>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200">
                  <strong className="text-amber-900 block font-bold mb-1">Air Limbah Industri</strong>
                  <ul className="text-slate-600 space-y-1 text-[11px]">
                    <li>• pH Air Limbah (SNI 6989.11:2019)</li>
                    <li>• TSS Air Limbah (SNI 6989.3:2019)</li>
                    <li>• BOD5 & COD Refluks Tertutup</li>
                    <li>• Minyak dan Lemak (SNI 6989.10:2011)</li>
                    <li>• Amoniak Bebas (SNI 06-6989.30-2005)</li>
                    <li>• Logam Berat Pb & Cd (AAS)</li>
                  </ul>
                </div>

                <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-200">
                  <strong className="text-sky-900 block font-bold mb-1">Air Minum & Udara Ambien</strong>
                  <ul className="text-slate-600 space-y-1 text-[11px]">
                    <li>• Kekeruhan & TDS Air Minum</li>
                    <li>• Bakteri E. Coli & Total Koliform</li>
                    <li>• Sulfur Dioksida (SO2) Pararosanilin</li>
                    <li>• Nitrogen Dioksida (NO2) Saltzman</li>
                    <li>• Kebisingan Lingkungan 24 Jam (SNI 8427:2017)</li>
                    <li>• Partikulat Debu PM10 & PM2.5 (HVAS)</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 4: FASILITAS & INSTRUMEN LAB */}
        {activeSubTab === 'fasilitas' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LAB_FACILITIES.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {fac.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2">
                      {fac.name}
                    </h4>
                    <div className="text-xs font-mono font-semibold text-teal-700 mt-0.5">
                      {fac.brandModel}
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {fac.functionDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg">
                    <span className="font-bold text-slate-700 block">Spesifikasi:</span>
                    {fac.specs}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
