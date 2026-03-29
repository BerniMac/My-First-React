<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// Allow specific methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Allow specific headers (important if you send JSON or custom headers)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// If this is an OPTIONS request (preflight), stop here
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$phone = $_POST['phone'] ?? '';
if (empty($phone)) {
    echo json_encode(['status' => 'error', 'message' => 'Phone required']);
    exit;
}

// Your credentials from the snippet
$sid    = "AC33bc24b27f094de2202fbae277001734";
$token  = "12e098b92647aa6d5082c222bad68295";
$v_sid  = "VAf416f0acc06dc8e92b95dda88ead64a2";

$url = "https://verify.twilio.com/v2/Services/$v_sid/Verifications";
$data = ['To' => $phone, 'Channel' => 'sms'];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_USERPWD, "$sid:$token");
// Use this only for local testing if you get SSL errors:
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code == 201 || $http_code == 200) {
    echo json_encode(['status' => 'success', 'message' => 'Code sent!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Twilio Error: ' . $response]);
}
?>