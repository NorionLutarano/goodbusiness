<?php
	session_start();
	if(!isset($_GET['idF'])){header("Location: /"); return;}

	if(empty($_GET['idF'])){header("Location: /"); return;}
	include_once("carregarLib.php");
	$empresa=new empresa();
	echo json_encode($empresa->getInfoProdutosDesdeFornecedor([
			'idEmpresa'=>$_SESSION['empresa']['id_empresa'],
			'idFornecedor'=>$_GET['idF']]));