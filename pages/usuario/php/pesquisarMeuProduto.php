<?php

include_once("carregarLib.php");
if($_POST['produto']!="*"){
	$_POST['produto']=validarString($_POST['produto']);
}



$_POST['id']=decodificar($_COOKIE['ident']);
if(!isset($_POST['inicio']))$_POST['inicio']=0;

$produto=new produto();
echo json_encode($produto->obterProduto($_POST));