<?php
// login.php - Handles User Auth and Registration
header('Content-Type: application/json');
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from URLSearchParams (x-www-form-urlencoded)
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Name and Phone are required']);
        exit;
    }

    try {
        // 1. Check if user exists
        $stmt = $conn->prepare("SELECT id, name, phone_number FROM users WHERE phone_number = ?");
        $stmt->execute([$phone]);
        $user = $stmt->fetch();

        if ($user) {
            // User exists - Return existing user
            echo json_encode([
                'status' => 'success', 
                'user' => $user, 
                'message' => 'Welcome back to the Vault!'
            ]);
        } else {
            // 2. New User - Register them
            $insert = $conn->prepare("INSERT INTO users (name, phone_number) VALUES (?, ?)");
            $insert->execute([$name, $phone]);
            
            $newUserId = $conn->lastInsertId();
            echo json_encode([
                'status' => 'success', 
                'user' => [
                    'id' => $newUserId, 
                    'name' => $name, 
                    'phone_number' => $phone
                ],
                'message' => 'Account created successfully!'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>