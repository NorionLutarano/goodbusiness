<?php
	if(!isset($_GET))return;
	if(!isset($_GET['nome']) or empty($_GET['nome']))return;
	include_once("carregarLib.php");
	if(!usuarioEstaLogado()){return;}
	$pesquisa = new pesquisa();
	$_GET['id']=decodificar($_COOKIE['ident']);
	$_GET['quantidade']=(isset($_GET['quantidade']))?$_GET['quantidade']:0;
	echo json_encode($pesquisa->pesquisaProdutoFornecedor(arrayValidarString($_GET)));


