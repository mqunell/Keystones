<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

include($_SERVER['DOCUMENT_ROOT'] . "/Keystones/db_connection.php");

$db_connection = new DB_Connection();

$rows = $db_connection->run_select(
    "select * from Keystones order by RealName asc;",
    null,
    "fetch_all",
    "get_table_rows"
);

$output = "";
foreach ($rows as $row) {
    $output .= $row["RealName"]   . ",";
    $output .= $row["CharName"]   . ",";
    $output .= $row["CharClass"]  . ",";
    $output .= $row["CharRoles"]  . ",";
    $output .= $row["CharILevel"] . ",";
    $output .= $row["KeyDungeon"] . ",";
    $output .= $row["KeyLevel"]   . ",";
    $output .= $row["MaxDungeon"] . ",";
    $output .= $row["MaxLevel"]   . ",";
    $output .= "~";
}

$output = substr($output, 0, (strlen($output) - 2));
echo($output);
?>
