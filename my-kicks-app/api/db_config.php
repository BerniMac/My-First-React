<?php
//accessing the phpmyadmin solecare database
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = 'localhost';
$db_name = 'sole-care_database';
$username = 'root'; 
$password = 'root'; 

/*
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle Browser Pre-flight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
    */

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $e->getMessage()]);
    exit;
}
?>