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

	function __destruct(){
		$this->conect=null;
	}
}


