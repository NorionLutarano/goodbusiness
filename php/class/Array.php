<?php


	 function arrayNotEmpty($Array){
		foreach ($Array as $key => $value) {
			if(empty($value)){
				unset($Array[$key]); 
				continue;
			}
		}
		return $Array;
	}