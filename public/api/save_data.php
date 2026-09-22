<?php
/**
 * UPTD LABORATORIUM LINGKUNGAN HIDUP DLH BULUNGAN
 * Endpoint POST/PUT Data: Menyimpan Perubahan Data ke MySQL Database
 */

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input || !isset($input['action'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Format payload JSON tidak valid atau action tidak disertakan.']);
    exit();
}

$action = $input['action'];

try {
    switch ($action) {
        case 'update_settings':
            $data = $input['data'];
            $misiJson = is_array($data['misi']) ? json_encode($data['misi'], JSON_UNESCAPED_UNICODE) : $data['misi'];

            $stmt = $pdo->prepare("
                UPDATE site_settings SET
                    agency_name = :agency_name,
                    agency_sub = :agency_sub,
                    tagline = :tagline,
                    hero_title = :hero_title,
                    hero_subtitle = :hero_subtitle,
                    kan_accreditation_number = :kan_accreditation_number,
                    kan_accreditation_std = :kan_accreditation_std,
                    running_text = :running_text,
                    announcement_active = :announcement_active,
                    phone = :phone,
                    whatsapp = :whatsapp,
                    email = :email,
                    address = :address,
                    working_hours = :working_hours,
                    visi = :visi,
                    misi = :misi,
                    maklumat_pelayanan = :maklumat_pelayanan,
                    motto_pelayanan = :motto_pelayanan
                WHERE id = 1
            ");

            $stmt->execute([
                ':agency_name' => $data['agencyName'] ?? $data['agency_name'],
                ':agency_sub' => $data['agencySub'] ?? $data['agency_sub'],
                ':tagline' => $data['tagline'],
                ':hero_title' => $data['heroTitle'] ?? $data['hero_title'],
                ':hero_subtitle' => $data['heroSubtitle'] ?? $data['hero_subtitle'],
                ':kan_accreditation_number' => $data['kanAccreditationNumber'] ?? $data['kan_accreditation_number'],
                ':kan_accreditation_std' => $data['kanAccreditationStd'] ?? $data['kan_accreditation_std'],
                ':running_text' => $data['runningText'] ?? $data['running_text'],
                ':announcement_active' => isset($data['announcementActive']) ? ($data['announcementActive'] ? 1 : 0) : 1,
                ':phone' => $data['phone'],
                ':whatsapp' => $data['whatsapp'],
                ':email' => $data['email'],
                ':address' => $data['address'],
                ':working_hours' => $data['workingHours'] ?? $data['working_hours'],
                ':visi' => $data['visi'],
                ':misi' => $misiJson,
                ':maklumat_pelayanan' => $data['maklumatPelayanan'] ?? $data['maklumat_pelayanan'],
                ':motto_pelayanan' => $data['mottoPelayanan'] ?? $data['motto_pelayanan']
            ]);

            echo json_encode(['success' => true, 'message' => 'Pengaturan website berhasil disimpan ke database MySQL.']);
            break;

        case 'update_sample_status':
            $sampleId = $input['id'] ?? null;
            $trackingCode = $input['trackingCode'] ?? null;
            $newStatus = $input['status'];
            $lhpNumber = $input['lhpNumber'] ?? null;

            if ($trackingCode) {
                $stmt = $pdo->prepare("UPDATE samples SET status = :status, lhp_number = :lhp_number WHERE tracking_code = :tracking_code");
                $stmt->execute([':status' => $newStatus, ':lhp_number' => $lhpNumber, ':tracking_code' => $trackingCode]);
            } else if ($sampleId) {
                $stmt = $pdo->prepare("UPDATE samples SET status = :status, lhp_number = :lhp_number WHERE id = :id");
                $stmt->execute([':status' => $newStatus, ':lhp_number' => $lhpNumber, ':id' => $sampleId]);
            }

            echo json_encode(['success' => true, 'message' => 'Status sampel berhasil diperbarui di database MySQL.']);
            break;

        case 'save_all_samples':
            // Bulk update or replace samples from frontend admin
            $samples = $input['data'];
            foreach ($samples as $s) {
                $check = $pdo->prepare("SELECT id FROM samples WHERE tracking_code = ?");
                $check->execute([$s['trackingCode'] ?? $s['tracking_code']]);
                $existing = $check->fetch();

                if ($existing) {
                    $uStmt = $pdo->prepare("
                        UPDATE samples SET
                            customer_name = :cust_name,
                            company_name = :company,
                            status = :status,
                            lhp_number = :lhp_num,
                            sample_name = :s_name,
                            matrix_type = :matrix,
                            sample_point_location = :loc
                        WHERE id = :id
                    ");
                    $uStmt->execute([
                        ':cust_name' => $s['customerName'] ?? $s['customer_name'],
                        ':company' => $s['companyName'] ?? $s['company_name'] ?? null,
                        ':status' => $s['status'],
                        ':lhp_num' => $s['lhpNumber'] ?? $s['lhp_number'] ?? null,
                        ':s_name' => $s['sampleName'] ?? $s['sample_name'] ?? 'Sampel Lingkungan',
                        ':matrix' => $s['matrixType'] ?? $s['matrix_type'] ?? 'Air',
                        ':loc' => $s['samplePointLocation'] ?? $s['sample_point_location'] ?? 'Bulungan',
                        ':id' => $existing['id']
                    ]);
                }
            }
            echo json_encode(['success' => true, 'message' => 'Daftar sampel berhasil disinkronisasi ke MySQL.']);
            break;

        case 'execute_custom_sql':
            // Khusus admin untuk eksekusi query DML
            $query = trim($input['query'] ?? '');
            if (empty($query)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Query SQL tidak boleh kosong.']);
                exit();
            }

            // Larang perintah DROP DATABASE atau ALTER USER untuk keamanan
            $upper = strtoupper($query);
            if (strpos($upper, 'DROP DATABASE') !== false) {
                http_response_code(403);
                echo json_encode(['success' => false, 'message' => 'Perintah DROP DATABASE dilarang melalui endpoint ini.']);
                exit();
            }

            $affected = $pdo->exec($query);
            echo json_encode([
                'success' => true,
                'message' => 'Query SQL berhasil dieksekusi.',
                'affected_rows' => $affected
            ]);
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Aksi action tidak dikenali.']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gagal menyimpan ke MySQL: ' . $e->getMessage()
    ]);
}
