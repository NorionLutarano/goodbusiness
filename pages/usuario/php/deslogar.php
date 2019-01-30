<?php
	session_start();
	if(isset($_SESSION['empresa'])){session_destroy();header("Location: /");}
	header("Location: /");