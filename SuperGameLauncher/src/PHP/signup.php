<?php

    header('Content-Type: application/json');

    require("./dbFunction.php");

    $pseudo = htmlentities($_GET['pseudo']);
    $surname = htmlentities($_GET['surname']);
    $firstname = htmlentities($_GET['firstname']);
    $password = htmlentities($_GET['password']);

    // Check if the pseudo isn't already taken
    if(pseudo_exist($pseudo))
    {
        $response = [
            'error' => 'failed'
        ];
    }
    else
    {
        // Write the new user in the database
        insert_user($pseudo, $surname, $firstname, $password);
        session_start();
        $_SESSION["pseudo"] = $pseudo;
        $response = [
            'error' => 'success'
        ];
    }

    echo json_encode($response);

?>