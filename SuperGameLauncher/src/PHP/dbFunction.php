<?php

    function connect()
    {
        $connection = mysqli_connect("localhost", "root", "", "SuperGameDataBase");
        return $connection;
    }

    function pseudo_exist($pseudo)
    {
        $exist = 0;
        $db = connect();
        $donnee = mysqli_query($db, "SELECT Pseudo FROM USERS WHERE Pseudo = '".$pseudo."'");
        $result = mysqli_fetch_all($donnee, MYSQLI_ASSOC);
        if(!empty($result))
        {
            $exist = 1;
        }
        mysqli_free_result($donnee);
        mysqli_close($db);
        return $exist;
    }

    function insert_user($pseudo, $surname, $firstname, $password)
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $db = connect();
        $sql = "INSERT INTO USERS (Pseudo, SurName, FirstName, Password) VALUES (?,?,?,?)";
        $stmt= $db->prepare($sql);
        $stmt->bind_param("ssss", $pseudo, $surname, $firstname, $passwordHash);
        $stmt->execute();
        mysqli_close($db);
    }

    function check_psw($pseudo, $psw)
    {
        $valid = 0;
        $db = connect();
        $sql = "SELECT * FROM USERS WHERE pseudo = '$pseudo'";
        $data = mysqli_query($db, $sql);
        while($row = mysqli_fetch_array($data, MYSQLI_BOTH))
        {
            if(password_verify($psw, $row["Password"]))
            {
                $valid = 1;
            }
        }
        mysqli_free_result($data);
        mysqli_close($db);
        return $valid;
    }

?>