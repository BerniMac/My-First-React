<?php
header('Content-Type: application/json');
require_once 'db_config.php';

if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    try {
        
        $sql = "SELECT 
                    o.id, 
                    o.shoe_brand, 
                    o.service_type, 
                    o.pickup_date, 
                    o.status, 
                    p.technician_notes, 
                    p.updated_at as last_update 
                FROM orders o 
                LEFT JOIN product_passports p ON o.id = p.order_id 
                WHERE o.user_id = ? 
                ORDER BY o.created_at DESC";

        $stmt = $conn->prepare($sql);
        $stmt->execute([$user_id]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'data' => $orders]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to fetch your vault: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'your session has expired. Please login again.']);
}
?>