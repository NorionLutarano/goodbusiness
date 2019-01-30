<?php
	include_once("carregarLib.php");
	if (!usuarioEstaLogado()){ exit(); }
	$empresa=new empresa();
	$paginacao=(isset($_GET['paginacao']))?$_GET['paginacao']:0;
	echo json_encode($empresa->nomesFornecedores(["id_empresa"=>decodificar($_COOKIE['ident']),
		"paginacao"=>$paginacao]));