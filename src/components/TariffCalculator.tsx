import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Search, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  FileSpreadsheet, 
  ArrowRight, 
  Download, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { MatrixType, TestParameter } from '../types';
import { LAB_PARAMETERS, PARAMETER_PACKAGES } from '../data/labData';
import { formatRupiah, getMatrixInfo } from '../utils/helpers';

interface TariffCalculatorProps {
  onOpenSubmissionModal: () => void;
  parameters?: TestParameter[];
}

export const TariffCalculator: React.FC<TariffCalculatorProps> = ({
  onOpenSubmissionModal,
  parameters = LAB_PARAMETERS,
}) => {
  const [selectedMatrix, setSelectedMatrix] = useState<MatrixType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartParamIds, setCartParamIds] = useState<string[]>(['param-al-ph', 'param-al-bod', 'param-al-cod']);

  // Filtered parameters
  const filteredParams = useMemo(() => {
    return parameters.filter((p) => {
      const matchMatrix = selectedMatrix === 'all' || p.matrix === selectedMatrix;
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchQuery = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.methodSNI.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMatrix && matchCategory && matchQuery;
    });
  }, [parameters, selectedMatrix, selectedCategory, searchQuery]);

  // Cart total cost
  const cartTotal = useMemo(() => {
    return cartParamIds.reduce((sum, id) => {
      const param = parameters.find(p => p.id === id);
      return sum + (param ? param.price : 0);
    }, 0);
  }, [parameters, cartParamIds]);

  const toggleCartParam = (id: string) => {
    setCartParamIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleApplyPackage = (packageParamIds: string[]) => {
    setCartParamIds(packageParamIds);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            <span>Transparansi Tarif Sesuai Perda Kab. Bulungan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            Daftar Parameter Pengujian & Simulasi Tarif Retribusi
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Ketahui standar metode pengujian SNI, nilai batas baku mutu, dan estimasi biaya retribusi pengujian laboratorium lingkungan secara transparan.
          </p>
        </div>

        {/* PACKAGE PRESETS CAROUSEL */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Paket Standar Baku Mutu Regulasi Populer
              </h3>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Klik "Pilih Paket" untuk memasukkan semua parameter ke simulasi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARAMETER_PACKAGES.map((pkg) => {
              const isApplied = pkg.parameterIds.every(id => cartParamIds.includes(id));
              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {getMatrixInfo(pkg.matrix).label.split(' ')[0]}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                      {pkg.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-2 font-mono">
                      {pkg.parameterIds.length} Parameter Uji SNI
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tarif Paket:</span>
                      <span className="text-xs sm:text-sm font-black text-teal-800">
                        {formatRupiah(pkg.discountedPrice || 0)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyPackage(pkg.parameterIds)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isApplied 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                      }`}
                    >
                      {isApplied ? '✓ Terpilih' : 'Pilih Paket'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN INTERACTIVE SECTION: LEFT BROWSER, RIGHT CART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter & Parameter Table */}
          <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Search & Filter Controls */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari parameter, kode, atau metode SNI (cth: BOD, Logam, 6989.11)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                {/* Matrix Filter */}
                <select
                  value={selectedMatrix}
                  onChange={(e) => setSelectedMatrix(e.target.value as any)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  <option value="all">Semua Matriks Sampel</option>
                  <option value="air_limbah">Air Limbah Industri & Domestik</option>
                  <option value="air_permukaan">Air Permukaan (Sungai/Danau)</option>
                  <option value="air_minum">Air Minum & Bersih (DAMIU)</option>
                  <option value="udara_ambien">Udara Ambien</option>
                  <option value="kebisingan">Kebisingan Lingkungan</option>
                  <option value="emisi">Emisi Cerobong</option>
                </select>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  <option value="all">Semua Kategori Uji</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Kimia Anorganik">Kimia Anorganik</option>
                  <option value="Kimia Organik">Kimia Organik</option>
                  <option value="Mikrobiologi">Mikrobiologi</option>
                  <option value="Udara & Kebisingan">Udara & Kebisingan</option>
                </select>
              </div>

              {/* Status info bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Menampilkan <strong>{filteredParams.length}</strong> parameter pengujian</span>
                <span className="flex items-center gap-1 text-[11px] text-teal-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Logo KAN = Ruang Lingkup Terakreditasi</span>
                </span>
              </div>
            </div>

            {/* Parameter List */}
            <div className="overflow-x-auto max-h-[580px] overflow-y-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200 z-10">
                  <tr>
                    <th className="py-2.5 px-3">Parameter Uji</th>
                    <th className="py-2.5 px-3">Metode Standar SNI</th>
                    <th className="py-2.5 px-3 text-center">Baku Mutu</th>
                    <th className="py-2.5 px-3 text-right">Tarif Perda</th>
                    <th className="py-2.5 px-3 text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredParams.length > 0 ? (
                    filteredParams.map((param) => {
                      const isInCart = cartParamIds.includes(param.id);
                      return (
                        <tr 
                          key={param.id} 
                          className={`hover:bg-teal-50/50 transition-colors ${
                            isInCart ? 'bg-teal-50/30' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{param.name}</span>
                              {param.isAccreditedKAN && (
                                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-900 border border-amber-300" title="Terakreditasi KAN ISO/IEC 17025">
                                  KAN
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span className="font-mono bg-slate-100 px-1 rounded">{param.code}</span>
                              <span>•</span>
                              <span>{param.category}</span>
                              <span>•</span>
                              <span>Satuan: {param.unit}</span>
                            </div>
                          </td>

                          <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                            {param.methodSNI}
                          </td>

                          <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-700">
                            {param.standardLimit}
                          </td>

                          <td className="py-2.5 px-3 text-right font-mono font-bold text-teal-900">
                            {formatRupiah(param.price)}
                          </td>

                          <td className="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => toggleCartParam(param.id)}
                              className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                isInCart
                                  ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                                  : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-600 hover:text-white'
                              }`}
                              title={isInCart ? 'Hapus dari simulasi' : 'Tambahkan ke simulasi'}
                            >
                              {isInCart ? <Trash2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 text-xs italic">
                        Tidak ada parameter yang cocok dengan kriteria pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Right Column: Interactive Tariff Simulation Cart */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Simulasi Estimasi Retribusi
                  </h3>
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {cartParamIds.length} Parameter
                </span>
              </div>

              {/* Cart List */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {cartParamIds.length > 0 ? (
                  cartParamIds.map((id) => {
                    const param = parameters.find(p => p.id === id);
                    if (!param) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="truncate mr-2">
                          <div className="font-semibold text-slate-800 truncate">{param.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{param.code}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono font-bold text-teal-900">
                            {formatRupiah(param.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleCartParam(id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    Belum ada parameter dipilih. Klik ikon <Plus className="w-3 h-3 inline text-teal-600" /> pada tabel di samping untuk menambahkan parameter.
                  </div>
                )}
              </div>

              {/* Total Calculation Card */}
              <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-4 rounded-2xl shadow-inner space-y-2">
                <div className="flex justify-between text-xs text-teal-200">
                  <span>Subtotal Pengujian:</span>
                  <span className="font-mono">{formatRupiah(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-teal-200">
                  <span>Retribusi Perda:</span>
                  <span className="text-amber-300 font-bold">100% Sesuai SKRD</span>
                </div>
                <div className="pt-2 border-t border-teal-800 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-white">Estimasi Total:</span>
                  <span className="text-lg font-black text-amber-300 font-mono">
                    {formatRupiah(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={onOpenSubmissionModal}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ajukan Permohonan Sampel Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {cartParamIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCartParamIds([])}
                  className="w-full py-1.5 text-slate-500 hover:text-red-600 text-xs transition-colors"
                >
                  Kosongkan Pilihan Simulasi
                </button>
              )}

              {/* Information Note */}
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                <p>
                  * Tarif pengujian mengacu pada Peraturan Daerah Kabupaten Bulungan tentang Retribusi Jasa Usaha Pengujian Laboratorium Lingkungan Hidup.
                </p>
                <p className="mt-1">
                  * Biaya transport sampling lapangan petugas PPC menyesuaikan jarak zona kecamatan di wilayah Kabupaten Bulungan.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
