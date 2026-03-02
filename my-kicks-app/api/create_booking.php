<?php

header('Content-Type: application/json');
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'] ?? '';
    $brand = $_POST['brand'] ?? '';
    $service = $_POST['service'] ?? '';
    $date = $_POST['date'] ?? '';
    $time = $_POST['time'] ?? '09:00';

    if (empty($user_id) || empty($brand) || empty($service) || empty($date)) {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete booking data']);
        exit;
    }

    try {
        
        $check = $conn->prepare("SELECT COUNT(*) FROM orders WHERE pickup_date = ? AND pickup_time = ?");
        $check->execute([$date, $time]);
        $count = $check->fetchColumn();

        if ($count >= 3) {
            echo json_encode([
                'status' => 'error', 
                'message' => 'High Demand Warning: This time slot is full. Please select another date.'
            ]);
            exit;
        }

    
        $stmt = $conn->prepare("INSERT INTO orders (user_id, shoe_brand, service_type, pickup_date, pickup_time) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$user_id, $brand, $service, $date, $time]);
        
        $order_id = $conn->lastInsertId();

        
        $passport = $conn->prepare("INSERT INTO product_passports (order_id, technician_notes) VALUES (?, 'Awaiting initial laboratory inspection')");//update it accordingly
        $passport->execute([$order_id]);

        echo json_encode(['status' => 'success', 'message' => 'Booking Confirmed! Your sneaker passport has been issued.']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Booking failed: ' . $e->getMessage()]);
    }
}
?>