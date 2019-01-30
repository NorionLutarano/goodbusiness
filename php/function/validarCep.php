<?php

function validarCep($cep){
	return preg_match(/[a-zA-Z]/,$cep);
}