<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

include($_SERVER['DOCUMENT_ROOT'] . "/Keystones/db_connection.php");

$db_connection = new DB_Connection();

// Retrieve AJAX payload
$char_name = $_POST["char_name"];
$dungeon = $_POST["dungeon"];
$level = $_POST["level"];
$key_max = $_POST["key_max"];

$sql = ($key_max == "key") ? "update Keystones set KeyDungeon = ?, KeyLevel = ? where CharName = ?" : "update Keystones set MaxDungeon = ?, MaxLevel = ? where CharName = ?";

// Update the table
$db_connection->run_ins_up_del(
    $sql,
    [$dungeon, $level, $char_name],
    "update_db.php"
);
?>
