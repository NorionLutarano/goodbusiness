<?php
	session_start();
	session_regenerate_id();
	//importa objeto empresa
	require_once("../../../autoload.php");

	echo var_dump($_POST);
	//se algum dado do formulário não for enviado retorna mensagem de error e redireciona para página de cadastro
	if(	!isset($_POST['nome']) 		or
		!isset($_POST['cnpj']) 		or
		!isset($_POST['estado']) 	or
		!isset($_POST['bairro']) 	or
		!isset($_POST['endereco']) 	or
		!isset($_POST['tipo']) 		or
		!isset($_POST['email']) 	or
		!isset($_POST['senha'])) { 
			$_SESSION['PreenchaDados']= "<h2> Preencha todos os dados! </h2>";
			header("Location: /pages/cadastrarEmpresa/");
			return; 
		}
	//se algum dado for enviado vazio o script retorna mensagem de error e redireciona para página de cadastro
	if(	empty($_POST['nome']) 		or
		empty($_POST['cnpj']) 		or
		empty($_POST['estado']) 	or
		empty($_POST['bairro']) 	or
		empty($_POST['endereco']) 	or
		empty($_POST['tipo']) 		or
		empty($_POST['email']) 		or
		empty($_POST['senha'])) { 
			$_SESSION['PreenchaDados']= "<h2> Preencha todos os dados! </h2>";
			header("Location: /pages/cadastrarEmpresa/");
			return; 
		}

	//instância de objeto empresa
	$empresa = new empresa([	 'nome' 	=> $_POST['nome'],
								 'cnpj' 	=> $_POST['cnpj'],
								 'estado'	=> $_POST['estado'],
								 'bairro'	=> $_POST['bairro'],
								 'endereco' => $_POST['endereco'],
								 'tipo'		=> $_POST['tipo'],
								 'email'	=> $_POST['email'],
								 'senha' 	=> $_POST['senha']]);
	

//cadastra a empresa, se a empresa for cadastrar retorna true senão retorna false
	switch($empresa->cadastrar()){
		case "emailJáCadastrado":
			$_SESSION['statusCadastro']= "<h2>email já cadastrado</h2>";
		break;

		case "cnpjJáCadastrado":
			$_SESSION['statusCadastro']= "<h2>empresa já cadastrada</h2>";
		break;

		case "emailInválido":
			$_SESSION['statusCadastro']= "<h2>email é inválido</h2>";
		break;
		case "cnpjInválido":
			$_SESSION['statusCadastro']= "<h2>Cnpj é inválido</h2>";
		break;
		case "emailInválido":
			$_SESSION['statusCadastro']= "<h2>email é inválido</h2>";
		break;
		default:
			$_SESSION['statusCadastro']= "<h2 style='color:rgb(0,200,100);'>Dados cadastrados com sucesso!</h2>";		
		break;
	};
		header("Location: /pages/cadastrarEmpresa/");

?>


