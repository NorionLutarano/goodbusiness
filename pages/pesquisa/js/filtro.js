/*---Filtro---*/

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
/*------------*/