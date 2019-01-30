//---------------Geral
//trata os dados vindo do servidor para ser visível para usuário sem a proteção do sqlinjection

tratarStringDoServidor($(".nome"));
tratarStringDoServidor($(".empresa"));
tratarStringDoServidor($(".descricaoProduto"));


//seta o estado pesquisado no servidor para filtro
$("#estado")[0].value=$("#inputEstado")[0].value;
$("#frete")[0].value=$("#inputFrete")[0].value;
$("#promocao")[0].value=$("#inputPromocao")[0].value;



//corrigir largura da tela
if($('.produto').length>1){
	$('header').css({'width':'1345px'});
}

//setar filtro de acordo com a pesquisa do usuário como: "fornecedor,lojas,produto"
if($("#inputPesquisarPor")[0].value!="produto"){
	$(".opcaoFiltroProduto").css({"display":"none"});
}else{
	$(".opcaoFiltroProduto").css({"display":"block"});
}


//minima o tamanho de caracteres na descrição inicial da pesquisa
if(navigator.userAgent.indexOf("Mobile")!=-1){	
	for(let contador=0;contador<$(".descricaoProduto").length;contador++){
		if($(".descricaoProduto")[contador].innerText.length>770){
			$(".descricaoProduto")[contador].innerText=$(".descricaoProduto")[contador].innerText.substring(0,770)+"...";
			console.log('1');
		
		}else{
			if($(".descricaoProduto")[contador].innerText.length>200){
				$(".descricaoProduto")[contador].innerText=$(".descricaoProduto")[contador].innerText.substring(0,200)+"...";
			}
			console.log(2);
		}
	}
};

//deixa visível a div de paginação se ela estiver disponível
if($(".produto").length==10 || $("#inputPaginacao")[0].value=="not"){
	$("#paginacao").removeClass("desativado");
}

//------------Fim geral
