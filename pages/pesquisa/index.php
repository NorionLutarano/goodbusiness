<?php 
	$_GET['estado']				=(isset($_GET['estado']))		?$_GET['estado']:'';
	$_GET['bairro']				=(isset($_GET['bairro']))		?$_GET['bairro']:'';
	$_GET['frete']				=(isset($_GET['frete']))		?$_GET['frete']:'';
	$_GET['parcelamento']		=(isset($_GET['parcelamento']))	?$_GET['parcelamento']:'';
	$_GET['promocao']			=(isset($_GET['promocao']))	?$_GET['promocao']:'';
	$_GET['tipoProduto']		=(isset($_GET['tipoProduto']))	?$_GET['tipoProduto']:'';
	$_GET['pesquisarPor']		=(isset($_GET['pesquisarPor']))?$_GET['pesquisarPor']:'produto';
	$_GET['tipoLoja']			=(isset($_GET['tipoLoja']))?$_GET['tipoLoja']:'';
?>

<!DOCTYPE html>
<html >
<head>
	<title>Pesquisar Good Business</title>
	<link href="https://fonts.googleapis.com/css?family=Poppins|Muli|Roboto" rel="stylesheet">
	<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap-reboot.css">	
	<link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"> 
	<link rel="stylesheet" media="screen" type="text/css" href="css/pesquisa.css">
</head>
<body >
	<header>
	  <div class="grade">
		<h1>Lilium<sub>alfa</sub></h1>
		<form action="." method="get">
	 	 <input  type="text" placeholder="Pesquisar" name="pesquisa"
	 	  value='<?php echo $_GET['pesquisa'];?>' ><!--
	 	  --><button class="button">Enviar</button>
		 <input  name="estado" 			id="inputEstado" 		type="hidden" value="<?php echo $_GET['estado']; ?>"/>
		 <input  name="bairro" 			id="inputBairro" 		type="hidden" value="<?php echo $_GET['bairro']; ?>" />
		 <input  name="frete"    		id="inputFrete" 		type="hidden" value="<?php echo $_GET['frete']; ?>"/>
		 <input  name="parcelamento" 	id="inputParcelamento" 	type="hidden" value="<?php echo $_GET['parcelamento']; ?>"/>
		 <input  name="promocao" 		id="inputPromocao" 		type="hidden" value="<?php echo $_GET['promocao']; ?>"/>
		 <input  name="tipoLoja"		id="inputTipoLoja" 		type="hidden" value="<?php echo $_GET['tipoProduto']; ?>" />
		 <input  name="tipoProduto"		id="inputTipoProduto" 	type="hidden" value="<?php echo $_GET['tipoProduto']; ?>"/>
		 <input  name="pesquisarPor" 	id="inputPesquisarPor" 	type="hidden"
		  value="<?php echo $_GET['pesquisarPor'];?>" />
		</form>
		<div class="menu">
			<span>Cadastrar</span>
			<span  class="login">Fazer Login</span>
			<span></span>
			<img class="imagemEmpresa">
		</div>
	  </div>
	  <div class="grade">
		<ul>
			<li class="pesquisarPor opcaoFornecedor" >Fornecedor</li>
			<li class="pesquisarPor opcaoLoja" >Lojas</li>
			<li class="pesquisarPor opcaoProduto" >Produto</li>
		</ul>
	  </div>
	</header>
	<main class="gradeNoSpace">
		<div class="filtro">
			<ul>
				<li><h4>Filtro</h4></li>
				<li>
					<input id="bairro" type="text" placeholder="Procurar pelo bairro" value="<?php echo $_GET['bairro']; ?>" />
				</li>
				<li>
					<select  name="estado" id="estado">
					 <option value="">Selecione estado</option>
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
				</li>
				<!--produto-->
				<li class="opcaoFiltroProduto">
					<select id="frete" >
						<option value="">Selecione frete</option>
						<option value="1">com frete</option>
						<option value="0">sem frete</option>
					</select>
				</li>
				<li class="opcaoFiltroProduto">
					<select id="promocao" >
						<option value="">Selecione promocao</option>
						<option value="1">Com promocao</option>
						<option value="0">Sem promocao</option>
					</select>
				</li>
				<li class="opcaoFiltroProduto">
					<input type="text" id="parcelamento" placeholder="quantidade de parcelamento"
					 value="<?php echo $_GET['parcelamento'];?>" />
				</li>
				<li class="opcaoFiltroProduto">
					<input type="text" id="tipoProduto" placeholder="Tipo do produto: livro, Ração..." 
					value="<?php echo $_GET['tipoProduto'];?>">
				</li>
				<!--Fim do Produto-->
				<!--loja-->
				<li class="opcaoFiltroLoja">
					<input type="text" id="tipoLoja" placeholder="Tipo da loja: restaurante,mercado..." 
					value="<?php echo $_GET['tipoLoja'];?>">
				</li>
				<!--Fim da loja-->

			</ul>
		</div>
		<div class="listaProdutos gradeColumn">
			<div id="info" class="desativado">
				<img src="/imgs/x.png">
				<table>
					<caption>Nome empresa</caption>
					<tr>
						<td>Cnpj:</td>
						<td>127.159.987-78</td>
					</tr>
					<tr>
						<td>endereço:</td>
						<td>Rua de meia noite</td>
					</tr>
					<tr>
						<td>Bairro:</td>
						<td>Cascadura</td>
					</tr>
					<tr>
						<td>Estado:</td>
						<td>Rio de janeiro</td>
					</tr>
					<tr>
						<td>Cep:</td>
						<td>21498-78</td>
					</tr>
					<tr>
						<td>Contato:</td>
						<td>(21)3878-8778 (21)1459-9878</td>
					</tr>
				</table>
			</div>
			
			<div class="estande">
				<?php
					function geral(){
					 if(isset($_GET['pesquisarPor'])) {
						require_once("php/pesquisa.php");
						};
					 }
					geral();	
				?>

			</div>
			
		</div>
	</main>


</body>
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="js/app.js"></script>
</html>