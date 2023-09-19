<?php 

$name = $_POST['name'];
$score = $_POST['score'];

$serverIP = "";
$serverID = "";
$serverPWD = "";
$dataBaseN = "ncsm1752_tetris";

$connect = mysqli_connect($serverIP, $serverID, $serverIP, $dataBaseN);
$sql = "INSERT INTO user (name, score) VALUES (?, ?)";
$stmt = mysqli_stmt_init($connect);

if (!mysqli_stmt_prepare($stmt, $sql)) {
    echo "script>alert('Server Connection Error')</script>";
} else {
    mysqli_stmt_bind_param($stmt, "si", $name, $score);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}

?>