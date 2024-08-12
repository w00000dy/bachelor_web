<?php
require_once '../../mysql.php';

$sql = "SELECT * FROM `action_log` ORDER BY `action_log`.`date` DESC ";
$result = $conn->query($sql);

// check if in first row action = 3
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['action'] == 3) {
        echo "Success";
        return;
    }
}

echo "Not connected";
