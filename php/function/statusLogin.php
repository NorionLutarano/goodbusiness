<?php
function statusLogin(){
 if(isset($_SESSION['statusLogin'])) {
  	echo $_SESSION['statusLogin'];
 	unset($_SESSION['statusLogin']);
  }
}