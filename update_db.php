<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

include($_SERVER['DOCUMENT_ROOT'] . "/Keystones/db_connection.php");

// Retrieve AJAX payload
$char_name = $_POST["char_name"];
$max_dungeon = $_POST["max_dungeon"];
$max_level = $_POST["max_level"];

$db_connection = new DB_Connection();

// Update the table
$db_connection->run_ins_up_del(
    "update Keystones set MaxDungeon = ?, MaxLevel = ? where CharName = ?",
    [$max_dungeon, $max_level, $char_name],
    "update_db.php"
);
?>
