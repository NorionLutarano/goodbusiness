<?php
	if(!isset($_GET['addF']) AND !isset($_GET['addP'])){
		header("Location: /"); return;
	}
	if(empty($_GET['addF']) and empty($_GET['addP'])){
		echo 0;
		return;
	}

	include_once("carregarLib.php");
	if(!usuarioEstaLogado()){ header("Location: /"); exit();} 
	
	$empresa=new empresa();
	$dados=['id_empresa'=>decodificar($_COOKIE['ident']),
			'addF'=>intval($_GET['addF']),
			'addP'=>intval($_GET['addP'])];


	echo $empresa->addProdutoFornecedor($dados);
	exit();