import React, { useState } from 'react';
import { 
  MessageSquareWarning, 
  Smile, 
  Star, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  FileText,
  X,
  MessageCircle
} from 'lucide-react';
import { ComplaintTicket, SKMFeedback } from '../../types';

interface AdminComplaintsTabProps {
  complaints: ComplaintTicket[];
  onUpdateComplaints: (complaints: ComplaintTicket[]) => void;
  feedbacks: SKMFeedback[];
}

export const AdminComplaintsTab: React.FC<AdminComplaintsTabProps> = ({
  complaints,
  onUpdateComplaints,
  feedbacks
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'pengaduan' | 'skm'>('pengaduan');
  const [respondingTicket, setRespondingTicket] = useState<ComplaintTicket | null>(null);
  const [responseText, setResponseText] = useState('');
  const [newStatus, setNewStatus] = useState<ComplaintTicket['status']>('Selesai Ditindaklanjuti');

  const handleOpenRespond = (ticket: ComplaintTicket) => {
    setRespondingTicket(ticket);
    setResponseText(ticket.response || '');
    setNewStatus(ticket.status);
  };

  const handleSaveResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingTicket) return;

    const updated = complaints.map(c => c.id === respondingTicket.id ? {
      ...c,
      status: newStatus,
      response: responseText
    } : c);

    onUpdateComplaints(updated);
    setRespondingTicket(null);
  };

  const getStatusBadge = (status: ComplaintTicket['status']) => {
    switch (status) {
      case 'Diterima':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">Diterima</span>;
      case 'Diproses':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-300">Diproses</span>;
      case 'Selesai Ditindaklanjuti':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">Selesai Ditindaklanjuti</span>;
    }
  };

  // SKM average calculation
  const totalFeedbackCount = feedbacks.length;
  const avgOverall = totalFeedbackCount > 0 
    ? (feedbacks.reduce((sum, f) => sum + f.overallRating, 0) / totalFeedbackCount).toFixed(1)
    : '4.0';

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header Info */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              MENU 6: SKM & LAYANAN PENGADUAN
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Penanganan Pengaduan Masyarakat & Rekapitulasi Survei Kepuasan (SKM)
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Tanggapi pengaduan pelanggan secara resmi dan pantau penilaian kepuasan masyarakat terhadap mutu layanan.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 shrink-0">
          <button
            onClick={() => setActiveSubTab('pengaduan')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'pengaduan' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tiket Pengaduan ({complaints.length})
          </button>
          <button
            onClick={() => setActiveSubTab('skm')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'skm' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hasil Survei SKM ({feedbacks.length})
          </button>
        </div>
      </div>

      {/* SUB-SECTION 1: TIKET PENGADUAN */}
      {activeSubTab === 'pengaduan' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {complaints.map((ticket) => (
              <div key={ticket.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-900 text-sm">{ticket.ticketNumber}</span>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{ticket.date}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div><strong>Pelapor:</strong> {ticket.name}</div>
                  <div><strong>Email:</strong> {ticket.email}</div>
                  <div><strong>Telepon:</strong> {ticket.phone}</div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900 mb-1">Perihal: {ticket.subject}</div>
                  <p className="text-slate-700 leading-relaxed">{ticket.message}</p>
                </div>

                {/* Laboratorium Official Response */}
                {ticket.response ? (
                  <div className="bg-teal-50/70 p-3.5 rounded-2xl border border-teal-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-teal-950">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                      <span>Tanggapan Resmi UPTD Lab Lingkungan DLH:</span>
                    </div>
                    <p className="text-teal-900 leading-relaxed">{ticket.response}</p>
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-700 italic">
                    Belum ada tanggapan resmi dari pihak laboratorium.
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenRespond(ticket)}
                    className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
                    <span>{ticket.response ? 'Ubah Tanggapan / Status' : 'Tanggapi Aduan Ini'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Respond Modal */}
          {respondingTicket && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 animate-scaleUp">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Tanggapi Pengaduan Pelanggan</h4>
                    <p className="text-slate-400 text-xs font-mono">{respondingTicket.ticketNumber}</p>
                  </div>
                  <button onClick={() => setRespondingTicket(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1">
                  <div className="font-bold text-slate-800">{respondingTicket.subject}</div>
                  <p className="text-slate-600 line-clamp-3">{respondingTicket.message}</p>
                </div>

                <form onSubmit={handleSaveResponse} className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Status Tindak Lanjut</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-bold"
                    >
                      <option value="Diterima">Diterima</option>
                      <option value="Diproses">Diproses Tim Teknis</option>
                      <option value="Selesai Ditindaklanjuti">Selesai Ditindaklanjuti</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Teks Tanggapan Resmi Laboratorium</label>
                    <textarea
                      rows={5}
                      required
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Ketik uraian tanggapan resmi, penjelasan solusi, atau petunjuk tindak lanjut bagi pemohon..."
                      className="w-full p-2.5 bg-slate-50 border rounded-xl leading-relaxed text-slate-900"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <button
                      type="button"
                      onClick={() => setRespondingTicket(null)}
                      className="px-4 py-2 text-slate-600 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-teal-800 text-white font-bold rounded-xl cursor-pointer"
                    >
                      Simpan Tanggapan Resmi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-SECTION 2: HASIL SKM */}
      {activeSubTab === 'skm' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-xs">Total Responden SKM</span>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">{totalFeedbackCount}</div>
              <span className="text-[10px] text-teal-700 font-semibold block mt-1">Umpan Balik Masuk</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-xs">Indeks Kepuasan Rata-rata</span>
              <div className="text-2xl font-black text-emerald-600 font-mono mt-1">{avgOverall} / 4.0</div>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-1">Mutu Pelayanan Sangat Baik</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-xs">Konversi Nilai IKM</span>
              <div className="text-2xl font-black text-teal-800 font-mono mt-1">88.6 (Kategori A)</div>
              <span className="text-[10px] text-slate-500 font-semibold block mt-1">Sesuai PermenPAN-RB No. 14/2017</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Ulasan & Testimoni Pelanggan Terakhir</h4>
            
            <div className="space-y-3">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{fb.customerName}</div>
                      <div className="text-[11px] text-slate-500">{fb.institution} • {fb.date}</div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(fb.overallRating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 italic">"{fb.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
