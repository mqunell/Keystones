<?php
ini_set('display_errors',1);
error_reporting(E_ALL);


/**
 * DB_Connection class
 * 
 * Establishes the database connection and handles all SQL commands
 */
class DB_Connection {

    // Database credentials
    private $dsn = "mysql:host=localhost;dbname=Keystones;charset=utf8mb4";
    private $username = "matt";
    private $password = "cwJRu7Fk4iGdy9YT";
    private $options = [
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    // Database connection
    private $db_connection = null;

    /**
     * Constructor: Initializes the object and establishes the database connection
     */
    function __construct() {
        if (defined('PDO::ATTR_DRIVER_NAME')) {
            try {
                $this->db_connection = new PDO($this->dsn, $this->username, $this->password, $this->options);
                //echo("Database connected<br/>");
            }
            catch (PDOException $e) {
                error_log($e->getMessage());
                exit("Database PDO error");
            }
        }
        else {
            echo("PDO is unavailable<br/>");
        }
    }

    /**
     * Helper function for running Select statements
     * 
     * @param sql (string) the SQL statement with '?' in place of parameters
     * @param params (string array) the parameters to insert into the statement
     * @param task (string) the task to perform ("fetch_column", "fetch_all")
     * @param calling_function (string) the name of the calling function for errors/debugging
     * @return (int/string/array) Output based on the task
     */
    function run_select($sql, $params, $task, $calling_function) {
        $stmt = $this->db_connection->prepare($sql);
        $output = null;

        try {
            if ($params != null) {
                $stmt->execute($params);
            }
            else {
                $stmt->execute();
            }

            if ($task == "fetch_column") {
                $output = $stmt->fetchColumn();
            }
            else if ($task == "fetch_all") {
                $output = $stmt->fetchAll();
            }
        }
        catch(PDOException $e) {
            echo("PDO error from $calling_function:<br/>" . $e->getMessage());
        }

        $stmt = null;
        return $output;
    }

    /**
     * Helper function for running Insert/Update/Delete statements
     * 
     * @param sql (string) the SQL statement with '?' in place of parameters
     * @param params (string array) the parameters to insert into the statement
     * @param calling_function (string) the name of the calling function
     * @return (int) the number of affected rows; (-1 = error)
     */
    function run_ins_up_del($sql, $params, $calling_function) {
        $stmt = $this->db_connection->prepare($sql);
        $affectedRows = -1;

        try {
            if ($params != null) {
                $stmt->execute($params);
            }
            else {
                $stmt->execute();
            }

            $affectedRows = $stmt->rowCount();
        }
        catch(PDOException $e) {
            echo("PDO error from $calling_function:<br/>" . $e->getMessage());
        }

        $stmt = null;
        return $affectedRows;
    }
}
?>
