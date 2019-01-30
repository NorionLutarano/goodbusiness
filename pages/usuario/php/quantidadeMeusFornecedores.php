<?php
	include_once("carregarLib.php");
	if(!usuarioEstaLogado()){exit();}
	$empresa=new empresa();
	echo $empresa->quantidadeMeusFornecedores(decodificar($_COOKIE['ident']));