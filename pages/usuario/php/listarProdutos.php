<?php
require_once("/autoload.php");
if(!usuarioEstaLogado()){header("Location: /"); return;}
$_POST['quantidade']=(isset($_POST['quantidade']))?intval($_POST['quantidade']):20;
include_once("carregarLib.php");
$produto=new produto();
$_POST['id_empresa']=$_SESSION['empresa']['id_empresa'];
echo json_encode($produto->listarProduto($_POST));