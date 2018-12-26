<?php
	session_start();
	include_once("carregarLib.php");
	$empresa=new empresa();
	$paginacao=(isset($_GET['paginacao']))?$_GET['paginacao']:0;
	
	echo json_encode($empresa->nomesFornecedores(["id_empresa"=>$_SESSION['empresa']['id_empresa'],"paginacao"=>$paginacao]));