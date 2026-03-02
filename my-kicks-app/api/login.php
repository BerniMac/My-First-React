<?php

header('Content-Type: application/json');
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Name and Phone number are required']);
        exit;
    }

    try {
        
        $stmt = $conn->prepare("SELECT id, name, phone_number FROM users WHERE phone_number = ?");
        $stmt->execute([$phone]);
        $user = $stmt->fetch();// or fetchAll(PDO::FETCH_ASSOC);

        if ($user) {
            
            echo json_encode([
                'status' => 'success', 
                'user' => $user, 
                'message' => 'Welcome back to your Vault!'
            ]);
        } else {
        
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