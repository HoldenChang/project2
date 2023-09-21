<?php 
$serverIP = "69.172.204.200";
$serverID = "ncsm1752_ncsm1752";
$serverPWD = "ncsm1990cdh";
$dataBaseN = "ncsm1752_tetris";

$connect = mysqli_connect($serverIP, $serverID, $serverPWD, $dataBaseN);
$sql = "SELECT playerName, playerScore FROM userDB ORDER BY playerScore DESC";
$result = mysqli_query($connect, $sql);

$scores = array();

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $scores[] = array(
            'playerName' => $row['playerName'],
            'playerScore' => intval($row['playerScore'])
        );
    }
}

echo json_encode($scores, JSON_NUMERIC_CHECK);

mysqli_close($connect);

?>