import { MatrixType, SampleStatus } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateIndo(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function getMatrixInfo(matrix: MatrixType): { label: string; badgeColor: string; description: string } {
  switch (matrix) {
    case 'air_permukaan':
      return {
        label: 'Air Permukaan (Sungai/Danau)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        description: 'Sungai Kayan, rawa, badan air baku untuk pemantauan rona lingkungan.'
      };
    case 'air_limbah':
      return {
        label: 'Air Limbah Industri & Domestik',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        description: 'Outlet IPAL pabrik kelapa sawit, tambang, rumah sakit, dan domestik.'
      };
    case 'air_minum':
      return {
        label: 'Air Minum & Air Bersih (DAMIU)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        description: 'Depot air minum isi ulang, air sumur, PDAM, dan air konsumsi.'
      };
    case 'udara_ambien':
      return {
        label: 'Udara Ambien (SO2, NO2, PM2.5/PM10)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: 'Kualitas udara lingkungan pemukiman, kawasan industri, dan tapak proyek.'
      };
    case 'kebisingan':
      return {
        label: 'Kebisingan Lingkungan 24 Jam',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        description: 'Tingkat kebisingan Lsm pemukiman, kawasan usaha, dan tempat kerja.'
      };
    case 'emisi':
      return {
        label: 'Emisi Sumber Tidak Bergerak (Cerobong)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
        description: 'Gas buang cerobong boiler pabrik dan genset berdaya besar.'
      };
    case 'tanah':
      return {
        label: 'Tanah & Sedimen Lingkungan',
        badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
        description: 'Karakteristik tanah dan kandungan logam berat di sedimen.'
      };
    default:
      return {
        label: 'Matriks Lainnya',
        badgeColor: 'bg-gray-100 text-gray-800 border-gray-300',
        description: 'Pengujian sampel lingkungan spesifik.'
      };
  }
}

export function getStatusInfo(status: SampleStatus): {
  step: number;
  label: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  description: string;
} {
  switch (status) {
    case 'pendaftaran':
      return {
        step: 1,
        label: 'Pendaftaran Diterima',
        badgeBg: 'bg-sky-50',
        badgeText: 'text-sky-700',
        borderColor: 'border-sky-300',
        description: 'Permohonan berhasil diregistrasi, menunggu kaji ulang ketersediaan reagen dan kapasitas pengujian.'
      };
    case 'kaji_ulang_bayar':
      return {
        step: 2,
        label: 'Kaji Ulang & SKRD Retribusi',
        badgeBg: 'bg-amber-50',
        badgeText: 'text-amber-800',
        borderColor: 'border-amber-300',
        description: 'Pemeriksaan sampel/jadwal sampling disetujui. Surat Ketetapan Retribusi Daerah (SKRD) telah diterbitkan.'
      };
    case 'analisis_lab':
      return {
        step: 3,
        label: 'Analisis & Pengujian di Lab',
        badgeBg: 'bg-indigo-50',
        badgeText: 'text-indigo-800',
        borderColor: 'border-indigo-300',
        description: 'Sampel sedang dalam proses preparasi dan analisis di laboratorium (titrasi, AAS, spektrofotometri, inkubasi BOD).'
      };
    case 'verifikasi':
    case 'verifikasi_mutu':
      return {
        step: 4,
        label: 'Verifikasi & Validasi Mutu',
        badgeBg: 'bg-purple-50',
        badgeText: 'text-purple-800',
        borderColor: 'border-purple-300',
        description: 'Data mentah pengujian diperiksa dan divalidasi oleh Manajer Teknis serta Manajer Mutu.'
      };
    case 'lhp_terbit':
      return {
        step: 5,
        label: 'LHP Selesai Terbit',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-800',
        borderColor: 'border-emerald-300',
        description: 'Laporan Hasil Pengujian (LHP) telah disahkan dengan Tanda Tangan Elektronik resmi dan siap diunduh.'
      };
  }
}

export const LAB_STEPS: { id: SampleStatus; title: string; subtitle: string }[] = [
  { id: 'pendaftaran', title: '1. Pendaftaran', subtitle: 'Registrasi data & sampel' },
  { id: 'kaji_ulang_bayar', title: '2. Kaji Ulang & Bayar', subtitle: 'Penetapan SKRD retribusi' },
  { id: 'analisis_lab', title: '3. Analisis Laboratorium', subtitle: 'Pengujian parameter SNI' },
  { id: 'verifikasi', title: '4. Verifikasi Mutu', subtitle: 'Validasi Manajer Teknis' },
  { id: 'lhp_terbit', title: '5. LHP Diterbitkan', subtitle: 'Dokumen ber-TTE resmi' },
];
