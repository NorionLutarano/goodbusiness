$("#listarFornecedor").on("click",function(){
	const painel=$("#formListarFornecedor .painel");
	painel.addClass("desativado");
	painel.html("");
	
	$.get("php/quantidadeMeusFornecedores.php",function(resposta){
		try{
			resposta=JSON.parse(resposta);
		}catch(e){
			$("quantidadeFornecedor").text("0");
			return;	
		}
		
		$("quantidadeFornecedor").text("");
		if(isset(()=>resposta.error)){
			$("quantidadeFornecedor").text("Servidor em Manutenção");
			return;
		}
		
		//informa a quantidade
		$("quantidadeFornecedor").text(resposta);
		//Informa ao usuário que a página está carregando
		painel.removeClass("desativado");
		painel.html("<h1 style='color: #55F;'>Carregando...</h1>");
		//pega os nomes dos fornecedores e mostra
		$.get("php/nomesFornecedores.php",function(resposta){
			painel.html("");
			resposta=JSON.parse(resposta);
			if(isset(()=>resposta.error)){
				painel.removeClass("desativado");
				painel.html("<h1>Servidor em manutenção.</h1>");
				return;
			}

			painel.removeClass("desativado");
			resposta.forEach(function(fornecedor){
				painel.html(painel.html()+"\
				  <div class='fornecedores'>\
		            <div class='nomeFornecedor' ativo='0' buscar='0' idF="+fornecedor.id+">"+fornecedor.nome+"</div>\
		          </div>");
			});
			
			$(".nomeFornecedor").on("click",function(){
				$(".resumoProdutos").css({"display":"none"});
				const nomeFornecedor=$(this);
				//obter dados do fornecedor
				$.get("php/infoFornecedor.php",{idF:$(this).attr("idF")},function(resposta){
					resposta=JSON.parse(resposta);
					if(isset(()=>resposta.error)){ 
						nomeFornecedor.attr("nome","error de conexão, atualize a página");
						nomeFornecedor.attr("razao_social","error de conexão, atualize a página");
						nomeFornecedor.attr("endereco","error de conexão, atualize a página");
						nomeFornecedor.attr("bairro","error de conexão, atualize a página");
						nomeFornecedor.attr("estado","error de conexão, atualize a página");
						nomeFornecedor.attr("cep","error de conexão, atualize a página");
						nomeFornecedor.attr("cnpj","error de conexão, atualize a página");
						nomeFornecedor.attr("contato","error de conexão, atualize a página");
						nomeFornecedor.attr("email","error de conexão, atualize a página");
						return;
					}else{	
						nomeFornecedor.attr("nome",resposta.nome);
						nomeFornecedor.attr("razao_social",resposta.razao_social);
						nomeFornecedor.attr("endereco",resposta.endereco);
						nomeFornecedor.attr("bairro",resposta.bairro);
						nomeFornecedor.attr("estado",resposta.estado);
						nomeFornecedor.attr("cep",resposta.cep);
						nomeFornecedor.attr("cnpj",resposta.cnpj);
						nomeFornecedor.attr("contato",resposta.contato);
						nomeFornecedor.attr("email",resposta.email);
						return;
					}

				});				
				
				if($(this).attr("buscar")==="0"){ 
					$.get("php/listarProdutoFornecedor.php",{idF:$(this).attr("idF")},function(resposta){
						const parent=nomeFornecedor.parent();
						resposta=JSON.parse(resposta);
						if(isset(()=>resposta.error)){
							$(".nomeFornecedor").parent().html(html+"<span>Servidor em manutenção.</span>");
							return;
						}
						
						resposta.forEach(function(value,index){
							value.descricao=(value.descricao.length==193)?value.descricao.substr(0,190)+"...":value.descricao;
							parent.html($(".nomeFornecedor").parent().html()+"\
										<div class='resumoProdutos'>\
											<div class='produto'>\
												<span class='nomeProduto'>"+value.nome+"</span>\
												<span class='descricao'>"+value.descricao+"</span>\
												<span class='valor'>"+value.valor+"</span>\
												<span class='parcelamento desativado'>"+value.parcelamento+"</span>\
											 </div>\
											 <button class='btn-style-1' idP='"+value.idP+"'>Excluir</button>\
										</div>");  	
						});
						//excluir produto
						$(".resumoProdutos button").on("click",function(){
								$("#formListarFornecedor .confirmacao button").
									attr("idP",$(this).attr("idP"));
								$("#formListarFornecedor .confirmacao").removeClass("desativado");
						});
						//ver informação desse produto
						$(".resumoProdutos .produto").on("click",function(){
							const tag=$("#contatoFornecedor");
							$("#formListarFornecedor").addClass("desativado");
							tag.removeClass("desativado");
							tag.find("h4").text($(this).find(".nomeProduto").text());
							tag.find(".descricaoproduto").text($(this).find(".descricao").text());
							if("0"==$(this).find(".parcelamento").text()){
								tag.find(".parcelamento").text("Não tem parcelamento.");
							}else{
								tag.find(".parcelamento").text($(this).find(".parcelamento").text()+"x");
							}
							tag.find(".valor").text($(this).find(".valor").text());
							tag.find(".nome").text(nomeFornecedor.attr("nome"));
							tag.find(".razaosocial").text(nomeFornecedor.attr("razao_social"));
							tag.find(".endereco").text(nomeFornecedor.attr("endereco"));
							tag.find(".bairro").text(nomeFornecedor.attr("bairro"));
							tag.find(".estado").text(nomeFornecedor.attr("estado"));
							tag.find(".cep").text(nomeFornecedor.attr("cep"));
							tag.find(".cnpj").text(nomeFornecedor.attr("cnpj").toCnpj());
							tag.find(".contato").text(nomeFornecedor.attr("contato"));
							tag.find(".email").text(nomeFornecedor.attr("email"));

						});
						
						$(".nomeFornecedor").attr("buscar",1);
					});
				}else{
					$(this).find(".resumoProdutos").css({"display":"flex"});
					return;
				}
			});

		});
	});
});


$("#formListarFornecedor .confirmacao button").on("click",function(){
	if(!isset(()=>$(this).attr("idP"))){
		$("#formListarFornecedor .confirmacao button").parent().find("h4").text("Error de carregamento.");
	}
	$("#formListarFornecedor .confirmacao ").addClass("desativado");
	$.post("php/excluirProdutoFornecedor.php",{idP:$(this).attr("idP")},()=>$("#listarFornecedor").click());
});


$("#contatoFornecedor voltar").on("click",function(){
	$("#contatoFornecedor").addClass("desativado");
		let tag=$("#contatoFornecedor");
		tag.addClass("desativado");
		tag.find(".nomeProduto h4").text("");
		tag.find(".descricaoproduto").text("");
		tag.find(".parcelamento").text("");
		$("#formListarFornecedor").removeClass("desativado");
});