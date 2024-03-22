<?php

    header('Content-Type: application/json');

    require("./dbFunction.php");

    $pseudo = $_GET['pseudo'];
    $password = $_GET['password'];

    if(check_psw($pseudo, $password))
    {
        $response = [
            'error' => 'success'
        ];
    }
    else
    {
        $response = [
            'error' => 'failed'
        ];
    }

    echo json_encode($response);

?>