<?php
header('Content-Type: application/json');
require("./dbFunction.php");

$requestResults = getHighScore($_GET["game"]);

$response = [];
for ($i = 0; $i < 5; $i++) {
    $response[$i + 1]['pseudo'] = isset($requestResults[$i]['pseudo']) ? $requestResults[$i]['pseudo'] : null;
    $response[$i + 1]['Points'] = isset($requestResults[$i]['Points']) ? $requestResults[$i]['Points'] : null;
}

echo json_encode($response);
?>
