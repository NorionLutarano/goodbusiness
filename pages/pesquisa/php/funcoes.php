<?php

function retornaVazio($resultado,$mensagem){
	if($resultado===false or empty($resultado)){ 
	 		echo $mensagem;
	 	return;
	 }
};

