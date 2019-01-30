$("#infoProduto .excluir").on("click",function(){
	aviso("Realmente deseja excluir?","<button style='background-color:red;'>excluir</button>");
	$("#aviso button").on("click",excluirProduto);
});

function excluirProduto(){
	$.ajax({
		url:"php/excluirProduto.php",
		method:"post",
		cache: false,
	    contentType: false,
	    processData: false,
		data:new FormData($("#infoProduto form")[0]),
		success:function(resposta){
			aviso(resposta);
			if (resposta=="item excluido com sucesso"){
				$("#formListarProduto quantidadeProdutos").text(parseInt($("#formListarProduto quantidadeProdutos").text())-1);
			}
		}
	});
	$("quantidadeProdutos").text(parseInt($("quantidadeProdutos").text()) -1);
	$("#listarProduto").click();
}