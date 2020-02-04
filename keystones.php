<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

// Create the DB_Connection object
include($_SERVER['DOCUMENT_ROOT'] . "/Keystones/db_connection.php");
$db = new DB_Connection();

/*
 * Call the specified function
 * 
 * build_form() returns all Toons.ToonName
 * build_table() returns all Keystone data from a SQL join of Toons and Keystones
 * update_table() either inserts into or updates Keystones with the HTML form data
 */ 
if ($_POST["task"] == "build_form")   { build_form($db); }
if ($_POST["task"] == "build_table")  { build_table($db); }
if ($_POST["task"] == "update_table") { update_table($db); }

function build_form($db) {
    $rows = $db->run_select(
        "select ToonName from Toons order by ToonName asc;",
        null,
        "fetch_all",
        "build_form"
    );

    $output = "";
    foreach ($rows as $row) {
        $output .= $row["ToonName"];
        $output .= "~";
    }

    $output = substr($output, 0, (strlen($output) - 2));
    echo($output);
}

function build_table($db) {
    $rows = $db->run_select(
        "select Toons.RealName, Toons.ToonName, Toons.ToonClass, Toons.ToonRoles, Keystones.KeyDungeon, Keystones.KeyLevel, Keystones.MaxDungeon, Keystones.MaxLevel from Toons right join Keystones on Toons.ToonName = Keystones.ToonName;",
        null,
        "fetch_all",
        "build_table"
    );

    $output = "";
    foreach ($rows as $row) {
        $output .= $row["RealName"]   . ",";
        $output .= $row["ToonName"]   . ",";
        $output .= $row["ToonClass"]  . ",";
        $output .= $row["ToonRoles"]  . ",";
        $output .= $row["KeyDungeon"] . ",";
        $output .= $row["KeyLevel"]   . ",";
        $output .= $row["MaxDungeon"] . ",";
        $output .= $row["MaxLevel"]   . ",";
        $output .= "~";
    }

    $output = substr($output, 0, (strlen($output) - 2));
    echo($output);
}

function update_table($db) {
    $toon_name = $_POST["toon_name"];
    $dungeon = $_POST["dungeon"];
    $level = $_POST["level"];
    $key_max = $_POST["key_max"];

    // Check if the ToonName already exists in the database
    $query_sql = "select count(*) from Keystones where ToonName = ?";
    $query_result = $db->run_select(
        $query_sql,
        [$toon_name],
        "fetch_column",
        "update_table"
    );

    $sql = "";
    $params = [];

    // Set the SQL and parameters for inserting/updating
    if ($query_result == 0) {
        $sql = ($key_max == "key") ? "insert into Keystones values(?, ?, ?, null, null)" : "insert into Keystones values(?, null, null, ?, ?)";
        $params = [$toon_name, $dungeon, $level];
    }
    else {
        $sql = ($key_max == "key") ? "update Keystones set KeyDungeon = ?, KeyLevel = ? where ToonName = ?" : "update Keystones set MaxDungeon = ?, MaxLevel = ? where ToonName = ?";
        $params = [$dungeon, $level, $toon_name];
    }

    // Insert the record if it doesn't already exist, otherwise update it
    $db->run_ins_up_del(
        $sql,
        $params,
        "update_table"
    );
}
?>
