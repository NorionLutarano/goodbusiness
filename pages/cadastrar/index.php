<?php
	require_once("../../autoload.php");
	if(!usuarioEstaLogado()){
		header("Location: /");
		return;
	}
	require_once('php/cadastrarEmpresa.php');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Lilium</title>
	<link rel="stylesheet" href="css/cadastrar.css">
	<link href="https://fonts.googleapis.com/css?family=Poppins|Muli|Roboto" rel="stylesheet">

</head>
<body>
<header>
	<a href="/pages/login">login</a>
</header>
	
	<main>

		<form  action="" id="form" method="post">
			<a href="/"><h1>Lilium<sub>alfa</sub></h1></a>
			 <div class="etapa">
				<input type="text"     name="nome" 		placeholder="Nome da empresa" required>
				<input type="text"     name="razaoSocial" placeholder="Razão social" required>
				<input type="text"     name="cnpj" 	placeholder="Cnpj só números" id="cnpj" minlength="14" maxlength="14" required>
				<select  name="estado"  >
				 <option value="AC">AC</option>
				 <option value="AL">AL</option>
				 <option value="AP">AP</option>
				 <option value="AM">AM</option>
				 <option value="BA">BA</option>
				 <option value="CE">CE</option>
				 <option value="DF">DF</option>
				 <option value="ES">ES</option>
				 <option value="GO">GO</option>
				 <option value="MA">MA</option>
				 <option value="MT">MT</option>
				 <option value="MS">MS</option>
				 <option value="MG">MG</option>
				 <option value="PA">PA</option>
				 <option value="PB">PB</option>
				 <option value="PR">PR</option>
				 <option value="PE">PE</option>
				 <option value="PI">PI</option>
				 <option value="RJ">RJ</option>
				 <option value="RN">RN</option>
				 <option value="RS">RS</option>
				 <option value="RO">RO</option>
				 <option value="RR">RR</option>
				 <option value="SC">SC</option>
				 <option value="SP">SP</option>
				 <option value="SE">SE</option>
				 <option value="TO">TO</option>			 			 			 			 			
				</select>
			</div>
			<div class="etapa desativado">
				<input type="text"  name="bairro" 	 placeholder="Bairro" required>
				<input type="text"  name="endereco"  placeholder="Endereço" required>
				<input type="text"  name="cep" class="cep" placeholder="Cep" minlength="8" maxlength="8" required>
				<select name="categoria" >
					<option value="">Tipo de conta</option>
					<option value="loja">loja</option>
					<option value="fornecedor">fornecedor</option>
					<option value="outro">outro</option>
				</select>
			</div>
			<div class="etapa desativado">
				<input type="email"     name="email" 	placeholder="Email" required>
				<textarea name="contato" maxlength="100" placeholder="Contato" required></textarea>
				<input type="password"  name="senha" 	placeholder="senha" class="senha"  required>
				<input type="password" class="confirmarSenha" 	placeholder="Confirma senha"  required>
			</div>
				<span class="avisoSenha">
						<?php
						 	if(isset($statusCadastro)){
						 		echo $statusCadastro;
						 	}
						?>
			
				</span>
			<div id="butoes">
				<button id="voltar" >voltar</button>
				<button id="avançar">avançar</button>
			</div>
		</form>
	</main>
	<footer></footer>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="/js/funcoes.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
</body>
</html>