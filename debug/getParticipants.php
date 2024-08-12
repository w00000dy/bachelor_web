<?php
require_once 'authenticate.php';
require_once '../mysql.php';

$sql = "SELECT * FROM Participants ORDER BY reg_date DESC";
$result = $conn->query($sql);

header('Content-Type: application/json');
echo json_encode($result->fetch_all(MYSQLI_ASSOC));