<?php
function estaLogado($sair=false){
	if($sair){
		if(!isset($_COOKIE['ident'])){
			exit();
		}else{
			return True;
		}
	}
	if(isset($_COOKIE['ident'])){
		return True;
	}else{
		return False;
	}
}