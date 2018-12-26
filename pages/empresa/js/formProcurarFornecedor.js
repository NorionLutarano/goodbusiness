$("#formProcurarFornecedor > .pesquisa").on("submit",(e)=>{
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
				painel.innerHTML="<h1 style='font-weight:100; font-family:Raleway,arial;'>Nenhum fornecedor cadastrado ainda.</h1>";
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
			    <h3>"+tratarString(valor.nome)+"</h3>\
			    <h4>"+tratarString(valor.valor)+"</h4>\
				    <idP class='desativado'>"+tratarString(valor.produto)+"</idP>\
				    <idF class='desativado'>"+tratarString(valor.empresa)+"</idF>\
			  <div>";
			++contador;
	  		if(contador%5===0)index+=1;
			});

			$("#formProcurarFornecedor .setaBaixo")[0].style.display="flex";
			$(".itens").on("click",function(){
				$.get("php/infoProdutoFornecedor.php",{idP:$(this).children("idP").text()},(resposta)=>{
					resposta=JSON.parse(resposta);
					if(isset(()=>resposta.error)){
						return;
					}
					$("#formAdicionarFornecedor .addF")[0].value=resposta[0].iddF;
					$("#formAdicionarFornecedor .addP")[0].value=resposta[0].iddP;
					$("#formAdicionarFornecedor nomeProduto span").text(resposta[0].nomeProduto||"Não informado");
					$("#formAdicionarFornecedor imagemProduto").html("<img src='"+resposta[0].imagemProduto.replace('/home/katy/sites/trabalhos/goodbusiness','')+"'/>");
					$("#formAdicionarFornecedor descricaoProduto").text(resposta[0].descricaoProduto||"Não informado");
					$("#formAdicionarFornecedor valor").text(resposta[0].valor||"Não informado");
					$("#formAdicionarFornecedor frete").text((()=>( resposta[0].frete)?"tem":"não tem")());
					$("#formAdicionarFornecedor parcelamento").text(resposta[0].parcelamento + "x"||"Não informado");
					$("#formAdicionarFornecedor nomeEmpresa").text(resposta[0].nomeEmpresa||"Não informado");
					$("#formAdicionarFornecedor cnpj").text(resposta[0].cnpj.toCnpj()||"Não informado");
					$("#formAdicionarFornecedor categoria").text(resposta[0].categoria||"Não informado");
					$("#formAdicionarFornecedor estado").text(resposta[0].estado||"Não informado");
					$("#formAdicionarFornecedor bairro").text(resposta[0].bairro||"Não informado");
					$("#formAdicionarFornecedor endereco").text(resposta[0].endereco||"Não informado");
					$("#formAdicionarFornecedor descricaoEmpresa").text(resposta[0].descricaoEmpresa||"Não informado");
					$("#formAdicionarFornecedor observacao").text(resposta[0].observacao||"Não informado");
					$("#formAdicionarFornecedor contato").text(resposta[0].contato||"Não informado");
					$("#formProcurarFornecedor").addClass("desativado");
					$(".formAdicionarFornecedor").removeClass("desativado");	
					$("info").addClass("desativado");		

				});
			});

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
			painel.innerHTML="<h1 style='font-weight:100; font-family:Raleway,arial;'>"+produtos.error+".</h1>";
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
			    <idP class='desativado'>"+tratarString(valor.produto)+"</idP>\
			    <idF class='desativado'>"+tratarString(valor.empresa)+"</idF>\
		  <div>";
		++contador;
  		if(contador%5===0)index+=1;
		});	

		$(".itens").on("click",function(){
			$.get("php/infoProdutoFornecedor.php",{idP:$(this).children("idP").text()},(resposta)=>{
				resposta=JSON.parse(resposta);
				if(isset(()=>resposta.error)){
					return;
				}
				$("#formAdicionarFornecedor .addF").value=resposta[0].iddF;
				$("#formAdicionarFornecedor .addP").value=resposta[0].iddP;				
				$("#formAdicionarFornecedor nomeProduto span").text(resposta[0].nomeProduto||"Não informado");
				$("#formAdicionarFornecedor imagemProduto").html("<img src='"+resposta[0].imagemProduto.replace('/home/katy/sites/trabalhos/goodbusiness','')+"'/>");
				$("#formAdicionarFornecedor descricaoProduto").text(resposta[0].descricaoProduto||"Não informado");
				$("#formAdicionarFornecedor valor").text(resposta[0].valor||"Não informado");
				$("#formAdicionarFornecedor frete").text(resposta[0].frete||"Não informado");
				$("#formAdicionarFornecedor parcelamento").text(resposta[0].parcelamento||"Não informado");
				$("#formAdicionarFornecedor nomeEmpresa").text(resposta[0].nomeEmpresa||"Não informado");
				$("#formAdicionarFornecedor cnpj").text(resposta[0].cnpj||"Não informado");
				$("#formAdicionarFornecedor categoria").text(resposta[0].categoria||"Não informado");
				$("#formAdicionarFornecedor estado").text(resposta[0].estado||"Não informado");
				$("#formAdicionarFornecedor bairro").text(resposta[0].bairro||"Não informado");
				$("#formAdicionarFornecedor endereco").text(resposta[0].endereco||"Não informado");
				$("#formAdicionarFornecedor descricaoEmpresa").text(resposta[0].descricaoEmpresa||"Não informado");
				$("#formAdicionarFornecedor observacao").text(resposta[0].observacao||"Não informado");
				$("#formAdicionarFornecedor contato").text(resposta[0].contato||"Não informado");
				$("#formProcurarFornecedor").addClass("desativado");
				$(".formAdicionarFornecedor").removeClass("desativado");			
				$("info").addClass("desativado");
			});
		});
	});
});


$("#formAdicionarFornecedor voltar").on("click",function(){
	$("#formAdicionarFornecedor nomeProduto span").text("");
	$("#formAdicionarFornecedor imagemProduto").text("");
	$("#formAdicionarFornecedor descricaoProduto").text("");
	$("#formAdicionarFornecedor valor").text("");
	$("#formAdicionarFornecedor frete").text("");
	$("#formAdicionarFornecedor parcelamento").text("");
	$("#formAdicionarFornecedor nomeEmpresa").text("");
	$("#formAdicionarFornecedor cnpj").text("");
	$("#formAdicionarFornecedor categoria").text("");
	$("#formAdicionarFornecedor estado").text("");
	$("#formAdicionarFornecedor bairro").text("");
	$("#formAdicionarFornecedor endereco").text("");
	$("#formAdicionarFornecedor descricaoEmpresa").text("");
	$("#formAdicionarFornecedor observacao").text("");
	$("#formAdicionarFornecedor contato").text("");
	$("#formProcurarFornecedor").removeClass("desativado");
	$(".formAdicionarFornecedor").addClass("desativado");			

});
