<?php
    try
    {
        $subject = $_REQUEST["subject"];
        $content = $_REQUEST["content"];
        $to = "shrikant.kakaraparthi@mavs.uta.edu";
        $headers = "From: admin@shrikantkakaraparthi.tech";
        mail($to,$subject,$content,$headers);
        $result = true;
        header('Content-Type: application/json');
        echo json_encode($result);
    }
    catch (Exception $e)
    {
        $result = false;
        header('Content-Type: application/json');
        echo json_encode($result);
    }
?>

