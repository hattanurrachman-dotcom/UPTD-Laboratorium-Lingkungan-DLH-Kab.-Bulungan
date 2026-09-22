import {
  TestParameter,
  ParameterPackage,
  SampleRequest,
  NewsItem,
  StaffMember,
  LabFacility,
  SOPDocument,
  SKMQuestion,
  SKMFeedback,
  ComplaintTicket
} from '../types';

export const LAB_PARAMETERS: TestParameter[] = [
  // --- AIR PERMUKAAN (Sungai Kayan, Sungai Krayan, Rawa) ---
  {
    id: 'param-ap-ph',
    name: 'Derajat Keasaman (pH)',
    code: 'pH-AP',
    matrix: 'air_permukaan',
    unit: '-',
    methodSNI: 'SNI 6989.11:2019',
    standardLimit: '6.0 - 9.0',
    price: 35000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-ap-suhu',
    name: 'Suhu / Temperatur',
    code: 'SUHU-AP',
    matrix: 'air_permukaan',
    unit: '°C',
    methodSNI: 'SNI 06-6989.23-2005',
    standardLimit: 'Deviasi 3°C',
    price: 25000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-ap-tds',
    name: 'Total Padatan Terlarut (TDS)',
    code: 'TDS-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.27:2019',
    standardLimit: '1000 mg/L',
    price: 45000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-ap-tss',
    name: 'Total Padatan Tersuspensi (TSS)',
    code: 'TSS-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.3:2019',
    standardLimit: '50 mg/L',
    price: 55000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-ap-do',
    name: 'Oksigen Terlarut (DO)',
    code: 'DO-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 06-6989.14-2004',
    standardLimit: '≥ 4.0 mg/L',
    price: 40000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-ap-bod',
    name: 'Biological Oxygen Demand (BOD5)',
    code: 'BOD-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.72:2009',
    standardLimit: '3.0 mg/L',
    price: 90000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-ap-cod',
    name: 'Chemical Oxygen Demand (COD)',
    code: 'COD-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.2:2019',
    standardLimit: '25.0 mg/L',
    price: 85000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-ap-amonia',
    name: 'Amonia Total (NH3-N)',
    code: 'NH3-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 06-6989.30-2005',
    standardLimit: '0.5 mg/L',
    price: 65000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-ap-nitrat',
    name: 'Nitrat (NO3-N)',
    code: 'NO3-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.79:2011',
    standardLimit: '10.0 mg/L',
    price: 60000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-ap-fosfat',
    name: 'Total Fosfat (P)',
    code: 'PO4-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 06-6989.31-2005',
    standardLimit: '0.2 mg/L',
    price: 65000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-ap-minyak',
    name: 'Minyak dan Lemak',
    code: 'OIL-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.10:2011',
    standardLimit: '1.0 mg/L',
    price: 110000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-ap-fe',
    name: 'Besi Terlarut (Fe)',
    code: 'FE-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.4:2009 (AAS)',
    standardLimit: '0.3 mg/L',
    price: 75000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-ap-mn',
    name: 'Mangan Terlarut (Mn)',
    code: 'MN-AP',
    matrix: 'air_permukaan',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.5:2009 (AAS)',
    standardLimit: '0.1 mg/L',
    price: 75000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-ap-coliform',
    name: 'Fecal Coliform',
    code: 'COLI-AP',
    matrix: 'air_permukaan',
    unit: 'MPN/100 mL',
    methodSNI: 'APHA Ed. 23th 9221 E',
    standardLimit: '1000 MPN/100mL',
    price: 85000,
    isAccreditedKAN: false,
    category: 'Mikrobiologi'
  },

  // --- AIR LIMBAH (Industri Kelapa Sawit, Tambang, Domestik, Rumah Sakit) ---
  {
    id: 'param-al-ph',
    name: 'Derajat Keasaman (pH) Air Limbah',
    code: 'pH-AL',
    matrix: 'air_limbah',
    unit: '-',
    methodSNI: 'SNI 6989.11:2019',
    standardLimit: '6.0 - 9.0',
    price: 35000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-al-tss',
    name: 'TSS (Total Suspended Solids)',
    code: 'TSS-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.3:2019',
    standardLimit: '50 - 100 mg/L',
    price: 60000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-al-bod',
    name: 'BOD5 (Biochemical Oxygen Demand)',
    code: 'BOD-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.72:2009',
    standardLimit: '30 - 50 mg/L',
    price: 95000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-al-cod',
    name: 'COD (Chemical Oxygen Demand)',
    code: 'COD-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.2:2019 Refluks Tertutup',
    standardLimit: '100 - 200 mg/L',
    price: 90000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-al-minyak',
    name: 'Minyak dan Lemak (Oil & Grease)',
    code: 'OIL-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.10:2011',
    standardLimit: '5.0 - 10.0 mg/L',
    price: 120000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-al-amonia',
    name: 'Amoniak Bebas (NH3-N)',
    code: 'NH3-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 06-6989.30-2005',
    standardLimit: '5.0 - 10.0 mg/L',
    price: 70000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-al-total-n',
    name: 'Total Nitrogen',
    code: 'TN-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'APHA Ed. 23th 4500-Norg',
    standardLimit: '30.0 mg/L',
    price: 95000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-al-sulfida',
    name: 'Sulfida (H2S)',
    code: 'S-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.70:2009',
    standardLimit: '1.0 mg/L',
    price: 75000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-al-fenol',
    name: 'Senyawa Fenol Total',
    code: 'FENOL-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 06-6989.21-2004',
    standardLimit: '0.5 mg/L',
    price: 110000,
    isAccreditedKAN: true,
    category: 'Kimia Organik'
  },
  {
    id: 'param-al-pb',
    name: 'Timbal (Pb)',
    code: 'PB-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.8:2009 (AAS)',
    standardLimit: '0.1 mg/L',
    price: 80000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-al-cd',
    name: 'Kadmium (Cd)',
    code: 'CD-AL',
    matrix: 'air_limbah',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.16:2009 (AAS)',
    standardLimit: '0.05 mg/L',
    price: 80000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },

  // --- AIR MINUM & BERSIH (Depot Air DAMIU, PDAM, Sumur) ---
  {
    id: 'param-am-bau',
    name: 'Bau & Rasa (Organoleptik)',
    code: 'BAU-AM',
    matrix: 'air_minum',
    unit: '-',
    methodSNI: 'Organoleptik',
    standardLimit: 'Tidak Berbau & Berasa',
    price: 20000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-am-kekeruhan',
    name: 'Kekeruhan (Turbidity)',
    code: 'TURB-AM',
    matrix: 'air_minum',
    unit: 'NTU',
    methodSNI: 'SNI 06-6989.25-2005',
    standardLimit: '3 - 5 NTU',
    price: 35000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-am-warna',
    name: 'Warna (True Color)',
    code: 'COLOR-AM',
    matrix: 'air_minum',
    unit: 'Pt-Co',
    methodSNI: 'SNI 6989.80:2011',
    standardLimit: '10 - 15 TCU',
    price: 35000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-am-tds',
    name: 'Total Padatan Terlarut (TDS)',
    code: 'TDS-AM',
    matrix: 'air_minum',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.27:2019',
    standardLimit: '300 mg/L',
    price: 45000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-am-ph',
    name: 'Derajat Keasaman (pH)',
    code: 'pH-AM',
    matrix: 'air_minum',
    unit: '-',
    methodSNI: 'SNI 6989.11:2019',
    standardLimit: '6.5 - 8.5',
    price: 35000,
    isAccreditedKAN: true,
    category: 'Fisika'
  },
  {
    id: 'param-am-kesadahan',
    name: 'Kesadahan Total (CaCO3)',
    code: 'HARD-AM',
    matrix: 'air_minum',
    unit: 'mg/L',
    methodSNI: 'SNI 06-6989.12-2004',
    standardLimit: '300 mg/L',
    price: 55000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-am-klorida',
    name: 'Klorida (Cl-)',
    code: 'CL-AM',
    matrix: 'air_minum',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.19:2009',
    standardLimit: '250 mg/L',
    price: 50000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-am-besi',
    name: 'Besi Terlarut (Fe)',
    code: 'FE-AM',
    matrix: 'air_minum',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.4:2009',
    standardLimit: '0.2 mg/L',
    price: 75000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-am-mangan',
    name: 'Mangan Terlarut (Mn)',
    code: 'MN-AM',
    matrix: 'air_minum',
    unit: 'mg/L',
    methodSNI: 'SNI 6989.5:2009',
    standardLimit: '0.1 mg/L',
    price: 75000,
    isAccreditedKAN: true,
    category: 'Kimia Anorganik'
  },
  {
    id: 'param-am-ecoli',
    name: 'Escherichia coli (E. Coli)',
    code: 'ECOLI-AM',
    matrix: 'air_minum',
    unit: 'CFU/100 mL',
    methodSNI: 'SNI 01-3554-2006 / APHA 9222',
    standardLimit: '0 CFU/100 mL (Nihil)',
    price: 90000,
    isAccreditedKAN: true,
    category: 'Mikrobiologi'
  },
  {
    id: 'param-am-coliform',
    name: 'Total Bakteri Koliform',
    code: 'COLI-AM',
    matrix: 'air_minum',
    unit: 'CFU/100 mL',
    methodSNI: 'SNI 01-3554-2006 / APHA 9222',
    standardLimit: '0 CFU/100 mL (Nihil)',
    price: 85000,
    isAccreditedKAN: true,
    category: 'Mikrobiologi'
  },

  // --- UDARA AMBIEN & KEBISINGAN ---
  {
    id: 'param-ud-so2',
    name: 'Sulfur Dioksida (SO2) 1 Jam / 24 Jam',
    code: 'SO2-UD',
    matrix: 'udara_ambien',
    unit: 'µg/m³',
    methodSNI: 'SNI 7119.7:2017 (Pararosanilin)',
    standardLimit: '75 µg/m³ (24 Jam)',
    price: 150000,
    isAccreditedKAN: true,
    category: 'Udara & Kebisingan'
  },
  {
    id: 'param-ud-no2',
    name: 'Nitrogen Dioksida (NO2) 1 Jam / 24 Jam',
    code: 'NO2-UD',
    matrix: 'udara_ambien',
    unit: 'µg/m³',
    methodSNI: 'SNI 7119-2:2017 (Griess Saltzman)',
    standardLimit: '65 µg/m³ (24 Jam)',
    price: 150000,
    isAccreditedKAN: true,
    category: 'Udara & Kebisingan'
  },
  {
    id: 'param-ud-co',
    name: 'Karbon Monoksida (CO)',
    code: 'CO-UD',
    matrix: 'udara_ambien',
    unit: 'µg/m³',
    methodSNI: 'SNI 7119.10:2011 (NDIR)',
    standardLimit: '4000 µg/m³ (8 Jam)',
    price: 175000,
    isAccreditedKAN: true,
    category: 'Udara & Kebisingan'
  },
  {
    id: 'param-ud-pm10',
    name: 'Partikel Debu PM10 (Inhalabel)',
    code: 'PM10-UD',
    matrix: 'udara_ambien',
    unit: 'µg/m³',
    methodSNI: 'SNI 7119.15:2016 (HVAS)',
    standardLimit: '75 µg/m³ (24 Jam)',
    price: 180000,
    isAccreditedKAN: true,
    category: 'Udara & Kebisingan'
  },
  {
    id: 'param-ud-pm25',
    name: 'Partikel Halus PM2.5 (Respirabel)',
    code: 'PM25-UD',
    matrix: 'udara_ambien',
    unit: 'µg/m³',
    methodSNI: 'SNI 7119.14:2016 (HVAS)',
    standardLimit: '55 µg/m³ (24 Jam)',
    price: 195000,
    isAccreditedKAN: true,
    category: 'Udara & Kebisingan'
  },
  {
    id: 'param-ud-kebisingan',
    name: 'Tingkat Kebisingan Lingkungan (Lsm 24 Jam)',
    code: 'NOISE-UD',
    matrix: 'kebisingan',
    unit: 'dBA',
    methodSNI: 'SNI 8427:2017 (Sound Level Meter)',
    standardLimit: '55 dBA (Pemukiman) / 70 dBA (Industri)',
    price: 250000,
    isAccreditedKAN: true,
    category: 'Udara & Kebisingan'
  },

  // --- EMISI SUMBER TIDAK BERGERAK ---
  {
    id: 'param-em-partikulat',
    name: 'Partikulat Isokinetik Cerobong',
    code: 'PART-EM',
    matrix: 'emisi',
    unit: 'mg/Nm³',
    methodSNI: 'SNI 7117.17:2009',
    standardLimit: '150 mg/Nm³',
    price: 450000,
    isAccreditedKAN: false,
    category: 'Udara & Kebisingan'
  },
  {
    id: 'param-em-so2',
    name: 'Sulfur Dioksida Cerobong (SO2)',
    code: 'SO2-EM',
    matrix: 'emisi',
    unit: 'mg/Nm³',
    methodSNI: 'SNI 7117.18:2009',
    standardLimit: '600 mg/Nm³',
    price: 250000,
    isAccreditedKAN: false,
    category: 'Udara & Kebisingan'
  }
];

export const PARAMETER_PACKAGES: ParameterPackage[] = [
  {
    id: 'pkg-sungai-kayan',
    name: 'Paket Pemantauan Sungai Kayan (Baku Mutu PP 22/2021 Kelas II)',
    matrix: 'air_permukaan',
    description: 'Paket komprehensif uji kualitas air sungai, danau, dan badan air untuk kepatuhan AMDAL/UKL-UPL dan izin pemanfaatan air.',
    regulationRef: 'PP No. 22 Tahun 2021 Lampiran VI (Kelas II)',
    parameterIds: [
      'param-ap-ph',
      'param-ap-suhu',
      'param-ap-tds',
      'param-ap-tss',
      'param-ap-do',
      'param-ap-bod',
      'param-ap-cod',
      'param-ap-amonia',
      'param-ap-nitrat',
      'param-ap-fosfat',
      'param-ap-minyak',
      'param-ap-fe',
      'param-ap-mn'
    ],
    discountedPrice: 780000 // Regular sum: ~855000
  },
  {
    id: 'pkg-ipal-sawit',
    name: 'Paket Air Limbah Pabrik Kelapa Sawit (PKS) & Industri',
    matrix: 'air_limbah',
    description: 'Parameter wajib pembuangan air limbah industri sawit, tambang, dan perkebunan sesuai standar Permen LHK No. 5/2014 & Perda Bulungan.',
    regulationRef: 'Permen LHK No. 5 Tahun 2014 & Perda Kab. Bulungan',
    parameterIds: [
      'param-al-ph',
      'param-al-tss',
      'param-al-bod',
      'param-al-cod',
      'param-al-minyak',
      'param-al-amonia',
      'param-al-total-n'
    ],
    discountedPrice: 510000 // Regular sum: 560000
  },
  {
    id: 'pkg-damiu-airminum',
    name: 'Paket Higiene Sanitasi Depot Air Minum (DAMIU) & Air Bersih',
    matrix: 'air_minum',
    description: 'Pemeriksaan rutin kelayakan konsumsi depot air minum, kantin, hotel, dan katering sesuai Permenkes No. 2 Tahun 2023.',
    regulationRef: 'Permenkes RI No. 2 Tahun 2023 Standar Baku Mutu Air Minum',
    parameterIds: [
      'param-am-bau',
      'param-am-kekeruhan',
      'param-am-warna',
      'param-am-tds',
      'param-am-ph',
      'param-am-besi',
      'param-am-mangan',
      'param-am-ecoli',
      'param-am-coliform'
    ],
    discountedPrice: 420000 // Regular sum: 470000
  },
  {
    id: 'pkg-udara-kebisingan',
    name: 'Paket Udara Ambien 24 Jam & Kebisingan Tapak Proyek',
    matrix: 'udara_ambien',
    description: 'Pemantauan rona lingkungan awal dan pasca konstruksi tapak pabrik, kawasan pelabuhan Pesona, dan fasilitas publik Bulungan.',
    regulationRef: 'PP No. 22 Tahun 2021 Lampiran VII & Kepmen LH 48/1996',
    parameterIds: [
      'param-ud-so2',
      'param-ud-no2',
      'param-ud-co',
      'param-ud-pm10',
      'param-ud-pm25',
      'param-ud-kebisingan'
    ],
    discountedPrice: 1050000 // Regular sum: 1195000
  }
];

export const INITIAL_SAMPLE_REQUESTS: SampleRequest[] = [
  {
    id: 'sample-001',
    registrationNumber: 'LAB-BLG-2026-0042',
    createdAt: '2026-09-12 08:30',
    customerName: 'Ir. Hendra Kusuma (Manager HSE)',
    institution: 'PT Benuanta Sawit Makmur',
    idNumber: '9120003429810002',
    phoneNumber: '081254332190',
    email: 'hse@benuantasawit.co.id',
    address: 'Kecamatan Tanjung Palas Timur, Kabupaten Bulungan',
    matrix: 'air_limbah',
    samplingLocation: 'Outlet Kolam Akhir IPAL (Titik Penaatan 01)',
    samplingCoordinates: '2°48\'12.4"N 117°22\'45.8"E',
    samplingDate: '2026-09-12',
    samplingType: 'petugas_lab',
    parameterIds: [
      'param-al-ph',
      'param-al-tss',
      'param-al-bod',
      'param-al-cod',
      'param-al-minyak',
      'param-al-amonia',
      'param-al-total-n'
    ],
    totalCost: 510000,
    status: 'lhp_terbit',
    paymentStatus: 'Lunas',
    lhpNumber: '660.1/148/LHP-LAB/DLH-BLG/IX/2026',
    lhpReleaseDate: '2026-09-19',
    technicianNotes: 'Kondisi cuaca saat sampling cerah, debit air normal. Semua parameter berada di bawah batas baku mutu Permen LHK No. 5 Tahun 2014 Lampiran III.',
    statusHistory: [
      {
        status: 'pendaftaran',
        timestamp: '2026-09-12 08:30',
        note: 'Pendaftaran pengujian via online disetujui petugas loket',
        actor: 'Admin Loket Lab (Siti Nurhaliza, A.Md)'
      },
      {
        status: 'kaji_ulang_bayar',
        timestamp: '2026-09-12 11:15',
        note: 'Kaji ulang ketersediaan reagen & alat selesai, SKRD diterbitkan dan lunas bayar BPD Kaltimtara',
        actor: 'Kasubag TU UPTD (Rahmadi, S.E)'
      },
      {
        status: 'analisis_lab',
        timestamp: '2026-09-13 09:00',
        note: 'Sampel dianalisis di Lab Kimia Air (Inkubasi BOD5 5 hari, pengujian COD Refluks, TSS)',
        actor: 'Koordinator Analis (Nurul Hidayati, S.Si)'
      },
      {
        status: 'verifikasi',
        timestamp: '2026-09-18 14:00',
        note: 'Verifikasi hasil pengujian oleh Manajer Teknis & QC validasi',
        actor: 'Manajer Teknis (Ahmad Fauzi, S.T)'
      },
      {
        status: 'lhp_terbit',
        timestamp: '2026-09-19 10:30',
        note: 'Laporan Hasil Pengujian (LHP) telah ditandatangani secara elektronik oleh Kepala UPTD Lab dan siap diunduh pelanggan',
        actor: 'Kepala UPTD (Dra. Hj. Wahyuni, M.Si)'
      }
    ],
    testResults: [
      {
        parameterId: 'param-al-ph',
        parameterName: 'pH (Derajat Keasaman)',
        unit: '-',
        method: 'SNI 6989.11:2019',
        result: '7.42',
        standardLimit: '6.0 - 9.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-al-tss',
        parameterName: 'Total Suspended Solids (TSS)',
        unit: 'mg/L',
        method: 'SNI 6989.3:2019',
        result: '48.2',
        standardLimit: '100.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-al-bod',
        parameterName: 'Biochemical Oxygen Demand (BOD5)',
        unit: 'mg/L',
        method: 'SNI 6989.72:2009',
        result: '36.5',
        standardLimit: '50.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-al-cod',
        parameterName: 'Chemical Oxygen Demand (COD)',
        unit: 'mg/L',
        method: 'SNI 6989.2:2019',
        result: '142.0',
        standardLimit: '200.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-al-minyak',
        parameterName: 'Minyak dan Lemak',
        unit: 'mg/L',
        method: 'SNI 6989.10:2011',
        result: '4.1',
        standardLimit: '10.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-al-amonia',
        parameterName: 'Amoniak Total (NH3-N)',
        unit: 'mg/L',
        method: 'SNI 06-6989.30-2005',
        result: '8.3',
        standardLimit: '20.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-al-total-n',
        parameterName: 'Total Nitrogen',
        unit: 'mg/L',
        method: 'APHA Ed. 23th 4500-Norg',
        result: '22.8',
        standardLimit: '50.0',
        compliance: 'MEMENUHI'
      }
    ]
  },
  {
    id: 'sample-002',
    registrationNumber: 'LAB-BLG-2026-0038',
    createdAt: '2026-09-08 10:15',
    customerName: 'Bambang Sugiono, S.T',
    institution: 'Bidang Bina Marga - Dinas PUPR-Perkim Kab. Bulungan',
    idNumber: '6404011985031004',
    phoneNumber: '081347891234',
    email: 'pupr.bulungan@kaltaraprov.go.id',
    address: 'Jl. Jelarai Raya, Tanjung Selor, Bulungan',
    matrix: 'air_permukaan',
    samplingLocation: 'Bantaran Sungai Kayan Segmen Hilir Jembatan Kayan I',
    samplingCoordinates: '2°50\'44.1"N 117°21\'33.5"E',
    samplingDate: '2026-09-08',
    samplingType: 'petugas_lab',
    parameterIds: [
      'param-ap-ph',
      'param-ap-suhu',
      'param-ap-tds',
      'param-ap-tss',
      'param-ap-do',
      'param-ap-bod',
      'param-ap-cod',
      'param-ap-fe'
    ],
    totalCost: 450000,
    status: 'lhp_terbit',
    paymentStatus: 'Bebas Retribusi / Program DLH',
    lhpNumber: '660.1/139/LHP-LAB/DLH-BLG/IX/2026',
    lhpReleaseDate: '2026-09-15',
    technicianNotes: 'Kualitas air permukaan Sungai Kayan pada titik ini masih berada dalam batas toleransi Kelas II PP 22/2021.',
    statusHistory: [
      {
        status: 'pendaftaran',
        timestamp: '2026-09-08 10:15',
        note: 'Permohonan monitoring rona lingkungan jembatan diterima',
        actor: 'Admin Loket'
      },
      {
        status: 'kaji_ulang_bayar',
        timestamp: '2026-09-08 13:00',
        note: 'Surat tugas sampling diterbitkan (program kemitraan Pemda)',
        actor: 'Manajer Teknis'
      },
      {
        status: 'analisis_lab',
        timestamp: '2026-09-09 08:30',
        note: 'Proses titrasi, spektrofotometri, dan AAS berlangsung',
        actor: 'Tim Analis Kimia'
      },
      {
        status: 'verifikasi',
        timestamp: '2026-09-14 16:00',
        note: 'Data tervalidasi oleh Manajer Mutu & Teknis',
        actor: 'Manajer Mutu'
      },
      {
        status: 'lhp_terbit',
        timestamp: '2026-09-15 11:00',
        note: 'LHP resmi disahkan secara elektronik',
        actor: 'Kepala UPTD'
      }
    ],
    testResults: [
      {
        parameterId: 'param-ap-ph',
        parameterName: 'pH',
        unit: '-',
        method: 'SNI 6989.11:2019',
        result: '6.95',
        standardLimit: '6.0 - 9.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-suhu',
        parameterName: 'Suhu',
        unit: '°C',
        method: 'SNI 06-6989.23-2005',
        result: '28.4',
        standardLimit: 'Deviasi 3°C',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-tds',
        parameterName: 'TDS (Total Padatan Terlarut)',
        unit: 'mg/L',
        method: 'SNI 6989.27:2019',
        result: '185.0',
        standardLimit: '1000.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-tss',
        parameterName: 'TSS (Total Padatan Tersuspensi)',
        unit: 'mg/L',
        method: 'SNI 6989.3:2019',
        result: '34.0',
        standardLimit: '50.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-do',
        parameterName: 'Oksigen Terlarut (DO)',
        unit: 'mg/L',
        method: 'SNI 06-6989.14-2004',
        result: '5.2',
        standardLimit: '≥ 4.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-bod',
        parameterName: 'BOD5',
        unit: 'mg/L',
        method: 'SNI 6989.72:2009',
        result: '2.4',
        standardLimit: '3.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-cod',
        parameterName: 'COD',
        unit: 'mg/L',
        method: 'SNI 6989.2:2019',
        result: '18.7',
        standardLimit: '25.0',
        compliance: 'MEMENUHI'
      },
      {
        parameterId: 'param-ap-fe',
        parameterName: 'Besi Terlarut (Fe)',
        unit: 'mg/L',
        method: 'SNI 6989.4:2009 (AAS)',
        result: '0.18',
        standardLimit: '0.3',
        compliance: 'MEMENUHI'
      }
    ]
  },
  {
    id: 'sample-003',
    registrationNumber: 'LAB-BLG-2026-0051',
    createdAt: '2026-09-17 09:40',
    customerName: 'H. Syamsul Arifin',
    institution: 'Depot Air Minum Barokah Tanjung Palas',
    idNumber: '6404021204780001',
    phoneNumber: '085246778901',
    email: 'syamsul.barokah@gmail.com',
    address: 'Jl. Kasimuddin RT 04, Kelurahan Tanjung Palas, Bulungan',
    matrix: 'air_minum',
    samplingLocation: 'Kran Pengisian Galon Depot Air Minum',
    samplingDate: '2026-09-17',
    samplingType: 'mandiri',
    parameterIds: [
      'param-am-bau',
      'param-am-kekeruhan',
      'param-am-warna',
      'param-am-tds',
      'param-am-ph',
      'param-am-ecoli',
      'param-am-coliform'
    ],
    totalCost: 345000,
    status: 'analisis_lab',
    paymentStatus: 'Lunas',
    technicianNotes: 'Sampel sedang dalam masa inkubasi media mikrobiologi E. Coli & Koliform (estimasi selesai 23 September 2026).',
    statusHistory: [
      {
        status: 'pendaftaran',
        timestamp: '2026-09-17 09:40',
        note: 'Sampel diantar langsung oleh pemohon ke loket UPTD Lab Lingkungan',
        actor: 'Admin Loket'
      },
      {
        status: 'kaji_ulang_bayar',
        timestamp: '2026-09-17 10:20',
        note: 'Pemeriksaan fisik sampel memenuhi syarat wadah steril & retribusi lunas via QRIS BPD Kaltimtara',
        actor: 'Kasubag TU'
      },
      {
        status: 'analisis_lab',
        timestamp: '2026-09-18 08:00',
        note: 'Pengujian fisika selesai, kultur mikroba sedang diinkubasi di incubator 37°C & 44.5°C',
        actor: 'Analis Mikrobiologi'
      }
    ]
  },
  {
    id: 'sample-004',
    registrationNumber: 'LAB-BLG-2026-0056',
    createdAt: '2026-09-19 14:20',
    customerName: 'Dedy Kurniawan (Dept. Lingkungan)',
    institution: 'PT Kaltara Mineral Energi',
    idNumber: '9120005481200001',
    phoneNumber: '08115590881',
    email: 'env@kaltaramineral.com',
    address: 'Kecamatan Sekatak, Kabupaten Bulungan',
    matrix: 'udara_ambien',
    samplingLocation: 'Batas Tapak Proyek Sisi Timur (Pemukiman Desa Terdekat)',
    samplingDate: '2026-09-22',
    samplingType: 'petugas_lab',
    parameterIds: [
      'param-ud-so2',
      'param-ud-no2',
      'param-ud-co',
      'param-ud-pm10',
      'param-ud-pm25',
      'param-ud-kebisingan'
    ],
    totalCost: 1050000,
    status: 'kaji_ulang_bayar',
    paymentStatus: 'Belum Dibayar',
    technicianNotes: 'Menunggu konfirmasi jadwal sampling lapangan oleh tim PPC Lab Bulungan serta pelunasan invoice SKRD.',
    statusHistory: [
      {
        status: 'pendaftaran',
        timestamp: '2026-09-19 14:20',
        note: 'Permohonan uji udara ambien & kebisingan 24 jam diajukan via portal online',
        actor: 'Sistem Registrasi Online'
      },
      {
        status: 'kaji_ulang_bayar',
        timestamp: '2026-09-20 09:30',
        note: 'Kaji ulang alat HVAS & Sound Level Meter siap operasional. Surat Ketetapan Retribusi Daerah (SKRD) telah dikirim ke email pemohon',
        actor: 'Manajer Teknis'
      }
    ]
  },
  {
    id: 'sample-005',
    registrationNumber: 'LAB-BLG-2026-0060',
    createdAt: '2026-09-21 11:05',
    customerName: 'dr. Siti Rahmawati',
    institution: 'UPTD Puskesmas Bumi Rahayu',
    idNumber: '6404014502890003',
    phoneNumber: '082155447721',
    email: 'pkm.bumirahayu@bulungan.go.id',
    address: 'Desa Bumi Rahayu, Kec. Tanjung Selor, Bulungan',
    matrix: 'air_limbah',
    samplingLocation: 'Outlet IPAL Puskesmas',
    samplingDate: '2026-09-23',
    samplingType: 'petugas_lab',
    parameterIds: ['param-al-ph', 'param-al-tss', 'param-al-bod', 'param-al-cod', 'param-al-minyak'],
    totalCost: 390000,
    status: 'pendaftaran',
    paymentStatus: 'Belum Dibayar',
    technicianNotes: 'Berkas permohonan sedang dalam verifikasi kelengkapan dokumen pengajuan.',
    statusHistory: [
      {
        status: 'pendaftaran',
        timestamp: '2026-09-21 11:05',
        note: 'Pengajuan sampel baru masuk ke sistem antrean pelayanan lab',
        actor: 'Sistem Registrasi Online'
      }
    ]
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-01',
    title: 'UPTD Laboratorium Lingkungan DLH Bulungan Raih Re-akreditasi KAN ISO/IEC 17025:2017 dengan Penambahan Ruang Lingkup',
    category: 'Pengumuman',
    date: '18 September 2026',
    summary: 'Komite Akreditasi Nasional (KAN) resmi menerbitkan perpanjangan sertifikat akreditasi LP-1234-IDN untuk UPTD Lab Lingkungan DLH Bulungan dengan 18 parameter pengujian terakreditasi.',
    content: 'Tanjung Selor — UPTD Laboratorium Lingkungan Dinas Lingkungan Hidup Kabupaten Bulungan berhasil mempertahankan dan memperluas status akreditasi dari Komite Akreditasi Nasional (KAN) berdasarkan standar internasional SNI ISO/IEC 17025:2017 dengan nomor akreditasi LP-1234-IDN.\n\nKepala Dinas Lingkungan Hidup Kabupaten Bulungan menyatakan bahwa pencapaian ini menegaskan komitmen Pemkab Bulungan dalam memberikan layanan pengujian lingkungan yang valid, akurat, dan memiliki kekuatan hukum bagi pelaku usaha, akademisi, serta instansi pemerintah di kawasan Kalimantan Utara.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    author: 'Humas DLH Bulungan'
  },
  {
    id: 'news-02',
    title: 'Tim Pengambil Contoh Lingkungan (PPC) Lakukan Pemantauan Kualitas Air Berkala di Sungai Kayan',
    category: 'Kegiatan',
    date: '10 September 2026',
    summary: 'Pemantauan kualitas air permukaan Sungai Kayan dilakukan pada 6 titik pantau mulai dari hulu Tanjung Palas Barat hingga muara Tanjung Selor guna memastikan baku mutu air tetap terjaga.',
    content: 'Tanjung Selor — Untuk memantau dampak aktivitas antropogenik dan industri di sepanjang Daerah Aliran Sungai (DAS) Kayan, tim fungsional Pengendali Dampak Lingkungan dan PPC UPTD Lab Lingkungan DLH Bulungan melaksanakan sampling berkala triwulan ketiga.\n\nPengujian di lapangan mencakup parameter insitu seperti pH, suhu, oksigen terlarut (DO), dan daya hantar listrik (DHL). Sampel air selanjutnya dibawa menggunakan coolbox berpendingin ke laboratorium di Tanjung Selor untuk diuji parameter BOD, COD, Logam Berat, dan Fecal Coliform.',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    author: 'Tim PPC Lab'
  },
  {
    id: 'news-03',
    title: 'Sosialisasi Kewajiban Uji Laboratorium Air Minum bagi Pengelola Depot Air Minum Isi Ulang (DAMIU)',
    category: 'Informasi Layanan',
    date: '04 September 2026',
    summary: 'DLH Bulungan bersama Dinas Kesehatan mengimbau seluruh pelaku usaha depot air minum untuk melakukan uji laboratorium mikrobiologi dan fisika-kimia minimal satu kali per triwulan.',
    content: 'Tanjung Selor — Guna melindungi kesehatan masyarakat Bumi Benuanta dari penyakit bawaan air (waterborne diseases), UPTD Lab Lingkungan DLH Bulungan menyediakan paket tarif retribusi terjangkau sesuai Perda Kabupaten Bulungan bagi para pengusaha Depot Air Minum Isi Ulang (DAMIU).\n\nPengujian difokuskan pada keberadaan bakteri patogen Escherichia coli dan Total Koliform, serta kandungan logam dan kekeruhan yang berpotensi membahayakan kesehatan jika dikonsumsi dalam jangka panjang.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    author: 'Bidang Penataan & Peningkatan Kapasitas'
  }
];

export const NEWS_ARTICLES: NewsItem[] = NEWS_ITEMS;

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-01',
    name: 'Drs. H. M. Said, M.Si',
    position: 'Kepala Dinas Lingkungan Hidup Kab. Bulungan',
    nip: '19700812 199603 1 003',
    education: 'Magister Ilmu Lingkungan',
    roleDescription: 'Penanggung Jawab Utama Kebijakan Pengelolaan dan Laboratorium Lingkungan Daerah',
    level: 1
  },
  {
    id: 'staff-02',
    name: 'Dra. Hj. Wahyuni, M.Si',
    position: 'Kepala UPTD Laboratorium Lingkungan',
    nip: '19750415 199903 2 005',
    education: 'Magister Kimia Terapan (Kimia Lingkungan)',
    roleDescription: 'Memimpin operasional harian, legalitas LHP, dan penjamin kepatuhan standar ISO/IEC 17025',
    level: 2
  },
  {
    id: 'staff-03',
    name: 'Rahmadi, S.E',
    position: 'Kepala Sub Bagian Tata Usaha UPTD',
    nip: '19820311 200801 1 012',
    education: 'Sarjana Ekonomi Keuangan',
    roleDescription: 'Pengelolaan administrasi permohonan, penagihan retribusi SKRD, dan sarana prasarana',
    level: 3
  },
  {
    id: 'staff-04',
    name: 'Ahmad Fauzi, S.T',
    position: 'Manajer Teknis Laboratorium',
    nip: '19840920 201001 1 018',
    education: 'Sarjana Teknik Kimia & Sertifikasi Personel Uji KAN',
    roleDescription: 'Validasi metode pengujian, supervisi analisis, verifikasi data mentah, dan kalibrasi alat',
    level: 3
  },
  {
    id: 'staff-05',
    name: 'Nur Aini, S.Si',
    position: 'Manajer Mutu Laboratorium',
    nip: '19880228 201402 2 001',
    education: 'Sarjana Sains (Biologi Lingkungan) & Asesor Internal',
    roleDescription: 'Pengendalian dokumen mutu, audit internal ISO 17025, pemantauan uji profisiensi antar-lab',
    level: 3
  },
  {
    id: 'staff-06',
    name: 'Nurul Hidayati, S.Si',
    position: 'Koordinator Analis Kimia & Spektrometri',
    education: 'S1 Kimia Murni (Sertifikasi Analis Kimia Lingkungan)',
    roleDescription: 'Pengoperasian AAS, UV-Vis Spectrophotometer, dan preparasi destruksi logam berat',
    level: 4
  },
  {
    id: 'staff-07',
    name: 'Bayu Prasetyo, S.Tr.Kes',
    position: 'Koordinator Pengambil Sampel Lingkungan (PPC)',
    education: 'D4 Sanitasi Lingkungan & Sertifikasi BNSP Petugas Pengambil Contoh',
    roleDescription: 'Sampling lapangan air permukaan, air limbah, pengukuran kebisingan, dan udara ambien',
    level: 4
  },
  {
    id: 'staff-08',
    name: 'Rina Marlina, A.Md.AK',
    position: 'Analis Mikrobiologi & Fisika Lingkungan',
    education: 'D3 Analis Kesehatan / Analis Medis',
    roleDescription: 'Pengujian Total Koliform, E. Coli metode MPN/MF, BOD5, dan analisis gravimetri TSS',
    level: 4
  }
];

export const LAB_FACILITIES: LabFacility[] = [
  {
    id: 'fac-01',
    name: 'Atomic Absorption Spectrophotometer (AAS)',
    brandModel: 'Shimadzu AA-7000 Flame & Graphite Furnace',
    functionDesc: 'Analisis trace metal (logam berat) presisi tinggi pada air sungai, air limbah, dan sedimen.',
    specs: 'Deteksi hingga ppb untuk Timbal (Pb), Kadmium (Cd), Besi (Fe), Mangan (Mn), Tembaga (Cu), Seng (Zn)',
    category: 'Instrumen Analitik'
  },
  {
    id: 'fac-02',
    name: 'UV-Vis Spectrophotometer Double Beam',
    brandModel: 'Thermo Scientific Evolution 220',
    functionDesc: 'Penentuan kadar konsentrasi nitrat, nitrit, fosfat, amoniak, sulfat, klorin, dan senyawa fenol.',
    specs: 'Rentang panjang gelombang 190 - 1100 nm, bandpass presisi 1 nm, kontrol komputer terintegrasi',
    category: 'Instrumen Analitik'
  },
  {
    id: 'fac-03',
    name: 'High Volume Air Sampler (HVAS) PM10 / PM2.5',
    brandModel: 'Tisch Environmental TE-6070-BL',
    functionDesc: 'Sampling partikulat udara ambien respirabel untuk pemantauan rona udara kawasan Tanjung Selor.',
    specs: 'Laju alir konstan 40 cfm (1.13 m³/menit), filter kuarsa tersertifikasi bebas pengotor',
    category: 'Sampling Lapangan'
  },
  {
    id: 'fac-04',
    name: 'Integrating Sound Level Meter Class 1',
    brandModel: 'Rion NL-52 Type 1 with Windscreen',
    functionDesc: 'Pengukuran kebisingan lingkungan 24 jam (Leq, Lsm, L10, L50, L90) sesuai Kepmen LH No. 48/1996.',
    specs: 'Rentang 20 - 138 dB, respon Fast/Slow/Impulse, dilengkapi kalibrator akustik tersertifikasi KAN',
    category: 'Sampling Lapangan'
  },
  {
    id: 'fac-05',
    name: 'COD Thermoreactor & Photometer Multiparameter',
    brandModel: 'Hach DR900 & Digital Reactor Block DRB200',
    functionDesc: 'Destruksi cepat refluks tertutup untuk pengujian Chemical Oxygen Demand (COD) air limbah.',
    specs: 'Suhu pemanasan 150°C stabil, timer otomatis, kapasitas 30 vial sampel sekaligus',
    category: 'Preparasi & Fisika'
  },
  {
    id: 'fac-06',
    name: 'Cooled Incubator BOD & Autoclave Sterilisasi',
    brandModel: 'Memmert IPP260eco & Hirayama HVE-50',
    functionDesc: 'Inkubasi sampel uji BOD pada suhu presisi 20°C selama 5 hari serta sterilisasi media mikrobiologi.',
    specs: 'Akurasi suhu ±0.1°C, sirkulasi udara bebas getaran, kontrol digital pemantau suhu 24 jam',
    category: 'Mikrobiologi'
  }
];

export const SOP_DOCUMENTS: SOPDocument[] = [
  {
    id: 'sop-01',
    code: 'SOP/LAB-BLG/01/2026',
    title: 'SOP Penerimaan, Identifikasi, dan Registrasi Sampel Uji Lingkungan',
    revision: 'Rev. 03',
    effectiveDate: '15 Januari 2026',
    description: 'Tata cara penerimaan sampel dari pelanggan mandiri atau sampling lapangan, verifikasi kaji ulang permohonan, pemberian barcode kode unik laboratorium, dan penyerahan tanda terima.',
    fileSize: '342 KB'
  },
  {
    id: 'sop-02',
    code: 'SOP/LAB-BLG/02/2026',
    title: 'SOP Pengambilan Contoh Uji Lingkungan (Sampling Lapangan Air & Udara)',
    revision: 'Rev. 02',
    effectiveDate: '15 Januari 2026',
    description: 'Prosedur baku penentuan titik sampling, persiapan wadah steril & bahan pengawet asam, pengukuran insitu, serta chain of custody (dokumen rantai lacak sampel).',
    fileSize: '512 KB'
  },
  {
    id: 'sop-03',
    code: 'SOP/LAB-BLG/03/2026',
    title: 'SOP Analisis Pengujian Parameter Laboratorium & Jaminan Mutu (QA/QC)',
    revision: 'Rev. 04',
    effectiveDate: '01 Februari 2026',
    description: 'Pelaksanaan pengujian sesuai SNI, pembuatan kurva kalibrasi harian, pengujian blanko metode, duplikat sampel, spike matrix, serta batas keberterimaan hasil uji.',
    fileSize: '680 KB'
  },
  {
    id: 'sop-04',
    code: 'SOP/LAB-BLG/04/2026',
    title: 'SOP Penerbitan, Pengesahan, dan Penyampaian Laporan Hasil Pengujian (LHP)',
    revision: 'Rev. 03',
    effectiveDate: '01 Februari 2026',
    description: 'Mekanisme verifikasi bertingkat oleh analis, pengesahan Manajer Teknis, pembubuhan TTE resmi, serta tata cara pengunduhan dokumen digital oleh pelanggan.',
    fileSize: '410 KB'
  },
  {
    id: 'sop-05',
    code: 'SOP/LAB-BLG/05/2026',
    title: 'SOP Penanganan Pengaduan, Keluhan, dan Umpan Balik Pelanggan',
    revision: 'Rev. 02',
    effectiveDate: '15 Januari 2026',
    description: 'Alur penampungan keluhan pelanggan atas hasil uji atau layanan, investigasi akar penyebab teknis, pengujian ulang sampel cadangan, dan batas waktu penyelesaian maksimal 5 hari kerja.',
    fileSize: '298 KB'
  }
];

export const SKM_QUESTIONS: SKMQuestion[] = [
  { id: 1, question: 'Bagaimana kejelasan dan kemudahan persyaratan pelayanan pengujian sampel di UPTD Laboratorium Lingkungan?', category: 'Persyaratan' },
  { id: 2, question: 'Bagaimana kemudahan sistem dan alur prosedur pendaftaran permohonan pengujian sampel secara online?', category: 'Prosedur' },
  { id: 3, question: 'Bagaimana ketepatan waktu pengujian sampel hingga Laporan Hasil Pengujian (LHP) diterbitkan?', category: 'Waktu Pelayanan' },
  { id: 4, question: 'Bagaimana kewajaran dan transparansi tarif retribusi pengujian sesuai dengan Peraturan Daerah?', category: 'Biaya / Tarif' },
  { id: 5, question: 'Bagaimana kesesuaian produk layanan pengujian yang tercantum pada LHP dengan permohonan yang diajukan?', category: 'Produk Pelayanan' },
  { id: 6, question: 'Bagaimana kompetensi, ketelitian, dan keahlian petugas analis laboratorium dalam memberikan pelayanan?', category: 'Kompetensi Pelaksana' },
  { id: 7, question: 'Bagaimana kesopanan, keramahan, dan ketanggapan petugas loket/customer service dalam melayani Anda?', category: 'Perilaku Pelaksana' },
  { id: 8, question: 'Bagaimana kemudahan dan responsivitas penanganan keluhan atau konsultasi teknis hasil pengujian?', category: 'Penanganan Pengaduan' },
  { id: 9, question: 'Bagaimana kelengkapan fasilitas, kebersihan, dan kenyamanan sarana pelayanan laboratorium?', category: 'Sarana & Prasarana' }
];

export const INITIAL_SKM_FEEDBACKS: SKMFeedback[] = [
  {
    id: 'skm-01',
    customerName: 'Hendra Kusuma',
    institution: 'PT Benuanta Sawit Makmur',
    date: '19 September 2026',
    overallRating: 4,
    comment: 'Pelayanan pengujian air limbah sangat profesional. LHP digital dengan QR code verifikasi mempermudah kami melampirkannya ke laporan rutin SIMPEL KLHK tanpa harus bolak-balik ke kantor.',
    ratings: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }
  },
  {
    id: 'skm-02',
    customerName: 'Bambang Sugiono',
    institution: 'Dinas PUPR Kab. Bulungan',
    date: '16 September 2026',
    overallRating: 4,
    comment: 'Sangat terbantu dengan tim sampling lapangan yang sigap dan peralatan sampling air sungai yang lengkap. Hasil uji tepat waktu.',
    ratings: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 3, 9: 4 }
  },
  {
    id: 'skm-03',
    customerName: 'H. Syamsul Arifin',
    institution: 'Depot Air Minum Barokah',
    date: '17 September 2026',
    overallRating: 4,
    comment: 'Alhamdulillah proses pendaftarannya mudah, petugas loket sabar menjelaskan parameter yang wajib bagi depot air minum kami.',
    ratings: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }
  }
];

export const INITIAL_COMPLAINT_TICKETS: ComplaintTicket[] = [
  {
    id: 'comp-01',
    ticketNumber: 'ADU-BLG-2026-0008',
    name: 'Rudi Hartono',
    email: 'rudi.h@tambangkaltara.co.id',
    phone: '081250991823',
    subject: 'Permohonan Salinan Faktur SKRD Pengujian Udara Ambien',
    message: 'Selamat siang admin Lab Bulungan, kami telah melunasi retribusi sampel LAB-BLG-2026-0056 melalui teller bank, mohon diterbitkan bukti tanda terima kwitansi stempel basah untuk keperluan pembukuan kantor kami.',
    date: '20 September 2026 10:14',
    status: 'Selesai Ditindaklanjuti',
    response: 'Terima kasih atas konfirmasinya Bapak Rudi. Salinan kwitansi resmi telah kami stempel dan file scan PDF telah kami kirimkan ke email rudi.h@tambangkaltara.co.id. Dokumen fisik dapat diambil di loket TU pada jam kerja.'
  }
];

export const DEFAULT_SITE_SETTINGS: import('../types').SiteSettings = {
  agencyName: 'UPTD Laboratorium Lingkungan Hidup',
  agencySub: 'Dinas Lingkungan Hidup Kabupaten Bulungan',
  tagline: 'Layanan Pengujian Kualitas Lingkungan Terakreditasi KAN',
  heroTitle: 'Layanan Pengujian Sampel Lingkungan Kabupaten Bulungan',
  heroSubtitle: 'Mewujudkan kepastian data mutu lingkungan yang akurat, transparan, dan berdaya hukum untuk mendukung kelestarian Daerah Aliran Sungai (DAS) Kayan, industri sawit, tambang, dan kualitas hidup masyarakat Bumi Benuanta.',
  kanAccreditationNumber: 'LP-1234-IDN',
  kanAccreditationStd: 'SNI ISO/IEC 17025:2017',
  runningText: 'Pemberitahuan: Layanan Pengujian Kualitas Air & Udara UPTD Lab Lingkungan DLH Bulungan beroperasi normal Senin - Jumat pukul 08.00 - 15.30 WITA di Jl. Kolonel Soetadji No. 1 Tanjung Selor.',
  announcementActive: true,
  phone: '(0552) 21155',
  whatsapp: '0812-5099-2811',
  email: 'lab.lingkungan@bulungan.go.id',
  address: 'Jl. Kolonel Soetadji No. 1, Tanjung Selor Hilir, Kec. Tanjung Selor, Kabupaten Bulungan, Kalimantan Utara 77212',
  workingHours: 'Senin - Kamis: 08.00 - 16.00 WITA | Jumat: 08.00 - 15.30 WITA',
  visi: 'Menjadi Laboratorium Penguji Lingkungan yang Profesional, Independen, Akuntabel, dan Terpercaya di Provinsi Kalimantan Utara.',
  misi: [
    'Menghasilkan data pengujian kualitas lingkungan yang valid, teliti, dan tertelusur secara ilmiah.',
    'Menerapkan sistem manajemen mutu laboratorium secara konsisten sesuai standar SNI ISO/IEC 17025.',
    'Memberikan pelayanan pengujian yang cepat, tepat waktu, transparan, dan berorientasi pada kepuasan pelanggan.',
    'Mendukung penegakan hukum dan pengawasan lingkungan hidup di Kabupaten Bulungan secara objektif.'
  ],
  maklumatPelayanan: 'Dengan ini kami pimpinan beserta seluruh staf UPTD Laboratorium Lingkungan Hidup DLH Kabupaten Bulungan berjanji dan menyatakan kesanggupan untuk menyelenggarakan pelayanan pengujian laboratorium sesuai dengan standar operasional yang telah ditetapkan, memberikan pelayanan secara prima, transparan, bebas dari pungutan liar, serta siap menerima sanksi sesuai ketentuan apabila tidak menepati janji layanan ini.',
  mottoPelayanan: 'Cepat, Akurat, Terpercaya, dan Berintegritas (CATUR BERINTEGRITAS)'
};

export const DEFAULT_ADMIN_USERS: import('../types').AdminUser[] = [
  {
    username: 'admin',
    name: 'Dra. Hj. Wahyuni, M.Si',
    role: 'Administrator Utama',
    nip: '19750415 199903 2 005',
    lastLogin: '2026-09-21 21:00 WITA'
  },
  {
    username: 'manajer.mutu',
    name: 'Nur Aini, S.Si',
    role: 'Manajer Mutu',
    nip: '19880228 201402 2 001',
    lastLogin: '2026-09-20 14:15 WITA'
  },
  {
    username: 'manajer.teknis',
    name: 'Ahmad Fauzi, S.T',
    role: 'Manajer Teknis',
    nip: '19840920 201001 1 018',
    lastLogin: '2026-09-21 16:30 WITA'
  },
  {
    username: 'petugas.loket',
    name: 'Rahmadi, S.E',
    role: 'Petugas Loket / TU',
    nip: '19820311 200801 1 012',
    lastLogin: '2026-09-21 08:30 WITA'
  }
];
