<?php 
	require_once("php/logar.php");
	if(isset($_COOKIE['logado'])){
		header("Location: /");
		exit();
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Good Business</title>
	<link rel="stylesheet" href="css/login.css">	
</head>
<body>
	<header>
		<a href="/pages/cadastrar">Cadastrar</a>
	</header>
	<main>
		<form action="#" method="post">
			<h1><a href="/">Lilium</a><sub>alfa</sub></h1>
			<input type="text" 		placeholder="email" name="email">
			<input type="password"  placeholder="senha" name="senha">
			<button>enviar</button>
			<span><?php echo $statusLogin;?></span>
		</form>
		<div id="tela">recuperar senha</div>
	</main>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="js/app.js"></script>
</body>
</html>