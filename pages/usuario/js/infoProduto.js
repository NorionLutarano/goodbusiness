$("#infoProduto .atualizar").on("click",function(){
	if($("#infoProduto .Cparcelamento")[0].value==""){
		$("#infoProduto .Cparcelamento")[0].value=0;
	}

	$("#infoProduto form .Catualizar")[0].value=1;
	
	if(!$("#infoProduto form .Cnome")[0].value){
		aviso("Informe o nome do seu produto.");
		return;
	}

	$("#infoProduto form").submit();


});

$("#infoProduto .excluir").on("click",function(){
	$("#infoProduto form .Catualizar")[0].value=0;
	$("#infoProduto form").submit();

});

formatarValor(document.querySelector("#infoProduto form"));