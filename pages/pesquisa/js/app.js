
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




const isset = accessor => {
  try {
    // Note we're seeing if the returned value of our function is not
    // undefined
    return typeof accessor() !== 'undefined';
  } catch (e) {
    // And we're able to catch the Error it would normally throw for
    // referencing a property of undefined
    return false;
  }
};



const mostrarDadosTabela=function(){
  $(".listaProdutos").css({"padding-top":"0","width":"1360px"});
  $(".filtro").addClass("desativado");
  $(".estande").css({"display":"none"});
  $("#info").removeClass("desativado");
  if($(".listaProdutos").height()>545){ $("header").css({"width":"1345px"}); }
  if($("#info").height()<545){$("header").css({"width":"1360px"});}
  $("#info table").html("");

  $("#info a").attr("href","#"+$(this).attr("id"));
  $.get("php/obterDadosDetalhados.php",{data:$(this).attr("id"),cat:$(this).attr("data-cat")},function(resposta){
    if(typeof resposta ==="object"){
      $("#info table").html("<h1>Error de conexão.</h1>");
      return;
    }
    resposta=JSON.parse(resposta);
    key=Object.getOwnPropertyNames(resposta);
    tabela.addDadosTabela($("#info table"),"<caption>"+resposta.nome+"</caption>");   
    key.forEach(function(key,valor,array){
      switch(key){

        case "parcelamento":
          if (resposta.parcelamento==="0"){
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>sem parcelamento</td></tr>");   
          }else{
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>"+resposta[key]+"</td></tr>");
          }
          break;
        case "promoção":
          if (resposta.promoção==="0"){
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>sem promoção</td></tr>");   
          }else{
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>"+resposta[key]+"</td></tr>");
          }
        break;
        case "frete":
          if(resposta.frete==="0"){
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>sem frete</td></tr>");
          }else{
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>com frete</td></tr>");
          }
        break;
        case "valor":
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>R$ "+resposta[key]+"</td></tr>");         
        break;
        default:
          if(resposta[key]!=undefined && resposta[key]!=""){
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>"+resposta[key]+"</td></tr>");
          }else{
            tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td> Não informado.</td></tr>");
          }
        break;
      }
    });
    if($("#info").height()>545){
      $("header").css({"width":"1345px"});
    }

  });
};


//-------------Fim Funções-------------------//---------------Geral
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
$("form").on("submit",function(e){
	$("#inputPaginacao")[0].value="";
});/*---Filtro---*/
$("#estado").on("change",function(){$("#inputEstado")[0].value=$(this)[0].value; });
$("#bairro").on("change",function(){$("#inputBairro")[0].value=$(this)[0].value; });
$("#frete").on("change",function(){$("#inputFrete")[0].value=$(this)[0].value; });
$("#promocao").on("change",function(){$("#inputPromocao")[0].value=$(this)[0].value; });
$("#parcelamento").on("change",function(){$("#inputParcelamento")[0].value=$(this)[0].value; });
$("#tipoProduto").on("change",function(){$("#inputTipoProduto")[0].value=$(this)[0].value; });
$("#tipoLoja").on("change",function(){$("#inputTipoLoja")[0].value=$(this)[0].value; });
$("#fabricante").on("change",function(){$("#inputFabricante")[0].value=$(this)[0].value; });
$("#modelo").on("change",function(){$("#inputModelo")[0].value=$(this)[0].value; });
/*----Fim Filtro--------*/$("#paginacao").on("click",function(){
	$("#inputPaginacao")[0].value=$(".produto").length;
	$.get("php/pesquisa.php",$("form").serialize(),function(resposta){
		if(resposta.length<100){
			$("#paginacao").addClass("desativado");
		}else{
			$("#paginacao").before(resposta);
			$(".produto").on("click",mostrarDadosTabela);
		}
	});

});/*--Header--*/
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