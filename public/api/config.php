<?php
/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP
 * DINAS LINGKUNGAN HIDUP KABUPATEN BULUNGAN
 * Konfigurasi Koneksi Database MySQL (XAMPP / Production)
 */

// Header CORS & Tipe Konten JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Tangani permintaan preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Konfigurasi Database Standar XAMPP
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'db_lab_bulungan');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');

function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Coba koneksi ke server MySQL tanpa db_name terlebih dahulu untuk mengecek apakah DB sudah dibuat
        try {
            $fallbackDsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
            $rootPdo = new PDO($fallbackDsn, DB_USER, DB_PASS, $options);
            // Cek apakah database ada, jika belum ada, buat otomatis
            $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
            $rootPdo->exec("USE `" . DB_NAME . "`;");
            
            // Re-koneksi dengan database
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            return $pdo;
        } catch (Exception $innerEx) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Gagal terhubung ke MySQL Database: ' . $e->getMessage(),
                'hint' => 'Pastikan modul MySQL di XAMPP Control Panel sudah aktif (Running) dan database db_lab_bulungan telah di-import via phpMyAdmin.',
                'details' => [
                    'host' => DB_HOST,
                    'database' => DB_NAME,
                    'user' => DB_USER
                ]
            ]);
            exit();
        }
    }
}
