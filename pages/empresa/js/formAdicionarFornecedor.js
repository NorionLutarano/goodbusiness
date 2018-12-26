$("#formAdicionarFornecedor").on("submit",function(e){
	e.preventDefault();
	$.get('php/cadastrarFornecedor.php',$("#formAdicionarFornecedor").serialize(),function(resposta){
		$("info").removeClass("desativado");
		$("info").text("");
		if(resposta){
			$("info").text("Cadastrado com sucesso.");
			$("info").addClass("Sucess");
		}else{
			$("info").addClass("Error");
			$("info").text("Servidor em manutenção.");
		}
		setTimeout(()=>{
			$("info").removeClass("Error Sucess");
			$("info").text("");
			$("#formAdicionarFornecedor voltar").click();
		},3000);
	});
});