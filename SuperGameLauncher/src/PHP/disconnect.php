<?php

    header('Content-Type: application/json');

    // Disconnect the user and destroy the session
    session_start();

    session_unset();

    session_destroy();

    $response = [
        'disconnect' => true,
    ];

    echo json_encode($response);

?>