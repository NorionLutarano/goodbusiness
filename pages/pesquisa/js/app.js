
//--------------Funções------------------
//tratar string
const tratarString=(String="")=>{
  String=String.replace("/1#0/","#");
  String=String.replace("/3#0/","/*");
  String=String.replace("/4#0/","*/");
  String=String.replace("/5#0/","--");
  String=String.replace("/6#0/","=");
  String=String.replace("/7#0/","!");
  String=String.replace("/8#0/","or");
  String=String.replace("/9#0/","<script>");
  return String;
};



const tratarStringDoServidor=(Tag="")=>{
	if(Tag==""){
		console.log("Nenhum parametro passado, função tratarStringDoServidor.");
		return;
	}
	if(!Tag.length){return;}
	for (let i = 0; i <= Tag.length - 1; i++) {
		let texto=Tag[i].innerText;
		Tag[i].innerText="";
		Tag[i].innerText=tratarString(texto);
	}
};






//-------------Fim Funções-------------------//trata os dados vindo do servidor para ser visível para usuário sem a proteção do sqlinjection

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
if($('.produto').length>1)$('header').css({'width':'1345px'});/*---Filtro---*/

	$(".pesquisarPor").css({"border-bottom":"0"});
	switch($("#inputPesquisarPor").value){
		case "produto":
			$(".opcaoProduto").css({"border-bottom":"1px solid white"});
		break;

		case "fornecedor":
			$(".opcaoFornecedor").css({"border-bottom":"1px solid white"});
		break;

		case "lojas":
			$(".opcaoLoja").css({"border-bottom":"1px solid white"});
		break;
		default:
			$(".opcaoProduto").css({"border-bottom":"1px solid white"});
		break;
	}
	


$("#estado").on("change",function(){$("#inputEstado")[0].value=$(this)[0].value; });
$("#bairro").on("change",function(){$("#inputBairro")[0].value=$(this)[0].value; });
$("#frete").on("change",function(){$("#inputFrete")[0].value=$(this)[0].value; });
$("#promocao").on("change",function(){$("#inputPromocao")[0].value=$(this)[0].value; });
$("#parcelamento").on("change",function(){$("#inputParcelamento")[0].value=$(this)[0].value; });
$("#tipoProduto").on("change",function(){$("#inputTipoProduto")[0].value=$(this)[0].value; });
/*------------*//*--Header--*/
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
//-------------VerEmpresa------------

$(".produto").on("click",function(){
	$(".listaProdutos").css({"padding-top":"0","width":"1360px"});
	$(".filtro").addClass("desativado");
	$(".estande").css({"display":"none"});
	$("#info").removeClass("desativado");
	if($(".listaProdutos").height()>545){ $("header").css({"width":"1345px"}); }
});


$("#info img").on("click",function(){
	$(".listaProdutos").css({"padding-top":"3.2rem","width":"1100px"});
	$(".filtro").removeClass("desativado");
	$(".estande").css({"display":"block"});
	$("#info").addClass("desativado");
	if($(".listaProdutos").height()>545){ $("header").css({"width":"1345px"}); }
});
//-------------Fim verEmpresa---------