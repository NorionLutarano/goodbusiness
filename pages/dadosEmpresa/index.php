<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link href="https://fonts.googleapis.com/css?family=Poppins|Muli|Roboto" rel="stylesheet">
	<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap-reboot.css">
	<link rel="stylesheet" media="screen" type="text/css" href="/css/headerPesquisaProdutos/header.css">
	<style type="text/css">
		main{
			display: flex;
		}
		
		main .imagemProduto{
		  position: relative;
		  margin-left:2rem;
		  margin-right: 3rem;
		  height:300px;
		  width: 250px;
		}

		main .imagemProduto img{
		  height: 100%;
		  width:100%;
		}

		main .informacaoProduto{
		  height: 250px;
		  width: 800px;
		}



	    .informacaoProduto h2{
	      font-family: arial;
	      font-size:2rem;
	      font-weight: 100;
	     }
	    
	    .informacaoProduto h4{
	      font-weight: 900;
	      font-family: helvetica;
	    }

	    
	    .informacaoProduto .descricaoProduto{
	    	line-height: 35px;
	    }

	    .informacaoProduto .valor{
	      font-weight: 100;
	      font-family: helvetica;
		  color: #2F5;
		  font-size:2rem;
	    }
	    
	    .informacaoProduto .valor:before{
	      content:"R$ ";
	      font-weight: 900;
	    }

	    a{
	    	color:white;}

	    a:hover{
	    	text-decoration: none;
	    	color:white;
	    }

	</style>
</head>
<body ng-app="app">
	<header>
		<a href="/"> <h1>Good Business</h1> </a>
		<form action="/pages/pesquisa/index.php" method="get">
	 	 <input type="text" placeholder="Pesquisar" name="produto" ng-model="teste"/>
		 <button class="button">Enviar</button>
		</form>
		<div class="menu">
			<span>Fazer Login</span>
			<span>Cadastrar</span>
		</div>
		
		<ul>
			<li>Fornecedor</li>
			<li>Lojas</li>
			<li>Anunciar</li>
			<li>Produto</li>
		</ul>
	</header>

	<main ng-controller="produto">
		<div class="imagemProduto">
			<img src="{{dados.imagemProduto}}">
		</div>
		<div class="informacaoProduto">
			<h2 class="nomeProduto">{{dados.nomeProduto}}</h2>
			<h4 class="nomeEmpresa">{{dados.nomeEmpresa}}</h4>
			<h4 class="valor">{{dados.valor}}</h4>
			<h4 class="parcelamento">{{dados.parcelamento}}</h4>
			<p  class="descricaoProduto">{{dados.descricaoProduto}}</p>
			<h4>Observação da Empresa</h4>
			<p  class="observacaoEmpresa">{{dados.observacaoEmpresa}}</p>
			<h4>Localização da empresa</h4>
			<p  class="enderecoEmpresa">{{dados.enderecoEmpresa}}</p>
		</div>
		
	</main>
	<footer></footer>
		</footer>


	<script type="text/javascript" src="/node_modules/angular/angular.js"></script>
	<script type="text/javascript">
		angular.module("app",[]).
		controller("produto",['$scope',function($scope){
			//lista de produtos pesquisados
			$scope.dados= {
				imagemProduto:"/imgsClientes/imgEmpresa/teste/A5489.jpg",
				nomeProduto:"Livro",
				parcelamento:"em até 8x R$ 40,00 sem juros",
				descricaoProduto:"O controle sem fio Dualshock4 apresenta adições inovadoras, como a tela sensível ao toque e a barra de luz Características: O tato, a forma e a sensibilidade dos botões e sticks duplos analógicos foram melhorados para oferecer maior sensação de controle, não importa qual seja o jogo A nova tela multitoque clicável na parte frontal do controle sem fio Dualshock4 abre um mundo de novas possibilidades de jogo Os três LEDs dentro da barra de luz atuaM em conjunto com a câmera do PlayStation para criar experiências de jogo imersivas Possui alto-falante integrado e conector estéreo para fone",
				observacaoEmpresa:"Abre 12h e fecha as 16h",
				valor:125.50,
				nomeEmpresa:"Lojas América",
				enderecoEmpresa:"rua Pircles"
		};

		}]);
	</script>
</body>
</html>