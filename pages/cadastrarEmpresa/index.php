<?php
session_start();
session_regenerate_id();
if(isset($_SESSION['empresa'])){header("Location: /"); return;}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Good Business</title>
	<link rel="stylesheet" href="/pages/cadastrarEmpresa/css/cadastrarEmpresa.css">
</head>
<body>
	<header>
		<h1>Good Business</h1>
		<a class="buttonLogin" href="/pages/login">Fazer Login</a>
	</header>
	<div class="alert">
						<?php
						 if(isset($_SESSION['statusCadastro'])) {
						 	echo $_SESSION['statusCadastro'];
						 	unset($_SESSION['statusCadastro']);
						 }
						?>
	</div>
	<main>

		<form action="/pages/cadastrarEmpresa/php/cadastrarEmpresa.php" id="form" method="post">
			<h2>Criar conta</h2>
			<input type="text"     name="nome" 		placeholder="Nome da empresa" required>
			<input type="text"     name="cnpj" 		placeholder="Cnpj só números" id="cnpj" maxlength="14" required>
			<select  name="estado"  required>
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
			<input type="text"     name="bairro" 	placeholder="Bairro" required>
			<input type="text"     name="endereco"  placeholder="Endereço" required>
			<select name="categoria">
				<option value="loja">loja</option>
				<option value="fornecedor">fornecedor</option>
				<option value="outro">outro</option>
			</select>
			<input type="email"     name="email" 	placeholder="Email" required>
			<input type="password"  name="senha" 	placeholder="senha" class="senha" minlength="8" required>
			<input type="password" class="ConfirmarSenha" 	placeholder="Confirma senha" minlength="8" required>
			<span class="aviso">senha com mínimo de 8 caracteres</span>
			<button >Enviar</button>
		</form>
	</main>
	<footer></footer>
	<script type="text/javascript">
		document.querySelector("h1").onclick=function(){
			window.location.href="/";
		};



	
		window.onload=function(){
			document.forms[0].reset();
			//função conferir se estão sendo enviados dados
			document.forms[0].onsubmit=function(evento){
				//cancela o evento de submit
				evento.preventDefault();
				// controle do submit
				var formCompleto=true;
				// obtém array dos inputs
			 	var input=  document.querySelectorAll("input");
			 	// salva referência do alert
			 	var alerta= document.querySelector('.alert');
			 	//Senha não é igual ao confirmar Senha
			 	if(document.querySelector(".senha").value != document.querySelector(".ConfirmarSenha").value){
					alerta.innerHTML="";
			 	 	alerta.innerHTML="<h2> As senhas estão diferentes</h2>";
			 	 	document.querySelector(".ConfirmarSenha").classList.add("borderRed");
			 	 	return false;
			 	}else{
			 		alerta.innerHTML="";
			 		document.querySelector(".ConfirmarSenha").classList.remove("borderRed");
			 	}
			 	
			 	
			 	if(formCompleto){
					document.forms[0].submit();	
			 	}else{
			 		return;
			 	}
			 	

			};

		};
			
	
		
	</script>
</body>
</html>