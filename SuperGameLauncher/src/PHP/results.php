<?php

    header('Content-Type: application/json');

    require("./dbFunction.php");

    $score = htmlentities($_GET['score']);
    $game = htmlentities($_GET["game"]);

    session_start();

    if(isset($_SESSION["pseudo"]))
    {
        insert_score($score, time(), $game, $_SESSION["pseudo"]);
        $response = [
            'error' => 'success',
        ];
    }
    else
    {
        $response = [
            'error' => 'failed',
        ];
    }

    echo json_encode($response);

?>