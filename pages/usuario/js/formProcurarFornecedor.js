

$("#formProcurarFornecedor > .pesquisa").on("submit",(e)=>{
	e.preventDefault();
	if(!inputVazio($("#formProcurarFornecedor .nome"))){return;}

	$.get("php/pesquisarProdutoFornecedor.php",$("#formProcurarFornecedor .pesquisa").serialize(),
		function(produtos){
			produtos=JSON.parse(produtos); 
			let painel = document.getElementById("formProcurarFornecedor").querySelector(".painel");
			painel.innerHTML="";
			let index=$("#formProcurarFornecedor .lista").length;

			if(isset(()=>produtos['error'])){
				painel.innerHTML="<h1>Servidor em Manutenção</h1>";
				return;
			}

			if(!produtos.length){
				painel.innerHTML="<h1 style='font-weight:100; font-family:Raleway,arial;'>Nenhum fornecedor cadastrado ainda.</h1>";
				$("#formProcurarFornecedor .setaBaixo")[0].style.display="none";
				return;
			}

			//adicionar as info.tag nas listas no painel
        	for(let x=0;x<4;x++){painel.innerHTML+="<div class='lista'></div>";}

        	//coloca os itens no painel
			let contador=0;
			produtos.forEach(function(valor,key){
			  adicionarItensFornecedor(painel,valor,index);
			  ++contador;
	  		  if(contador%5===0)index+=1;
			});

			adicionarButaoSeNecessario("formProcurarFornecedor");
			
			$(".itens").on("click",verProdutoFornecedor);
			return;
	});



});






$("#formProcurarFornecedor .setaBaixo").on("click",function(){
	if($("#formProcurarFornecedor .itens").length%20){
		$(this).css("display","none");
		return;
	}

	data=$("#formProcurarFornecedor .pesquisa").serialize()+"&quantidade="+$("#formProcurarFornecedor .itens").length;
	
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

		for(let x=0;x<4;x++){painel.innerHTML+="<div class='lista'></div>";}
		
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
  		   if(contador%5===0){index+=1;}
		});	

		$(".itens").on("click",verProdutoFornecedor);
	});
});
