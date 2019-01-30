
//-------------infoPesquisaDetalhada------------
class tabela{
	static addDadosTabela(tabela,dados){
		tabela.html(tabela.html()+dados);
	}
}


$(".produto").on("click",mostrarDadosTabela);


//fechar tabela de informação e voltar para tabela de produtos ou empresa
$("#info img").on("click",function(){
	$(".listaProdutos").css({"padding-top":"3.2rem","width":"1100px"});
	$(".filtro").removeClass("desativado");
	$(".estande").css({"display":"block"});
	$("#info").addClass("desativado");
	const width=$("header").width();
	if($(".listaProdutos").height()>545){
		$("header").css({"width":"1345px"});
	}else{
		$("header").css({"width":width+"px"});
	}
	$("#info a")[0].click();


});
//-------------Fim infoPesquisaDetalhada---------