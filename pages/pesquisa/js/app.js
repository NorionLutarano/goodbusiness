angular.module("app",[]).
		controller("pesquisa",['$scope',function($scope){
			//dados do usuário logado
			$scope.empresa={};
			//reduziu nome
			$scope.empresa.nome=reduzirString(20,$scope.empresa.nome);
			//se for maior que 15 itens mostra o buttão
			$scope.produtosPesquisado=typeof document.querySelectorAll('.produto') != "undefined"?document.querySelectorAll('.produto').length:'0';
			//seta pesquisa para fornecedor
			$scope.setPesquisaForncedor=function(){
				$scope.categoria="fornecedor";
				$scope.pesquisarSobre="fornecedor";
				return;
			}
			//seta pesquisa para loja
			$scope.setPesquisaLoja=function(){
				$scope.categoria="loja";
				$scope.pesquisarSobre="loja";
				return;
			}
			//seta pesquisa para produto
			$scope.setPesquisaProduto=function(){
				$scope.categoria="Produto";
				$scope.pesquisarSobre="produto";
				return;
			} 
		}]);