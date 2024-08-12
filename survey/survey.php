<?php
 error_reporting(E_ALL);
 ini_set("display_errors", 1);
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


require_once '../config.php';

$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO Survey (participant, age, gender, num_electronic_devices, regular_tablet_laptop_use, technical_experience, encountered_problems, bt_pairing_problems, problems_explaination, situation_already_encountered, know_pairing_code, improvements, additional_thoughts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("siiiiiiisiiss", $uniqid, $age, $gender, $num_electronic_devices, $regular_tablet_laptop_use, $technical_experience, $encountered_problems, $bt_pairing_problems, $problems_explaination, $situation_already_encountered, $know_pairing_code, $improvements, $additional_thoughts);

$uniqid = $_COOKIE['participant'];
$age = parsePost('age');
$gender = parsePost('gender');
$num_electronic_devices = parsePost('num_electronic_devices');
$regular_tablet_laptop_use = parsePost('regular_tablet_laptop_use');
$technical_experience = parsePost('technical_experience');
$encountered_problems = parsePost('encountered_problems');
$bt_pairing_problems = parsePost('bt_pairing_problems');
$problems_explaination = parsePost('problems_explaination');
$situation_already_encountered = parsePost('situation_already_encountered');
$know_pairing_code = parsePost('know_pairing_code');
$improvements = parsePost('improvements');
$additional_thoughts = parsePost('additional_thoughts');

$stmt->execute();
$stmt->close();


$stmt = $conn->prepare("INSERT INTO electronic_devices_main_application (participant, social_media, communication, entertainment, work_and_productivity, information_search, organization_and_planning, navigation_and_maps, health_and_fitness, smart_home) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("siiiiiiiii", $uniqid, $social_media, $communication, $entertainment, $work_and_productivity, $information_search, $organization_and_planning, $navigation_and_maps, $health_and_fitness, $smart_home);

$prefix = 'electronic_devices_main_application_';
$social_media = parseSelectPost($prefix . 'social_media');
$communication = parseSelectPost($prefix . 'communication');
$entertainment = parseSelectPost($prefix . 'entertainment');
$work_and_productivity = parseSelectPost($prefix . 'work_and_productivity');
$information_search = parseSelectPost($prefix . 'information_search');
$organization_and_planning = parseSelectPost($prefix . 'organization_and_planning');
$navigation_and_maps = parseSelectPost($prefix . 'navigation_and_maps');
$health_and_fitness = parseSelectPost($prefix . 'health_and_fitness');
$smart_home = parseSelectPost($prefix . 'smart_home');

$stmt->execute();
$stmt->close();


$stmt = $conn->prepare("INSERT INTO bt_devices (participant, smartwatches_fitness_trackers, headphones, keyboard_mouse, others) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("siiii", $uniqid, $smartwatches_fitness_trackers, $headphones, $keyboard_mouse, $others);

$prefix = 'bt_devices_';
$smartwatches_fitness_trackers = parseSelectPost($prefix . 'smartwatches_fitness_trackers');
$headphones = parseSelectPost($prefix . 'headphones');
$keyboard_mouse = parseSelectPost($prefix . 'keyboard_mouse');
$others = parseSelectPost($prefix . 'others');

$stmt->execute();
$stmt->close();

$conn->close();

echo 'Thank you for participating in our survey!';