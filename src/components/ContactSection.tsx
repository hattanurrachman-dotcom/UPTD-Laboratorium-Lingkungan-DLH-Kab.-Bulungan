import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';

import { SiteSettings } from '../types';
import { DEFAULT_SITE_SETTINGS } from '../data/labData';

interface ContactSectionProps {
  settings?: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings = DEFAULT_SITE_SETTINGS,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSent(true);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Loket Pelayanan & Hubungi Kami</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            Kontak & Lokasi Laboratorium Lingkungan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Kunjungi loket pelayanan penerimaan sampel atau hubungi petugas kami untuk konsultasi teknis pengujian dan permohonan pengambilan contoh (PPC).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact & Schedule Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main Office Info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-800 text-amber-300 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {settings.agencyName || 'UPTD Laboratorium Lingkungan Hidup'}
                  </h3>
                  <p className="text-xs text-teal-800 font-semibold">
                    {settings.agencySub || 'Dinas Lingkungan Hidup Pemerintah Kabupaten Bulungan'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">Alamat Kantor & Laboratorium:</strong>
                    <span>{settings.address || 'Jl. Kolonel Soetadji No. 1, Tanjung Selor Hilir, Kec. Tanjung Selor, Kabupaten Bulungan, Kalimantan Utara 77212'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <strong className="text-slate-800 block">Telepon / Fax Kantor:</strong>
                    <span className="font-mono">{settings.phone || '(0552) 21124 / 21890'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-slate-800 block">WhatsApp Layanan & Konsultasi Teknis:</strong>
                    <a 
                      href={`https://wa.me/${(settings.whatsapp || '6281254332190').replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="font-mono text-emerald-700 font-bold hover:underline"
                    >
                      {settings.whatsapp || '+62 812-5433-2190'} (Loket Lab DLH Bulungan)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <strong className="text-slate-800 block">Surat Elektronik (Email Resmi):</strong>
                    <span className="font-mono text-teal-800">{settings.email || 'lablingkungan@bulungan.go.id'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-teal-700/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Jadwal Operasional Penerimaan Sampel</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-teal-200 block text-[11px]">Senin – Kamis</span>
                  <strong className="text-sm font-mono text-white block mt-0.5">08.00 – 15.30 WITA</strong>
                  <span className="text-[10px] text-slate-300">Istirahat: 12.00 – 13.00 WITA</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-teal-200 block text-[11px]">Jumat</span>
                  <strong className="text-sm font-mono text-white block mt-0.5">08.00 – 15.00 WITA</strong>
                  <span className="text-[10px] text-slate-300">Istirahat: 11.30 – 13.30 WITA</span>
                </div>
              </div>

              <p className="text-[11px] text-teal-200 leading-relaxed pt-1">
                * Sabtu, Minggu & Hari Libur Nasional tutup. Untuk pengujian sampel darurat pencemaran lingkungan (incident sampling), harap berkoordinasi via Tim Reaksi Cepat DLH Bulungan.
              </p>
            </div>

            {/* Map Preview Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
              <div className="p-4 bg-slate-100 flex items-center justify-between text-xs border-b border-slate-200">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-teal-600" />
                  <span>Peta Lokasi Gedung Laboratorium</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Dinas+Lingkungan+Hidup+Kabupaten+Bulungan+Tanjung+Selor"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-48 bg-slate-200 relative flex items-center justify-center text-center p-4">
                <div className="space-y-1">
                  <div className="w-10 h-10 rounded-full bg-teal-700 text-amber-300 flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <strong className="text-xs text-slate-800 block">Tanjung Selor, Kabupaten Bulungan</strong>
                  <span className="text-[11px] text-slate-500 block">Koordinat: 2°50'18.4"N 117°22'04.2"E</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Contact / Inquiry Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif-display">
                Kirim Pesan / Permohonan Informasi
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ada pertanyaan mengenai kesiapan pengujian parameter khusus, permintaan surat penawaran harga (SPH), atau jadwal petugas PPC? Hubungi staf kami melalui formulir di bawah ini.
              </p>
            </div>

            {sent ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Petugas Tata Usaha UPTD Lab Lingkungan DLH Bulungan akan segera merespons melalui email atau WhatsApp Anda pada jam kerja.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Kirim Pesan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda atau PIC Perusahaan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@instansi.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp / HP
                    </label>
                    <input
                      type="tel"
                      placeholder="0812-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Isi Pertanyaan / Keperluan Informasi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tuliskan matriks sampel, jumlah titik, lokasi sampling, atau hal yang ingin Anda konsultasikan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-sky-700 hover:from-teal-700 hover:to-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Kirim Pertanyaan ke Loket Laboratorium</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
