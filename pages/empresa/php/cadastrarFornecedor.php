<?php
	session_start();
	if(!isset($_SESSION['empresa']['id_empresa'])){ header("Location: /"); return;} 
	if(!isset($_GET['addF']) AND !isset($_GET['addP'])){
		header("Location: /"); return;
	}
	if(empty($_GET['addF']) and empty($_GET['addP'])){
		echo 0;
		return;
	}

	include_once("carregarLib.php");
	$empresa=new empresa();
	$dados=['id_empresa'=>$_SESSION['empresa']['id_empresa'],
			'addF'=>intval($_GET['addF']),
			'addP'=>intval($_GET['addP'])];


	echo $empresa->addProdutoFornecedor($dados);
	exit();