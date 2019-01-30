$("#formAdicionarFornecedor").on("submit",function(e){
	e.preventDefault();
	$.get('php/cadastrarFornecedor.php',$("#formAdicionarFornecedor form").serialize(),function(resposta){
		$("info").removeClass("desativado");
		$("info").text("");
		if(resposta){
			aviso("Cadastrado com sucesso.");
		}else{
			aviso("Servidor em manutenção.");
		}

	});
});