<?php

	function existeChaves($Array,$chaves){
			if(count($Array)<count($chaves)){
				return false;
			}
			forEach($chaves as $key => $value) { 
					if(!isset($Array[$value])) return False;
			}
			return True;
	}
