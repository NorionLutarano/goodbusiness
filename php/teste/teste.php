<?php

include_once("../../autoload.php");

$empresa = new empresa([	 	 'nome' 	=> 'teste',
								 'cnpj' 	=> '91557912000114',
								 'estado'	=> 'Rj',
								 'bairro'	=> 'cavalcanti',
								 'endereco' => "rua leste 41",
								 'tipo'		=> 'loja',
								 'email'	=> 'andre@bol.com',
								 'senha' 	=> hash('whirlpool', '12345678')]);
$empresa->cadastrar();