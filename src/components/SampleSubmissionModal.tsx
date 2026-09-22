import React, { useState, useMemo } from 'react';
import { 
  X, 
  FlaskConical, 
  CheckCircle2, 
  FileText, 
  Printer, 
  Calculator, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Upload, 
  HelpCircle,
  Share2,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  MatrixType, 
  SampleRequest, 
  TestParameter 
} from '../types';
import { 
  LAB_PARAMETERS, 
  PARAMETER_PACKAGES 
} from '../data/labData';
import { 
  formatRupiah, 
  getMatrixInfo 
} from '../utils/helpers';

interface SampleSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSampleCreated: (newSample: SampleRequest) => void;
  onOpenTracking: (regNumber: string) => void;
}

export const SampleSubmissionModal: React.FC<SampleSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSampleCreated,
  onOpenTracking,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [institution, setInstitution] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  const [matrix, setMatrix] = useState<MatrixType>('air_limbah');
  const [samplingType, setSamplingType] = useState<'mandiri' | 'petugas_lab'>('petugas_lab');
  const [samplingLocation, setSamplingLocation] = useState('');
  const [samplingCoordinates, setSamplingCoordinates] = useState('');
  const [samplingDate, setSamplingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  
  // Parameter Selection Mode: 'package' | 'custom'
  const [selectionMode, setSelectionMode] = useState<'package' | 'custom'>('package');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-ipal-sawit');
  const [selectedCustomParamIds, setSelectedCustomParamIds] = useState<string[]>([]);
  const [paramSearch, setParamSearch] = useState('');

  // Submission result state
  const [createdSample, setCreatedSample] = useState<SampleRequest | null>(null);

  // Available parameters for current matrix
  const availableParams = useMemo(() => {
    return LAB_PARAMETERS.filter(p => p.matrix === matrix);
  }, [matrix]);

  // Packages matching current matrix
  const matrixPackages = useMemo(() => {
    return PARAMETER_PACKAGES.filter(p => p.matrix === matrix);
  }, [matrix]);

  // When matrix changes, adjust default package or custom params
  const handleMatrixChange = (newMatrix: MatrixType) => {
    setMatrix(newMatrix);
    const matchingPkg = PARAMETER_PACKAGES.find(p => p.matrix === newMatrix);
    if (matchingPkg) {
      setSelectedPackageId(matchingPkg.id);
      setSelectionMode('package');
    } else {
      setSelectionMode('custom');
      const firstParams = LAB_PARAMETERS.filter(p => p.matrix === newMatrix).slice(0, 4).map(p => p.id);
      setSelectedCustomParamIds(firstParams);
    }
  };

  // Active selected parameter IDs
  const activeParamIds = useMemo(() => {
    if (selectionMode === 'package') {
      const pkg = PARAMETER_PACKAGES.find(p => p.id === selectedPackageId);
      return pkg ? pkg.parameterIds : [];
    }
    return selectedCustomParamIds;
  }, [selectionMode, selectedPackageId, selectedCustomParamIds]);

  // Total cost calculation
  const totalCost = useMemo(() => {
    let cost = 0;
    if (selectionMode === 'package') {
      const pkg = PARAMETER_PACKAGES.find(p => p.id === selectedPackageId);
      if (pkg) {
        cost = pkg.discountedPrice || pkg.parameterIds.reduce((sum, pid) => {
          const param = LAB_PARAMETERS.find(p => p.id === pid);
          return sum + (param ? param.price : 0);
        }, 0);
      }
    } else {
      cost = selectedCustomParamIds.reduce((sum, pid) => {
        const param = LAB_PARAMETERS.find(p => p.id === pid);
        return sum + (param ? param.price : 0);
      }, 0);
    }

    // Sampling fee if using lab staff
    if (samplingType === 'petugas_lab') {
      cost += 150000; // retribusi transport & handling petugas PPC insitu
    }

    return cost;
  }, [selectionMode, selectedPackageId, selectedCustomParamIds, samplingType]);

  const toggleCustomParam = (id: string) => {
    setSelectedCustomParamIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phoneNumber || !samplingLocation) {
      alert('Mohon lengkapi Nama Pemohon, Nomor WhatsApp, dan Lokasi Pengambilan Sampel.');
      return;
    }

    if (activeParamIds.length === 0) {
      alert('Pilih minimal satu parameter atau paket pengujian.');
      return;
    }

    // Generate Bulungan Lab Registration Number
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `LAB-BLG-2026-${randomSeq}`;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newSample: SampleRequest = {
      id: `sample-${Date.now()}`,
      registrationNumber: regNumber,
      createdAt: formattedDate,
      customerName,
      institution: institution || 'Perorangan / Mandiri',
      idNumber: idNumber || '-',
      phoneNumber,
      email: email || '-',
      address: address || 'Kabupaten Bulungan',
      matrix,
      samplingLocation,
      samplingCoordinates: samplingCoordinates || undefined,
      samplingDate,
      samplingType,
      parameterIds: activeParamIds,
      totalCost,
      status: 'pendaftaran',
      paymentStatus: 'Belum Dibayar',
      statusHistory: [
        {
          status: 'pendaftaran',
          timestamp: formattedDate,
          note: 'Pendaftaran pengujian sampel online berhasil diterima oleh sistem UPTD Lab Lingkungan DLH Bulungan',
          actor: 'Sistem Registrasi Online'
        }
      ]
    };

    onSampleCreated(newSample);
    setCreatedSample(newSample);
  };

  const handleResetForm = () => {
    setCreatedSample(null);
    setCustomerName('');
    setInstitution('');
    setIdNumber('');
    setPhoneNumber('');
    setEmail('');
    setAddress('');
    setSamplingLocation('');
    setSamplingCoordinates('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-sky-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700/80 border border-teal-500/50 flex items-center justify-center text-amber-300">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {createdSample ? 'Pendaftaran Sampel Berhasil' : 'Formulir Permohonan Pengujian Sampel'}
              </h2>
              <p className="text-xs text-teal-200">
                UPTD Laboratorium Lingkungan Hidup Kabupaten Bulungan
              </p>
            </div>
          </div>
          <button
            onClick={handleResetForm}
            className="p-2 text-teal-200 hover:text-white hover:bg-teal-700/50 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {createdSample ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="max-w-md mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Registrasi Sukses Diterima
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 font-serif-display">
                  Nomor Registrasi Sampel:
                </h3>
                <div className="mt-2 text-2xl sm:text-3xl font-mono font-black text-teal-700 bg-teal-50 border-2 border-dashed border-teal-400 py-3 px-4 rounded-2xl select-all">
                  {createdSample.registrationNumber}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Simpan nomor registrasi di atas untuk melacak progres pengujian laboratorium dan mengunduh LHP resmi.
                </p>
              </div>

              {/* Summary Details Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-xl mx-auto space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Pemohon / Instansi:</span>
                  <span className="font-semibold text-slate-800">{createdSample.customerName} ({createdSample.institution})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Matriks Sampel:</span>
                  <span className="font-semibold text-teal-800">{getMatrixInfo(createdSample.matrix).label}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Lokasi Titik Sampel:</span>
                  <span className="font-semibold text-slate-800">{createdSample.samplingLocation}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Metode Sampling:</span>
                  <span className="font-semibold text-slate-800">
                    {createdSample.samplingType === 'petugas_lab' ? 'Petugas Pengambil Contoh (PPC) Lab DLH' : 'Mandiri diantar ke loket'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Jumlah Parameter:</span>
                  <span className="font-semibold text-slate-800">{createdSample.parameterIds.length} Parameter Uji SNI</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-slate-700">Total Estimasi Retribusi:</span>
                  <span className="text-teal-700 text-base">{formatRupiah(createdSample.totalCost)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTracking(createdSample.registrationNumber);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Buka Lembar Tracking Sampel</span>
                </button>

                <a
                  href={`https://wa.me/6281254332190?text=${encodeURIComponent(
                    `Halo Admin UPTD Laboratorium Lingkungan DLH Bulungan, saya telah mendaftar pengujian sampel online dengan Nomor Registrasi: ${createdSample.registrationNumber} atas nama ${createdSample.customerName} (${createdSample.institution}). Mohon konfirmasi jadwal sampling/pembayarannya. Terima kasih.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4 text-white" />
                  <span>Kirim Notifikasi via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Cetak Tanda Terima</span>
                </button>
              </div>
            </div>
          ) : (
            /* FORM ENTRY VIEW */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Identitas Pemohon */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm mb-3">
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <span>1. Identitas Pemohon / Pelanggan</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap Pemohon / PIC <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ir. Hendra Kusuma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Perusahaan / Instansi / Usaha <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: PT Sawit Benuanta / Depot Air / Perorangan"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor KTP (NIK) atau Nomor Induk Berusaha (NIB)
                    </label>
                    <input
                      type="text"
                      placeholder="16 Digit NIK / 13 Digit NIB"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif (Untuk Notifikasi Status) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081254332190"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Email (Pengiriman Dokumen LHP Digital)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Contoh: hse@perusahaan.co.id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Kantor / Domisili
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Jl. Sabanar Lama, Tanjung Selor, Bulungan"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Karakteristik Sampel & Lokasi */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm mb-3">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>2. Karakteristik & Titik Lokasi Pengambilan Sampel</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Pilih Matriks Sampel Lingkungan <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(['air_limbah', 'air_permukaan', 'air_minum', 'udara_ambien', 'kebisingan', 'emisi'] as MatrixType[]).map((m) => {
                        const info = getMatrixInfo(m);
                        const isSelected = matrix === m;
                        return (
                          <button
                            type="button"
                            key={m}
                            onClick={() => handleMatrixChange(m)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-teal-600 text-white border-teal-600 shadow-sm font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
                            }`}
                          >
                            <div className="text-xs font-semibold leading-tight">{info.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Metode Pengambilan Sampel <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSamplingType('petugas_lab')}
                          className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                            samplingType === 'petugas_lab'
                              ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Petugas PPC Lab
                          <div className="text-[10px] font-normal opacity-90">+ Retribusi Sampling</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSamplingType('mandiri')}
                          className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                            samplingType === 'mandiri'
                              ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Mandiri / Antar Loket
                          <div className="text-[10px] font-normal opacity-90">Bebas Biaya Transport</div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Rencana Tanggal Sampling / Antar <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={samplingDate}
                          onChange={(e) => setSamplingDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Titik Sampling / Keterangan Lokasi <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Outlet IPAL No. 01 / Hulu Jembatan Kayan"
                        value={samplingLocation}
                        onChange={(e) => setSamplingLocation(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Koordinat GPS (Opsional untuk Pemetaan Titik Penaatan)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: 2°50'44.1&quot;N 117°21'33.5&quot;E"
                        value={samplingCoordinates}
                        onChange={(e) => setSamplingCoordinates(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Pemilihan Parameter & Kalkulator Retribusi Otomatis */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <Calculator className="w-4 h-4 text-teal-600" />
                    <span>3. Pemilihan Parameter & Perhitungan Tarif Otomatis</span>
                  </div>

                  {/* Mode switcher: Paket vs Custom */}
                  <div className="flex items-center bg-slate-200 p-1 rounded-xl text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectionMode('package')}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        selectionMode === 'package'
                          ? 'bg-white text-teal-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Paket Baku Mutu
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectionMode('custom')}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        selectionMode === 'custom'
                          ? 'bg-white text-teal-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Pilih Parameter Bebas
                    </button>
                  </div>
                </div>

                {/* Package Mode */}
                {selectionMode === 'package' ? (
                  <div className="space-y-3">
                    {matrixPackages.length > 0 ? (
                      matrixPackages.map((pkg) => {
                        const isSelected = selectedPackageId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-teal-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="packageChoice"
                                    checked={isSelected}
                                    onChange={() => setSelectedPackageId(pkg.id)}
                                    className="text-teal-600 focus:ring-teal-500"
                                  />
                                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                                    {pkg.name}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 mt-1 pl-6">
                                  {pkg.description}
                                </p>
                                <span className="inline-block text-[11px] text-teal-800 font-medium bg-teal-100/60 px-2 py-0.5 rounded mt-2 ml-6">
                                  Dasar Hukum: {pkg.regulationRef}
                                </span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-sm sm:text-base font-black text-teal-800">
                                  {formatRupiah(pkg.discountedPrice || 0)}
                                </span>
                                <div className="text-[10px] text-slate-500">
                                  {pkg.parameterIds.length} Parameter Uji
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200 text-center">
                        Tidak ada paket khusus untuk matriks ini. Silakan gunakan tab <strong>"Pilih Parameter Bebas"</strong> di atas.
                      </div>
                    )}
                  </div>
                ) : (
                  /* Custom Parameter Selection */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                      <input
                        type="text"
                        placeholder="Cari nama parameter (cth: BOD, COD, Timbal, pH)..."
                        value={paramSearch}
                        onChange={(e) => setParamSearch(e.target.value)}
                        className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                      />
                      <span className="text-[11px] text-slate-500 shrink-0">
                        {selectedCustomParamIds.length} Dipilih
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
                      {availableParams
                        .filter(p => p.name.toLowerCase().includes(paramSearch.toLowerCase()) || p.code.toLowerCase().includes(paramSearch.toLowerCase()))
                        .map((param) => {
                          const isChecked = selectedCustomParamIds.includes(param.id);
                          return (
                            <div
                              key={param.id}
                              onClick={() => toggleCustomParam(param.id)}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-teal-50 border-teal-500 font-semibold text-teal-900 shadow-2xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}} // handled by parent div
                                  className="text-teal-600 rounded focus:ring-teal-500"
                                />
                                <div className="truncate">
                                  <div className="truncate text-slate-900">{param.name}</div>
                                  <div className="text-[10px] text-slate-500 font-mono">{param.methodSNI}</div>
                                </div>
                              </div>
                              <span className="text-teal-800 font-bold shrink-0 ml-2">
                                {formatRupiah(param.price)}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Cost Breakdown Summary Banner */}
                <div className="mt-4 bg-teal-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                  <div>
                    <div className="text-xs text-teal-200">Rincian Perhitungan Retribusi:</div>
                    <div className="text-xs text-slate-200 mt-0.5">
                      {activeParamIds.length} Parameter Uji {samplingType === 'petugas_lab' ? '+ Transport/Alat PPC Lab' : '(Sampling Mandiri)'}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-[11px] text-teal-200">Total Biaya Retribusi Perda:</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                      {formatRupiah(totalCost)}
                    </div>
                  </div>
                </div>

              </div>

              {/* Upload Berkas Pendukung (Surat Permohonan) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 text-center">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <div className="text-xs font-semibold text-slate-700">
                  Unggah Dokumen Permohonan Resmi / Surat Pengantar (Opsional)
                </div>
                <p className="text-[11px] text-slate-500">
                  Format PDF, JPG, PNG maksimal 5 MB. Dokumen fisik juga dapat diserahkan saat petugas sampling tiba.
                </p>
                <div className="mt-2 inline-block">
                  <label className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs">
                    Pilih Berkas
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>

              {/* Legal Notice & Submit */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Dengan menekan tombol kirim di bawah, Anda menyatakan bahwa data yang diisi adalah benar untuk diproses sesuai Standar Operasional Prosedur (SOP) UPTD Lab Lingkungan DLH Kabupaten Bulungan.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Kirim Permohonan & Dapatkan Nomor Tiket</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
