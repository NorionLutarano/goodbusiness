<?php
if(!isset($_GET['email'])){
	exit();
}

require_once("../../autoload.php");


//limpar string
$_GET=arrayValidarString($_GET);
//instância da classe empresa
$empresa=new empresa(["email"=>$_GET['email']]);
//email existe
if(!$empresa->emailJaCadastrado()){
	$statusRecuperarSenha= "email não foi cadastrado";
	return;
}


//criar código para link
$link=sha1($_GET['email']).sha1(random_int(1500, 10000));

//cadastrar dados no banco de dados RecuperarSenha
if($empresa->criarLinkRecuperarSenha(
	["id_empresa"=>$empresa->getDado('id_empresa'),
	 "email"=>$_GET['email'],
	 "link"=>$link])){
	$statusRecuperarSenha="ver link no email";
}else{
	$statusRecuperarSenha="Servidor em atualização";
}

//setar dados para email
$to = $_GET['email'];
$subject = "Resetar conta";
$txt = "click no link para resetar senha, existe tempo limit para link ser válido. ".
	$_SERVER['HTTP_HOST']."/pages/novaSenha/index.php?link={$link}";

$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

//enviar email
mail($to,$subject,$txt,$headers);