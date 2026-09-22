<?php
/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP DLH BULUNGAN
 * Endpoint GET Data: Mengambil Data dari MySQL Database
 */

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
$table = isset($_GET['table']) ? trim($_GET['table']) : 'all';

try {
    if ($table === 'all') {
        // Ambil semua entitas dalam satu request terstruktur
        
        // 1. Site Settings
        $stmt = $pdo->query("SELECT * FROM site_settings ORDER BY id ASC LIMIT 1");
        $settings = $stmt->fetch();
        if ($settings && isset($settings['misi'])) {
            $decodedMisi = json_decode($settings['misi'], true);
            if (is_array($decodedMisi)) {
                $settings['misi'] = $decodedMisi;
            } else {
                $settings['misi'] = array_filter(explode("\n", $settings['misi']));
            }
        }

        // 2. Parameters
        $stmt = $pdo->query("SELECT * FROM parameters ORDER BY id ASC");
        $parameters = $stmt->fetchAll();

        // 3. Samples & their results
        $stmt = $pdo->query("SELECT * FROM samples ORDER BY id DESC");
        $samples = $stmt->fetchAll();
        foreach ($samples as &$s) {
            $resStmt = $pdo->prepare("SELECT * FROM sample_results WHERE sample_id = ? ORDER BY id ASC");
            $resStmt->execute([$s['id']]);
            $s['results'] = $resStmt->fetchAll();
        }

        // 4. Staff Members
        $stmt = $pdo->query("SELECT * FROM staff_members ORDER BY order_index ASC, id ASC");
        $staff = $stmt->fetchAll();

        // 5. Facilities
        $stmt = $pdo->query("SELECT * FROM lab_facilities ORDER BY id ASC");
        $facilities = $stmt->fetchAll();

        // 6. SOPs
        $stmt = $pdo->query("SELECT * FROM sop_documents ORDER BY id ASC");
        $sops = $stmt->fetchAll();

        // 7. News
        $stmt = $pdo->query("SELECT * FROM news_articles WHERE is_published = 1 ORDER BY date DESC, id DESC");
        $news = $stmt->fetchAll();

        // 8. Complaints
        $stmt = $pdo->query("SELECT * FROM complaint_tickets ORDER BY id DESC");
        $complaints = $stmt->fetchAll();

        // 9. Feedbacks SKM
        $stmt = $pdo->query("SELECT * FROM skm_feedbacks ORDER BY id DESC");
        $feedbacks = $stmt->fetchAll();

        echo json_encode([
            'success' => true,
            'source' => 'mysql',
            'data' => [
                'siteSettings' => $settings,
                'parameters' => $parameters,
                'samples' => $samples,
                'staffMembers' => $staff,
                'labFacilities' => $facilities,
                'sopDocuments' => $sops,
                'news' => $news,
                'complaints' => $complaints,
                'feedbacks' => $feedbacks
            ]
        ]);
    } else {
        // Query tabel spesifik dengan whitelist tabel yang valid
        $allowedTables = [
            'site_settings', 'admin_users', 'parameters', 'samples', 
            'sample_results', 'staff_members', 'lab_facilities', 
            'sop_documents', 'news_articles', 'complaint_tickets', 'skm_feedbacks'
        ];

        if (!in_array($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Tabel tidak valid']);
            exit();
        }

        $stmt = $pdo->query("SELECT * FROM `{$table}`");
        $data = $stmt->fetchAll();

        echo json_encode([
            'success' => true,
            'table' => $table,
            'count' => count($data),
            'data' => $data
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal membaca data dari MySQL: ' . $e->getMessage()
    ]);
}
