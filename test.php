<?php
function decodificar($id){	
	return substr(substr($id, 8,strlen($id)),0,-8);
}



function codificar($id){
	return random_int(10000000, 99999999).$id.random_int(10000000, 99999999);
}


function usuarioEstaLogado(){
 return isset($_COOKIE['logado']) and $_COOKIE['logado']===sha1(decodificar($_COOKIE['ident']).$_SERVER['REMOTE_ADDR']."30");
};




	echo str_replace('/pages/usuario','', "/var/www/html/pages/usuario/imgsEmpresa");



	echo "<hr> <br> ainda";