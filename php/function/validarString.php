<?php

function validarString($String=null){
	if(!$String) return false;
	$String= str_replace("#","/1#0/",$String);
	$String= str_replace("/*","/3#0/",$String);
	$String= str_replace("*/","/4#0/",$String);
	$String= str_replace("--","/5#0/",$String);
	$String= str_replace("=","/6#0/",$String);
	$String= str_replace("!","/7#0/",$String);
	$String= str_replace(" or ","/8#0/",$String);
	$String= str_replace("<script>","/9#0/",$String);
	return $String;
}

function removerMoeda($moeda){
	return str_replace("R$","",$moeda);
}


function arrayValidarString($Array){
	foreach ($Array as $key => $value) {
		$Array[$key]=validarString($value);
	}
	return $Array;
}

