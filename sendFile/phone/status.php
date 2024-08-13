<?php
require_once '../../mysql.php';

$sql = "SELECT * FROM `action_log` ORDER BY `action_log`.`date` DESC ";
$result = $conn->query($sql);

header('Content-Type: text/plain');

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row['action'];
    return;
}
