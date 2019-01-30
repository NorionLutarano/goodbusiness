<?php
/*
	algoritmo possui necessidade de "dados de códigos" a ser inserido.
*/
	session_start();
	include_once("carregarLib.php");
		
		
	if(
		!isset($_POST['cnpj']) 		and
		!isset($_POST['estado']) 	and
		!isset($_POST['bairro']) 	and
		!isset($_POST['endereco']) 	and
		!isset($_POST['email']) 	and
		!isset($_POST['senha']) 		
	){
		echo "envie todos os dados";
		exit();
	}
	

	$_POST['nome']=$_SESSION['empresa']['nome'];
	$_POST['isFilial']=1;



	$filial=new empresa($_POST);
	switch($filial->cadastrarFilial($_SESSION['empresa']['id_empresa'])){
	 case 1:
	 	echo 'Cnpj já cadastrado.';
	 break;
	 case 2:
	 	echo 'Email já cadastrado.';
	 break ;
	 case 3:
	 	echo 'Cnpj Inválido.';
	 break ;
	 case 4:
	 	echo 'Email já cadastrado.';
	 break ;
	 case 5:
	 	echo '#200';//cadastrado com sucesso
	 break ;
	 case 6:
	 	echo '#500';//error de execução no servidor
	 break ;
	}


	exit();