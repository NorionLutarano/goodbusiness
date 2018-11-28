<?php

class pesquisa{
	var $conect;
	var $paginacao;
	public function __construct($con){
		$this->conect = $con;
	}

	public function PesquisaProduto($dados,$produto,$filtro,$paginacao=["0","10"]){
	  //prepara os dados
	  $dados = implode(",",$dados);
	  //formata a string de filtro
	  $produto ="'%".$produto."%'";
	  //formata filtro
	  $filtro = $filtro? $filtro." and ": '';
	  //passa para string paginacao
	  $paginacao = implode(",",$paginacao);
	  //cria a query a ser usada
	  $sql = "select ".$dados." from produto as P inner join empresa as E on ".$filtro."E.id_empresa=P.id_empresa and P.nome like ".$produto." order by valor asc limit ".$paginacao;
	  //prepara a query
	  $query= $this->conect->prepare($sql);
	  //executa a sql
	  $query->execute();
	  //armazena o resultado
	  $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
	  //envia resultado em formato json
	  return json_encode($resultado); 
	}




	public function pesquisaProdutoFornecedor($pesquisa){
		//sql
		$sql="select P.nome from produto left join empresa where  filtro  order by valor asc;";
		//prepara os arquivos
		$pesquisa->produto="'%".$pesquisa->produto."%'";
		$pesquisa->filtro=(isset($pesquisa->filtro))?$this->filtro($pesquisa->filtro):'';
	}

	public function filtro($filtro){
 		$filtrado='';
		if(isset($filtro['estado']))$filtrado.="estado='".$filtro['estado']."' and ";
		if(isset($filtro['bairro']))$filtrado.="bairro='".$filtro['bairro']."' and ";
		if(isset($filtro['tipo']))$filtrado.="tipo='".$filtro['tipo']."' and ";
		if(isset($filtro['categoria']))$filtrado.="categoria='".$filtro['categoria']."' and ";
		if(isset($filtro['frete']))$filtrado.="frete='".$filtro['frete']."' and ";
		if(isset($filtro['promocao']))$filtrado.="promocao='".$filtro['promocao']."' and ";
		if(isset($filtro['parcelamento']))$filtrado.="parcelamento='".$filtro['parcelamento']."' and ";
		if(trim(substr($filtrado,strlen($filtrado)-4,strlen($filtrado)))=="and")
			return trim(substr($filtrado,0,strlen($filtrado)-4));
		return $filtrado;
	}

	function __destruct(){
		$this->conect=null;
	}
}

