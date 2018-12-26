<?php
	session_start();
	include_once("carregarLib.php");
	$empresa=new empresa();
	echo $empresa->quantidadeMeusFornecedores($_SESSION['empresa']['id_empresa']);