<?php

	function codificar($id){
		return random_int(10000000, 99999999).$id.random_int(10000000, 99999999);
	}