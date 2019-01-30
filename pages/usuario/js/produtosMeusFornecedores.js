const deletarProdutoFornecedor = function(){
	$.ajax({
		url:"php/deletarProdutoFornecedor.php",
		method:"get",
		data:"idF="+$(this).attr("idf")+"&idP="+$(this).attr("idp"),
		success:function(resposta){
			if(isset(()=>resposta.error)) {
				aviso("servidor em manutenção.");
				return;
			}
			aviso(resposta);

		}
	});

	
	var quantidade=$("img[idp="+$(this).attr("idp")+"]").closest(".fornecedores").find("tr").length;
	if(quantidade=="1"){
		$("img[idp='"+$(this).attr("idp")+"']").closest(".fornecedores").remove();
		$("quantidadeFornecedor") .text(parseInt($("quantidadeFornecedor").text())-1);
	}else{
		$("img[idp='"+$(this).attr("idp")+"']")
			.closest(".fornecedores")
			.find(".nomeFornecedor")
			.attr("quantidade",parseInt(quantidade)-1);
	}
			
	$("img[idp='"+$(this).attr("idp")+"']").closest("tr").remove();
};

const desajaExcluirProdutoFornecedor=function(){
	let idF=$(this).closest('.fornecedores').find(".nomeFornecedor").attr("idf");
	let idP = $(this).attr("idP");
	aviso("Deseja de fato excluir esse produto",
		  "<button style=' background-color:#0fA;'>\
		  excluir\
		  </button>");

	$("#aviso button").attr("idp",idP);
	$("#aviso button").attr("idf",idF);	
	$("#aviso button").on("click",deletarProdutoFornecedor);
};

const nomeProdutosFornecedor =function(){
	var tag = $(this);
	var count=0;
	if ($(this).attr("buscar")=="0") {
		$.ajax({
			method:'get',
			data:"idF="+$(this).attr('idf'),
			url:'php/produtosMeusFornecedores.php',
			success: function(resposta){
				resposta = JSON.parse(resposta);
				if(isset(()=>resposta.error)){
					aviso("servidor em manutenção.");
					return;
				}
				tag.parent().append(table('tableProduto'));
				
				resposta.forEach(function(valor){
					tag.parent().find("table").append("\
						<tr>\
							<th>"+valor.nome+"\
							<img  idP='"+valor.idP+"' src='/imgs/x.png'></th>\
						</tr>");
					++count;
				});
				$(".tableProduto img").on("click",desajaExcluirProdutoFornecedor);
			}
		});
		tag.attr("buscar","1");
		tag.attr("quantidade",count);
	}else{
		if(tag.attr("ativo")=="1"){
			tag.siblings('table').addClass("desativado");
			tag.attr("ativo",0);
		}else{
			tag.siblings('table').removeClass("desativado");			
			tag.attr("ativo",1);
		}
	}


};