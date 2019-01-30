<?php

function consultaVazia($resultado,$mensagem,$paginacao=""){
	 if(empty($resultado) and !empty($paginacao)){
	 	echo "not";
	 	return true;
	 }
	if($resultado===false or empty($resultado)){ 
	 		echo $mensagem;
	 	return true;
	 }
};


function menuLogado(){
	if(!isset($_SESSION['empresa']['id_empresa'])){
		echo "<a href='/pages/cadastrar/'>Cadastrar</a>
			 <a href='/pages/login/'  class='login'>Fazer Login</a>";
	}else{
		echo "<a  class='login'>Painel</a>";
	}
}