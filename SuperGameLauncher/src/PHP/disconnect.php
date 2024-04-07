<?php

    header('Content-Type: application/json');

    session_start();

    session_unset();

    session_destroy();

    $response = [
        'disconnect' => true,
    ];

    echo json_encode($response);

?>