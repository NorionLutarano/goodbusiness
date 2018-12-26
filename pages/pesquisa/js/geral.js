//trata os dados vindo do servidor para ser visível para usuário sem a proteção do sqlinjection

tratarStringDoServidor($(".nome"));
tratarStringDoServidor($(".empresa"));
tratarStringDoServidor($(".descricaoProduto"));


//seta o estado pesquisado no servidor para filtro
$("#estado")[0].value=$("#inputEstado")[0].value;
$("#frete")[0].value=$("#inputFrete")[0].value;
$("#promocao")[0].value=$("#inputPromocao")[0].value;

//seta a opção certa
switch($("#inputPesquisarPor")[0].value){
	case "loja":
		$(".opcaoLoja").css({"border-bottom":"1px solid rgb(153, 153, 153)"});
	break;
	case "fornecedor":
		$(".opcaoFornecedor").css({"border-bottom":"1px solid rgb(153, 153, 153)"});
	break;
	case "produto":
		$(".opcaoProduto").css({"border-bottom":"1px solid rgb(153, 153, 153)"});
	break;
}


//corrigir largura da tela
if($('.produto').length>1){
	$('header').css({'width':'1345px'});
}