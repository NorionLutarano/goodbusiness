/*--Header--*/
$(".pesquisarPor").css({"border-bottom":"0"});




switch($("#inputPesquisarPor")[0].value){
	case "fornecedor":
		$(".opcaoFornecedor").css({"border-bottom":"1px solid #999"});	
		$(".opcaoFiltroProduto").addClass("desativado");
	break;

	case "produto":
		$(".opcaoProduto").css({"border-bottom":"1px solid #999"});
		$(".opcaoFiltroLoja").addClass("desativado");
	break;

	case "loja":
		$(".opcaoLoja").css({"border-bottom":"1px solid #999"});
		$(".opcaoFiltroLoja").css({"display":"block"});
		$(".opcaoFiltroProduto").addClass("desativado");
	break;

	case "estabelecimento":
		$(".opcaoEstabelecimento").css({"border-bottom":"1px solid #999"});
		$(".opcaoFiltroLoja").css({"display":"block"});
		$(".opcaoFiltroProduto").addClass("desativado");
	break;
}


$(".pesquisarPor").on("click",function(){
	$(".pesquisarPor").css({"border-bottom":"0"});
	$("#inputPesquisarPor")[0].value=$(this).text().toLowerCase();
	$(this).css({"border-bottom":"1px solid #999"});

	if($("#inputPesquisarPor")[0].value=="lojas")$("#inputPesquisarPor")[0].value="loja";

	if($(this).text().toLowerCase()=="produto"){
		$(".opcaoFiltroProduto").css({"display":"block"});
		$(".opcaoFiltroLoja").css({"display":"none"});		
	}

	if($(this).text().toLowerCase()=="lojas" || $(this).text().toLowerCase()=="estabelecimento"){
		$(".opcaoFiltroProduto").css({"display":"none"});
		$(".opcaoFiltroLoja").css({"display":"block"});
	}

	if($(this).text().toLowerCase()=="fornecedor"){
		$(".opcaoFiltroLoja").css({"display":"none"});
		$(".opcaoFiltroProduto").css({"display":"none"});

	}
});
/*--Fim Header--*/