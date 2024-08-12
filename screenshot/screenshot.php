<?php
require_once '../mysql.php';

$stmt = $conn->prepare("INSERT INTO Screenshots (participant, screenshot, filename, device_model, user_agent) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sbsss", $uniqid, $screenshot, $filename, $device_model, $user_agent);

$uniqid = parsePost('uid');
$screenshot = file_get_contents($_FILES['screenshot']['tmp_name']);
$filename = $_FILES['screenshot']['name'];
$device_model = parsePost('device_model');
$user_agent = $_SERVER['HTTP_USER_AGENT'];

$stmt->send_long_data(1, $screenshot);

$stmt->execute();
$stmt->close();

$conn->close();
