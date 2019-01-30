<?php
if(!isset($_GET['idP']) and !isset($_GET['idF'])){
	header("Location: /");
	exit();
}
include_once("carregarLib.php");

if(!usuarioEstaLogado()){exit();}

$pesquisa=new pesquisa();


echo json_encode($pesquisa->obterDadosProdutoFornecedor(['id_empresa'=>decodificar($_COOKIE['ident']),
	'idP'=>intval($_GET['idP'])]));