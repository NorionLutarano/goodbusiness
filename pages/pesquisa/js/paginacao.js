$("#paginacao").on("click",function(){
	$("#inputPaginacao")[0].value=$(".produto").length;
	$.get("php/pesquisa.php",$("form").serialize(),function(resposta){
		if(resposta.length<100){
			$("#paginacao").addClass("desativado");
		}else{
			$("#paginacao").before(resposta);
			$(".produto").on("click",mostrarDadosTabela);
		}
	});

});