<?php


class produto{

	function __construct($dados){
		//obter dados
		$this->id_empresa=		isset($dados['id_empresa'])?	$dados['id_empresa']:'';
		$this->nome=			isset($dados['nome'])?			$dados['nome']:'';
		$this->path=			isset($dados['path'])?			$dados['path']:'';
		$this->descricao=		isset($dados['descricao'])?		$dados['descricao']:'';
		$this->valor=			isset($dados['valor'])?			removerMoeda($dados['valor']):'';
		$this->parcelamento=	isset($dados['parcelamento'])?	$dados['parcelamento']:'';
		$this->promocao=		isset($dados['promocao'])?		$dados['promocao']:'';
		$this->frete=			isset($dados['frete'])?			$dados['frete']:'';
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


	public function cadastrar(){
		//cria o comando do sql
		$sql = "insert into produto(id_empresa, nome, imagem, descricao, valor, parcelamento, promocao, frete) values(:id_empresa, :nome, :imagem, :descricao, :valor, :parcelamento, :promocao, :frete)";	
		//prepara query para executar
		$query=$this->con->prepare($sql);
		//ver o tamanho da string se é maior que 5000 caracteres senão reduzir
		if(strlen($this->descricao)>5000){
			$this->descricao=substr($this->descricao, 0,5000);
		}
		//seta os valores para variável
		$query->bindValue(":id_empresa",$this->id_empresa);
		$query->bindValue(":nome",$this->nome);
		$query->bindValue(":imagem",$this->path);
		$query->bindValue(":descricao",$this->descricao);
		$query->bindValue(":valor",$this->valor);
		$query->bindValue(":parcelamento",$this->parcelamento);
		$query->bindValue(":promocao",$this->promocao);
		$query->bindValue(":frete",$this->frete);
		//encerra conexão
		$this->con=null;
		//se false, retorna false
		if(false==$query->execute()){return false;}else{return true;}


	}

}


