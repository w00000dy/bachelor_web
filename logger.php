<?php
require_once 'mysql.php';

$stmt = $conn->prepare("INSERT INTO action_log (participant, action) VALUES (?, ?)");
$stmt->bind_param("si", $uniqid, $action);

$uniqid = $_COOKIE['participant'];
$action = $_POST['action'];

$stmt->execute();
$stmt->close();

$conn->close();
