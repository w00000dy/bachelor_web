<?php
require_once 'authenticate.php';
require_once '../mysql.php';

$stmt = $conn->prepare("DELETE FROM Participants WHERE id = ?");
$stmt->bind_param("s", $id);

$id = parsePost('id');
$stmt->execute();

$stmt->close();
$conn->close();
