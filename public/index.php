<?php
/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP
 * DINAS LINGKUNGAN HIDUP KABUPATEN BULUNGAN
 * File Entry Point XAMPP (Apache / PHP)
 */

$htmlFile = __DIR__ . '/index.html';
if (file_exists($htmlFile)) {
    // Sajikan file aplikasi utama
    include $htmlFile;
} else {
    echo "<!DOCTYPE html><html lang='id'><head><meta charset='UTF-8'><title>UPTD Lab Lingkungan DLH Bulungan</title></head><body style='font-family:sans-serif;padding:40px;text-align:center;'>";
    echo "<h2 style='color:#0f766e;'>UPTD Laboratorium Lingkungan Hidup Kab. Bulungan</h2>";
    echo "<p>File <code>index.html</code> siap disajikan di Apache XAMPP.</p>";
    echo "</body></html>";
}
?>
