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
		<h1>Good Business<sub>alfa</sub></h1>
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
			<input type="text"     name="razaoSocial" 		placeholder="Razão social" required>
			<input type="text"     name="cnpj" 		placeholder="Cnpj só números" id="cnpj" maxlength="14" required>
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
			<input type="text"     name="bairro" 	placeholder="Bairro" required>
			<input type="text"     name="endereco"  placeholder="Endereço" required>
			<input type="text" name="cep" class="cep" placeholder="Cep"  maxlength="9" required>
			<select name="categoria" >
				<option value="loja">loja</option>
				<option value="fornecedor">fornecedor</option>
				<option value="outro">outro</option>
			</select>
			<input type="email"     name="email" 	placeholder="Email" required>
			<textarea name="contato" maxlength="100" placeholder="Contato" required></textarea>
			<span class="avisoSenha"></span>
			<input type="password"  name="senha" 	placeholder="senha" class="senha"  required>
			<input type="password" class="confirmarSenha" 	placeholder="Confirma senha"  required>
			<span class="aviso">senha com mínimo de 8 caracteres</span>
			<button >Enviar</button>
		</form>
	</main>
	<footer></footer>
	<script type="text/javascript">
		document.querySelector("h1").onclick=function(){
			window.location.href="/";
		};



	

			document.forms[0].reset();
			//função conferir se estão sendo enviados dados
			document.forms[0].onsubmit=function(evento){
				//cancela o evento de submit
				evento.preventDefault();
				// salva referência do alert
			 	const alerta= document.querySelector('.avisoSenha');
			 	//Senha não é igual ao confirmar Senha
			 	if(document.querySelector(".senha").value != document.querySelector(".confirmarSenha").value){
					alerta.innerText="";
			 	 	alerta.innerText="As senhas estão diferentes.";
			 	 	document.querySelector(".confirmarSenha").classList.add("borderRed");
			 	 	return false;
			 	}else{
			 		alerta.innerText="";
			 		document.querySelector(".confirmarSenha").classList.remove("borderRed");
			 	}

				document.forms[0].submit();
				document.querySelector(".alerta").innerText="Cadastrado com sucesso.";
			};



			document.querySelector(".senha").onblur=function(){
				if(this.value.length<8){
					document.querySelector(".avisoSenha").innerText="A senha precisa ter 8 caracteres no mínimo.";
				}else{
					document.querySelector(".avisoSenha").innerText="";
				}
			};



			document.querySelector(".cep").onkeypress=function(){
				if(this.value.length==8){
					this.value=this.value.replace(/^(\d{5})(\d{3})/,"$1-$2");
					return;
				}
			};
			
	
		
	</script>
</body>
</html>