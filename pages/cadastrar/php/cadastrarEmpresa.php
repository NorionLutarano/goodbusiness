<?php
require_once("../../autoload.php");
	
//se algum dado do formulário não for enviado retorna mensagem de error e redireciona para página de cadastro
if(	!existeChaves($_POST,
	['nome','razaoSocial','contato','cep','cnpj','estado','bairro','endereco','categoria','email','senha'])){ 
			return; 
		}
//se algum dado for enviado vazio o script retorna mensagem de error e redireciona para página de cadastro
if(	arrayVazio($_POST)){
		return; 
	}

	//instância de objeto empresa
	$empresa = new empresa([	 'nome' 	=> $_POST['nome'],
								 'cnpj' 	=> $_POST['cnpj'],
								 'estado'	=> $_POST['estado'],
								 'bairro'	=> $_POST['bairro'],
								 'endereco' => $_POST['endereco'],
								 'categoria'=> $_POST['categoria'],
								 'email'	=> $_POST['email'],
								 'senha' 	=> $_POST['senha'],
								 'razaoSocial' 	=> $_POST['razaoSocial'],
								 'contato' 	=> $_POST['contato'],
								 'cep' 		=> $_POST['cep']]);
	

//cadastra a empresa, se a empresa for cadastrar retorna true senão retorna false
	switch($empresa->cadastrar()){
		case "emailJáCadastrado":
			$statusCadastro= "email já cadastrado";
		break;

		case "cnpjJáCadastrado":
			$statusCadastro= "empresa já cadastrada";
		break;

		case "emailInválido":
			$statusCadastro= "email é inválido";
		break;
		case "cnpjInválido":
			$statusCadastro= "Cnpj é inválido";
		break;
		case "emailInválido":
			$statusCadastro= "email é inválido";
		break;
		case "cepInválido":
			$statusCadastro= "cep é inválido";
		break;		
		default:
			$statusCadastro= "<div style=\"color:green;\">Dados cadastrados com sucesso! </div>";		
		break;
	};

?>



