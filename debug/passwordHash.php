<?php

header('Content-Type: text/plain');

echo password_hash($_POST['password'], PASSWORD_DEFAULT);