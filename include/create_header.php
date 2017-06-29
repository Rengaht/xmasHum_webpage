<?php

include 'uuid.generator.php';
// header('Content-disposition: attachment; filename=tone.h');
// header('Content-type: text/plain');
// echo $_GET['content'];


$guid=gen_uuid();
$folder='../tmp/'.$guid;
mkdir($folder);

// create custom_song.h
$song_file=fopen($folder.'/custom_song.h','w');
fwrite($song_file,$_GET['content']);
fclose($song_file);

// create zip
$arduino_name='XmasPaperTree';
$zip_file=$folder.'/'.$arduino_name.'.zip';
$zip=new ZipArchive();
$zip->open($zip_file,ZipArchive::CREATE);


$zip->addFile($folder.'/custom_song.h',$arduino_name.'/custom_song.h');
$zip->addFile('../zip/Light.ino',$arduino_name.'/Light.ino');
$zip->addFile('../zip/Tone.ino',$arduino_name.'/Tone.ino');
$zip->addFile('../zip/XmasPaperTree_v2.ino',$arduino_name.'/XmasPaperTree.ino');

$zip->close();

// download file
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=\"" . basename($zip_file) . "\""); 
readfile($zip_file);

// remove file
array_map('unlink', glob($folder."/*.*"));
rmdir($folder);

?>