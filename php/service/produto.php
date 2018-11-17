<?php


class produto{

	function __construct(){
		//obter conexao
		$this->con = (isset($GLOBALS['con'])) ? $GLOBALS['con']: '';
		
	}

	public  function getListaProduto($produto,$filtro=null,$quantidadeProduto=16){
		//prepara o filtro
		$filtro=$filtro?" and ". $filtro:null;
		//prepara string do produto
		$produto = "'%".$produto."%'";
		//cria a query
		$sql="  select P.id_produto,cnpj,E.nome as nomeEmpresa,P.nome as nomeProduto,valor,P.imagem as imagemProduto from  produto as P inner join empresa as E on E.id_empresa=P.id_empresa and P.nome Like {$produto}  {$filtro} order by valor asc limit {$quantidadeProduto}";
		
		//prepara a query para executar 
		 $query=$con->prepare($sql);
		 //encerra a conexao
		 $con=null;
		 //se retorna false avisa do error 
		 if(false==$query->execute()){return "error";}
		 //obtém dados
		 $resultado=$query->fetchAll();
		 //verifica se retornou nada
		 if(!count($resultado)){ return 0;}
		 //cria um json com os resultados
		 return $resultado;
	}


	public function totalProdutosEmpresa($idEmpresa){
		//cria o comando do sql
		$sql = "select count(id_produto) as total from produtos as P inner join
		empresa as E on E.id_empresa=P.id_empresa";
	}


	public function cadastrar($dados){
		echo var_dump($this->con);
		//cria o comando do sql
		$sql = "insert into produto(id_empresa, nome, imagem, descricao, valor, parcelamento, promocao, frete) values(:id_empresa, :nome, :imagem, :descricao, :valor, :parcelamento, :promocao, :frete)";	
		//prepara query para executar
		$query=$this->con->prepare($sql);
		//seta os valores para variável
		$query->bindValue(":id_empresa",$dados['id_empresa']);
		$query->bindValue(":nome",$dados['nome']);
		$query->bindValue(":imagem",$dados['path']);
		$query->bindValue(":descricao",$dados['descricao']);
		$query->bindValue(":valor",$dados['valor']);
		$query->bindValue(":parcelamento",$dados['parcelamento']);
		$query->bindValue(":promocao",$dados['promocao']);
		$query->bindValue(":frete",$dados['frete']);
		//encerra conexão
		$this->con=null;
		//se false, retorna false
		if(false==$query->execute()){return false;}else{return true;}


	}

}


