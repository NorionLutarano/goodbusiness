<?php
//function/validadorCnpj
//function/validadorString

class empresa{
	function __construct($empresa=""){ 
	 $this->empresa 		= $empresa;
	 $this->nome			=(isset($empresa['nome']))	 ? validarString($empresa['nome']):'';
	 $this->cnpj			=(isset($empresa['cnpj']))	 ? validarString($empresa['cnpj']):'';
	 $this->razaoSocial		=(isset($empresa['razaoSocial']))	 ? validarString($empresa['razaoSocial']):'';
	 $this->cep			=(isset($empresa['cep']))	 ? validarString($empresa['cep']):'';
	 $this->contato			=(isset($empresa['contato']))	 ? validarString($empresa['contato']):'';
	 $this->estado		=(isset($empresa['estado']))? validarString($empresa['estado']):'';
	 $this->bairro		=(isset($empresa['bairro']))? validarString($empresa['bairro']):'';
	 $this->endereco		=(isset($empresa['endereco']))? validarString($empresa['endereco']):'';
	 $this->categoria		  =(isset($empresa['categoria']))	 ? validarString($empresa['categoria']):'';
	 $this->descricao  =(isset($empresa['descricao']))? validarString($empresa['descricao']):'';
	 $this->observacao =(isset($empresa['observacao']))?validarString($empresa['observacao']):'';
	 $this->email		= (isset($empresa['email']))	 ? validarString($empresa['email']):'';
	 $this->senha		= (isset($empresa['senha']))	 ? $empresa['senha']:'';
	 $this->senha 		= hash('whirlpool', $this->senha);
	 $this->con 			= (isset($GLOBALS['con']))	? $GLOBALS['con']:$empresa['con'];
	 if(isset($empresa['email']) and isset($empresa['senha'])){
	 	$this->id=$this->getId();
	 }
	}

	public function cadastrar(){
		//veririca se cnpj já está cadastrado
		if($this->cnpjJaCadastrado($this->cnpj)){return "cnpjJáCadastrado";}
		//veririca se email já está cadastrado
		if($this->emailJaCadastrado($this->email)){return "emailJáCadastrado";}
		//verifica cnpj informado é válido
		if(!validarCnpj($this->cnpj)){return "cnpjInválido";}
		//verifica cnpj informado é válido
		if(preg_match('/[a-zA-Z]/', $this->cep)){return "cepInválido";}
		//verifica se email é válido
		if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){ return "emailInválido";}
		//cria variável com sql que será executado
		$sql ="insert into empresa(nome,cnpj,estado,bairro,endereco,categoria,email,senha,razao_social,contato,cep)values(:nome , :cnpj , :estado , :bairro , :endereco , :categoria , :email ,:senha,:razaoSocial,:contato,:cep)";

		// prepara para cadastrar empresa
		$query= $this->con->prepare($sql);
		$query->bindValue(':nome',		$this->nome);
		$query->bindValue(':cnpj',		$this->cnpj);
		$query->bindValue(':estado',	$this->estado);
		$query->bindValue(':bairro',	$this->bairro);
		$query->bindValue(':endereco',	$this->endereco);
		$query->bindValue(':categoria',	$this->categoria);
		$query->bindValue(':email',		$this->email);
		$query->bindValue(':senha',		$this->senha);
		$query->bindValue(':razaoSocial',$this->razaoSocial);
		$query->bindValue(':cep',		$this->cep);
		$query->bindValue(':contato',	$this->contato);
		return;
	}





	public function cnpjJaCadastrado($cnpj){
		//prepara o comando para executar sql
		$query=$this->con->prepare("select cnpj from empresa where cnpj=:cnpj");
		//executa o sql e informa o cnpj a ser pesquisado
		$query->execute(array('cnpj' => $cnpj));
		//retorna resultado com um array assoc
		$resultado = $query->fetch(PDO::FETCH_ASSOC);
		//se retorna falso o cnpj não foi cadastrado ainda
		if($resultado){
			return true;
		}else{
			return false;
		}
	}

	public  function emailJaCadastrado(){
		//prepara o comando para executar sql
		$query=$this->con->prepare("select email from empresa where email=:email");
		//executa o sql e informa o email a ser pesquisado
		$query->execute(array('email' => $this->email));
		//retorna resultado com um array assoc
		$resultado = $query->fetch(PDO::FETCH_ASSOC);
		//se retorna falso o email não foi cadastrado ainda
		if($resultado){
			return true;
		}else{
			return false;
		}
	}

	public function dadosLogin(){
		//cria o comando sql a ser executado
		$sql="select id_empresa, nome from empresa where email=:email and senha=:senha";
		//prepara o comando a ser executado no banco de dados
		$query=$this->con->prepare($sql);
		//set as variáveis no comando sql e executa no banco de dados
		$query->execute(array("email"=>$this->email,"senha"=>$this->senha));
		//retorna resultado com um array assoc
		$resultado = $query->fetch(PDO::FETCH_ASSOC);
		//retorna os dados do usuário se estiver tudo ok, senão retorna falso
		if($resultado){
			return $resultado;
		}else{
			return false;
		}
	}




    public function getIdEmpresa(){
    	$sql ="select id_empresa from empresa where cnpj=:cnpj";
    	$query=$this->con->prepare($sql);
    	$query->bindValue(":cnpj",$this->cnpj);
    	$query->execute();
    	$cnpj=$query->fetch(PDO::FETCH_ASSOC);
    	if($cnpj){
    		return $cnpj['id_empresa'];
    	}else{
    		return false;
    	}
    }

	public function getTipo($id){
		$sql ="select tipo from empresa where id_empresa=:id_empresa";
    	$query=$GLOBALS['con']->prepare($sql);
    	$query->bindValue(":id_empresa",$id);
    	$query->execute();
    	$tipo=$query->fetch(PDO::FETCH_ASSOC);
    	if($tipo){
    		return $tipo['tipo'];
    	}else{
    		return '';
    	}	
	}

	public function getCategoria($id){
		$sql ="select categoria from empresa where id_empresa=:id_empresa";
    	$query=$this->con->prepare($sql);
    	$query->bindValue(":id_empresa",$id);
    	$query->execute();
    	$categoria=$query->fetch(PDO::FETCH_ASSOC);
    	if($categoria){
    		return $categoria['categoria'];
    	}else{
    		return '';
    	}	
	}

	public function getDescricao($id){
		$sql ="select descricao from empresa where id_empresa=:id_empresa";
    	$query=$this->con->prepare($sql);
    	$query->bindValue(":id_empresa",$id);
    	$query->execute();
    	$descricao=$query->fetch(PDO::FETCH_ASSOC);
    	if($descricao){
    		return $descricao['descricao'];
    	}else{
    		return '';
    	}
	}    


	public function criarLinkRecuperarSenha($dado){
		$sql="insert into recuperarSenha(id_empresa,email,link,dataReset) 
		values ({$dado['id_empresa']},{$dado['email']},{$dado['link']},now())";
		$query=$this->con->prepare($sql);
		return $query->execute();
	}


	public function getDado($dado){
		$sql ="select {$dado} from empresa where id_empresa=:id_empresa";
    	$query=$this->con->prepare($sql);
    	$query->bindValue(":id_empresa",$this->id);
    	$query->execute();
    	$resultado=$query->fetch(PDO::FETCH_ASSOC);
    	if($resultado){
    		return $resultado[$dado];
    	}else{
    		return '';
    	}
	}


	public function addProdutoFornecedor($dados){
		$sql="insert into fornecedor(id_empresa,id_produtoFornecedor,id_fornecedor) values({$dados['id_empresa']},{$dados['addP']},{$dados['addF']})";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetchAll(PDO::FETCH_ASSOC);
		if($resultado){
			return 1;
		}else{
			return 0;
		}
		
	}

	public function quantidadeMeusFornecedores($id){
		$sql="select F.id_fornecedor as total from fornecedor as F where F.id_empresa={$id} group by F.id_fornecedor";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetchAll(PDO::FETCH_ASSOC);
		if($resultado){
			return count($resultado);
		}else{

			return 0;
		}

	}

	public function listarProdutoFornecedor($id){
		$sql="select F.id_produtoFornecedor as fornecedor, P.nome, P.descricao, P.valor  from fornecedor as F inner join produto as P  inner join empresa as E on P.id_produto=F.id_produtoFornecedor and F.id_empresa=E.id_empresa and F.id_empresa={'$id'}";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetch(PDO::FETCH_ASSOC);
		if($resultado){
			return $resultado;
		}else{
			return ['error'=>1];
		}
	}


	public function getId(){
		$sql="select id_empresa from empresa where email={$this->email} and senha={$this->senha}";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetch(PDO::FETCH_ASSOC);
		return ($resultado)?$resultado:'';
	}




	public function nomesFornecedores($id){
		$sql="select E.nome,E.id_empresa as id from empresa as E inner join fornecedor as F on F.id_empresa={$id['id_empresa']} and F.id_fornecedor=E.id_empresa group by E.id_empresa limit {$id['paginacao']},10"; 
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetchAll(PDO::FETCH_ASSOC);
		if($resultado){
			return $resultado;
		}else{
			return ['error'=>1];
		}

	}


	public function getInfoProdutosDesdeFornecedor($info){
		$sql="select P.nome,P.descricao,P.parcelamento, P.valor,P.id_produto as idP from fornecedor as F inner join produto as P on F.id_fornecedor={$info['idFornecedor']} and P.id_produto=F.id_produtoFornecedor and F.id_empresa={$info['idEmpresa']}";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetchAll(PDO::FETCH_ASSOC);
		if($resultado){
			return $resultado;
		}else{
			return ['error'=>1];
		}
	}

	public function removerProdutoFornecedor($info){
		$sql="delete from fornecedor where id_produtoFornecedor={$info['idProduto']} and id_empresa={$info['idEmpresa']}";
		$this->con->exec($sql);
		return;
	}

	public function getInfoDesdeFornecedor($info){
		$sql="select nome,razao_social,endereco,bairro,estado,cep,contato,email,cnpj from empresa where id_empresa={$info}";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetch(PDO::FETCH_ASSOC);
		if($resultado){
			return $resultado;
		}else{
			return ["error"=>1];		
		}
	}

	public function produtosMeuFornecedor($dados){
		$sql = "select p.nome, p.id_produto as idP from fornecedor as f inner join produto as p on f.id_empresa={$dados['ident']} and f.id_fornecedor=p.id_empresa and f.id_fornecedor={$dados['idF']} and f.id_produtoFornecedor=p.id_produto";
		$query=$this->con->prepare($sql);
		$query->execute();
		$resultado=$query->fetchAll(PDO::FETCH_ASSOC);
		return ($resultado)?$resultado:["error"=>1];
	}

	public function excluirProdutoMeuFornecedor($dados){
		$sql= "delete from fornecedor where id_empresa={$dados['idE']} and 
		id_produtoFornecedor={$dados['idP']}";
		$query=$this->con->prepare($sql);
		return ($query->execute())?"Excluido com sucesso.":json_encode(['error'=>1]);
	}

	function __destruct(){
		$this->con=null;
		unset($this->nome);
		unset($this->cnpj);
		unset($this->estado);
		unset($this->bairro);
		unset($this->endereco);
		unset($this->tipo);
		unset($this->email);
		unset($this->senha);
	}
	

 
}
