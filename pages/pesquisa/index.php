
<!DOCTYPE html>
<html ng-app="app">
<head>
	<title>Pesquisar Good Business</title>
	<link href="https://fonts.googleapis.com/css?family=Poppins|Muli|Roboto" rel="stylesheet">
	<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap-reboot.css">
	<link rel="stylesheet" media="screen" type="text/css" href="/css/headerPesquisaProdutos/header.css">	
	<link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"> 
	<link rel="stylesheet" media="screen" type="text/css" href="/css/pesquisa/pesquisa.css">
	<script type="text/javascript" src="/js/funcoes.js"></script>
	<script type="text/javascript" src="/node_modules/angular/angular.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
</head>
<body ng-controller="pesquisa">
	<header>
		<h1>Good Business</h1>
		<form action="/pages/pesquisa/index.php" method="get">
	 	 <input  type="text" placeholder="Pesquisar" name="{{pesquisarSobre}}"/>
		 <input  name="endereco" 	style="display: none;" value="{{endereco}}"/>
		 <input  name="frete"    	style="display: none;" value="{{frete}}"/>
		 <input  name="parcelas" 	style="display: none;" value="{{parcelas}}"/>
		 <input  name="promocao" 	style="display: none;" value="{{promocao}}"/>
		 <input  name="descricaoCategoria" 		style="display: none;" value="{{descricaoCategoria}}"/>
		 <input  name="categoria" 	style="display: none;" value="{{categoria}}"/>
		 <button class="button">Enviar</button>
		</form>
		<div class="menu">
			<span ng-show="!empresa.nome">Cadastrar</span>
			<span ng-show="!empresa.nome" class="login">Fazer Login</span>
			<span ng-bind="empresa.nome"></span>
			<img  ng-if="empresa.imagem" {{empresa.imagem}}>
		</div>
		
		<ul>
			<li ng-click="setPesquisaForncedor()">Fornecedor</li>
			<li ng-click="setPesquisaLoja()">Lojas</li>
			<li>Anunciar</li>
			<li ng-click="setPesquisaProduto()">Produto</li>
		</ul>
	</header>
	<main >
		<div class="filtro">
		
			<ul>
				<li><h4>Filtro</h4></li>
				<li>
					<input type="text" placeholder="Procurar pelo bairro" ng-model="endereco" />
				</li>
				<li>
					<select ng-model="frete">
						<option value="">Selecione frete</option>
						<option value="true">com frete</option>
						<option value="false">sem frete</option>
					</select>
				</li>
				<li>
					<input type="text" placeholder="quantidade de parcelas" ng-model="parcelas"/>
				</li>
				<li>
					<select ng-model="promocao">
						<option value="">Selecione promocao</option>
						<option value="true">Com promocao</option>
						<option value="false">Sem promocao</option>
					</select>
				</li>
				<li>
					<input type="text" placeholder="Tipo do produto: livro, Ração..." ng-model="tipo">
				</li>
				<li>
					<button>Enviar</button>
				</li>
			</ul>

		</div>
		<div class="listaProdutos">
			<?php
			 if(isset($_GET['categoria']) and $_GET['categoria']=='produto') {
				require_once("php/obterListaProdutos.php"); 
			 }

			 if(isset($_GET['categoria']) and $_GET['categoria']=='loja') {
				require_once("php/obterListaProdutos.php"); 
			 }


			 if(isset($_GET['categoria']) and $_GET['categoria']=='fornecedor') {
				require_once("php/obterListaProdutos.php"); 
			 }

			?>
			

			
		</div>
	</main>

	<footer>
		<span>Termos de uso</span>
		<span>Ajuda</span>
		<span>Formas de Pagamento</span>
		<span>Publicidade</span>
		<span>Contato</span>
		<span>Parcerias</span>
	</footer>



</body>
</html>