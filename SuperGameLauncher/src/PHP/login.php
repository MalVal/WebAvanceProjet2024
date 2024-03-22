<?php

    header('Content-Type: application/json');

    require("./dbFunction.php");

    $pseudo = htmlentities($_GET['pseudo']);
    $password = htmlentities($_GET['password']);

    if(pseudo_exist($pseudo) && check_psw($pseudo, $password))
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