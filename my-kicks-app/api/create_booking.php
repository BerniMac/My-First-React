<?php
// 1. Allow any origin (or replace * with http://localhost:5173 for better security)
header("Access-Control-Allow-Origin: *");

// 2. Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

// 3. Allow specific headers (Content-Type is the big one for fetch)
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 4. Handle the "Preflight" request
// When you send a POST request, the browser first sends an "OPTIONS" request to check permissions.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// /api/create_booking.php
header('Content-Type: application/json');
require_once 'db_config.php'; // Make sure this points to your PDO database config

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'] ?? '';
    $brand = $_POST['brand'] ?? '';
    $service = $_POST['service'] ?? '';
    $date = $_POST['date'] ?? '';
    $location = $_POST['location'] ?? 'Downtown Hub'; // <-- ADDED THIS

    if (empty($user_id) || empty($brand) || empty($service) || empty($date)) {
        echo json_encode(['status' => 'error', 'message' => 'Incomplete booking data']);
        exit;
    }

    // Insert into DB including the new location column
    //$stmt = $conn->prepare("INSERT INTO orders (user_id, shoe_brand, service_type, pickup_date, location) VALUES (?, ?, ?, ?, ?)");
    $stmt = $conn->prepare("INSERT INTO orders (user_id, shoe_brand, service_type, pickup_date, location, pickup_time) VALUES (?, ?, ?, ?, ?, 'TBD')");

    //if ($stmt->execute([$user_id, $brand, $service, $date, $location]))
        if ($stmt->execute([$user_id, $brand, $service, $date, $location])) {
        $order_id = $conn->lastInsertId();
        
        // Create the digital passport entry
        $passport = $conn->prepare("INSERT INTO product_passports (order_id, technician_notes) VALUES (?, 'Awaiting technician inspection')");
        $passport->execute([$order_id]);

        echo json_encode(['status' => 'success', 'message' => 'Booking Confirmed!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
}
?>