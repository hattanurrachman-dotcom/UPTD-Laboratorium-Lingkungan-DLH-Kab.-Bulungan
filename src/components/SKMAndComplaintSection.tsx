import React, { useState } from 'react';
import { 
  Smile, 
  MessageSquareWarning, 
  Star, 
  CheckCircle2, 
  Send, 
  ExternalLink, 
  ShieldAlert, 
  Award,
  ChevronDown,
  Info,
  Clock
} from 'lucide-react';
import { SKM_QUESTIONS, INITIAL_SKM_FEEDBACKS, INITIAL_COMPLAINT_TICKETS } from '../data/labData';
import { SKMFeedback, ComplaintTicket } from '../types';

export const SKMAndComplaintSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skm' | 'pengaduan'>('skm');

  // SKM Form State
  const [feedbacks, setFeedbacks] = useState<SKMFeedback[]>(INITIAL_SKM_FEEDBACKS);
  const [skmName, setSkmName] = useState('');
  const [skmInstitution, setSkmInstitution] = useState('');
  const [skmComment, setSkmComment] = useState('');
  const [ratings, setRatings] = useState<Record<number, number>>({
    1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4
  });
  const [skmSubmitted, setSkmSubmitted] = useState(false);

  // Complaint Form State
  const [complaints, setComplaints] = useState<ComplaintTicket[]>(INITIAL_COMPLAINT_TICKETS);
  const [complaintName, setComplaintName] = useState('');
  const [complaintEmail, setComplaintEmail] = useState('');
  const [complaintPhone, setComplaintPhone] = useState('');
  const [complaintSubject, setComplaintSubject] = useState('');
  const [complaintMessage, setComplaintMessage] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState<ComplaintTicket | null>(null);

  // Compute aggregate IKM Score (out of 100)
  const ikmScore = 88.6; // Kategori A (Sangat Baik)

  const handleRatingChange = (qId: number, val: number) => {
    setRatings(prev => ({ ...prev, [qId]: val }));
  };

  const handleSKMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skmName.trim()) {
      alert('Mohon isi nama lengkap responden.');
      return;
    }

    const avg = Object.values(ratings).reduce((a, b) => a + b, 0) / 9;

    const newFeedback: SKMFeedback = {
      id: `skm-${Date.now()}`,
      customerName: skmName,
      institution: skmInstitution || 'Masyarakat Umum',
      date: 'Hari ini',
      overallRating: Math.round(avg),
      comment: skmComment || 'Pelayanan pengujian sangat memuaskan dan transparan.',
      ratings
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setSkmSubmitted(true);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintName || !complaintPhone || !complaintMessage) {
      alert('Mohon lengkapi Nama, Nomor Telepon, dan Isi Pesan Pengaduan.');
      return;
    }

    const ticketNo = `ADU-BLG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formatted = `${now.getDate()} September 2026 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newComplaint: ComplaintTicket = {
      id: `comp-${Date.now()}`,
      ticketNumber: ticketNo,
      name: complaintName,
      email: complaintEmail || '-',
      phone: complaintPhone,
      subject: complaintSubject || 'Aspirasi Pelayanan Laboratorium',
      message: complaintMessage,
      date: formatted,
      status: 'Diterima'
    };

    setComplaints([newComplaint, ...complaints]);
    setComplaintSubmitted(newComplaint);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Smile className="w-3.5 h-3.5 text-teal-600" />
            <span>Kualitas Pelayanan & Integritas Publik</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            Survei Kepuasan (SKM) & Kanal Pengaduan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Penilaian mandiri masyarakat dan pelaku usaha sesuai PermenPAN-RB No. 14 Tahun 2017 untuk evaluasi dan peningkatan mutu pelayanan berkelanjutan.
          </p>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-2 mt-6 p-1.5 bg-slate-200/80 rounded-2xl max-w-md mx-auto text-xs">
            <button
              onClick={() => setActiveTab('skm')}
              className={`flex-1 py-2 px-4 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'skm'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smile className="w-4 h-4 text-emerald-600" />
              <span>Survei Kepuasan (SKM)</span>
            </button>
            <button
              onClick={() => setActiveTab('pengaduan')}
              className={`flex-1 py-2 px-4 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'pengaduan'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquareWarning className="w-4 h-4 text-amber-600" />
              <span>Kanal Pengaduan</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SURVEI KEPUASAN MASYARAKAT (SKM) */}
        {activeTab === 'skm' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Aggregate Score Banner */}
            <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-sky-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/30">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>HASIL PENGUKURAN INDEKS KEPUASAN MASYARAKAT (IKM) 2026</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-display">
                    Nilai IKM: <span className="text-amber-300 font-mono text-3xl font-black">{ikmScore}</span> / 100
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                    Kategori Mutu Pelayanan: <strong className="text-white bg-teal-950 px-2 py-0.5 rounded border border-teal-600">A (SANGAT BAIK)</strong>. Berdasarkan rekapitulasi responden pelaku usaha sawit, pertambangan, depot air minum, dan instansi pemda.
                  </p>
                </div>

                <div className="md:col-span-4 flex items-center justify-center md:justify-end gap-3 text-center">
                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                    <div className="text-2xl font-black text-amber-300">98.4%</div>
                    <div className="text-[10px] text-teal-200">Kesesuaian Tarif</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                    <div className="text-2xl font-black text-emerald-300">96.8%</div>
                    <div className="text-[10px] text-teal-200">Ketepatan LHP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form & Testimonial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-base font-bold text-slate-900">
                    Formulir Survei Kepuasan Pelanggan (9 Unsur Pelayanan)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Silakan berikan penilaian objektif Anda terhadap pelayanan UPTD Lab Lingkungan DLH Bulungan.
                  </p>
                </div>

                {skmSubmitted ? (
                  <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h5 className="text-lg font-bold text-slate-900">Terima Kasih Atas Partisipasi Anda!</h5>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Penilaian dan masukan Anda sangat berharga bagi peningkatan standar mutu dan transparansi pelayanan laboratorium lingkungan kami.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSkmSubmitted(false)}
                      className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                    >
                      Isi Survei Lagi
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSKMSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Responden / Pelanggan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Anda"
                          value={skmName}
                          onChange={(e) => setSkmName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Instansi / Perusahaan
                        </label>
                        <input
                          type="text"
                          placeholder="Nama instansi atau perorangan"
                          value={skmInstitution}
                          onChange={(e) => setSkmInstitution(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 9 Questions */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                        Penilaian Unsur Pelayanan:
                      </div>

                      {SKM_QUESTIONS.map((q) => {
                        const currentVal = ratings[q.id] || 4;
                        return (
                          <div key={q.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-slate-800">
                                {q.id}. {q.question}
                              </span>
                              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded shrink-0">
                                {q.category}
                              </span>
                            </div>

                            {/* 4 Scale Radio */}
                            <div className="grid grid-cols-4 gap-2 pt-1">
                              {[
                                { val: 1, label: 'Tidak Baik' },
                                { val: 2, label: 'Kurang Baik' },
                                { val: 3, label: 'Baik' },
                                { val: 4, label: 'Sangat Baik' },
                              ].map((opt) => (
                                <button
                                  type="button"
                                  key={opt.val}
                                  onClick={() => handleRatingChange(q.id, opt.val)}
                                  className={`py-1.5 px-2 rounded-lg text-center text-[11px] font-medium transition-all cursor-pointer ${
                                    currentVal === opt.val
                                      ? 'bg-teal-700 text-white font-bold shadow-xs'
                                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-teal-50'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Feedback Comment */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Kritik, Saran, atau Testimoni Layanan
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tuliskan pengalaman atau saran Anda untuk perbaikan mutu laboratorium..."
                        value={skmComment}
                        onChange={(e) => setSkmComment(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Kirim Penilaian Survei Kepuasan</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Feedbacks Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Smile className="w-4 h-4 text-emerald-600" />
                    <span>Ulasan & Testimoni Pelanggan Terkini</span>
                  </h4>

                  <div className="space-y-3">
                    {feedbacks.map((fb) => (
                      <div key={fb.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900">{fb.customerName}</div>
                            <div className="text-[10px] text-slate-500">{fb.institution} • {fb.date}</div>
                          </div>
                          <div className="flex items-center text-amber-400">
                            {[...Array(fb.overallRating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed italic text-[11px]">
                          "{fb.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-teal-50 p-5 rounded-3xl border border-teal-200 text-teal-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <Info className="w-4 h-4 text-teal-700" />
                    <span>Zona Integritas Wilayah Bebas Korupsi (WBK)</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    UPTD Laboratorium Lingkungan DLH Bulungan berkomitmen menolak segala bentuk gratifikasi, suap, dan pungli. Seluruh tarif pelayanan disetorkan langsung ke Kas Daerah melalui Surat Ketetapan Retribusi Daerah (SKRD) resmi.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: KANAL PENGADUAN MASYARAKAT */}
        {activeTab === 'pengaduan' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Complaint Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Form Pengaduan & Keluhan Layanan Laboratorium
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sampaikan keluhan terkait kendala pengujian, ketidaksesuaian waktu LHP, atau perilaku petugas. Kami menjamin kerahasiaan identitas pelapor.
                  </p>
                </div>

                {complaintSubmitted ? (
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h5 className="text-base font-bold text-slate-900">Pengaduan Berhasil Terkirim</h5>
                    <div className="font-mono text-sm font-bold text-teal-800 bg-white p-2 rounded-xl border border-emerald-300 inline-block">
                      Nomor Tiket: {complaintSubmitted.ticketNumber}
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Tim Penanganan Pengaduan UPTD Lab Lingkungan DLH Bulungan akan menindaklanjuti laporan Anda maksimal dalam 3x24 jam kerja.
                    </p>
                    <button
                      type="button"
                      onClick={() => setComplaintSubmitted(null)}
                      className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Kirim Laporan Baru
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleComplaintSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Pelapor <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Lengkap"
                          value={complaintName}
                          onChange={(e) => setComplaintName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor WhatsApp / HP Aktif <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Contoh: 081254332190"
                          value={complaintPhone}
                          onChange={(e) => setComplaintPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Alamat Email
                        </label>
                        <input
                          type="email"
                          placeholder="email@anda.com"
                          value={complaintEmail}
                          onChange={(e) => setComplaintEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Subjek / Pokok Permasalahan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Keterlambatan Penerbitan LHP"
                          value={complaintSubject}
                          onChange={(e) => setComplaintSubject(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Isi Uraian Pengaduan / Keluhan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Jelaskan secara rinci nomor sampel (jika ada), kronologi kejadian, dan harapan penyelesaian..."
                        value={complaintMessage}
                        onChange={(e) => setComplaintMessage(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Kirim Laporan Pengaduan</span>
                    </button>
                  </form>
                )}
              </div>

              {/* SP4N LAPOR & Previous Complaints */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* SP4N LAPOR Card */}
                <div className="bg-red-50 p-6 rounded-3xl border border-red-200 space-y-3">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <span>Kanal Resmi SP4N - LAPOR!</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Pengaduan Anda juga dapat disampaikan secara langsung melalui Sistem Pengelolaan Pengaduan Pelayanan Publik Nasional (SP4N-LAPOR!) yang terhubung ke KemenPAN-RB dan Pemkab Bulungan.
                  </p>
                  <a
                    href="https://www.lapor.go.id"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <span>Buka Portal LAPOR.GO.ID</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Complaint History Log */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Transparansi Penanganan Aduan Terkini:
                  </h4>
                  <div className="space-y-3">
                    {complaints.map((item) => (
                      <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-teal-800">{item.ticketNumber}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {item.status}
                          </span>
                        </div>
                        <div className="font-semibold text-slate-900 text-xs">{item.subject}</div>
                        <p className="text-[11px] text-slate-600 line-clamp-2">{item.message}</p>
                        {item.response && (
                          <div className="mt-1 pt-1 border-t border-slate-200 text-[10px] text-teal-800">
                            <strong>Tindak Lanjut Lab:</strong> {item.response}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
