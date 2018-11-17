<?php
//inicia e renova id da sessão
session_start();
session_regenerate_id();
//importa o autoload
require_once('../../../autoload.php');

//receber dados enviados pelo usuário
$email=$_POST['email'];
$senha=$_POST['senha'];

//instância o objetos empresa
$empresa=new empresa(array("email"=>$email,"senha"=>$senha));
//verifica se o usuário não existe
if(!$empresa->emailJaCadastrado()) {
	$_SESSION['statusLogin']="Usuário não cadastrado";
	header("Location: /pages/login/");
	return;
}
// retorna array assoc com nome,cnpj,imagem do usuário, senão retorna false
$resultado =$empresa->dadosLogin();
if($resultado) {
	$_SESSION['empresa']=$resultado;
	header("Location: /pages/empresa/");
	return;
}else{
	$_SESSION['statusLogin']="A senha está incorreta";
	header("Location: /pages/login/");
	return;
}
