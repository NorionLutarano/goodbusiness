<?php
function decodificar($id){	
	return substr(substr($id, 8,strlen($id)),0,-8);
}
