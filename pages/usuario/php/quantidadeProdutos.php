<?php
function quantidadeProdutos(){	
	include_once("carregarLib.php");
	$produto = new produto();
	if(empty($produto->quantidadeProdutos(decodificar($_COOKIE['ident'])))) {echo 0;}
	else{echo $produto->quantidadeProdutos(decodificar($_COOKIE['ident']));}
}

