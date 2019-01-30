<?php
	require_once("carregarLib.php");
	if(!usuarioEstaLogado()){exit();}
	$_GET=arrayValidarString(arrayNotEmpty($_GET));
	$_GET['ident']=decodificar($_COOKIE['ident']);
	$empresa = new empresa();
	echo json_encode($empresa->produtosMeuFornecedor($_GET));