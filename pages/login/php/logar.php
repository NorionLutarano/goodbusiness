<?php
//importa o autoload
require_once('../../autoload.php');
//verificar se está logado
$statusLogin="";
if(usuarioEstaLogado() or $_POST==false or !isset($_POST) ){
	return;
}

//instância o objetos empresa
$empresa=new empresa(array("email"=>$_POST['email'],"senha"=>$_POST['senha']));

//verifica se o usuário não existe
if(!$empresa->emailJaCadastrado()) {
	$statusLogin="Usuário não cadastrado";
	return;
}

// retorna array assoc com nome,cnpj,imagem do usuário, senão retorna false
$resultado =$empresa->dadosLogin();
if($resultado) {
	setcookie('ident',codificar($resultado['id_empresa']),strtotime( '+30 days' ),"/");
	setcookie('logado',sha1($resultado['id_empresa'].$_SERVER['REMOTE_ADDR']."30"), strtotime( '+30 days' ),"/");
	setcookie('nomeEmpresa',$resultado['nome'], strtotime( '+30 days' ),"/");
	header("Location: /pages/usuario/");
	return;
}else{
	$statusLogin="A senha está incorreta";
	return;
}
