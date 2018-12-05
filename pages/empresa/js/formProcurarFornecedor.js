$("#formProcurarFornecedor").on("submit",(e)=>{
	e.preventDefault();
	$("#formProcurarFornecedor .setaBaixo").removeClass("desativado");
	if(!$("#formProcurarFornecedor .pesquisa .nome")[0].value.length){return;}

	$.get("php/pesquisarProdutoFornecedor.php",$("#formProcurarFornecedor .pesquisa").serialize(),
		function(produtos){
			produtos=JSON.parse(produtos);
			var painel = document.getElementById("formProcurarFornecedor").querySelector(".painel");
			painel.innerHTML="";
			var index=$("#formProcurarFornecedor .lista").length;

			if(isset(()=>produtos['error'])){
				painel.innerHTML="<h1>Servidor em Manutenção</h1>";
			}

			if(!produtos.length){
				painel.innerHTML="<h1 style='font-weight:100; font-family:arial;'>Nenhum fornecedor cadastrado ainda.</h1>";
				$("#formProcurarFornecedor .setaBaixo")[0].style.display="none";
				return;
			}

			//adicionar as info.tag nas listas no painel
        	for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";

        	//coloca os itens no painel
			var contador=0;
			produtos.forEach(function(valor,key){
			  painel.querySelectorAll(".lista")[index].innerHTML+="\
			  <div class='itens'>\
			    <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
			    <h3>"+tratarString(diminuirString({palavra:valor.nome,tamanho:20,addString:"..."}))+"</h3>\
			    <h4>"+tratarString(valor.valor.replace(".",","))+"</h4>\
			    <input class='desativado' value="+tratarString(valor.id_empresa)+">\
			    <input class='desativado' value="+tratarString(valor.id_produto)+">\
			  <div>";
			++contador;
	  		if(contador%5===0)index+=1;
			});

			$("#formProcurarFornecedor .setaBaixo")[0].style.display="flex";
			return;

	});
});


$("#procurarFornecedor").on("click",()=>{
		$("#formProcurarFornecedor .setaBaixo").css({"display":"none"});
		$("#formProcurarFornecedor .painel").html("");
		$("#formProcurarFornecedor .setaBaixo").removeClass("desativado");
		formReset();
	});



$("#formProcurarFornecedor .setaBaixo").on("click",function(){
	if($("#formProcurarFornecedor .setaBaixo")[0].classList.contains("desativado")){return;}

	data=$("#formProcurarFornecedor .pesquisa").serialize()+"&quantidade="+$("#formProcurarFornecedor .lista").length*5;
	$.get("php/pesquisarProdutoFornecedor.php",data,(produtos)=>{
		produtos=JSON.parse(produtos);

		var painel = document.getElementById("formProcurarFornecedor").querySelector(".painel");
		var index  = $("#formProcurarFornecedor .lista").length;
		if(!produtos.length){
			$("#formProcurarFornecedor .setaBaixo")[0].style.display="none";
			$("#formProcurarFornecedor .setaBaixo").addClass("desativado");
			return;
		}

		if(isset(()=>produtos.error)){
			painel.innerHTML="";
			painel.innerHTML="<h1 style='font-weight:100; font-family:arial;'>"+produtos.error+".</h1>";
			return;
		}

		for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";
		
		//coloca os itens no painel
		var contador=0;
		produtos.forEach(function(valor,key){
		  painel.querySelectorAll(".lista")[index].innerHTML+="\
		  <div class='itens'>\
		    <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
		    <h3>"+tratarString(valor.nome)+"</h3>\
		    <h4>"+tratarString(valor.valor)+"</h4>\
			    <input type='text' value="+tratarString(valor.id_empresa)+">\
			    <input type='text' value="+tratarString(valor.id_produto)+">\
		  <div>";
		++contador;
  		if(contador%5===0)index+=1;
		});	
	});

	$(".itens").on("click",function(){
		$.get("php/produtoFornecedor.php",{add:$(this).children("input")[0].value},(resposta)=>{

			let form=$("#formAdicionarFornecedor");

		});
		
	});
});


$("#formAdicionarFornecedor"){

}