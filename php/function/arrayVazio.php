<?php
function arrayVazio($Array){
	foreach ($Array as $key => $value) {
		if(empty($value)){
			return true;
		}
	}
	return false;
}