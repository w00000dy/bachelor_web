<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header('Content-Type: text/plain');
require_once '../config.php';


// Create connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create table Participants
$sql = "CREATE TABLE Participants (
id CHAR(13) NOT NULL PRIMARY KEY,
reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";

if ($conn->query($sql) === TRUE) {
    echo "Table Participants created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

// sql to create table Survey
$sql = "CREATE TABLE Survey (
participant CHAR(13) NOT NULL PRIMARY KEY,
age TINYINT UNSIGNED,
gender BOOLEAN,
num_electronic_devices TINYINT UNSIGNED,
regular_tablet_laptop_use BOOLEAN,
technical_experience TINYINT UNSIGNED,
encountered_problems BOOLEAN,
bt_pairing_problems BOOLEAN,
problems_explaination TEXT,
situation_already_encountered TINYINT UNSIGNED,
know_pairing_code BOOLEAN,
improvements TEXT,
additional_thoughts TEXT,
FOREIGN KEY (participant) REFERENCES Participants(id))";

if ($conn->query($sql) === TRUE) {
    echo "Table Survey created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}


// sql to create table electronic_devices_main_application
$sql = "CREATE TABLE electronic_devices_main_application (
    participant CHAR(13) NOT NULL PRIMARY KEY,
    social_media BOOLEAN NOT NULL,
    communication BOOLEAN NOT NULL,
    entertainment BOOLEAN NOT NULL,
    work_and_productivity BOOLEAN NOT NULL,
    information_search BOOLEAN NOT NULL,
    organization_and_planning BOOLEAN NOT NULL,
    navigation_and_maps BOOLEAN NOT NULL,
    health_and_fitness BOOLEAN NOT NULL,
    smart_home BOOLEAN NOT NULL,
    FOREIGN KEY (participant) REFERENCES Survey(participant))";

if ($conn->query($sql) === TRUE) {
    echo "Table electronic_devices_main_application created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

// sql to create table bt_devices
$sql = "CREATE TABLE bt_devices (
        participant CHAR(13) NOT NULL PRIMARY KEY,
        smartwatches_fitness_trackers BOOLEAN NOT NULL,
        headphones BOOLEAN NOT NULL,
        keyboard_mouse BOOLEAN NOT NULL,
        others BOOLEAN NOT NULL,
        FOREIGN KEY (participant) REFERENCES Survey(participant))";

if ($conn->query($sql) === TRUE) {
    echo "Table bt_devices created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

// sql to create table action_log
$sql = "CREATE TABLE action_log (
    participant CHAR(13) NOT NULL,
    action TINYINT UNSIGNED NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant) REFERENCES Participants(id))";

if ($conn->query($sql) === TRUE) {
    echo "Table action_log created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

$conn->close();
