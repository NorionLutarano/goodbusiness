<?php 
require_once("php/recuperarSenha.php");
if(isset($_COOKIE['logado']) or !isset($_GET['email'])){
	header("Location: /");
	exit();
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Good Business</title>
	<link rel="stylesheet" href="/pages/login/css/login.css">	
</head>
<body>
	<header>
		<a href="/pages/cadastrar">Cadastrar</a>
	</header>
	<main>
		<form action="#" method="post">
			<h1><a href="/">Lilium</a><sub>alfa</sub></h1>
			<input type="text" 		placeholder="email" name="email">
			<button>enviar</button>
			<span><?php echo $statusRecuperarSenha;?></span>
		</form>
		<div id="tela">recuperar senha</div>
	</main>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="js/app.js"></script>
</body>
</html>