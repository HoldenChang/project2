<?php 

$name = $_POST['username'];
$score = $_POST['playerscores'];

$serverIP = "69.172.204.200";
$serverID = "ncsm1752_ncsm1752";
$serverPWD = "ncsm1990cdh";
$dataBaseN = "ncsm1752_tetris";

$connect = mysqli_connect($serverIP, $serverID, $serverPWD, $dataBaseN);
$sql = "INSERT INTO userDB (playerName, playerScore) VALUES ('$name', $score)";
mysqli_query($connect, $sql);

mysqli_close($connect);

?>