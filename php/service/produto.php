<?php


class produto{

	function __construct($dados=array()){
		//obter dados
		$this->id_empresa=		isset($dados['id_empresa'])?	$dados['id_empresa']:'';
		$this->id_produto=		isset($dados['ident'])?	$dados['ident']:'';		
		$this->nome=			isset($dados['nome'])?			$dados['nome']:'';
		$this->path=			isset($dados['path'])?			$dados['path']:'';
		$this->descricao=		isset($dados['descricao'])?		$dados['descricao']:'';
		$this->valor=			isset($dados['valor'])?			removerMoeda($dados['valor']):'';
		$this->parcelamento=	isset($dados['parcelamento'])?	$dados['parcelamento']:'';
		$this->promocao=		isset($dados['promocao'])?		1:0;
		$this->frete=			isset($dados['frete'])?			1:0;
		$this->tipo=			isset($dados['tipo'])?			removerMoeda($dados['tipo']):'';
		$this->fabricante=	isset($dados['fabricante'])?	$dados['fabricante']:'';
		$this->modelo=		isset($dados['modelo'])?		$dados['modelo']:'';
		//obter conexao
		$this->con = (isset($GLOBALS['con'])) ? $GLOBALS['con']: '';
		
		
	}

	public  function listarProduto($produto){
		//cria a query
		$sql="select nome,imagem,descricao,valor,parcelamento,frete from produto where id_empresa={$produto['id_empresa']} limit {$produto['quantidade']},20";
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
		if($dados['produto']!="*" and $dados['produto']){
			$sql="select id_produto as ident,nome,imagem,descricao,valor,parcelamento,frete,tipo,fabricante,modelo from produto where id_empresa={$dados['id']} and nome like '%{$dados['produto']}%' limit {$dados['inicio']},20";
		}
		elseif (!$dados['produto']) {
			$sql="select id_produto as ident, nome,imagem,descricao,valor,parcelamento,frete,tipo,fabricante,modelo from produto where id_empresa={$dados['id']} and nome like '%0%' limit {$dados['inicio']},20";
		}
		else{
			$sql="select id_produto as ident, nome,imagem,descricao,valor,parcelamento,frete,tipo,fabricante,modelo from produto where id_empresa={$dados['id']} limit {$dados['inicio']},20";
		}
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
		$sql = "insert into produto(id_empresa, nome, imagem, descricao, valor, parcelamento, promocao, frete,tipo,modelo,fabricante) values(:id_empresa, :nome, :imagem, :descricao, :valor, :parcelamento, :promocao, :frete,:tipo,:modelo,:fabricante)";	
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
		$query->bindValue(":tipo",$this->tipo);
		$query->bindValue(":modelo",$this->modelo);
		$query->bindValue(":fabricante",$this->fabricante);
		//se false, retorna false
		return $query->execute();
	}

	public function atualizar(){
		$sql="update produto set ".$this->montarSqlAtualizar()." where id_produto='".$this->id_produto."'";

		$query=$this->con->prepare($sql);
		//ver o tamanho da string se é maior que 5000 caracteres senão reduzir
		if(strlen($this->descricao)>5000){
				$this->descricao=substr($this->descricao, 0,5000);
		}

		return $query->execute();

	}

	public function excluir(){
		$sql="delete from produto where id_produto='".$this->id_produto."'";
		$query=$this->con->prepare($sql);
		return $query->execute();
	}


	public function montarSqlAtualizar(){
		$sql='';
		if($this->tipo!=""){
			$sql.=" tipo='".$this->tipo."',";	
		}

		if($this->modelo!=""){
			$sql.=" modelo='".$this->modelo."',";	
		}

		if($this->fabricante!=""){
			$sql.=" fabricante='".$this->fabricante."',";	
		}

		if($this->nome!=""){
			$sql.=" nome='".$this->nome."',";	
		}
		if($this->path!="" and $this->path!=NULL){
			$sql.=" imagem='".$this->path."' , ";
		}
		if($this->descricao!=""){
			$sql.=" descricao='".$this->descricao."' , ";
		}
		if($this->valor!=""){
			$sql.=" valor='".$this->valor."' , ";
		}
		if($this->parcelamento!=""){
			$sql.=" parcelamento='".$this->parcelamento."' , ";
		}

		 $sql.="  promocao='".$this->promocao."' , frete='".$this->frete."'";
		 return $sql;
	}

	function __destruct(){
		$this->con=null;
	}
}