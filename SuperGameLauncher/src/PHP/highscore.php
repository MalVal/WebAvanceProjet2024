<?php
header('Content-Type: application/json');
require("./dbFunction.php");

$requestResults = getHighScore("BusterGhost");

$response = [];
for ($i = 0; $i < 5; $i++) {
    $response[$i]['pseudo'] = isset($requestResults[$i]['pseudo']) ? $requestResults[$i]['pseudo'] : null;
    $response[$i]['Points'] = isset($requestResults[$i]['Points']) ? $requestResults[$i]['Points'] : null;
}

echo json_encode($response);
?>
