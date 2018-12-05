<?php

session_start();

if(!isset($_POST['produto'])){return;}

include_once("carregarLib.php");

$_POST['produto']=validarString($_POST['produto']);
$_POST['id']=$_SESSION['empresa']['id_empresa'];
$produto=new produto();
echo json_encode($produto->obterProduto($_POST));