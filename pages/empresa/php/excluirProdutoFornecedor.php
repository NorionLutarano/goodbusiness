<?php

	session_start();
	if(!isset($_POST['idP'])){
		header("Location: \ ");
		return;
	}
	require_once("carregarLib.php");

	$empresa= new empresa();
	$empresa->removerProdutoFornecedor([
		"idEmpresa"=>$_SESSION['empresa']['id_empresa'],
		"idProduto"=>intval($_POST['idP'])
		]);
	exit();