<?php
require_once '../mysql.php';

header('Content-Type: text/plain');

// sql to create table Participants
$sql = "CREATE TABLE Participants (
id CHAR(13) NOT NULL PRIMARY KEY,
task TINYINT(1) NOT NULL DEFAULT 0,
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
FOREIGN KEY (participant) REFERENCES Participants(id) ON DELETE CASCADE)";

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
    FOREIGN KEY (participant) REFERENCES Survey(participant) ON DELETE CASCADE)";

if ($conn->query($sql) === TRUE) {
    echo "Table electronic_devices_main_application created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

// sql to create table bt_devices
$sql = "CREATE TABLE bt_devices (
        participant CHAR(13) NOT NULL PRIMARY KEY,
        car BOOLEAN NOT NULL,
        smartwatches_fitness_trackers BOOLEAN NOT NULL,
        headphones BOOLEAN NOT NULL,
        keyboard_mouse BOOLEAN NOT NULL,
        others BOOLEAN NOT NULL,
        FOREIGN KEY (participant) REFERENCES Survey(participant) ON DELETE CASCADE)";

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
    FOREIGN KEY (participant) REFERENCES Participants(id) ON DELETE CASCADE)";

if ($conn->query($sql) === TRUE) {
    echo "Table action_log created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

// sql to create table Screenshots
$sql = "CREATE TABLE Screenshots (
    participant CHAR(13) NOT NULL PRIMARY KEY,
    screenshot MEDIUMBLOB NOT NULL,
    filename TINYTEXT NOT NULL,
    device_model TINYTEXT NOT NULL,
    user_agent TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant) REFERENCES Participants(id) ON DELETE CASCADE)";

if ($conn->query($sql) === TRUE) {
    echo "Table Screenshots created successfully\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

$conn->close();
