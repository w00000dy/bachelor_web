<?php
require_once 'password.php';

$password = $_POST['password'];

if (!password_verify($password, $expectedPassword)) {
    http_response_code(401);
    die('Unauthorized');
}