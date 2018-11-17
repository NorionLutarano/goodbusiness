<?php
//function/validadorCnpj
//function/validadorString

class empresa{
	function __construct($empresa){ 
	 $this->empresa 		= $empresa;
	 $this->nome			=(isset($empresa['nome']))	 ? validarString($empresa['nome']):'';
	 $this->cnpj			=(isset($empresa['cnpj']))	 ? validarString($empresa['cnpj']):'';
	 $this->estado		=(isset($empresa['estado']))? validarString($empresa['estado']):'';
	 $this->bairro		=(isset($empresa['bairro']))? validarString($empresa['bairro']):'';
	 $this->endereco		=(isset($empresa['endereco']))? validarString($empresa['endereco']):'';
	 $this->tipo		  =(isset($empresa['tipo']))	 ? validarString($empresa['tipo']):'';
	 $this->categoria		  =(isset($empresa['categoria']))	 ? validarString($empresa['categoria']):'';
	 $this->descricao  =(isset($empresa['descricao']))? validarString($empresa['descricao']):'';
	 $this->observacao =(isset($empresa['observacao']))?validarString($empresa['observacao']):'';
	 $this->email		= (isset($empresa['email']))	 ? validarString($empresa['email']):'';
	 $this->senha		= (isset($empresa['senha']))	 ? $empresa['senha']:'';
	 $this->senha 		= hash('whirlpool', $this->senha);
	 $this->con 			= (isset($GLOBALS['con']))	? $GLOBALS['con']:$empresa['con'];
	}

	public function cadastrar(){
		//veririca se cnpj já está cadastrado
		if($this->cnpjJaCadastrado($this->cnpj)){return "cnpjJáCadastrado";}
		//veririca se email já está cadastrado
		if($this->emailJaCadastrado($this->email)){return "emailJáCadastrado";}
		//verifica cnpj informado é válido
		if(!validarCnpj($this->cnpj)){return "cnpjInválido";}
		//verifica se email é válido
		if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){ return "emailInválido";}
		//formatar dado para cnpj
		formatar('cnpj',$this->cnpj);
		//cria variável com sql que será executado
		$sql ="insert into empresa(nome,cnpj,estado,bairro,endereco,tipo,categoria,descricao,observacao,email,senha)values(:nome , :cnpj , :estado , :bairro , :endereco ,:tipo, :categoria ,:descricao, :observacao , :email , :senha)";

		// prepara para cadastrar empresa
		$query= $this->con->prepare($sql);
		$query->bindValue(':nome',		$this->nome);
		$query->bindValue(':cnpj',		$this->cnpj);
		$query->bindValue(':estado',	$this->estado);
		$query->bindValue(':bairro',	$this->bairro);
		$query->bindValue(':endereco',	$this->endereco);
		$query->bindValue(':tipo',		$this->tipo);
		$query->bindValue(':categoria',	$this->categoria);
		$query->bindValue(':observacao',$this->observacao);
		$query->bindValue(':descricao',	$this->descricao);
		$query->bindValue(':email',		$this->email);
		$query->bindValue(':senha',		$this->senha);
		//cadastrar empresa
		$query->execute();
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
		$sql="select id_empresa from empresa where email=:email and senha=:senha";
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
