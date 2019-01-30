const senhaOk =()=>{
	if($(".confirmarSenha")[0].value==$(".senha")[0].value){
		return true
	}else{
		return false;
	}
};