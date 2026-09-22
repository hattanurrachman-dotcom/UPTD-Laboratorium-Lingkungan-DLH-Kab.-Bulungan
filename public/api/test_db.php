<?php
/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP DLH BULUNGAN
 * Endpoint Pemeriksaan Status Koneksi MySQL
 */

require_once __DIR__ . '/config.php';

try {
    $pdo = getDbConnection();
    
    // Hitung tabel yang ada
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $tableCounts = [];
    foreach ($tables as $table) {
        $countStmt = $pdo->query("SELECT COUNT(*) as total FROM `{$table}`");
        $rowCount = $countStmt->fetch();
        $tableCounts[$table] = (int)$rowCount['total'];
    }

    echo json_encode([
        'success' => true,
        'status' => 'connected',
        'message' => 'Koneksi ke MySQL database db_lab_bulungan berhasil!',
        'database' => DB_NAME,
        'host' => DB_HOST,
        'total_tables' => count($tables),
        'tables' => $tables,
        'table_counts' => $tableCounts,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'status' => 'disconnected',
        'message' => $e->getMessage()
    ]);
}
