<?php
session_start();
if(!isset($_GET['idP']) and !isset($_GET['idF'])){
	header("Location: /");
	return;
}
include_once("carregarLib.php");

$pesquisa=new pesquisa();


echo json_encode($pesquisa->obterDadosProdutoFornecedor(['id_empresa'=>$_SESSION['empresa']['id_empresa'],'idP'=>intval($_GET['idP'])]));
exit();