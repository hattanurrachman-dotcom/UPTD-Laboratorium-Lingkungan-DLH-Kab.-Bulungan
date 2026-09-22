import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  GitFork, 
  Clock, 
  ShieldCheck, 
  X,
  Download
} from 'lucide-react';
import { SOPDocument } from '../../types';

interface AdminSOPTabProps {
  sopDocuments: SOPDocument[];
  onUpdateSOPDocuments: (docs: SOPDocument[]) => void;
}

export const AdminSOPTab: React.FC<AdminSOPTabProps> = ({
  sopDocuments,
  onUpdateSOPDocuments
}) => {
  const [isAddingSOP, setIsAddingSOP] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [sopCode, setSopCode] = useState('');
  const [sopTitle, setSopTitle] = useState('');
  const [sopRevision, setSopRevision] = useState('Rev. 02');
  const [sopDate, setSopDate] = useState('15 Januari 2026');
  const [sopDesc, setSopDesc] = useState('');
  const [sopFileSize, setSopFileSize] = useState('1.4 MB');

  const handleOpenAdd = () => {
    setEditingId(null);
    setSopCode(`SOP/LAB-BLG/${Math.floor(10 + Math.random() * 90)}`);
    setSopTitle('');
    setSopRevision('Rev. 01');
    setSopDate('2026-09-22');
    setSopDesc('');
    setSopFileSize('1.2 MB');
    setIsAddingSOP(true);
  };

  const handleEdit = (doc: SOPDocument) => {
    setEditingId(doc.id);
    setSopCode(doc.code);
    setSopTitle(doc.title);
    setSopRevision(doc.revision);
    setSopDate(doc.effectiveDate);
    setSopDesc(doc.description);
    setSopFileSize(doc.fileSize);
    setIsAddingSOP(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus dokumen SOP ini dari katalog publik?')) {
      onUpdateSOPDocuments(sopDocuments.filter(d => d.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sopCode || !sopTitle) return;

    if (editingId) {
      const updated = sopDocuments.map(d => d.id === editingId ? {
        ...d,
        code: sopCode,
        title: sopTitle,
        revision: sopRevision,
        effectiveDate: sopDate,
        description: sopDesc,
        fileSize: sopFileSize
      } : d);
      onUpdateSOPDocuments(updated);
    } else {
      const newDoc: SOPDocument = {
        id: `sop-${Date.now()}`,
        code: sopCode,
        title: sopTitle,
        revision: sopRevision,
        effectiveDate: sopDate,
        description: sopDesc,
        fileSize: sopFileSize
      };
      onUpdateSOPDocuments([newDoc, ...sopDocuments]);
    }
    setIsAddingSOP(false);
  };

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header Info */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              MENU 4: ALUR & DOKUMEN SOP MUTU
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Katalog Prosedur Operasional Standar (SOP) & Alur Pengujian
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Kelola dokumen mutu ISO/IEC 17025 yang dapat diunduh dan dipelajari oleh pelanggan dan auditor.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Dokumen SOP Baru</span>
        </button>
      </div>

      {/* Grid SOP Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sopDocuments.map((doc) => (
          <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {doc.code}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{doc.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-amber-700">{doc.revision}</span>
                  <span>•</span>
                  <span>Berlaku: {doc.effectiveDate}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">{doc.fileSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEdit(doc)}
                  className="p-1.5 text-teal-700 hover:bg-teal-50 rounded-lg cursor-pointer"
                  title="Edit SOP"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(doc.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Hapus SOP"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
              {doc.description}
            </p>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isAddingSOP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Dokumen SOP Mutu' : 'Tambah Dokumen SOP Baru'}
              </h4>
              <button onClick={() => setIsAddingSOP(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor / Kode Dokumen SOP</label>
                  <input
                    type="text"
                    required
                    value={sopCode}
                    onChange={(e) => setSopCode(e.target.value)}
                    placeholder="SOP/LAB-BLG/01"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Revisi</label>
                  <input
                    type="text"
                    required
                    value={sopRevision}
                    onChange={(e) => setSopRevision(e.target.value)}
                    placeholder="Rev. 02"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Dokumen Prosedur</label>
                <input
                  type="text"
                  required
                  value={sopTitle}
                  onChange={(e) => setSopTitle(e.target.value)}
                  placeholder="cth: Prosedur Pengambilan Sampel Air Limbah Industri"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Berlaku Efektif</label>
                  <input
                    type="text"
                    value={sopDate}
                    onChange={(e) => setSopDate(e.target.value)}
                    placeholder="15 Januari 2026"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimasi Ukuran File PDF</label>
                  <input
                    type="text"
                    value={sopFileSize}
                    onChange={(e) => setSopFileSize(e.target.value)}
                    placeholder="1.5 MB"
                    className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Uraian Ruang Lingkup Prosedur</label>
                <textarea
                  rows={3}
                  value={sopDesc}
                  onChange={(e) => setSopDesc(e.target.value)}
                  placeholder="Uraian prosedur penanganan sampel, persiapan wadah, preservasi..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddingSOP(false)}
                  className="px-4 py-2 text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-800 text-white font-bold rounded-xl cursor-pointer"
                >
                  Simpan Dokumen SOP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
