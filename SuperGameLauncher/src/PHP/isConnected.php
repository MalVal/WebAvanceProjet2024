<?php

    header('Content-Type: application/json');

    session_start();

    // Check if a user is connected - if $_SESSION["pseudo"] exists
    if(isset($_SESSION["pseudo"]))
    {
        $response = [
            'connected' => true,
            'pseudo' => $_SESSION["pseudo"]
        ];
    }
    else
    {
        $response = [
            'connected' => false,
        ];
    }

    echo json_encode($response);

?>