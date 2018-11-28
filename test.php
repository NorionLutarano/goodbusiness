<?php

include_once("autoload.php");

 function filtro($filtro){
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

 echo filtro(["bairro"=>"rio de janeiro","estado"=>'rj',"promocao"=>1,"frete"=>0,"categoria"=>"loja"])."\n";