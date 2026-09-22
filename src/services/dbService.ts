/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP DLH BULUNGAN
 * Service Integrasi & Manajemen Database MySQL (XAMPP & Standalone)
 */

import { SiteSettings, SampleRequest, TestParameter, StaffMember, LabFacility, SOPDocument, NewsItem, ComplaintTicket, SKMFeedback } from '../types';

export interface DbStatus {
  connected: boolean;
  source: 'mysql' | 'local_storage';
  host?: string;
  database?: string;
  tableCount?: number;
  tables?: string[];
  tableCounts?: Record<string, number>;
  message?: string;
}

export const checkMySqlConnection = async (): Promise<DbStatus> => {
  try {
    const res = await fetch('./api/test_db.php', { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.status === 'connected') {
        return {
          connected: true,
          source: 'mysql',
          host: data.host || 'localhost:3306',
          database: data.database || 'db_lab_bulungan',
          tableCount: data.total_tables || 10,
          tables: data.tables || [],
          tableCounts: data.table_counts || {},
          message: 'Terhubung ke MySQL Database (Apache XAMPP)'
        };
      }
    }
  } catch {
    // Backend PHP tidak aktif (misal running di preview container Vite)
  }

  return {
    connected: false,
    source: 'local_storage',
    host: 'localhost:3306 (Offline / Standby)',
    database: 'db_lab_bulungan',
    tableCount: 10,
    message: 'Berjalan dalam mode Browser LocalStorage (Siap Sinkronisasi ke XAMPP)'
  };
};

/**
 * Generate full SQL Dump string from the current application state
 */
export const generateSqlDump = (
  siteSettings: SiteSettings,
  samples: SampleRequest[],
  parameters: TestParameter[],
  staff: StaffMember[],
  facilities: LabFacility[],
  sops: SOPDocument[],
  news: NewsItem[],
  complaints: ComplaintTicket[],
  feedbacks: SKMFeedback[]
): string => {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  return `-- ====================================================================
-- EXPORT DATABASE UPTD LABORATORIUM LINGKUNGAN KABUPATEN BULUNGAN
-- Tanggal Ekspor: ${now} WITA
-- Database Target: db_lab_bulungan
-- Format: MySQL / MariaDB (phpMyAdmin Ready)
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";

CREATE DATABASE IF NOT EXISTS \`db_lab_bulungan\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`db_lab_bulungan\`;

-- --------------------------------------------------------------------
-- 1. TABEL: site_settings
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`site_settings\`;
CREATE TABLE \`site_settings\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`agency_name\` VARCHAR(255) NOT NULL,
  \`agency_sub\` VARCHAR(255) NOT NULL,
  \`tagline\` VARCHAR(255) NOT NULL,
  \`hero_title\` VARCHAR(255) NOT NULL,
  \`hero_subtitle\` TEXT NOT NULL,
  \`kan_accreditation_number\` VARCHAR(50) NOT NULL,
  \`kan_accreditation_std\` VARCHAR(50) NOT NULL,
  \`running_text\` TEXT NOT NULL,
  \`announcement_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`phone\` VARCHAR(50) NOT NULL,
  \`whatsapp\` VARCHAR(50) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`address\` TEXT NOT NULL,
  \`working_hours\` VARCHAR(255) NOT NULL,
  \`visi\` TEXT NOT NULL,
  \`misi\` TEXT NOT NULL,
  \`maklumat_pelayanan\` TEXT NOT NULL,
  \`motto_pelayanan\` VARCHAR(255) NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`site_settings\` (
  \`id\`, \`agency_name\`, \`agency_sub\`, \`tagline\`, \`hero_title\`, \`hero_subtitle\`,
  \`kan_accreditation_number\`, \`kan_accreditation_std\`, \`running_text\`, \`announcement_active\`,
  \`phone\`, \`whatsapp\`, \`email\`, \`address\`, \`working_hours\`, \`visi\`, \`misi\`,
  \`maklumat_pelayanan\`, \`motto_pelayanan\`
) VALUES (
  1,
  ${escapeSql(siteSettings.agencyName)},
  ${escapeSql(siteSettings.agencySub)},
  ${escapeSql(siteSettings.tagline)},
  ${escapeSql(siteSettings.heroTitle)},
  ${escapeSql(siteSettings.heroSubtitle)},
  ${escapeSql(siteSettings.kanAccreditationNumber)},
  ${escapeSql(siteSettings.kanAccreditationStd)},
  ${escapeSql(siteSettings.runningText)},
  ${siteSettings.announcementActive ? 1 : 0},
  ${escapeSql(siteSettings.phone)},
  ${escapeSql(siteSettings.whatsapp)},
  ${escapeSql(siteSettings.email)},
  ${escapeSql(siteSettings.address)},
  ${escapeSql(siteSettings.workingHours)},
  ${escapeSql(siteSettings.visi)},
  ${escapeSql(JSON.stringify(siteSettings.misi))},
  ${escapeSql(siteSettings.maklumatPelayanan)},
  ${escapeSql(siteSettings.mottoPelayanan)}
);

-- --------------------------------------------------------------------
-- 2. TABEL: admin_users
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`admin_users\`;
CREATE TABLE \`admin_users\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`name\` VARCHAR(150) NOT NULL,
  \`role\` VARCHAR(100) NOT NULL,
  \`nip\` VARCHAR(30) DEFAULT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`admin_users\` (\`id\`, \`username\`, \`password\`, \`name\`, \`role\`, \`nip\`, \`email\`) VALUES
(1, 'admin', 'admin123', 'Ir. H. Budi Santoso, M.Si.', 'Administrator Utama', '19780512 200312 1 002', 'admin.lab@bulungan.go.id'),
(2, 'manajer.mutu', 'mutu123', 'Dewi Sartika, S.Si., M.Ling.', 'Manajer Mutu', '19840315 200801 2 006', 'mutu.lab@bulungan.go.id'),
(3, 'manajer.teknis', 'teknis123', 'Ahmad Ridwan, S.T., M.Sc.', 'Manajer Teknis', '19860920 201001 1 008', 'teknis.lab@bulungan.go.id'),
(4, 'petugas.loket', 'loket123', 'Siti Rahmawati, A.Md.Kes.', 'Petugas Loket / TU', '19921104 201503 2 004', 'loket.lab@bulungan.go.id');

-- --------------------------------------------------------------------
-- 3. TABEL: parameters
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`parameters\`;
CREATE TABLE \`parameters\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`code\` VARCHAR(30) NOT NULL UNIQUE,
  \`name\` VARCHAR(150) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`unit\` VARCHAR(50) NOT NULL,
  \`method\` VARCHAR(150) NOT NULL,
  \`standard_limit\` VARCHAR(100) NOT NULL,
  \`price\` DECIMAL(12,2) NOT NULL,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${parameters.map(p => `INSERT INTO \`parameters\` (\`code\`, \`name\`, \`category\`, \`unit\`, \`method\`, \`standard_limit\`, \`price\`, \`is_active\`) VALUES (${escapeSql(p.code || p.id)}, ${escapeSql(p.name)}, ${escapeSql(p.category)}, ${escapeSql(p.unit)}, ${escapeSql(p.methodSNI)}, ${escapeSql(p.standardLimit)}, ${p.price}, ${p.isAccreditedKAN ? 1 : 0});`).join('\n')}

-- --------------------------------------------------------------------
-- 4. TABEL: samples & sample_results
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`sample_results\`;
DROP TABLE IF EXISTS \`samples\`;

CREATE TABLE \`samples\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`tracking_code\` VARCHAR(50) NOT NULL UNIQUE,
  \`customer_name\` VARCHAR(150) NOT NULL,
  \`customer_type\` VARCHAR(100) NOT NULL,
  \`company_name\` VARCHAR(150) DEFAULT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`address\` TEXT DEFAULT NULL,
  \`sample_name\` VARCHAR(200) NOT NULL,
  \`matrix_type\` VARCHAR(100) NOT NULL,
  \`sample_point_location\` VARCHAR(255) NOT NULL,
  \`sampling_date\` DATE NOT NULL,
  \`sampling_method\` VARCHAR(100) NOT NULL,
  \`requested_date\` DATE NOT NULL,
  \`status\` VARCHAR(50) NOT NULL,
  \`lhp_number\` VARCHAR(100) DEFAULT NULL,
  \`notes\` TEXT DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`sample_results\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`sample_id\` INT UNSIGNED NOT NULL,
  \`parameter_name\` VARCHAR(150) NOT NULL,
  \`standard_limit\` VARCHAR(100) NOT NULL,
  \`result_value\` VARCHAR(100) NOT NULL,
  \`unit\` VARCHAR(50) NOT NULL,
  \`method\` VARCHAR(150) NOT NULL,
  \`is_compliant\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`),
  FOREIGN KEY (\`sample_id\`) REFERENCES \`samples\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${samples.map((s, idx) => {
  const sampleId = idx + 1;
  const insertSample = `INSERT INTO \`samples\` (\`id\`, \`tracking_code\`, \`customer_name\`, \`customer_type\`, \`company_name\`, \`phone\`, \`email\`, \`address\`, \`sample_name\`, \`matrix_type\`, \`sample_point_location\`, \`sampling_date\`, \`sampling_method\`, \`requested_date\`, \`status\`, \`lhp_number\`, \`notes\`) VALUES (${sampleId}, ${escapeSql(s.registrationNumber)}, ${escapeSql(s.customerName)}, ${escapeSql(s.institution || 'Umum')}, ${escapeSql(s.institution || '')}, ${escapeSql(s.phoneNumber)}, ${escapeSql(s.email || '')}, ${escapeSql(s.address || '')}, ${escapeSql(s.matrix)}, ${escapeSql(s.matrix)}, ${escapeSql(s.samplingLocation)}, ${escapeSql(s.samplingDate)}, ${escapeSql(s.samplingType)}, ${escapeSql(s.createdAt)}, ${escapeSql(s.status)}, ${escapeSql(s.lhpNumber || '')}, ${escapeSql(s.technicianNotes || '')});`;
  
  const insertResults = (s.testResults || []).map(r => 
    `INSERT INTO \`sample_results\` (\`sample_id\`, \`parameter_name\`, \`standard_limit\`, \`result_value\`, \`unit\`, \`method\`, \`is_compliant\`) VALUES (${sampleId}, ${escapeSql(r.parameterName)}, ${escapeSql(r.standardLimit)}, ${escapeSql(r.result)}, ${escapeSql(r.unit)}, ${escapeSql(r.method)}, ${r.compliance === 'MEMENUHI' || r.compliance === 'SESUAI' ? 1 : 0});`
  ).join('\n');

  return insertSample + (insertResults ? '\n' + insertResults : '');
}).join('\n\n')}

-- --------------------------------------------------------------------
-- 5. TABEL: staff_members
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`staff_members\`;
CREATE TABLE \`staff_members\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(150) NOT NULL,
  \`role\` VARCHAR(150) NOT NULL,
  \`nip\` VARCHAR(50) DEFAULT NULL,
  \`position_level\` VARCHAR(100) NOT NULL,
  \`division\` VARCHAR(100) NOT NULL,
  \`education\` VARCHAR(150) NOT NULL,
  \`phone\` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${staff.map(st => `INSERT INTO \`staff_members\` (\`name\`, \`role\`, \`nip\`, \`position_level\`, \`division\`, \`education\`, \`phone\`) VALUES (${escapeSql(st.name)}, ${escapeSql(st.position)}, ${escapeSql(st.nip || '')}, ${escapeSql(String(st.level))}, ${escapeSql(st.roleDescription)}, ${escapeSql(st.education)}, ${escapeSql('')});`).join('\n')}

-- --------------------------------------------------------------------
-- 6. TABEL: lab_facilities
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`lab_facilities\`;
CREATE TABLE \`lab_facilities\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(150) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`brand_model\` VARCHAR(150) NOT NULL,
  \`condition_status\` VARCHAR(100) NOT NULL,
  \`function_description\` TEXT NOT NULL,
  \`year_acquired\` INT NOT NULL,
  \`calibration_status\` VARCHAR(150) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${facilities.map(f => `INSERT INTO \`lab_facilities\` (\`name\`, \`category\`, \`brand_model\`, \`condition_status\`, \`function_description\`, \`year_acquired\`, \`calibration_status\`) VALUES (${escapeSql(f.name)}, ${escapeSql(f.category)}, ${escapeSql(f.brandModel)}, ${escapeSql(f.specs)}, ${escapeSql(f.functionDesc)}, 2024, 'Terkalibrasi KAN');`).join('\n')}

-- --------------------------------------------------------------------
-- 7. TABEL: sop_documents
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`sop_documents\`;
CREATE TABLE \`sop_documents\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`document_number\` VARCHAR(100) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`file_format\` VARCHAR(20) NOT NULL,
  \`file_size\` VARCHAR(50) NOT NULL,
  \`revision\` VARCHAR(20) NOT NULL,
  \`effective_date\` DATE NOT NULL,
  \`download_count\` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${sops.map(sp => `INSERT INTO \`sop_documents\` (\`document_number\`, \`title\`, \`category\`, \`file_format\`, \`file_size\`, \`revision\`, \`effective_date\`, \`download_count\`) VALUES (${escapeSql(sp.code)}, ${escapeSql(sp.title)}, 'SOP KAN ISO 17025', 'PDF', ${escapeSql(sp.fileSize)}, ${escapeSql(sp.revision)}, ${escapeSql(sp.effectiveDate)}, 0);`).join('\n')}

-- --------------------------------------------------------------------
-- 8. TABEL: news_articles
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`news_articles\`;
CREATE TABLE \`news_articles\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`excerpt\` TEXT NOT NULL,
  \`content\` LONGTEXT NOT NULL,
  \`author\` VARCHAR(150) NOT NULL,
  \`date\` DATE NOT NULL,
  \`read_time\` VARCHAR(30) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${news.map(n => `INSERT INTO \`news_articles\` (\`title\`, \`slug\`, \`category\`, \`excerpt\`, \`content\`, \`author\`, \`date\`, \`read_time\`) VALUES (${escapeSql(n.title)}, ${escapeSql(n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}, ${escapeSql(n.category)}, ${escapeSql(n.excerpt || n.summary || '')}, ${escapeSql(n.content)}, ${escapeSql(n.author)}, ${escapeSql(n.date)}, '3 menit');`).join('\n')}

-- --------------------------------------------------------------------
-- 9. TABEL: complaint_tickets
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`complaint_tickets\`;
CREATE TABLE \`complaint_tickets\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`ticket_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`subject\` VARCHAR(255) NOT NULL,
  \`message\` TEXT NOT NULL,
  \`date\` DATE NOT NULL,
  \`status\` VARCHAR(50) NOT NULL,
  \`response\` TEXT DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${complaints.map(c => `INSERT INTO \`complaint_tickets\` (\`ticket_number\`, \`name\`, \`email\`, \`phone\`, \`subject\`, \`message\`, \`date\`, \`status\`, \`response\`) VALUES (${escapeSql(c.ticketNumber)}, ${escapeSql(c.name)}, ${escapeSql(c.email)}, ${escapeSql(c.phone)}, ${escapeSql(c.subject)}, ${escapeSql(c.message)}, ${escapeSql(c.date)}, ${escapeSql(c.status)}, ${escapeSql(c.response || '')});`).join('\n')}

-- --------------------------------------------------------------------
-- 10. TABEL: skm_feedbacks
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`skm_feedbacks\`;
CREATE TABLE \`skm_feedbacks\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`customer_name\` VARCHAR(150) NOT NULL,
  \`institution\` VARCHAR(150) NOT NULL,
  \`service_type\` VARCHAR(100) NOT NULL,
  \`speed_rating\` TINYINT UNSIGNED NOT NULL,
  \`facility_rating\` TINYINT UNSIGNED NOT NULL,
  \`officer_rating\` TINYINT UNSIGNED NOT NULL,
  \`tariff_transparency_rating\` TINYINT UNSIGNED NOT NULL,
  \`overall_score\` DECIMAL(4,2) NOT NULL,
  \`feedback_text\` TEXT NOT NULL,
  \`date\` DATE NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${feedbacks.map(f => `INSERT INTO \`skm_feedbacks\` (\`customer_name\`, \`institution\`, \`service_type\`, \`speed_rating\`, \`facility_rating\`, \`officer_rating\`, \`tariff_transparency_rating\`, \`overall_score\`, \`feedback_text\`, \`date\`) VALUES (${escapeSql(f.customerName)}, ${escapeSql(f.institution)}, 'Pengujian Sampel Lingkungan', ${f.ratings?.[1] || 4}, ${f.ratings?.[2] || 4}, ${f.ratings?.[3] || 4}, ${f.ratings?.[4] || 4}, ${f.overallRating}, ${escapeSql(f.comment)}, ${escapeSql(f.date)});`).join('\n')}

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
-- SELESAI EKSPOR DATABASE db_lab_bulungan
`;
};

function escapeSql(val: string | null | undefined): string {
  if (val === null || val === undefined) return 'NULL';
  return "'" + String(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  }) + "'";
}

/**
 * Trigger browser file download for SQL string
 */
export const downloadSqlFile = (sqlContent: string, filename = 'db_lab_bulungan.sql') => {
  const blob = new Blob([sqlContent], { type: 'application/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
