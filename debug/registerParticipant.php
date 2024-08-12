<?php
require_once 'authenticate.php';
require_once '../mysql.php';

$stmt = $conn->prepare("INSERT INTO Participants (id) VALUES (?)");
$stmt->bind_param("s", $uniqid);

$uniqid = uniqid();
setcookie('participant', $uniqid, time() + 86400, '/', '', true, false);
$stmt->execute();

$stmt->close();
$conn->close();

header('Content-Type: text/plain');
echo $uniqid;