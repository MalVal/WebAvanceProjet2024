<?php

    header('Content-Type: application/json');

    require("./dbFunction.php");

    $pseudo = htmlentities($_GET['pseudo']);
    $password = htmlentities($_GET['password']);

    if(pseudo_exist($pseudo) && check_psw($pseudo, $password))
    {
        session_start();
        $_SESSION["pseudo"] = $pseudo;
        $response = [
            'error' => 'success',
        ];
    }
    else
    {
        if(!pseudo_exist($pseudo))
        {
            $response = [
                'error' => 'The pseudo doesn\'t exists !',
            ];
        }
        else
        {
            $response = [
                'error' => 'Bad password !',
            ];
        }
    }

    echo json_encode($response);

?>