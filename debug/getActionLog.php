<?php
require_once 'authenticate.php';
require_once '../mysql.php';

$conn->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);

$sql = "SELECT * FROM action_log ORDER BY date DESC";
$result = $conn->query($sql);

header('Content-Type: application/json');
echo json_encode($result->fetch_all(MYSQLI_ASSOC));