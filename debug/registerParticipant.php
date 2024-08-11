<?php
require_once 'authenticate.php';
require_once '../config.php';

$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO Participants (id) VALUES (?)");
$stmt->bind_param("s", $uniqid);

$uniqid = uniqid();
setcookie('participant', $uniqid, time() + 86400, '/', '', true, false);
$stmt->execute();

$stmt->close();
$conn->close();

header('Content-Type: text/plain');
echo $uniqid;