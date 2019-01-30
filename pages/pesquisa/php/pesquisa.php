<?php



require_once("carregarLib.php");

$_GET=arrayValidarString(arrayNotEmpty($_GET));
//iniciar instância de pesquisa
$pesquisa= new pesquisa();

$_GET['paginacao']=(isset($_GET['paginacao']))?intval($_GET['paginacao']):0;

if($_GET['pesquisarPor']==="produto"){
	//se o usuário não pesquisou nada termina o script
	if(!isset($_GET['pesquisa']) or empty($_GET['pesquisa'])){
		return;
	}
	$resultado=$pesquisa->produto($_GET);
	
	if(consultaVazia($resultado,"<h1>Sem resultado</h1>")){
		return;
	}
	
	$produto="";
	foreach ($resultado as $key => $value) {
	 	if($value===false){ return;}
				$produto.="<div class='produto'  id='".$value['id_produto']."' data-cat='pro'>
						<img src='".$value['imagem']."'>
						<div class='infoProduto'>	
							<span class='nome'>".$value['nome']."</span>
							<span class='empresa'>por ".$value['nomeEmpresa']."</span>
							<span class='descricaoProduto'>".$value['descricao']."</span>
							<span class='valor'>".$value['valor']."</span>
						</div>
					</div>";
	}
	echo $produto;
	return;
}




if($_GET['pesquisarPor']==="estabelecimento" or
   $_GET['pesquisarPor']==="loja" or
   $_GET['pesquisarPor']==="fornecedor"){
	
	if($_GET['pesquisarPor']==="fornecedor"){
		$resultado=$pesquisa->fornecedor($_GET);
	}else{
		$resultado=$pesquisa->empresa($_GET);

	}
	

	if(consultaVazia($resultado,"<h1>{$_GET['pesquisarPor']} ainda sem cadastro</h1>")){
		return;
	}

	$estabelecimento="";
	foreach ($resultado as $key => $value) {
		$estabelecimento.="<div class='produto' id='".$value['id_empresa']."'' data-cat='emp'>
							<img src='".$value['imagem']."'>
						<div class='infoProduto'>	
							<span class='nome'>".$value['nomeEmpresa']."</span>
							<span class='empresa'>".$value['endereco']."</span>
							<span class='descricaoProduto'>".$value['descricao']."</span>
						</div>
					</div>";	
	}

	echo $estabelecimento;
	return;
}











