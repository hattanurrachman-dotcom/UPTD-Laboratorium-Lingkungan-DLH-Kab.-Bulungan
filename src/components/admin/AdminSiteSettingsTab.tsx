import React, { useState } from 'react';
import { 
  Building2, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Radio, 
  Sparkles,
  Info
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { DEFAULT_SITE_SETTINGS } from '../../data/labData';

interface AdminSiteSettingsTabProps {
  settings: SiteSettings;
  onSaveSettings: (newSettings: SiteSettings) => void;
}

export const AdminSiteSettingsTab: React.FC<AdminSiteSettingsTabProps> = ({
  settings,
  onSaveSettings
}) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetDefault = () => {
    if (confirm('Kembalikan semua pengaturan Beranda dan Kontak ke format bawaan DLH Bulungan?')) {
      setFormData(DEFAULT_SITE_SETTINGS);
      onSaveSettings(DEFAULT_SITE_SETTINGS);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header Info Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              MENU 1 & 8: BERANDA & KONTAK LOKET
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Pengaturan Identitas Instansi, Beranda & Informasi Kontak
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Perubahan yang disimpan di sini akan langsung tampil pada Banner Utama, Running Text, Header, dan Footer publik.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleResetDefault}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-900 font-bold text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Pengaturan Beranda & Kontak resmi berhasil disimpan dan langsung aktif!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Card 1: Identitas Lembaga & Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-teal-700" />
            <h4 className="text-sm font-bold text-slate-900">1. Identitas Resmi Lembaga</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nama Unit Laboratorium
              </label>
              <input
                type="text"
                required
                value={formData.agencyName}
                onChange={(e) => handleChange('agencyName', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Dinas Induk Pemerintah Daerah
              </label>
              <input
                type="text"
                required
                value={formData.agencySub}
                onChange={(e) => handleChange('agencySub', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tagline / Slogan Resmi
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Motto Pelayanan (Maklumat)
              </label>
              <input
                type="text"
                value={formData.mottoPelayanan}
                onChange={(e) => handleChange('mottoPelayanan', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-600 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Hero Banner & Running Text */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Radio className="w-4 h-4 text-teal-700" />
            <h4 className="text-sm font-bold text-slate-900">2. Hero Banner & Running Text Pengumuman</h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Judul Besar Banner Utama (Hero Title)
              </label>
              <input
                type="text"
                required
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-600 text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Deskripsi Narasi Hero Banner
              </label>
              <textarea
                rows={3}
                required
                value={formData.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-600 text-slate-900 leading-relaxed"
              ></textarea>
            </div>

            <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-teal-950 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.announcementActive}
                    onChange={(e) => handleChange('announcementActive', e.target.checked)}
                    className="rounded border-teal-300 text-teal-700 w-4 h-4"
                  />
                  <span>Tampilkan Bilah Running Text Pengumuman</span>
                </label>
                <span className="text-[10px] font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                  {formData.announcementActive ? 'AKTIF' : 'NON-AKTIF'}
                </span>
              </div>

              <div>
                <label className="block font-bold text-teal-900 mb-1">
                  Isi Teks Pengumuman Berjalan (Marquee)
                </label>
                <input
                  type="text"
                  value={formData.runningText}
                  onChange={(e) => handleChange('runningText', e.target.value)}
                  placeholder="Ketik teks pengumuman penting yang akan berjalan di atas halaman..."
                  className="w-full p-2.5 bg-white border border-teal-300 rounded-xl focus:ring-2 focus:ring-teal-600 text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Akreditasi KAN ISO/IEC 17025 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <h4 className="text-sm font-bold text-slate-900">3. Legalitas & Nomor Akreditasi KAN</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nomor Registrasi Akreditasi KAN
              </label>
              <input
                type="text"
                required
                value={formData.kanAccreditationNumber}
                onChange={(e) => handleChange('kanAccreditationNumber', e.target.value)}
                placeholder="cth: LP-1234-IDN"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono font-bold text-teal-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Standar Akreditasi Laboratorium
              </label>
              <input
                type="text"
                required
                value={formData.kanAccreditationStd}
                onChange={(e) => handleChange('kanAccreditationStd', e.target.value)}
                placeholder="cth: SNI ISO/IEC 17025:2017"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Kontak & Jam Layanan Loket */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="w-4 h-4 text-teal-700" />
            <h4 className="text-sm font-bold text-slate-900">4. Informasi Loket Pelayanan & Kontak Resmi</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Nomor Telepon Kantor / Faksimile</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Loket Layanan & Konsultasi</span>
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                <span>Alamat Email Resmi Laboratorium</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Jam Operasional Pelayanan Loket</span>
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Alamat Fisik Kantor UPTD Lab Lingkungan DLH Bulungan
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900 leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Semua Perubahan Menu Beranda & Kontak</span>
          </button>
        </div>

      </form>
    </div>
  );
};
