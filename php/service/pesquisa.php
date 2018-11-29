<?php

class pesquisa{
	public function __construct(){
		$this->conect = $GLOBALS['con'];
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
		$sql="select P.nome,P.imagem,P.valor,P.parcelamento,P.descricao,P.promocao,P.frete from produto as P inner join empresa on  filtro  order by valor asc limit quantidade,20";
		//prepara os arquivos
		//substituir string filtro
		$sql=str_replace('filtro', $this->filtro($pesquisa), $sql);
		$sql=str_replace('quantidade', intval($pesquisa['quantidade']), $sql);
		//prepara
		$query=$this->conect->prepare($sql);
		//executa
		if(false==$query->execute()){return ["error"=>"Servidor em manutenção #801"];}
		//retorna o resultado
		return $query->fetchAll();
	}

	public function filtro($filtro){
 		$filtrado='';
 		if(isset($filtro['nome']))$filtrado.=" P.nome like '%".$filtro['nome']."%' and ";
		if(isset($filtro['estado']))$filtrado.="estado='".$filtro['estado']."' and ";
		if(isset($filtro['bairro']))$filtrado.="bairro='".$filtro['bairro']."' and ";
		if(isset($filtro['tipo']))$filtrado.="tipo='".$filtro['tipo']."' and ";
		if(isset($filtro['categoria']))$filtrado.="categoria='".$filtro['categoria']."' and ";
		if(isset($filtro['frete']))$filtrado.="frete='".$filtro['frete']."' and ";
		if(isset($filtro['promocao']))$filtrado.="promocao='".$filtro['promocao']."' and ";
		if(isset($filtro['parcelamento']))$filtrado.="parcelamento='".$filtro['parcelamento']."' and ";
		if(isset($filtro['limit']))$filtrado.="limit='".$filtro['limit']."' and ";
		if(trim(substr($filtrado,strlen($filtrado)-4,strlen($filtrado)))=="and")
		return trim(substr($filtrado,0,strlen($filtrado)-4));

	}

	function __destruct(){
		$this->conect=null;
	}
}

