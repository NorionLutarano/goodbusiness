<?php
	include_once("carregarLib.php");
	estaLogado($sair=true);



	//verifica se arquivo é imagem, cria um diretório no diretório imagens e salva o arquivo nele 
	$diret=getcwd().'/imgsEmpresa/';
	//move arquivo, e retorna a diretório para variável $path(variável de referência)
	switch(moverArquivo($_FILES['imagem'],str_replace('/pages/usuario/php','', $diret),$path)){
		case 2:
			echo "Servidor está em manutenção #501.";
			exit();
		break;
		case 3:
			echo "Você só pode enviar arquivos de imagem .jpeg, .jpg ou .png.";
			exit();
		break;
		case 4:
			echo "Você não enviou arquivo de imagem.";
			exit();
		break;
		case 5:
			echo "Arquivo tem que ser menor que 2 megabytes.";
			exit();
		break;
	}


	//limpar os dados enviados
	$_POST=arrayValidarString($_POST);
	//adiciona o caminho da imagem salva no array do POST
	$_POST['path']=$path;
	//adiciona id do empresário ao POST
	$_POST['id_empresa']=decodificar($_COOKIE['ident']);
	//instancia o produto
	$produto=new produto($_POST);
	//cadastrar o produto, se retorna true foi cadastrado e false houve error
	if ($produto->cadastrar()) {
		echo 100;	
	}else{
		echo "Servidor em manutenção #503.";
	}
	
	exit();