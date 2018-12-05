<?php
	session_start();
	if(!isset($_SESSION['empresa']['id_empresa'])){exit();}
	include_once("carregarLib.php");
	$produto = new produto();
	if(empty($produto->quantidadeProdutos($_SESSION['empresa']['id_empresa']))) {echo 0;}
	else{echo $produto->quantidadeProdutos($_SESSION['empresa']['id_empresa']);}

