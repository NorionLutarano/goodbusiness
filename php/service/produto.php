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

	public  function listarProduto($produto){
		$min=$produto['quantidade']-20;
		//cria a query
		$sql="select nome,imagem,descricao,valor,parcelamento,frete from produto where id_empresa={$produto['id_empresa']} limit {$min},{$produto['quantidade']}";
		//prepara a query para executar 
		 $query=$this->con->prepare($sql);
		 //encerra a conexao
		 $this->con=null;
		 //se retorna false avisa do error 
		 if(false==$query->execute()){return "Servidor em manutenção #901";}
		 //retorna a array associativo
		 return $query->fetchAll();
	}

	public function obterProduto($dados){ 
		$sql="select nome,imagem,descricao,valor,parcelamento,frete from produto where id_empresa={$dados['id']} and nome like '%{$dados['produto']}%'";
		$query = $this->con->prepare($sql);
		if(false==$query->execute()){return "Servidor em manutenção #902";}
		return $query->fetchAll();
	}

	public function quantidadeProdutos($idEmpresa){
		//cria o comando do sql
		$sql = "select count(id_produto) as total from produto where id_empresa={$idEmpresa}";
		//prepara a query
		$query=$this->con->prepare($sql);
		//executa a query e obtem o resultado
		$query->execute();
		//se não houver erro retorna true senão false
		$quantidade=$query->fetch(PDO::FETCH_ASSOC);
		//verifica se a consulta ocorreu bem
		if($quantidade){
			return $quantidade['total'];
		}else{
			return "Servidor em manutenção #502.";
		}
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


	function __destruct(){
		$this->con=null;
	}