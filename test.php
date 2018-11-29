<?php

	//if(!isset($_GET))return;
	include_once("autoload.php");
	$pesquisa = new pesquisa();
	//$_GET['quantidade']=(isset($_GET['quantidade']))?$_GET['quantidade']:0;
	echo json_encode($pesquisa->pesquisaProdutoFornecedor(arrayValidarString(["nome"=>"pedroc","estado"=>"rio de janeiro"] )));
