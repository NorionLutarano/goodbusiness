<?php

function usuarioEstaLogado(){
 return isset($_COOKIE['logado']) and $_COOKIE['logado']===sha1(decodificar($_COOKIE['ident']).$_SERVER['REMOTE_ADDR']."30");
}