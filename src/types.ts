export type MatrixType = 
  | 'air_permukaan'
  | 'air_limbah'
  | 'air_minum'
  | 'udara_ambien'
  | 'emisi'
  | 'kebisingan'
  | 'tanah';

export interface TestParameter {
  id: string;
  name: string;
  code: string;
  matrix: MatrixType;
  unit: string;
  methodSNI: string;
  standardLimit: string;
  price: number;
  isAccreditedKAN: boolean;
  category: 'Fisika' | 'Kimia Anorganik' | 'Kimia Organik' | 'Mikrobiologi' | 'Udara & Kebisingan';
}

export interface ParameterPackage {
  id: string;
  name: string;
  matrix: MatrixType;
  description: string;
  regulationRef: string;
  parameterIds: string[];
  discountedPrice?: number;
}

export type SampleStatus = 
  | 'pendaftaran'
  | 'kaji_ulang_bayar'
  | 'analisis_lab'
  | 'verifikasi'
  | 'verifikasi_mutu'
  | 'lhp_terbit';

export interface TestResultItem {
  parameterId: string;
  parameterName: string;
  unit: string;
  method: string;
  result: string;
  standardLimit: string;
  compliance: 'MEMENUHI' | 'MELEBIHI' | 'SESUAI';
}

export interface SampleRequest {
  id: string;
  registrationNumber: string; // e.g. LAB-BLG-2026-0042
  createdAt: string;
  customerName: string;
  institution: string;
  idNumber: string; // NIK or NIB
  phoneNumber: string;
  email: string;
  address: string;
  matrix: MatrixType;
  samplingLocation: string;
  samplingCoordinates?: string;
  samplingDate: string;
  samplingType: 'mandiri' | 'petugas_lab';
  parameterIds: string[];
  totalCost: number;
  status: SampleStatus;
  statusHistory: {
    status: SampleStatus;
    timestamp: string;
    note: string;
    actor: string;
  }[];
  lhpNumber?: string;
  lhpReleaseDate?: string;
  testResults?: TestResultItem[];
  technicianNotes?: string;
  paymentStatus: 'Belum Dibayar' | 'Belum Lunas' | 'Lunas' | 'Bebas Retribusi / Program DLH';
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary?: string;
  excerpt?: string;
  content: string;
  imageUrl: string;
  author: string;
  tags?: string[];
}

export type NewsArticle = NewsItem;

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  nip?: string;
  education: string;
  roleDescription: string;
  level: number; // for org tree
}

export interface LabFacility {
  id: string;
  name: string;
  brandModel: string;
  functionDesc: string;
  specs: string;
  category: 'Instrumen Analitik' | 'Preparasi & Fisika' | 'Sampling Lapangan' | 'Mikrobiologi';
}

export interface SOPDocument {
  id: string;
  code: string;
  title: string;
  revision: string;
  effectiveDate: string;
  description: string;
  fileSize: string;
}

export interface SKMQuestion {
  id: number;
  question: string;
  category: string;
}

export interface SKMFeedback {
  id: string;
  customerName: string;
  institution: string;
  date: string;
  overallRating: number;
  comment: string;
  ratings: Record<number, number>; // questionId -> rating (1-4)
}

export interface ComplaintTicket {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Diterima' | 'Diproses' | 'Selesai Ditindaklanjuti';
  response?: string;
}

export interface AdminUser {
  username: string;
  name: string;
  role: 'Administrator Utama' | 'Manajer Teknis' | 'Manajer Mutu' | 'Petugas Loket / TU';
  nip?: string;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface SiteSettings {
  agencyName: string;
  agencySub: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  kanAccreditationNumber: string;
  kanAccreditationStd: string;
  runningText: string;
  announcementActive: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  visi: string;
  misi: string[];
  maklumatPelayanan: string;
  mottoPelayanan: string;
}
