<?php
require_once 'authenticate.php';
require_once '../mysql.php';

if (!isset($_POST['id']) || $_POST['id'] === '') {
    http_response_code(400);
    die('Bad Request');
}

$stmt = $conn->prepare("SELECT task FROM Participants WHERE id = ?");
$stmt->bind_param("s", $uid);

$uid = $_POST['id'];

$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows === 0) {
    http_response_code(400);
    die('Bad Request');
}
$task = $result->fetch_assoc()['task'];

$stmt->close();
$conn->close();

setcookie('participant', $uid, time() + 86400, '/', '', true, false);
setcookie('task', $task, time() + 86400, '/', '', true, false);
