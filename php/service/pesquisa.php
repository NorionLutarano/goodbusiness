<?php

class pesquisa{
	public function __construct(){
		$this->con = new pdo("mysql:host=127.0.0.1;dbname=goodBusiness;","temp","123");
	}

	public function produto($dados){
	  $dados['paginacao']=(isset($dados['paginacao']) and $dados['paginacao']!=0)?$dados['paginacao']:0;
	  //cria base comando sql
	  $sql="select id_produto,P.imagem,P.nome,valor, E.nome as nomeEmpresa, P.descricao
	  from produto as P inner join empresa as E
	  on E.id_empresa=P.id_empresa filtro";
	  $sql=str_replace('filtro',$this->filtroAtualizado($dados),$sql);
	  $sql=substr($sql,0,strripos($sql,"and")-1)."  limit {$dados['paginacao']},10";
	  $query=$this->con->prepare($sql);
	  if($query->execute()){
	  	return $query->fetchAll(PDO::FETCH_ASSOC);
	  }else{
	  	return false;
	  }
		
	}


	public function empresa($dados){
	  $dados['paginacao']=(isset($dados['paginacao']) and $dados['paginacao']!=0)?$dados['paginacao']:0;
	  //cria base comando sql
	  $sql="select nome as nomeEmpresa,imagem,descricao,endereco 
	  from empresa as E
	  where filtro";
	  $sql=str_replace('filtro',  $this->filtroAtualizado($dados),$sql);
	  $sql=str_replace('where and',"where ",$sql);
	  $sql=substr($sql,0,strripos($sql,"and")-1)."  limit {$dados['paginacao']},10";
	  $query=$this->con->prepare($sql);
	  if($query->execute()){
	  	return $query->fetchAll(PDO::FETCH_ASSOC);
	  }else{
	  	return false;
	  }


	}




	public function pesquisaProdutoFornecedor($pesquisa){
		//sql
		$sql="select P.nome,P.imagem,P.valor,P.id_produto as produto,P.id_empresa as empresa from produto as P inner join empresa as E on  filtro P.id_empresa=E.id_empresa and not P.id_empresa={$pesquisa['id']} order by valor asc limit quantidade,20";
		//prepara os arquivos
		//substituir string filtro
		$sql=str_replace('filtro', $this->filtro($pesquisa), $sql);
		$sql=str_replace('quantidade', intval($pesquisa['quantidade']), $sql);
		//prepara
		$query=$this->con->prepare($sql);
		//executa
		if(false==$query->execute()){return ["error"=>"Servidor em manutenção #801"];}
		//retorna o resultado
		return $query->fetchAll();
	}


	public function obterDadosProdutoFornecedor($dados){
		$sql="select E.id_empresa as iddF,P.id_produto as iddP, E.nome as nomeEmpresa, cnpj, E.imagem as imagemEmpresa, estado, bairro, endereco, categoria, E.descricao, observacao,contato, P.nome as nomeProduto, P.imagem as imagemProduto, P.descricao,valor,parcelamento,frete from produto as P inner join empresa as E on E.id_empresa=P.id_empresa and not P.id_empresa={$dados['id_empresa']} and id_produto={$dados['idP']}";
		$query=$this->con->prepare($sql);
		if(false==$query->execute()){return ["error"=>"Servidor em manutenção #802"];}
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
		return $filtrado;

	}

	public function filtroAtualizado($filtro){
		$filtrado='';
		if(isset($filtro['pesquisarPor'])){
			if($filtro['pesquisarPor']=="produto"){
				$filtrado.="categoria='loja' and ";
		 		$filtrado.="P.nome like '%".$filtro['pesquisa']."%' and ";
				if(isset($filtro['tipoProduto']))$filtrado.="P.tipo='".$filtro['tipoLoja']."' and ";
			}

			if(  $filtro['pesquisarPor']==="loja" or
				 $filtro['pesquisarPor']==="estabelecimento" or
				 $filtro['pesquisarPor']==="fornecedor"){
		 			if(isset($filtro['pesquisa']))$filtrado.=" E.nome like '%".$filtro['pesquisa']."%' and ";	
					if(isset($filtro['tipoLoja']))$filtrado.="E.tipo='".$filtro['tipoLoja']."' and ";
					if(isset($filtro['pesquisarPor']))
					 $filtrado.="E.categoria='".$filtro['pesquisarPor']."' and ";
			}

		}

		if(isset($filtro['estado']))$filtrado.="estado='".$filtro['estado']."' and ";
		if(isset($filtro['bairro']))$filtrado.="bairro='".$filtro['bairro']."' and ";
		if(isset($filtro['categoria']))$filtrado.="categoria='".$filtro['categoria']."' and ";
		if(isset($filtro['frete']))$filtrado.="frete='".$filtro['frete']."' and ";
		if(isset($filtro['promocao'])){
			if($filtro['promocao']===0){
				$filtrado.="promocao is null and ";
			}else{
				$filtrado.="promocao is not null and ";
			}
		}
		if(isset($filtro['parcelamento']))$filtrado.="parcelamento='".$filtro['parcelamento']."' and ";
		
		if(empty($filtrado))return '';
		
		return "and ".$filtrado;
		
	}
	

	function __destruct(){
		$this->con=null;
	}
}

