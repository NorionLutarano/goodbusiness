<?php
require_once("carregarLib.php");

function valorValido(){
		if(preg_match('/[a-zA-Z]/', $_POST['valor'])){
			echo "digite somente valores numéricos.";
			return true;
		}
}

function verificarArquivo(){
		
		//verifica se arquivo é imagem, cria um diretório no diretório imagens e salva o arquivo nele 
		$diret=getcwd().'/imgsEmpresa/';
		//move arquivo, e retorna a diretório para variável $path(variável de referência)
		switch(moverArquivo($_FILES['img'],str_replace('/pages/usuario/php','', $diret),$path)){
			case "2":
				echo "Servidor está em manutenção #601.";
				exit();
			break;
			case "3":
				echo "Você só pode enviar arquivos de imagem .jpeg, .jpg ou .png.";
				exit();
			break;
			case "5":
				echo "Arquivo tem que ser menor que 2 megabytes.";
				exit();
			break;
			}
		
		return $path;

}



function atualizarProduto(){
	if(isset($_POST['atualizar']) and $_POST['atualizar']=='1'){
		if(!isset($_POST['ident']) or preg_match('/[a-zA-Z]/', $_POST['ident'])){ return;}
		if(!usuarioEstaLogado()){return;}
		if(isset($_POST['valor'])){
			if(valorValido()){return;}
		}

			if(isset($_FILES['img']['name']) and $_FILES['img']['name']!=NULL){
			$path=verificarArquivo();
			if(!$path){return;}
			$_POST['path']=$path;
		}
	

		$_POST=arrayValidarString(arrayNotEmpty($_POST));
		if(!isset($_POST['tipo'])){
			$_POST['tipo']="não informado";
		}
		if(!isset($_POST['parcelamento'])){
			$_POST['parcelamento']="não informado";
		}
		if(!isset($_POST['modelo'])){
			$_POST['modelo']="não informado";
		}
		if(!isset($_POST['fabricante'])){
			$_POST['fabricante']="não informado";
		}		
		$produto=new produto($_POST);
		echo ($produto->atualizar())? "atualizado com sucesso!":"servidor em manutenção.";

	}

}

atualizarProduto();