<?php
require_once 'authenticate.php';
require_once '../mysql.php';

$stmt = $conn->prepare("INSERT INTO Participants (id, task) VALUES (?, ?)");
$stmt->bind_param("si", $uniqid, $task);

$uniqid = uniqid();
setcookie('participant', $uniqid, time() + 86400, '/', '', true, false);
$task = parsePost('task');
if ($task != 0 && $task != 1) {
    $task = rand(0, 1);
}
setcookie('task', $task, time() + 86400, '/', '', true, false);
$stmt->execute();

$stmt->close();
$conn->close();

header('Content-Type: text/plain');
echo $uniqid;