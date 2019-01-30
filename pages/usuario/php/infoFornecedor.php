<?php
	session_start();
	if(!isset($_GET['idF']) or empty($_GET['idF']) or !isset($_SESSION['empresa']['id_empresa'])){
		header("Location: \ ");
		return;
	}
	require_once("carregarLib.php");
	$empresa=new empresa();
echo json_encode($empresa->getInfoDesdeFornecedor(intval($_GET['idF'])));