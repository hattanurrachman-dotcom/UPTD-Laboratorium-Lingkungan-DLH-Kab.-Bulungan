<?php
/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP DLH BULUNGAN
 * Endpoint Export SQL: Mengunduh Backup Dump Database MySQL secara Langsung
 */

require_once __DIR__ . '/config.php';

try {
    $pdo = getDbConnection();

    header('Content-Type: text/plain; charset=UTF-8');
    header('Content-Disposition: attachment; filename="backup_db_lab_bulungan_' . date('Y-m-d_His') . '.sql"');

    echo "-- ====================================================================\n";
    echo "-- BACKUP DUMP DATABASE UPTD LABORATORIUM LINGKUNGAN DLH BULUNGAN\n";
    echo "-- Tanggal Dibuat: " . date('Y-m-d H:i:s') . " WITA\n";
    echo "-- Database: " . DB_NAME . "\n";
    echo "-- Host: " . DB_HOST . "\n";
    echo "-- ====================================================================\n\n";
    echo "SET FOREIGN_KEY_CHECKS = 0;\n";
    echo "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\n";
    echo "START TRANSACTION;\n\n";

    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

    foreach ($tables as $table) {
        // Struktur tabel
        $createStmt = $pdo->query("SHOW CREATE TABLE `{$table}`");
        $createRow = $createStmt->fetch();
        echo "-- --------------------------------------------------------------------\n";
        echo "-- Struktur Tabel: `{$table}`\n";
        echo "-- --------------------------------------------------------------------\n";
        echo "DROP TABLE IF EXISTS `{$table}`;\n";
        echo $createRow['Create Table'] . ";\n\n";

        // Isi Data tabel
        $dataStmt = $pdo->query("SELECT * FROM `{$table}`");
        $rows = $dataStmt->fetchAll();

        if (count($rows) > 0) {
            echo "-- Data untuk tabel `{$table}` (" . count($rows) . " baris)\n";
            $columns = array_keys($rows[0]);
            $colList = implode("`, `", $columns);

            foreach ($rows as $row) {
                $valList = [];
                foreach ($row as $val) {
                    if ($val === null) {
                        $valList[] = "NULL";
                    } else {
                        $valList[] = $pdo->quote($val);
                    }
                }
                echo "INSERT INTO `{$table}` (`{$colList}`) VALUES (" . implode(", ", $valList) . ");\n";
            }
            echo "\n";
        }
    }

    echo "COMMIT;\n";
    echo "SET FOREIGN_KEY_CHECKS = 1;\n";
    echo "-- SELESAI DUMP DATABASE\n";

} catch (Exception $e) {
    http_response_code(500);
    echo "-- Error: " . $e->getMessage();
}
