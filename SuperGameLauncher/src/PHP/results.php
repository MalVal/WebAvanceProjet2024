<?php

    header('Content-Type: application/json');

    require("./dbFunction.php");

    $score = htmlentities($_GET['score']);
    $game = htmlentities($_GET["game"]);

    session_start();

    // Write in the database the score send by the user
    if(isset($_SESSION["pseudo"]))
    {
        insert_score($score, $game, $_SESSION["pseudo"]);
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