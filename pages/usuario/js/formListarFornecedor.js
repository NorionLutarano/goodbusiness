const quantidadeFornecedor=(tag)=>{
	$.ajax({
		url:"php/quantidadeMeusFornecedores.php",
	}).then(function(resposta){
			tag.text(resposta);
	});

};

const mostrarListaFornecedores=function(resposta,inicio=0){
	for (let i = inicio,x=0; i < (inicio+resposta.length); i++,x++) {
				adicionarElemento($("#formListarFornecedor .painel"),criarDiv("fornecedores"));
				adicionarElemento($("#formListarFornecedor .painel .fornecedores").last(),criarDiv("nomeFornecedor"));
				$(".nomeFornecedor")[i].innerText=resposta[x].nome;
				$(".nomeFornecedor")[i].innerHTML=$(".nomeFornecedor")[i].innerText+"<img src='/imgs/menu.png'/>";
				$(".nomeFornecedor")[i].setAttribute("idF",resposta[x].id);
				$(".nomeFornecedor")[i].setAttribute("buscar","0");
				$(".nomeFornecedor")[i].setAttribute("ativo","0");
			}
};

const setaBaixoFormFornecedor = function(){
	if(!($(".painel .fornecedores").length%10) && parseInt($("quantidadefornecedor").text())>10) {
		$("#formListarFornecedor .setaBaixo").css("display","flex");
	}
};

$("#listarFornecedor ").on("click",function(){
	quantidadeFornecedor($("quantidadeFornecedor"));
	$("#formListarFornecedor .painel").html("");
	$.ajax({
		url:"php/nomesFornecedores.php",
		success:function(resposta){
			if(!isset(()=>resposta)){ aviso("Servidor em manutenção."); return; }
			mostrarListaFornecedores(JSON.parse(resposta));
			$(".nomeFornecedor").on("click",nomeProdutosFornecedor);
		}
	});
	setTimeout(setaBaixoFormFornecedor,1000);

	
});



$("#formListarFornecedor .confirmacao button").on("click",function(){
	if(!isset(()=>$(this).attr("idP"))){
		$("#formListarFornecedor .confirmacao button").parent().find("h4").text("Error de carregamento.");
	}
	$("#formListarFornecedor .confirmacao ").addClass("desativado");
	$.post("php/excluirProdutoFornecedor.php",{idP:$(this).attr("idP")},()=>$("#listarFornecedor").click());
});



$("#formListarFornecedor .setaBaixo").on("click",function(){
	if($(".painel .fornecedores").length == parseInt($("quantidadefornecedor").text())) {
	 $(this).css("display","none");
	 return;
	}

	$.ajax({
		url:"php/nomesFornecedores.php",
		method:'get',
		data:'paginacao='+$(".fornecedores").length,
		success:function(resposta){
			resposta=JSON.parse(resposta);
			if(isset(()=>resposta.error)){
				aviso("Servidor em manutenção.");
			}
			mostrarListaFornecedores(resposta,$(".fornecedores").length);
			$(".nomeFornecedor").on("click",nomeProdutosFornecedor);
			setaBaixoFormFornecedor();
		}
	});
});

$("#formAdicionarFornecedor voltar").on("click",function(){
	$("#formProcurarFornecedor").removeClass("desativado");
	$("#formAdicionarFornecedor").addClass("desativado");
});