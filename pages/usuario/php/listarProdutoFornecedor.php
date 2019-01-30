<?php
    if(!isset($_GET['idF'])){header("Location: /"); return;}
    if(empty($_GET['idF'])){header("Location: /"); return;}

    include_once("carregarLib.php");
    if(!usuarioEstaLogado()) { return; }
	$empresa=new empresa();
    echo json_encode($empresa->getInfoProdutosDesdeFornecedor([
			'idEmpresa'=>decodificar($_COOKIE['ident']), 
			'idFornecedor'=>$_GET['idF']]));