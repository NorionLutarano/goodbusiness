const telaRecuperarSenha =function(){
	$("form").attr("action","php/recuperarSenha.php");
	$("form")[0][1].classList.add("desativado");
	$("form").css({"height":"170px"});
};

const telaLogin = function(){
	$("form").attr("action","");
	$("form")[0][1].classList.remove("desativado");
	$("form").css({"height":"15rem"});
};

const escolherForm= function(){
	if(!$(this).attr("recuperar")){
		telaRecuperarSenha();
		$(this).attr("recuperar","1");
		$(this).text("voltar tela login");
	}else{
		telaLogin();
		$(this).removeAttr("recuperar");
		$(this).text("recuperar senha");
	}
}

$("#tela").on("click",escolherForm);
