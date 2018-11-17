<?php

function usuarioEstaLogado() {
	if (isset($_SESSION['ultima_atividade']) && (time() - $_SESSION['ultima_atividade'] > 3600)) {

	    // última atividade foi mais de 60 minutos atrás
	    session_unset();     // unset $_SESSION  
	    session_destroy();   // destroindo session data 
	}
	$_SESSION['ultima_atividade'] = time(); // update da ultima atividade
}