<?php
	if( !isset($_GET['idF']) or !isset($_GET['idP']) or !isset($_COOKIE['ident'])){
		echo json_encode(['error'=>1]);
		exit();
	}
	require_once 'carregarLib.php';

	if(!usuarioEstaLogado()){
		exit();
	}

	$_GET['idF']=intval($_GET['idF']);
	$_GET['idP']=intval($_GET['idP']);
	$_GET['idE']=decodificar($_COOKIE['ident']);
	$empresa = new empresa();
	echo $empresa->excluirProdutoMeuFornecedor($_GET);