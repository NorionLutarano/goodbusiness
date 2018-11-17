<?php

function conferirStatusLogin(){
	if(!isset($_SESSION['empresa'])) {
		header("Location: /");
		return;
	}
}