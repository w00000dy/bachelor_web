<?php
require_once 'config.php';

$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function parsePost($name)
{
    if (isset($_POST[$name]) && $_POST[$name] !== '') {
        return $_POST[$name];
    }
    return null;
}

function parseSelectPost($name)
{
    if (isset($_POST[$name])) {
        return 1;
    }
    return 0;
}