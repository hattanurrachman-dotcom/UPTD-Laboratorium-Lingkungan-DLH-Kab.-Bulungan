import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  X, 
  Eye, 
  Sparkles,
  TrendingUp,
  Waves,
  Wind
} from 'lucide-react';
import { NEWS_ARTICLES } from '../data/labData';
import { NewsArticle, NewsItem } from '../types';
import { formatDateIndo } from '../utils/helpers';

interface NewsSectionProps {
  news?: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const articlesList = news && news.length > 0 ? news : NEWS_ARTICLES;

  const filteredNews = articlesList.filter((article) => {
    if (selectedCategory === 'all') return true;
    return article.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section className="py-12 bg-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <Newspaper className="w-3.5 h-3.5 text-teal-600" />
            <span>Kabar & Publikasi Resmi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif-display">
            Berita Laboratorium & Informasi Mutu Lingkungan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Publikasi kegiatan pemantauan sungai, uji emisi berkala, perkembangan akreditasi KAN, dan transparansi data kualitas lingkungan Kabupaten Bulungan.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'Semua Publikasi' },
              { id: 'berita', label: 'Kegiatan & Berita' },
              { id: 'pengumuman', label: 'Pengumuman Resmi' },
              { id: 'laporan', label: 'Laporan Kualitas Lingkungan' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* HIGHLIGHT DATA METRIC: IKLH KABUPATEN BULUNGAN */}
        <div className="mb-10 bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-teal-900/80 px-2.5 py-0.5 rounded-full border border-teal-600/40">
                DATA PUBLIKASI TERKINI DLH
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif-display">
                Indeks Kualitas Lingkungan Hidup (IKLH) Kab. Bulungan
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Berdasarkan hasil uji berkala UPTD Laboratorium Lingkungan pada 10 titik stasiun sungai, stasiun udara ambien, dan tutupan lahan se-Kabupaten Bulungan.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center shrink-0 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                <div className="flex items-center justify-center gap-1 text-[10px] text-teal-300 mb-1">
                  <Waves className="w-3 h-3" />
                  <span>IKA (Air)</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300">62.8</div>
                <div className="text-[9px] text-slate-300">Cukup Baik</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                <div className="flex items-center justify-center gap-1 text-[10px] text-sky-300 mb-1">
                  <Wind className="w-3 h-3" />
                  <span>IKU (Udara)</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-300">89.4</div>
                <div className="text-[9px] text-slate-300">Sangat Baik</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                <div className="flex items-center justify-center gap-1 text-[10px] text-teal-300 mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>IKLH Total</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">74.2</div>
                <div className="text-[9px] text-amber-300 font-bold">Kategori BAIK</div>
              </div>
            </div>
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-teal-900/90 text-amber-300 backdrop-blur-xs border border-teal-600/40">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {formatDateIndo(article.date)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-teal-600" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt || article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {(article.tags || ['lingkungan', 'dlh']).slice(0, 2).map((tg: string, i: number) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        #{tg}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Baca Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col">
              
              {/* Header Image */}
              <div className="relative h-64 shrink-0">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                    {selectedArticle.category} • {formatDateIndo(selectedArticle.date)}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-display leading-tight">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span>Penulis: <strong>{selectedArticle.author}</strong></span>
                  <div className="flex gap-1">
                    {(selectedArticle.tags || ['lablingkungan', 'dlh']).map((tg: string, i: number) => (
                      <span key={i} className="bg-slate-100 text-teal-800 px-2 py-0.5 rounded text-[10px] font-medium">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-semibold text-slate-900 italic">
                  {selectedArticle.excerpt || selectedArticle.summary}
                </p>

                <p>{selectedArticle.content}</p>

                <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 text-teal-900 text-xs">
                  <strong className="block mb-1">Dinas Lingkungan Hidup Kabupaten Bulungan</strong>
                  <span>Untuk konfirmasi data teknis hasil uji atau permohonan kajian lingkungan hidup daerah, hubungi loket pelayanan laboratorium di Jl. Kolonel Soetadji No. 1 Tanjung Selor.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Tutup Artikel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
