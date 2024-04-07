<?php

    header('Content-Type: application/json');

    session_start();

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