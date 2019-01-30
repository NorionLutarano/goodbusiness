/*---Filtro---*/
$("#estado").on("change",function(){$("#inputEstado")[0].value=$(this)[0].value; });
$("#bairro").on("change",function(){$("#inputBairro")[0].value=$(this)[0].value; });
$("#frete").on("change",function(){$("#inputFrete")[0].value=$(this)[0].value; });
$("#promocao").on("change",function(){$("#inputPromocao")[0].value=$(this)[0].value; });
$("#parcelamento").on("change",function(){$("#inputParcelamento")[0].value=$(this)[0].value; });
$("#tipoProduto").on("change",function(){$("#inputTipoProduto")[0].value=$(this)[0].value; });
$("#tipoLoja").on("change",function(){$("#inputTipoLoja")[0].value=$(this)[0].value; });
$("#fabricante").on("change",function(){$("#inputFabricante")[0].value=$(this)[0].value; });
$("#modelo").on("change",function(){$("#inputModelo")[0].value=$(this)[0].value; });
/*----Fim Filtro--------*/