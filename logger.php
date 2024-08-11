<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once 'config.php';

$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO action_log (participant, action) VALUES (?, ?)");
$stmt->bind_param("si", $uniqid, $action);

$uniqid = $_COOKIE['participant'];
$action = $_POST['action'];

$stmt->execute();
$stmt->close();

$conn->close();
