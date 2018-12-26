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

	case "lojas":
		$(".opcaoLoja").css({"border-bottom":"1px solid #999"});
		$(".opcaoFiltroProduto").addClass("desativado");
	break;
}


$(".pesquisarPor").on("click",function(){
	$(".pesquisarPor").css({"border-bottom":"0"});
	$("#inputPesquisarPor")[0].value=$(this).text().toLowerCase();
	$(this).css({"border-bottom":"1px solid #999"});
	if($("#inputPesquisarPor")[0].value=="lojas")$("#inputPesquisarPor")[0].value="loja";
});
/*--Fim Header--*/