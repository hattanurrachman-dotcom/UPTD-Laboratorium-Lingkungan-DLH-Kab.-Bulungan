-- ====================================================================
-- DATABASE RESMI UPTD LABORATORIUM LINGKUNGAN HIDUP
-- DINAS LINGKUNGAN HIDUP KABUPATEN BULUNGAN, KALIMANTAN UTARA
-- Siap Import ke MySQL / MariaDB (XAMPP / phpMyAdmin / Navicat / DBeaver)
-- Versi Database: 1.0.0
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00"; -- Waktu Indonesia Tengah (WITA)

-- --------------------------------------------------------------------
-- 1. PEMBUATAN DATABASE
-- --------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `db_lab_bulungan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_lab_bulungan`;

-- --------------------------------------------------------------------
-- 2. TABEL: site_settings (Pengaturan Identitas & Kontak Lembaga)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `agency_name` VARCHAR(255) NOT NULL DEFAULT 'UPTD Laboratorium Lingkungan Hidup',
  `agency_sub` VARCHAR(255) NOT NULL DEFAULT 'Dinas Lingkungan Hidup Pemerintah Kabupaten Bulungan',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Akurat, Terpercaya, dan Terstandarisasi KAN SNI ISO/IEC 17025',
  `hero_title` VARCHAR(255) NOT NULL DEFAULT 'Layanan Pengujian Sampel Lingkungan Terstandarisasi KAN & Berbasis Digital',
  `hero_subtitle` TEXT NOT NULL,
  `kan_accreditation_number` VARCHAR(50) NOT NULL DEFAULT 'LP-1234-IDN',
  `kan_accreditation_std` VARCHAR(50) NOT NULL DEFAULT 'SNI ISO/IEC 17025:2017',
  `running_text` TEXT NOT NULL,
  `announcement_active` TINYINT(1) NOT NULL DEFAULT 1,
  `phone` VARCHAR(50) NOT NULL DEFAULT '(0552) 21123',
  `whatsapp` VARCHAR(50) NOT NULL DEFAULT '0812-5566-7788',
  `email` VARCHAR(100) NOT NULL DEFAULT 'lab.dlh@bulungan.go.id',
  `address` TEXT NOT NULL,
  `working_hours` VARCHAR(255) NOT NULL DEFAULT 'Senin - Kamis: 08.00 - 15.30 WITA | Jumat: 08.00 - 11.30 WITA',
  `visi` TEXT NOT NULL,
  `misi` TEXT NOT NULL COMMENT 'JSON array or newline-separated missions',
  `maklumat_pelayanan` TEXT NOT NULL,
  `motto_pelayanan` VARCHAR(255) NOT NULL DEFAULT 'AKURAT: Akuntabel, Kompeten, Unggul, Ramah, Adil, dan Tepat Waktu',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (
  `id`, `agency_name`, `agency_sub`, `tagline`, `hero_title`, `hero_subtitle`,
  `kan_accreditation_number`, `kan_accreditation_std`, `running_text`, `announcement_active`,
  `phone`, `whatsapp`, `email`, `address`, `working_hours`, `visi`, `misi`,
  `maklumat_pelayanan`, `motto_pelayanan`
) VALUES (
  1,
  'UPTD Laboratorium Lingkungan Hidup',
  'Dinas Lingkungan Hidup Pemerintah Kabupaten Bulungan',
  'Akurat, Terpercaya, dan Terstandarisasi KAN SNI ISO/IEC 17025',
  'Layanan Pengujian Sampel Lingkungan Terstandarisasi KAN & Berbasis Digital',
  'Melayani uji kualitas air permukaan, air limbah industri, air bersih, udara ambien, dan kebisingan guna mendukung kelestarian ekosistem Bumi Benuanta secara profesional dan transparan.',
  'LP-1234-IDN',
  'SNI ISO/IEC 17025:2017',
  'PENGUMUMAN RESMI: Jam layanan operasional loket penerimaan sampel selama hari kerja buka pukul 08.00 - 15.30 WITA. Pembayaran retribusi pengujian dilakukan secara non-tunai melalui QRIS Kas Daerah / Rekening Resmi BPD Kaltimtara.',
  1,
  '(0552) 21123',
  '0812-5566-7788',
  'lab.dlh@bulungan.go.id',
  'Jl. Kolonel Soetadji No. 1, Tanjung Selor, Kabupaten Bulungan, Kalimantan Utara 77212',
  'Senin - Kamis: 08.00 - 15.30 WITA | Jumat: 08.00 - 11.30 WITA',
  'Menjadi Laboratorium Penguji Lingkungan yang Profesional, Unggul, Berdaya Saing, dan Terpercaya dalam Pengendalian Mutu Lingkungan Hidup di Kalimantan Utara.',
  '["Menyelenggarakan pengujian kualitas lingkungan berstandar SNI ISO/IEC 17025:2017 secara konsisten dan akuntabel.","Menyediakan data pengujian yang valid, teliti, dan tepat waktu guna mendukung pengambilan kebijakan perlindungan lingkungan hidup daerah.","Meningkatkan kompetensi sumber daya manusia dan pemeliharaan peralatan instrumentasi laboratorium mutakhir.","Memberikan pelayanan prima kepada masyarakat, dunia usaha, dan instansi pemerintah dengan menerapkan prinsip keterbukaan publik."]',
  'Dengan ini, kami seluruh pimpinan dan staf UPTD Laboratorium Lingkungan Dinas Lingkungan Hidup Kabupaten Bulungan menyatakan sanggup menyelenggarakan pelayanan pengujian kualitas lingkungan sesuai standar pelayanan yang telah ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai dengan peraturan perundang-undangan yang berlaku.',
  'AKURAT: Akuntabel, Kompeten, Unggul, Ramah, Adil, dan Tepat Waktu'
);

-- --------------------------------------------------------------------
-- 3. TABEL: admin_users (Akun Pengguna Sistem & Hak Akses)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `role` ENUM('Administrator Utama', 'Manajer Teknis', 'Manajer Mutu', 'Petugas Loket / TU') NOT NULL,
  `nip` VARCHAR(30) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admin_users` (`id`, `username`, `password`, `name`, `role`, `nip`, `email`) VALUES
(1, 'admin', 'admin123', 'Ir. H. Budi Santoso, M.Si.', 'Administrator Utama', '19780512 200312 1 002', 'admin.lab@bulungan.go.id'),
(2, 'manajer.mutu', 'mutu123', 'Dewi Sartika, S.Si., M.Ling.', 'Manajer Mutu', '19840315 200801 2 006', 'mutu.lab@bulungan.go.id'),
(3, 'manajer.teknis', 'teknis123', 'Ahmad Ridwan, S.T., M.Sc.', 'Manajer Teknis', '19860920 201001 1 008', 'teknis.lab@bulungan.go.id'),
(4, 'petugas.loket', 'loket123', 'Siti Rahmawati, A.Md.Kes.', 'Petugas Loket / TU', '19921104 201503 2 004', 'loket.lab@bulungan.go.id');

-- --------------------------------------------------------------------
-- 4. TABEL: parameters (Daftar Parameter Uji & Tarif Retribusi Perda)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `parameters`;
CREATE TABLE `parameters` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `category` ENUM('Air Limbah', 'Air Permukaan / Sungai', 'Air Bersih / Minum', 'Udara Ambien & Emisi', 'Kebisingan & Getaran', 'Sedimen / Tanah') NOT NULL,
  `unit` VARCHAR(50) NOT NULL DEFAULT 'mg/L',
  `method` VARCHAR(150) NOT NULL,
  `standard_limit` VARCHAR(100) NOT NULL DEFAULT 'Baku Mutu PP 22/2021',
  `price` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `turnaround_days` INT NOT NULL DEFAULT 5,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `parameters` (`code`, `name`, `category`, `unit`, `method`, `standard_limit`, `price`, `turnaround_days`, `is_active`) VALUES
('PAR-BOD', 'BOD5 (Biochemical Oxygen Demand)', 'Air Limbah', 'mg/L', 'SNI 6989.72:2009 (Inkubasi 5 Hari 20°C)', '50 mg/L', 75000.00, 5, 1),
('PAR-COD', 'COD (Chemical Oxygen Demand)', 'Air Limbah', 'mg/L', 'SNI 6989.2:2019 (Refluks Tertutup Spektrofotometri)', '100 mg/L', 65000.00, 3, 1),
('PAR-TSS', 'TSS (Total Suspended Solids)', 'Air Limbah', 'mg/L', 'SNI 6989.3:2019 (Gravimetri)', '50 mg/L', 45000.00, 3, 1),
('PAR-PH', 'pH (Derajat Keasaman)', 'Air Limbah', '-', 'SNI 6989.11:2019 (Elektrometri pH Meter)', '6.0 - 9.0', 25000.00, 1, 1),
('PAR-DO', 'Dissolved Oxygen (DO Terlarut)', 'Air Permukaan / Sungai', 'mg/L', 'SNI 06-6989.14-2004 (Elektrometri DO Meter)', '>= 4.0 mg/L', 30000.00, 1, 1),
('PAR-MINYAK', 'Minyak dan Lemak (Oil & Grease)', 'Air Limbah', 'mg/L', 'SNI 6989.10:2011 (Gravimetri Ekstraksi n-Heksana)', '5 mg/L', 95000.00, 4, 1),
('PAR-AMONIA', 'Amoniak Bebas (NH3-N)', 'Air Limbah', 'mg/L', 'SNI 06-6989.30-2005 (Fenat Spektrofotometri)', '5 mg/L', 55000.00, 3, 1),
('PAR-FE', 'Besi Terlarut (Fe)', 'Air Permukaan / Sungai', 'mg/L', 'SNI 6989.4:2009 (AAS / SSA Nyala)', '0.3 mg/L', 80000.00, 4, 1),
('PAR-MN', 'Mangan Terlarut (Mn)', 'Air Permukaan / Sungai', 'mg/L', 'SNI 6989.5:2009 (AAS / SSA Nyala)', '0.1 mg/L', 80000.00, 4, 1),
('PAR-PB', 'Timbal (Pb)', 'Air Limbah', 'mg/L', 'SNI 6989.8:2009 (AAS Tungku Grafit)', '0.1 mg/L', 110000.00, 5, 1),
('PAR-CD', 'Kadmium (Cd)', 'Air Limbah', 'mg/L', 'SNI 6989.16:2009 (AAS Tungku Grafit)', '0.05 mg/L', 110000.00, 5, 1),
('PAR-KLR', 'Klorida (Cl-)', 'Air Bersih / Minum', 'mg/L', 'SNI 6989.19:2009 (Argentometri Mohr)', '250 mg/L', 40000.00, 2, 1),
('PAR-SLF', 'Sulfat (SO4 2-)', 'Air Bersih / Minum', 'mg/L', 'SNI 6989.20:2019 (Turbidimetri Spektrofotometri)', '250 mg/L', 50000.00, 2, 1),
('PAR-COLI', 'Total Coliform & E. Coli', 'Air Bersih / Minum', 'MPN/100ml', 'SNI 01-2332.1-2006 (Metode Tabung Ganda MPN)', '0 MPN/100ml', 120000.00, 4, 1),
('PAR-SO2', 'Sulfur Dioksida (SO2) Ambien', 'Udara Ambien & Emisi', 'μg/Nm3', 'SNI 7119.7:2017 (Pararosanilin Spektrofotometer 1 Jam)', '150 μg/Nm3', 140000.00, 4, 1),
('PAR-NO2', 'Nitrogen Dioksida (NO2) Ambien', 'Udara Ambien & Emisi', 'μg/Nm3', 'SNI 7119.2:2017 (Griess Saltzman Spektrofotometer)', '200 μg/Nm3', 140000.00, 4, 1),
('PAR-TSP', 'Total Suspended Particulate (Debu TSP)', 'Udara Ambien & Emisi', 'μg/Nm3', 'SNI 7119.3:2017 (High Volume Air Sampler Gravimetri)', '230 μg/Nm3', 175000.00, 3, 1),
('PAR-NOISE', 'Tingkat Kebisingan Lingkungan (24 Jam)', 'Kebisingan & Getaran', 'dBA', 'SNI 8427:2017 (Sound Level Meter Terkalibrasi KAN)', '55 - 70 dBA', 150000.00, 2, 1);

-- --------------------------------------------------------------------
-- 5. TABEL: samples (Data Permohonan & Status Pengujian Sampel LIMS)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `samples`;
CREATE TABLE `samples` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tracking_code` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_type` ENUM('Perusahaan / Industri', 'Pemerintah / Dinas', 'Akademisi / Penelitian', 'Masyarakat Umum') NOT NULL,
  `company_name` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `sample_name` VARCHAR(200) NOT NULL,
  `matrix_type` VARCHAR(100) NOT NULL,
  `sample_point_location` VARCHAR(255) NOT NULL,
  `sampling_date` DATE NOT NULL,
  `sampling_method` ENUM('Diantar Sendiri ke Loket UPTD', 'Pengambilan oleh Petugas PPC UPTD') NOT NULL,
  `requested_date` DATE NOT NULL,
  `status` ENUM('Diterima', 'Verifikasi Administrasi', 'Pengujian Laboratorium', 'Review & Validasi Mutu', 'LHP Selesai') NOT NULL DEFAULT 'Diterima',
  `lhp_number` VARCHAR(100) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tracking_code` (`tracking_code`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `samples` (
  `id`, `tracking_code`, `customer_name`, `customer_type`, `company_name`,
  `phone`, `email`, `address`, `sample_name`, `matrix_type`,
  `sample_point_location`, `sampling_date`, `sampling_method`, `requested_date`,
  `status`, `lhp_number`, `notes`
) VALUES
(
  1,
  'LAB-BLG-2025-0891',
  'PT. Kayan Sawit Sejahtera',
  'Perusahaan / Industri',
  'PT. Kayan Sawit Sejahtera',
  '0813-4455-6677',
  'enviro@kayansawit.co.id',
  'Kecamatan Peso Hilir, Kab. Bulungan',
  'Air Limbah Inlet & Outlet IPAL Pabrik Kelapa Sawit',
  'Air Limbah Industri',
  'Outlet Kolam Anaerobik 4, Koordinat: 02°54\'12" N 117°18\'40" E',
  '2025-05-10',
  'Pengambilan oleh Petugas PPC UPTD',
  '2025-05-10',
  'Pengujian Laboratorium',
  NULL,
  'Pengujian rutin pemantauan semester I RKL-RPL. Parameter uji: pH, BOD, COD, TSS, Minyak Lemak.'
),
(
  2,
  'LAB-BLG-2025-0892',
  'Bappedalitbang Kab. Bulungan',
  'Pemerintah / Dinas',
  'Pemerintah Daerah Kabupaten Bulungan',
  '0821-9988-1122',
  'lingkungan@bulungan.go.id',
  'Jl. Agatis Tanjung Selor',
  'Air Permukaan Sungai Kayan Hilir',
  'Air Sungai / Permukaan',
  'Dermaga VIP Tanjung Selor (Sungai Kayan)',
  '2025-05-12',
  'Pengambilan oleh Petugas PPC UPTD',
  '2025-05-12',
  'Verifikasi Administrasi',
  NULL,
  'Pemantauan baku mutu air sungai kelas II sesuai PP 22/2021.'
),
(
  3,
  'LAB-BLG-2025-0890',
  'CV. Borneo Mineral Sejati',
  'Perusahaan / Industri',
  'CV. Borneo Mineral Sejati',
  '0811-2345-6789',
  'lab@borneomineral.com',
  'Kecamatan Tanjung Palas Utara',
  'Air Kolam Pengendap Settling Pond Tambang',
  'Air Limbah Pertambangan',
  'Point SP-02 Tambang Tanjung Palas',
  '2025-05-02',
  'Diantar Sendiri ke Loket UPTD',
  '2025-05-02',
  'LHP Selesai',
  'LHP/660.1/045/UPTD-LAB/V/2025',
  'Hasil uji memenuhi baku mutu PermenLH No. 05/2014. LHP resmi telah terbit dan dapat diunduh.'
),
(
  4,
  'LAB-BLG-2025-0888',
  'Dinas Kesehatan Kabupaten Bulungan',
  'Pemerintah / Dinas',
  'Dinas Kesehatan Kab. Bulungan',
  '0852-3322-1144',
  'kesling.bulungan@gmail.com',
  'Tanjung Selor Hilir',
  'Air Baku Sumur Bor Sarana Air Bersih Puskesmas',
  'Air Bersih / Minum',
  'Desa Long Beluah, Tanjung Palas Barat',
  '2025-04-28',
  'Pengambilan oleh Petugas PPC UPTD',
  '2025-04-28',
  'LHP Selesai',
  'LHP/660.1/040/UPTD-LAB/IV/2025',
  'Pengujian mikrobiologi Total Coliform dan Kimia Anorganik. Terbit tanggal 04 Mei 2025.'
);

-- --------------------------------------------------------------------
-- 6. TABEL: sample_results (Hasil Pengujian per Parameter)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `sample_results`;
CREATE TABLE `sample_results` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sample_id` INT UNSIGNED NOT NULL,
  `parameter_name` VARCHAR(150) NOT NULL,
  `standard_limit` VARCHAR(100) NOT NULL,
  `result_value` VARCHAR(100) NOT NULL,
  `unit` VARCHAR(50) NOT NULL,
  `method` VARCHAR(150) NOT NULL,
  `is_compliant` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1: Memenuhi Baku Mutu, 0: Melebihi',
  `notes` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sample_results` (`sample_id`, `parameter_name`, `standard_limit`, `result_value`, `unit`, `method`, `is_compliant`) VALUES
(3, 'pH (Derajat Keasaman)', '6.0 - 9.0', '7.24', '-', 'SNI 6989.11:2019', 1),
(3, 'TSS (Total Suspended Solids)', '200 mg/L', '48.5', 'mg/L', 'SNI 6989.3:2019', 1),
(3, 'Besi Terlarut (Fe)', '7.0 mg/L', '1.18', 'mg/L', 'SNI 6989.4:2009 (AAS)', 1),
(3, 'Mangan Terlarut (Mn)', '4.0 mg/L', '0.45', 'mg/L', 'SNI 6989.5:2009 (AAS)', 1),
(1, 'pH (Derajat Keasaman)', '6.0 - 9.0', '7.65', '-', 'SNI 6989.11:2019', 1),
(1, 'BOD5 (Biochemical Oxygen Demand)', '100 mg/L', '64.2', 'mg/L', 'SNI 6989.72:2009', 1),
(1, 'COD (Chemical Oxygen Demand)', '350 mg/L', '182.0', 'mg/L', 'SNI 6989.2:2019', 1),
(1, 'TSS (Total Suspended Solids)', '250 mg/L', '86.0', 'mg/L', 'SNI 6989.3:2019', 1),
(1, 'Minyak & Lemak', '25 mg/L', '8.4', 'mg/L', 'SNI 6989.10:2011', 1);

-- --------------------------------------------------------------------
-- 7. TABEL: staff_members (Personel & Struktur Organisasi)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `staff_members`;
CREATE TABLE `staff_members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `nip` VARCHAR(50) DEFAULT NULL,
  `position_level` VARCHAR(100) NOT NULL,
  `division` VARCHAR(100) NOT NULL,
  `education` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `photo_url` VARCHAR(255) DEFAULT NULL,
  `order_index` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `staff_members` (`name`, `role`, `nip`, `position_level`, `division`, `education`, `phone`, `order_index`) VALUES
('Ir. H. Budi Santoso, M.Si.', 'Kepala UPTD Laboratorium Lingkungan', '19780512 200312 1 002', 'Pimpinan Puncak', 'Manajemen Eksekutif', 'S2 Magister Pengelolaan Sumberdaya Alam & Lingkungan', '0811-5544-3322', 1),
('Dewi Sartika, S.Si., M.Ling.', 'Manajer Mutu (Quality Manager)', '19840315 200801 2 006', 'Manajer Mutu', 'Jaminan Mutu ISO 17025', 'S2 Ilmu Lingkungan, Sertifikasi Asesor KAN', '0812-4433-2211', 2),
('Ahmad Ridwan, S.T., M.Sc.', 'Manajer Teknis (Technical Manager)', '19860920 201001 1 008', 'Manajer Teknis', 'Teknis & Metrologi Pengujian', 'S2 Teknik Kimia Lingkungan', '0813-7788-9900', 3),
('Hendra Wijaya, S.Si.', 'Penyelia Kimia Anorganik & AAS', '19900214 201402 1 003', 'Penyelia Teknis', 'Sub-Lab Logam Berat', 'S1 Kimia Murni, Pelatihan AAS & Spektroskopi', '0852-1122-3344', 4),
('Nurul Aini, S.Si.', 'Penyelia Mikrobiologi & Fisika', '19920708 201503 2 005', 'Penyelia Teknis', 'Sub-Lab Biologi & Air Bersih', 'S1 Biologi / Mikrobiologi Lingkungan', '0821-6677-8899', 5),
('Bambang Supriyanto', 'Koordinator Pengambil Contoh (PPC)', '19881125 201201 1 004', 'Teknisi Lapangan', 'Pengambilan Sampel (Sampling)', 'D3 Teknik Lingkungan, Sertifikat PPC BNSP/KLHK', '0813-9900-1122', 6);

-- --------------------------------------------------------------------
-- 8. TABEL: lab_facilities (Peralatan Instrumen Laboratorium)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `lab_facilities`;
CREATE TABLE `lab_facilities` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `category` ENUM('Instrumen Kimia Utama', 'Instrumen Fisika & Lapangan', 'Instrumen Biologi / Mikrobiologi', 'Peralatan Sampling Lapangan') NOT NULL,
  `brand_model` VARCHAR(150) NOT NULL,
  `condition_status` ENUM('Berfungsi Baik & Terkalibrasi', 'Dalam Perawatan / Maintenance', 'Proses Kalibrasi Ulang') NOT NULL DEFAULT 'Berfungsi Baik & Terkalibrasi',
  `function_description` TEXT NOT NULL,
  `year_acquired` INT NOT NULL DEFAULT 2022,
  `calibration_status` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `lab_facilities` (`name`, `category`, `brand_model`, `condition_status`, `function_description`, `year_acquired`, `calibration_status`) VALUES
('Atomic Absorption Spectrophotometer (AAS)', 'Instrumen Kimia Utama', 'Shimadzu AA-7000 Series (Flame & Graphite)', 'Berfungsi Baik & Terkalibrasi', 'Pengujian kadar logam berat (Fe, Mn, Pb, Cd, Cu, Zn, Cr) pada air limbah dan air sungai dengan akurasi hingga sub-ppb.', 2022, 'Terkalibrasi KAN LK-045 (Berlaku s/d Des 2025)'),
('Spektrofotometer UV-Vis Double Beam', 'Instrumen Kimia Utama', 'Thermo Scientific Genesys 180', 'Berfungsi Baik & Terkalibrasi', 'Analisis senyawa nitrat, nitrit, sulfat, fosfat, amoniak, COD, dan detergen secara fotometrik.', 2021, 'Terkalibrasi KAN LK-012 (Berlaku s/d Okt 2025)'),
('Multi-Parameter Water Quality Field Meter', 'Instrumen Fisika & Lapangan', 'YSI ProQuatro Professional', 'Berfungsi Baik & Terkalibrasi', 'Pengukuran in-situ kualitas air langsung di lapangan: pH, DO (Dissolved Oxygen), Konduktivitas (DHL), TDS, Salinitas, dan Suhu.', 2023, 'Terkalibrasi KAN LK-089 (Berlaku s/d Nov 2025)'),
('High Volume Air Sampler (HVAS - TSP & PM10)', 'Peralatan Sampling Lapangan', 'Tisch Environmental TE-5170', 'Berfungsi Baik & Terkalibrasi', 'Pengambilan sampel debu melayang (TSP) dan partikulat halus PM10/PM2.5 di udara ambien permukiman dan tapak proyek.', 2022, 'Terkalibrasi KAN (Berlaku s/d Jan 2026)'),
('Digital Sound Level Meter Type 1 Integration', 'Instrumen Fisika & Lapangan', 'Rion NL-52 Type 1 KAN Certified', 'Berfungsi Baik & Terkalibrasi', 'Pengukuran tingkat kebisingan lingkungan kontinu 24 jam dengan filter pita oktaf Leq, L10, L50, dan L90.', 2023, 'Terkalibrasi KAN LK-114 (Berlaku s/d Mar 2026)'),
('Autoclave Vertical Sterilizer & Laminar Air Flow', 'Instrumen Biologi / Mikrobiologi', 'Hirayama HVE-50 & Esco Airstream', 'Berfungsi Baik & Terkalibrasi', 'Sterilisasi media kultur dan inkubasi steril untuk pengujian mikroba Total Coliform & Fecal Coliform.', 2021, 'Terkalibrasi KAN LK-033 (Berlaku s/d Feb 2026)');

-- --------------------------------------------------------------------
-- 9. TABEL: sop_documents (Standar Operasional Prosedur Publik)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `sop_documents`;
CREATE TABLE `sop_documents` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `document_number` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('Pelayanan Publik', 'Teknis Pengujian', 'K3 & Pengelolaan Limbah B3', 'Penanganan Pengaduan') NOT NULL,
  `file_format` VARCHAR(20) NOT NULL DEFAULT 'PDF',
  `file_size` VARCHAR(50) NOT NULL DEFAULT '1.4 MB',
  `revision` VARCHAR(20) NOT NULL DEFAULT 'Rev. 02',
  `effective_date` DATE NOT NULL,
  `download_count` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sop_documents` (`document_number`, `title`, `category`, `file_format`, `file_size`, `revision`, `effective_date`, `download_count`) VALUES
('SOP/660.1/UPTD-LAB/001/2024', 'SOP Penerimaan, Registrasi, dan Penanganan Sampel Masuk', 'Pelayanan Publik', 'PDF', '1.8 MB', 'Rev. 03', '2024-01-15', 342),
('SOP/660.1/UPTD-LAB/002/2024', 'SOP Permohonan dan Pelaksanaan Pengambilan Contoh Uji Lapangan (PPC)', 'Pelayanan Publik', 'PDF', '2.1 MB', 'Rev. 02', '2024-02-01', 215),
('SOP/660.1/UPTD-LAB/003/2024', 'SOP Pengujian Kualitas Air Permukaan dan Limbah Cair SNI ISO/IEC 17025', 'Teknis Pengujian', 'PDF', '3.4 MB', 'Rev. 04', '2024-01-10', 489),
('SOP/660.1/UPTD-LAB/004/2024', 'SOP Penerbitan, Pengesahan TTE, dan Penyerahan Laporan Hasil Pengujian (LHP)', 'Pelayanan Publik', 'PDF', '1.2 MB', 'Rev. 02', '2024-03-01', 198),
('SOP/660.1/UPTD-LAB/005/2024', 'SOP Mekanisme Pengelolaan Pengaduan Masyarakat dan Umpan Balik Pelanggan', 'Penanganan Pengaduan', 'PDF', '950 KB', 'Rev. 02', '2024-01-20', 167),
('SOP/660.1/UPTD-LAB/006/2024', 'SOP Keselamatan Kesehatan Kerja (K3) dan Penanganan Limbah B3 Laboratorium', 'K3 & Pengelolaan Limbah B3', 'PDF', '2.6 MB', 'Rev. 03', '2024-02-15', 134);

-- --------------------------------------------------------------------
-- 10. TABEL: news_articles (Berita & Publikasi Lingkungan)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `news_articles`;
CREATE TABLE `news_articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Publikasi Lingkungan',
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `author` VARCHAR(150) NOT NULL DEFAULT 'Tim Humas UPTD Lab DLH',
  `date` DATE NOT NULL,
  `read_time` VARCHAR(30) NOT NULL DEFAULT '4 menit baca',
  `image_url` VARCHAR(255) DEFAULT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `news_articles` (`title`, `slug`, `category`, `excerpt`, `content`, `author`, `date`, `read_time`) VALUES
(
  'UPTD Laboratorium Lingkungan DLH Bulungan Raih Re-Akreditasi SNI ISO/IEC 17025:2017 oleh KAN',
  're-akreditasi-sni-iso-17025-kan-2025',
  'Akreditasi & Mutu',
  'Komite Akreditasi Nasional (KAN) secara resmi menerbitkan keputusan perpanjangan akreditasi dengan penambahan 12 ruang lingkup parameter uji baru.',
  'Tanjung Selor — UPTD Laboratorium Lingkungan Hidup Dinas Lingkungan Hidup Kabupaten Bulungan berhasil mempertahankan akreditasi bergengsi SNI ISO/IEC 17025:2017 setelah melalui rangkaian asesmen lapangan oleh tim asesor Komite Akreditasi Nasional (KAN). Penambahan ruang lingkup mencakup pengujian logam berat dengan Atomic Absorption Spectrophotometer (AAS) serta mikrobiologi air bersih.',
  'Humas DLH Bulungan',
  '2025-05-02',
  '3 menit baca'
),
(
  'Pemantauan Rutin Kualitas Air Sungai Kayan Periode Triwulan II Tahun 2025',
  'pemantauan-air-sungai-kayan-triwulan-ii-2025',
  'Pemantauan Lingkungan',
  'Tim PPC UPTD Lab DLH Bulungan melakukan pengambilan sampel air di 9 titik strategis sepanjang Daerah Aliran Sungai (DAS) Kayan.',
  'Pengambilan contoh air dilakukan mulai dari hulu Kecamatan Peso, perlintasan kawasan industri, hingga muara Tanjung Palas. Parameter yang diuji meliputi DO, BOD, COD, TSS, fecal coliform, dan kandungan logam terlarut guna memastikan kualitas air baku tetap terjaga bagi masyarakat Kabupaten Bulungan.',
  'Subbag Pengendalian Pencemaran',
  '2025-04-25',
  '5 menit baca'
),
(
  'Sosialisasi Pembayaran Retribusi Laboratorium Non-Tunai Melalui QRIS Bank Kaltimtara',
  'sosialisasi-retribusi-non-tunai-qris-2025',
  'Pelayanan Publik',
  'Mendukung program digitalisasi keuangan daerah, seluruh pembayaran retribusi pengujian laboratorium kini terintegrasi secara elektronik.',
  'Dalam rangka meningkatkan transparansi pendapatan asli daerah (PAD) serta mencegah praktik pungutan liar, UPTD Lab Lingkungan DLH Kabupaten Bulungan secara resmi menerapkan sistem billing pembayaran non-tunai melalui QRIS Kas Daerah dan Virtual Account Bank Kaltimtara. Pelanggan langsung menerima tanda bukti setor sah yang terafiliasi dengan Bapenda.',
  'Bendahara Penerimaan UPTD',
  '2025-04-10',
  '4 menit baca'
);

-- --------------------------------------------------------------------
-- 11. TABEL: complaint_tickets (Aduan Masyarakat & Umpan Balik)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `complaint_tickets`;
CREATE TABLE `complaint_tickets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ticket_number` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('Diterima', 'Diproses', 'Selesai Ditindaklanjuti') NOT NULL DEFAULT 'Diterima',
  `response` TEXT DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `complaint_tickets` (`ticket_number`, `name`, `email`, `phone`, `subject`, `message`, `date`, `status`, `response`) VALUES
(
  'TKT-2025-001',
  'Rian Pratama',
  'rian.pratama@gmail.com',
  '0813-7766-5544',
  'Konfirmasi Pengambilan Salinan Fisik LHP',
  'Apakah salinan fisik Laporan Hasil Pengujian (LHP) berstempel basah bisa diambil di luar jam kerja loket karena lokasi kerja kami di luar kota?',
  '2025-05-14',
  'Selesai Ditindaklanjuti',
  'Yth. Bpk. Rian Pratama, salinan fisik LHP berstempel basah dapat diambil melalui koordinasi dengan petugas piket loket atau kami kirimkan via ekspedisi kilat tercatat. Softcopy LHP bertanda tangan elektronik (TTE) BSrE yang sah secara hukum juga dapat diunduh langsung melalui menu tracking portal ini.'
),
(
  'TKT-2025-002',
  'Hendra Kurniawan',
  'hendra.k@perusahaan-sawit.id',
  '0852-8899-0011',
  'Permohonan Jadwal Sampling Ulang Air Limbah Pabrik',
  'Kami mengajukan permohonan penjadwalan petugas PPC UPTD untuk pengambilan sampel air limbah periode semester I pada akhir bulan Mei 2025.',
  '2025-05-15',
  'Diproses',
  'Yth. Bpk. Hendra, surat permohonan telah diterima oleh Kepala UPTD dan saat ini sedang disiapkan Surat Perintah Tugas (SPT) petugas PPC untuk tanggal 28 Mei 2025.'
);

-- --------------------------------------------------------------------
-- 12. TABEL: skm_feedbacks (Survei Kepuasan Masyarakat / IKM)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `skm_feedbacks`;
CREATE TABLE `skm_feedbacks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(150) NOT NULL,
  `institution` VARCHAR(150) NOT NULL,
  `service_type` VARCHAR(100) NOT NULL,
  `speed_rating` TINYINT UNSIGNED NOT NULL DEFAULT 5 COMMENT 'Skala 1-5',
  `facility_rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `officer_rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `tariff_transparency_rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `overall_score` DECIMAL(4,2) NOT NULL DEFAULT 4.80,
  `feedback_text` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `skm_feedbacks` (`customer_name`, `institution`, `service_type`, `speed_rating`, `facility_rating`, `officer_rating`, `tariff_transparency_rating`, `overall_score`, `feedback_text`, `date`) VALUES
('Budi Setiawan', 'PT. Kayan Agro Makmur', 'Pengujian Air Limbah Industri', 5, 5, 5, 5, 5.00, 'Pelayanan loket sangat sigap, hasil uji terbit tepat waktu sesuai standar hari kerja di SOP. Fitur tracking online sangat membantu monitoring tanpa harus bolak-balik ke kantor dinas.', '2025-05-11'),
('Siti Sarah', 'Dinas Perikanan Bulungan', 'Uji Kualitas Air Tambak', 4, 5, 5, 5, 4.75, 'Petugas pengambil sampel (PPC) sangat teliti dan menjaga integritas rantai dingin (coolbox) sampel hingga tiba di laboratorium Tanjung Selor.', '2025-05-09'),
('Agus Haryanto', 'Masyarakat Tanjung Palas', 'Uji Kualitas Air Sumur Bersih', 5, 4, 5, 5, 4.80, 'Biaya retribusi transparan sesuai Perda tanpa ada biaya tambahan apapun, proses bayar pakai QRIS cepat.', '2025-05-03');

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================================
-- SELESAI. DATABASE db_lab_bulungan SIAP DIGUNAKAN DI PHPMYADMIN!
-- ====================================================================
