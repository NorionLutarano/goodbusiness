<?php
require_once("../../autoload.php");
//verifica algum produto foi pesquisado
if(!$_GET['produto']){echo "<h4>Nenhum produto foi pesquisado</h4>"; return;}
else{ $_GET['produto']=validarString($_GET['produto']);}

//cria variável filtro, se nenhum filtro for passado ficará false
$filtro=false;
//verifica os filtros passados
if( isset($_GET['endereco'])     and !empty($_GET['endereco']))
	{$filtro=" endereco^¨&".$_GET['endereco']."¨&";}

if(	isset($_GET['frete'])        and !empty($_GET['frete']))
	{$filtro.=" and frete^1";}

if(	isset($_GET['parcelas'])     and !empty($_GET['parcelas']))
	{$filtro.=" and parcelas^¨&".$_GET['parcelas']."¨&";}

if(	isset($_GET['promocao'])     and !empty($_GET['promocao']))
	{
		if($_GET['promocao']=='true')
			{$filtro.="  and promocao is not null ";}
		else{$filtro.="  and promocao is null "; }
	}

if(	isset($_GET['categoria'])         and !empty($_GET['categoria']))
	{$filtro.=" and categoria^¨&".$_GET['categoria']."¨&";}
	
//se filtro for passado irá remover caracteres inválidos
if($filtro){
	//irá formatar a string e irá remover ^ por = e ¨& por '
	$filtro=validarString($filtro);
}


//irá obter lista de produtos
$lista=produto::getListaProduto($_GET['produto'],$filtro);
//irá conferir a resposta
switch ($lista) {
	//nenhum resultado foi encontrado
	case 0:
		echo "Esse produto ainda não foi cadastrado.";
	break;
	//houve error na execução da query no banco de dados
	case "error":
		//echo "Servidor de manutenção.";
	break;
	default:
		$contagem=0;
		//irá retorna html com os produtos
		foreach ($lista as $produtos) {

			if(isset($produtos['imagemProduto'])){
				$produtos['imagemProduto']="<img src='".$produtos['imagemProduto']."' alt='' class='imagem_produto'>";
			}else{
				$produtos['imagemProduto']='';
			}
			
			echo "<div class='produto'>"
						.$produtos['imagemProduto'].
						"<span class='nome_produto'>".$produtos['nomeProduto']."</span>
						<span  class='valor_produto'>".$produtos['valor']."</span>
						<span  class='empresa'>".$produtos['nomeEmpresa']."</span>
						<form>
							<input name='cnpj'    value='".$produtos['cnpj'] ."'>
							<input name='produto' value='".$produtos['id_produto'] ."'>
						</form>
					</div>";

		if($contagem==15) {
			$quantidadeProduto=$produtos['quantidadeProduto'];
			echo "<button  ng-class='{addMais:".$quantidadeProduto.">15}' >+</button>";
			unset($produtos);
			unset($lista);
			break;
		}


		$contagem++;
		}
	break;
}
