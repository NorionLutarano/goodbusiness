const telaRecuperarSenha =function(){
	$("form").attr("action","php/recuperarSenha.php");
	$("form")[0][1].classList.add("desativado")
	$("form").css({"height":"170px"});
	$(this).text("voltar tela login");
	$(this).addClass("telaLogin");
	$(".telaLogin").on("click",telaLogin);
};

const telaLogin = function(){
	$("form").attr("action","");
	$("form")[0][1].classList.remove("desativado")
	$("form").css({"height":"15rem"});
	$(this).text("recuperar senha");
	$(this).removeClass("telaLogin");
	$("#recuperarSenha").on("click",telaRecuperarSenha);
};

$("#recuperarSenha").on("click",telaRecuperarSenha);
