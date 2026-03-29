<?php
// 1. Allow any origin
header("Access-Control-Allow-Origin: *");

// 2. Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

// 3. Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 4. Handle the "Preflight" request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // --- THE FIX FOR REACT FETCH (JSON) ---
    // Read the raw JSON data sent by React
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Grab variables from the decoded JSON (with a fallback to $_POST just in case)
    $name = $data['name'] ?? $_POST['name'] ?? '';
    $phone = $data['phone'] ?? $_POST['phone'] ?? '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Name and Phone number are required']);
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT id, name, phone_number FROM users WHERE phone_number = ?");
        $stmt->execute([$phone]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Added FETCH_ASSOC for cleaner JSON output

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
    // --- THE FIX FOR THE SYNTAX ERROR ---
    } catch (PDOException $e) {
        // Catch any database errors and return them as JSON instead of breaking the app
        http_response_code(500);
        echo json_encode([
            'status' => 'error', 
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}
?>