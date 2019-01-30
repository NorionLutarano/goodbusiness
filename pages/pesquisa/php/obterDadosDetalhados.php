<?php

 if(!isset($_GET['cat']) or !isset($_GET['data'])){
 	exit();
 }

 if($_GET['cat']!='pro' and $_GET['cat']!='emp'){
 	exit();
 }

 require_once('carregarLib.php');

 $_GET['data']=intval($_GET['data']);
 $pesquisa=new pesquisa();
switch($_GET['cat']) {
	case 'pro':
		$resultado=$pesquisa->dadosCompletoProdutoEmpresa($_GET);
		if(empty($resultado) or $resultado===false){
			echo ['error'=>true];
			exit();
		}
	break;

	case 'emp':
		$resultado=$pesquisa->dadosCompletoEmpresa($_GET);
		if(empty($resultado) or $resultado===false){
			echo ['error'=>true];
			exit();
		}
	break;
	
	default:
	
	break;
}

echo json_encode($resultado);
exit();