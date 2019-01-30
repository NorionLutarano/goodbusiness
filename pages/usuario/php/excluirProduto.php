<?php
 require_once("carregarLib.php");
 if(!usuarioEstaLogado()){
 	echo "você não está logado.";
 	exit();
 }

 if(!isset($_POST['ident'])){
 	echo "error atualize a página.";
 	exit();
 }

 if(preg_match('/[a-zA-Z]/', $_POST['ident'])){
 	echo "string";
 	exit();
 }

 $produto = new produto($_POST);
 echo ($produto->excluir())?"item excluido com sucesso":"servidor em manutenção";