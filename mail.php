<?php
    try
    {
        $file = fopen("Messages.txt", "a") or die("Unable to open file!");
        $subject = $_REQUEST["subject"];
        fwrite($file, 'Subject: ' . $subject . '\n');
        $content = $_REQUEST["content"];
        fwrite($file, 'Content: ' .$content . '\n\n');
        fclose($file);
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

