import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  FlaskConical, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  X,
  FileText
} from 'lucide-react';
import { SiteSettings, StaffMember, LabFacility } from '../../types';

interface AdminProfileTabProps {
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
  staffMembers: StaffMember[];
  onUpdateStaffMembers: (staff: StaffMember[]) => void;
  labFacilities: LabFacility[];
  onUpdateLabFacilities: (facilities: LabFacility[]) => void;
}

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({
  settings,
  onUpdateSettings,
  staffMembers,
  onUpdateStaffMembers,
  labFacilities,
  onUpdateLabFacilities
}) => {
  const [activeSubSection, setActiveSubSection] = useState<'visi_misi' | 'staf' | 'fasilitas'>('visi_misi');
  
  // Visi Misi State
  const [visi, setVisi] = useState(settings.visi);
  const [misi, setMisi] = useState<string[]>(settings.misi);
  const [newMisiText, setNewMisiText] = useState('');
  const [maklumat, setMaklumat] = useState(settings.maklumatPelayanan);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Staff Modal State
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffName, setStaffName] = useState('');
  const [staffPosition, setStaffPosition] = useState('');
  const [staffNip, setStaffNip] = useState('');
  const [staffEducation, setStaffEducation] = useState('');
  const [staffRoleDesc, setStaffRoleDesc] = useState('');
  const [staffLevel, setStaffLevel] = useState<number>(3);

  // Facility Modal State
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [editingFacId, setEditingFacId] = useState<string | null>(null);
  const [facName, setFacName] = useState('');
  const [facBrandModel, setFacBrandModel] = useState('');
  const [facFunctionDesc, setFacFunctionDesc] = useState('');
  const [facSpecs, setFacSpecs] = useState('');
  const [facCategory, setFacCategory] = useState<'Instrumen Analitik' | 'Preparasi & Fisika' | 'Sampling Lapangan' | 'Mikrobiologi'>('Instrumen Analitik');

  // Save Visi Misi
  const handleSaveVisiMisi = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteSettings = {
      ...settings,
      visi,
      misi,
      maklumatPelayanan: maklumat
    };
    onUpdateSettings(updated);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleAddMisi = () => {
    if (!newMisiText.trim()) return;
    setMisi([...misi, newMisiText.trim()]);
    setNewMisiText('');
  };

  const handleDeleteMisi = (index: number) => {
    setMisi(misi.filter((_, i) => i !== index));
  };

  // Staff Handlers
  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffName('');
    setStaffPosition('');
    setStaffNip('');
    setStaffEducation('');
    setStaffRoleDesc('');
    setStaffLevel(3);
    setIsAddingStaff(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaffId(staff.id);
    setStaffName(staff.name);
    setStaffPosition(staff.position);
    setStaffNip(staff.nip || '');
    setStaffEducation(staff.education);
    setStaffRoleDesc(staff.roleDescription);
    setStaffLevel(staff.level);
    setIsAddingStaff(true);
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm('Hapus personil ini dari struktur organisasi website?')) {
      onUpdateStaffMembers(staffMembers.filter(s => s.id !== id));
    }
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName || !staffPosition) return;

    if (editingStaffId) {
      // Update
      const updated = staffMembers.map(s => s.id === editingStaffId ? {
        ...s,
        name: staffName,
        position: staffPosition,
        nip: staffNip,
        education: staffEducation,
        roleDescription: staffRoleDesc,
        level: staffLevel
      } : s);
      onUpdateStaffMembers(updated);
    } else {
      // Add new
      const newStaff: StaffMember = {
        id: `staff-${Date.now()}`,
        name: staffName,
        position: staffPosition,
        nip: staffNip,
        education: staffEducation,
        roleDescription: staffRoleDesc,
        level: staffLevel
      };
      onUpdateStaffMembers([...staffMembers, newStaff]);
    }
    setIsAddingStaff(false);
  };

  // Facility Handlers
  const handleOpenAddFac = () => {
    setEditingFacId(null);
    setFacName('');
    setFacBrandModel('');
    setFacFunctionDesc('');
    setFacSpecs('');
    setFacCategory('Instrumen Analitik');
    setIsAddingFacility(true);
  };

  const handleEditFac = (fac: LabFacility) => {
    setEditingFacId(fac.id);
    setFacName(fac.name);
    setFacBrandModel(fac.brandModel);
    setFacFunctionDesc(fac.functionDesc);
    setFacSpecs(fac.specs);
    setFacCategory(fac.category);
    setIsAddingFacility(true);
  };

  const handleDeleteFac = (id: string) => {
    if (confirm('Hapus fasilitas/instrumen laboratorium ini?')) {
      onUpdateLabFacilities(labFacilities.filter(f => f.id !== id));
    }
  };

  const handleSaveFac = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facName || !facBrandModel) return;

    if (editingFacId) {
      const updated = labFacilities.map(f => f.id === editingFacId ? {
        ...f,
        name: facName,
        brandModel: facBrandModel,
        functionDesc: facFunctionDesc,
        specs: facSpecs,
        category: facCategory
      } : f);
      onUpdateLabFacilities(updated);
    } else {
      const newFac: LabFacility = {
        id: `fac-${Date.now()}`,
        name: facName,
        brandModel: facBrandModel,
        functionDesc: facFunctionDesc,
        specs: facSpecs,
        category: facCategory
      };
      onUpdateLabFacilities([...labFacilities, newFac]);
    }
    setIsAddingFacility(false);
  };

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header Info Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              MENU 2: PROFIL LEMBAGA
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Pengelolaan Profil Lembaga, Visi Misi, Personil & Fasilitas Lab
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Kelola narasi visi, butir misi, maklumat pelayanan, daftar pejabat/personil teknis, dan instrumen pengujian.
          </p>
        </div>

        {/* Subtab selection */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 shrink-0">
          <button
            onClick={() => setActiveSubSection('visi_misi')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubSection === 'visi_misi' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visi, Misi & Maklumat
          </button>
          <button
            onClick={() => setActiveSubSection('staf')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubSection === 'staf' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Struktur Personil ({staffMembers.length})
          </button>
          <button
            onClick={() => setActiveSubSection('fasilitas')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubSection === 'fasilitas' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Instrumen & Fasilitas ({labFacilities.length})
          </button>
        </div>
      </div>

      {isSavedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-900 font-bold text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Visi, Misi & Maklumat Pelayanan berhasil disimpan dan langsung aktif di Halaman Profil!</span>
        </div>
      )}

      {/* SUB-SECTION 1: VISI, MISI, MAKLUMAT */}
      {activeSubSection === 'visi_misi' && (
        <form onSubmit={handleSaveVisiMisi} className="space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-4 h-4 text-teal-700" />
              <h4 className="text-sm font-bold text-slate-900">Visi UPTD Laboratorium Lingkungan Hidup</h4>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pernyataan Visi</label>
              <textarea
                rows={2}
                value={visi}
                onChange={(e) => setVisi(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900 font-medium"
              ></textarea>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-4 h-4 text-teal-700" />
              <h4 className="text-sm font-bold text-slate-900">Misi Laboratorium Lingkungan Hidup</h4>
            </div>

            <div className="space-y-2">
              {misi.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-lg bg-teal-800 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newMisi = [...misi];
                      newMisi[idx] = e.target.value;
                      setMisi(newMisi);
                    }}
                    className="flex-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteMisi(idx)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Hapus Misi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newMisiText}
                onChange={(e) => setNewMisiText(e.target.value)}
                placeholder="Ketik butir misi baru..."
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900"
              />
              <button
                type="button"
                onClick={handleAddMisi}
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Misi</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-teal-700" />
              <h4 className="text-sm font-bold text-slate-900">Maklumat Pelayanan Publik Laboratorium</h4>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Isi Pernyataan Janji Pelayanan</label>
              <textarea
                rows={4}
                value={maklumat}
                onChange={(e) => setMaklumat(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900 leading-relaxed"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Simpan Perubahan Visi, Misi & Maklumat</span>
            </button>
          </div>

        </form>
      )}

      {/* SUB-SECTION 2: STAFF & ORGANISASI */}
      {activeSubSection === 'staf' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Daftar Personil & Struktur Organisasi UPTD</h4>
              <p className="text-slate-500 text-xs">Kelola profil pimpinan, manajer teknis/mutu, analis kimia, dan petugas sampling.</p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddStaff}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Tambah Personil Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staffMembers.map((member) => (
              <div key={member.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2 relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Tingkat {member.level}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 mt-1">{member.name}</h5>
                    <p className="text-xs text-teal-700 font-semibold">{member.position}</p>
                    {member.nip && (
                      <p className="text-[11px] text-slate-400 font-mono">NIP: {member.nip}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditStaff(member)}
                      className="p-1.5 text-teal-700 hover:bg-teal-50 rounded-lg cursor-pointer"
                      title="Edit Personil"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStaff(member.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Hapus Personil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div><strong>Pendidikan:</strong> {member.education}</div>
                  <div><strong>Tugas & Wewenang:</strong> {member.roleDescription}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Add/Edit Staff */}
          {isAddingStaff && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 animate-scaleUp">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="text-base font-bold text-slate-900">
                    {editingStaffId ? 'Edit Data Personil' : 'Tambah Personil Laboratorium'}
                  </h4>
                  <button onClick={() => setIsAddingStaff(false)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveStaff} className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      required
                      value={staffName}
                      onChange={(e) => setStaffName(e.target.value)}
                      placeholder="cth: Ahmad Fauzi, S.T"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jabatan di Laboratorium</label>
                    <input
                      type="text"
                      required
                      value={staffPosition}
                      onChange={(e) => setStaffPosition(e.target.value)}
                      placeholder="cth: Manajer Teknis Laboratorium"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">NIP (Opsional)</label>
                      <input
                        type="text"
                        value={staffNip}
                        onChange={(e) => setStaffNip(e.target.value)}
                        placeholder="19840920 201001..."
                        className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tingkat Hirarki</label>
                      <select
                        value={staffLevel}
                        onChange={(e) => setStaffLevel(Number(e.target.value))}
                        className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                      >
                        <option value={1}>Level 1 (Kepala Dinas)</option>
                        <option value={2}>Level 2 (Kepala UPTD)</option>
                        <option value={3}>Level 3 (Kasubag TU / Manajer)</option>
                        <option value={4}>Level 4 (Koordinator / Analis)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kualifikasi Pendidikan & Sertifikasi</label>
                    <input
                      type="text"
                      value={staffEducation}
                      onChange={(e) => setStaffEducation(e.target.value)}
                      placeholder="cth: Sarjana Teknik Kimia & Sertifikasi Personel Uji KAN"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Deskripsi Tugas & Wewenang</label>
                    <textarea
                      rows={2}
                      value={staffRoleDesc}
                      onChange={(e) => setStaffRoleDesc(e.target.value)}
                      placeholder="Uraian tanggung jawab teknis/mutu..."
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <button
                      type="button"
                      onClick={() => setIsAddingStaff(false)}
                      className="px-4 py-2 text-slate-600 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-teal-800 text-white font-bold rounded-xl cursor-pointer"
                    >
                      Simpan Personil
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-SECTION 3: FASILITAS & ALAT LAB */}
      {activeSubSection === 'fasilitas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Daftar Peralatan & Fasilitas Laboratorium</h4>
              <p className="text-slate-500 text-xs">Peralatan analitik, spektrometer, instrumen sampling lapangan, dan inkubator.</p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddFac}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Tambah Alat/Fasilitas Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labFacilities.map((fac) => (
              <div key={fac.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {fac.category}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 mt-1">{fac.name}</h5>
                    <p className="text-xs text-amber-700 font-mono font-bold">{fac.brandModel}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditFac(fac)}
                      className="p-1.5 text-teal-700 hover:bg-teal-50 rounded-lg cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFac(fac.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div><strong>Fungsi:</strong> {fac.functionDesc}</div>
                  <div><strong>Spesifikasi:</strong> {fac.specs}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Add/Edit Facility */}
          {isAddingFacility && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 animate-scaleUp">
                <div className="flex items-center justify-between border-b pb-3">
                  <h4 className="text-base font-bold text-slate-900">
                    {editingFacId ? 'Edit Peralatan Laboratorium' : 'Tambah Peralatan Laboratorium'}
                  </h4>
                  <button onClick={() => setIsAddingFacility(false)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveFac} className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Alat / Instrumen</label>
                    <input
                      type="text"
                      required
                      value={facName}
                      onChange={(e) => setFacName(e.target.value)}
                      placeholder="cth: Atomic Absorption Spectrophotometer (AAS)"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Merk & Tipe / Model</label>
                    <input
                      type="text"
                      required
                      value={facBrandModel}
                      onChange={(e) => setFacBrandModel(e.target.value)}
                      placeholder="cth: Shimadzu AA-7000 Flame & Graphite"
                      className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategori Alat</label>
                    <select
                      value={facCategory}
                      onChange={(e) => setFacCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs"
                    >
                      <option value="Instrumen Analitik">Instrumen Analitik</option>
                      <option value="Preparasi & Fisika">Preparasi & Fisika</option>
                      <option value="Sampling Lapangan">Sampling Lapangan</option>
                      <option value="Mikrobiologi">Mikrobiologi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Fungsi Pengujian</label>
                    <textarea
                      rows={2}
                      value={facFunctionDesc}
                      onChange={(e) => setFacFunctionDesc(e.target.value)}
                      placeholder="Analisis logam berat, pengujian partikulat, dll..."
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Spesifikasi Teknis</label>
                    <textarea
                      rows={2}
                      value={facSpecs}
                      onChange={(e) => setFacSpecs(e.target.value)}
                      placeholder="Sensitivitas, rentang pengukuran, sertifikasi..."
                      className="w-full p-2.5 bg-slate-50 border rounded-xl"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <button
                      type="button"
                      onClick={() => setIsAddingFacility(false)}
                      className="px-4 py-2 text-slate-600 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-teal-800 text-white font-bold rounded-xl cursor-pointer"
                    >
                      Simpan Instrumen
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
