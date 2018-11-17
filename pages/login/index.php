<?php 
 session_start();
 session_regenerate_id();
 if(isset($_SESSION['empresa'])) {
 	header("Location: /pages/empresa/");
	return;
 }
 require_once("../../autoload.php");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Good Business</title>
	<link rel="stylesheet" href="/pages/login/css/login.css">
</head>
<body>
	<header>
		<h1>Good Business</h1>
	</header>
	<main>
		<form action="/pages/login/php/logar.php" method="post">
			<h2>Fazer Login</h2>
			<input type="text" 		placeholder="email" name="email">
			<input type="password"  placeholder="senha" name="senha">
			<button>enviar</button>
			<a href="/pages/cadastrarEmpresa">cadastrar</a>
			<a class="esqueciSenha" href="#">esqueci a senha</a>
			<div class="alert"><?php statusLogin();?></div>
		</form>
	</main>
	<footer>
		<span>Condições de uso</span>
		<span>Política de privacidade</span>
	</footer>
	<script type="text/javascript" >
		document.querySelector("h1").onclick=function(){
			window.location.href="/";
		};


		window.onload=function(){
			//função conferir se estão sendo enviados dados
			document.forms[0].onsubmit=function(evento){
				//cancela o evento de submit
				evento.preventDefault();
				// controle do submit
				var formCompleto=true;
				// obtém array dos inputs
			 	var input= document.querySelectorAll("input");
			 	// salva referência do alert
			 	var alerta =document.querySelector('.alert');
			 	
				//verifica se os inputs foram preenchidos
			 	input.forEach(function(dados){
			 		if(!dados.value){
			 		 alerta.innerHTML="";
			 		 alerta.innerHTML="<h2> Preencha todos os campos</h2>";
			 		 dados.classList.add("borderRed");
			 		 formCompleto=false;
			 		 return;
			 		}
			 	});
			 	console.log(formCompleto);
			 	
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