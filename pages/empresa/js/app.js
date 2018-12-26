//----- variável global
var infoGeral = document.getElementById("infoGeral");
var control = document.querySelectorAll(".control");

//variáveis do formulário de cadastro produto
var cadastrarProduto=document.getElementById("formCadastrarProduto");
var avisoCadastrarProduto=cadastrarProduto.querySelector("h2").querySelector("sub");



//------- Funções
var isset = accessor => {
  try {
    // Note we're seeing if the returned value of our function is not
    // undefined
    return typeof accessor() !== 'undefined';
  } catch (e) {
    // And we're able to catch the Error it would normally throw for
    // referencing a property of undefined
    return false;
  }
};

var diminuirString=(dados)=>{
  if(dados.palavra.length<dados.tamanho)return dados.palavra;
 return dados.palavra.substring(0,dados.tamanho)+dados.addString;
}


 var adicionarProdutoPainel=function(valor,key,painel,index){
  painel.querySelectorAll(".lista")[index].innerHTML+="\
  <div class='itens'>\
    <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
    <h3>"+tratarString(valor.nome)+"</h3>\
    <textarea name='descricao'  class='desativado'>"+tratarString(valor.descricao)+"</textarea>\
    <input name='valor' value='"+tratarString(valor.valor)+"' class='desativado'>\
    <input name='parcelamento' value='"+tratarString(valor.parcelamento)+"' class='desativado'>\
    <input name='promocao' value='"+tratarString(valor.promocao||'0')+"' class='desativado'>\
    <input name='frete' value='"+tratarString( (()=>(valor.frete)?"tem":"não tem")() )+"' class='desativado'>\
  <div>";
};


var mostrarFormId=function(id,form){
 //mostrar formulário de listar filial
 document.getElementById(id).addEventListener("click",function(){
  //esconde todos os formulários, control variável global
  control.forEach(function(elemento){
    elemento.classList.add("desativado");
  });

  document.getElementById(form).classList.remove("desativado");
 });  
 
};

var formReset=function(){
  document.querySelectorAll("form").forEach(function(form){
    form.reset();
  });
}

//tratar string
var tratarString=function(String=""){
  String=String.replace("/1#0/","#");
  String=String.replace("/3#0/","/*");
  String=String.replace("/4#0/","*/");
  String=String.replace("/5#0/","--");
  String=String.replace("/6#0/","=");
  String=String.replace("/7#0/","!");
  String=String.replace("/8#0/","or");
  String=String.replace("/9#0/","<script>");
  return String;
}


var listarProdutos=function(info){
  info.pesquisa=(!!info.pesquisa)?info.pesquisa:0;
  info.tag=(!!info.tag)?info.tag:0;
  console.log(info.pesquisa);
  $.ajax({
      url: info.url,
      method: 'post',
      cache: true,
      data:info.pesquisa,
      beforeSend:()=>{
        $("#"+info.form+" .setaBaixo")[0].style.display="none";
        if(!info.tag)return;
        $(info.tag).removeClass("desativado");
      },
      success: function(sucesso){
        var index=$("#"+info.form+" .lista").length;
        var painel=document.getElementById(info.form).querySelector(".painel");
        //limpa a tabela
        if(!$("#"+info.form+" .lista").length)painel.innerHTML="";
        //formatar a string para json
        sucesso=JSON.parse(sucesso);
        //se não houver resultado informe ao usuário
        if(!sucesso.length){
          $(".setaBaixo").css({'display':'none'});
          $(info.tag).addClass("desativado");
          painel.innerHTML="<h1 style=\"font-family:Raleway,arial;font-size:1.7rem;font-weight:100;\">Nenhum produto cadastrado :(</h1>";
          return;
        }
        //adicionar as info.tag nas listas no painel
        for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";
        //adiciona os produtos a tabela
        var contador=0;
        sucesso.forEach(function(valor,key){
            adicionarProdutoPainel(valor,key,painel,index);
            ++contador;
            if(contador%5===0)index+=1;
          });

           //verifica se o usuário já pesquisou todos os produtos
          if(parseInt($("#"+info.form+" quantidadeProdutos").text())==$("#"+info.form+" .itens").length){
          $("#"+info.form+" .setaBaixo")[0].style.display="none";
        }
          else{$("#"+info.form+" .setaBaixo")[0].style.display="flex";}
          //some o carregar da página 
          $(info.tag).addClass("desativado");  
          //se não precisar
          switch(info.func){
          case "editar":
            //carrega a função aos itens para edição
            $("#"+info.form+" .itens").on("click",prepararEdicaoProduto());
          break;
          
          default:
          return;
        }
      }
   });
  };


var mostrarForm=function(form){
  $(".control").each(function(){
    $(this).addClass("desativado");
  });
  $(form).removeClass("desativado");
}


var formatarValor= function(form){
  form.querySelector("input[name='valor']").addEventListener("keyup",function(){
    if(this.value.length>13){ this.value=this.value.substring(0,13); return;}
    this.value=this.value.replace(/[^\d]+/g,'');
    this.value=parseInt(this.value).toString();
    this.value=(this.value.length>2)? this.value.substring(0,this.value.length-2)+","+this.value.substring(this.value.length-2,this.value.length):this.value.padStart(4,"0,0");
    this.value=(this.value.length>6)? this.value.substring(0,this.value.length-6)+"."+this.value.substring(this.value.length-6,this.value.length):this.value.padStart(4,"0,0");
    this.value=(this.value.length>10)? this.value.substring(0,this.value.length-10)+"."+this.value.substring(this.value.length-10,this.value.length):this.value.padStart(4,"0,0");
  return;
 });
}



var limitarCaracteres = (tag,quantidade)=>{
    return function() {
       if(this.value.length>quantidade){
        this.value=this.value.substring(0,quantidade);
        return;
      }
      $(tag).text(this.value.length);
    }
  }



var prepararEdicaoProduto=function(){
  return function(){
      mostrarForm("#editarProduto");
      $("#editarProduto input")[0].value=$(this).find("h3").text();
      $("#editarProduto textarea")[0].value=$(this).find("textarea").value;
      $("#editarProduto input")[2].value=$(this).find("input")[0].value;
      $("#editarProduto input")[3].value=$(this).find("input")[1].value;
      $("#editarProduto select")[0].value=$(this).find("input")[2].value||0;
      $("#editarProduto select")[1].value=$(this).find("input")[3].value||0;
    }
}


var converterStringJson= function deparam(query) {
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if (query.slice(0, 1) === '?') {
        query = query.slice(1);
    }
    if (query !== '') {
        pairs = query.split('&');
        for (i = 0; i < pairs.length; i += 1) {
            keyValuePair = pairs[i].split('=');
            key = decodeURIComponent(keyValuePair[0]);
            value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
            map[key] = value;
        }
    }
    return map;
}

String.prototype.toCnpj=function(){return this.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");};$("#listarFornecedor").on("click",function(){
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
});$("#formAdicionarFornecedor").on("submit",function(e){
	e.preventDefault();
	$.get('php/cadastrarFornecedor.php',$("#formAdicionarFornecedor").serialize(),function(resposta){
		$("info").removeClass("desativado");
		$("info").text("");
		if(resposta){
			$("info").text("Cadastrado com sucesso.");
			$("info").addClass("Sucess");
		}else{
			$("info").addClass("Error");
			$("info").text("Servidor em manutenção.");
		}
		setTimeout(()=>{
			$("info").removeClass("Error Sucess");
			$("info").text("");
			$("#formAdicionarFornecedor voltar").click();
		},3000);
	});
});$('#editarProduto').on("submit",(e)=>{

});



//mostrar mais produtos no formulários de pesquisa produtos
$("#formListarProduto .setaBaixo").on("click",function(){
  if(parseInt($("quantidadeProdutos").text())==$("#formListarProduto .itens").length){return;}
    //quantidade de pesquisa
   var quantidade=$(".itens").length;
   //listar produto
   listarProdutos({pesquisa:'quantidade='+$("#formListarProduto .itens").length,form:"formListarProduto",url:"php/listarProdutos.php"});
});

//pesquisar produto
$("#formListarProduto").on("submit",function(e){
  e.preventDefault();
  if(!$("#formListarProduto .pesquisa input")[0].value) {$("#listarProduto").click();return;}
  $.ajax({
    url:"php/pesquisarMeuProduto.php",
    method:"post",
    data:$("#formListarProduto .pesquisa").serialize(),
    cache:false,
     beforeSend:()=>{
        $("#formListarProduto carregando").removeClass("desativado");
      },
    success: function(sucesso){
        $(".setaBaixo").css({'display':'none'});
        var contador=index=0;
        var painel=document.getElementById("formListarProduto").querySelector(".painel");
        //limpa a tabela
        painel.innerHTML="";
        //formatar a string para json
        sucesso=JSON.parse(sucesso);
        //se não houver resultado informe ao usuário
        if(!sucesso.length){
          $("#formListarProduto carregando").addClass("desativado");
          painel.innerHTML="<h1 style=\"font-family:Raleway,arial; font-size:1.7rem;\">Nenhum produto cadastrado :(</h1>";
          return;
        }
        //adicionar as tag listas no painel
        for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";
        //adiciona os produtos a tabela
        sucesso.forEach(function(valor,key){adicionarProdutoPainel(valor,key,painel,index);});
        $("#formListarProduto carregando").addClass("desativado");
      }
  });
});


//mostrar e atualizar dados na lista de produtos da empresa
$("#listarProduto").on("click",function(){
   var painel=document.getElementById("formListarProduto").querySelector(".painel");
   //limpa a tabela
   painel.innerHTML="";
    //ver a quantidade de produtos existente
    $.ajax({
      url:"php/quantidadeProdutos.php",
      method:"post",
      cache:false,
      success: function(sucesso){
        document.querySelector("quantidadeProdutos").innerHTML="";
        document.querySelector("quantidadeProdutos").innerHTML=sucesso;
        return;
      }
    });
   //lista produtos
   listarProdutos({pesquisa:"quantidade=0",form:"formListarProduto",url:"php/listarProdutos.php",func:"editar",tag:"#formListarProduto carregando"});
  return;
});


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
$("#editarProduto textarea").on("keyup",limitarCaracteres("#editarProduto digit",5000));
formatarValor(document.getElementById("editarProduto"));

  //mostrar o máximo de caracteres na descrição do produto
  cadastrarProduto.querySelector("textarea[name='descricao']").addEventListener("keyup",limitarCaracteres("#formCadastrarProduto digit",5000));

 //monitoramento dos inputs do formulário Cadastro produto
 cadastrarProduto.querySelector("input[name='parcelamento']").addEventListener("keyup",function(valor){
  this.value=this.value.replace(/[^\d]+/g,'');
  if(this.value>600){
    this.value=600;
    avisoCadastrarProduto.classList.add("error");
    avisoCadastrarProduto.classList.remove("desativado");
    avisoCadastrarProduto.innerText="Quantidade máximo é de 600 parcelas.";
  }
  return;
 });


  formatarValor(cadastrarProduto);

cadastrarProduto.addEventListener("submit",function(e){
  e.preventDefault();
  var nome=         cadastrarProduto.querySelector("input[name='nome']");
  var imagem=       cadastrarProduto.querySelector("input[name='imagem']");
  var descricao=    cadastrarProduto.querySelector("textarea[name='descricao']");
  var valor=        cadastrarProduto.querySelector("input[name='valor']");
  var parcelamento= cadastrarProduto.querySelector("input[name='parcelamento']");
  var frete=        cadastrarProduto.querySelector("select[name='frete']");


  //verifica se valor foi setado
  var regex = /[0-9]$/g;
  if(!regex.test(valor.value)){
    avisoCadastrarProduto.innerText="";
    avisoCadastrarProduto.innerText="Informe o valor do produto";
    return;
  }

  //verifica se o parcelamento é negativo
  if(parcelamento<0){
     avisoCadastrarProduto.classList.add("error");
     avisoCadastrarProduto.classList.remove("desativado");
     avisoCadastrarProduto.innerText="O valor de parcelamento não pode ser negativo.";
     return;
  }

  if(parcelamento>=100){
     avisoCadastrarProduto.classList.add("error");
     avisoCadastrarProduto.classList.remove("desativado");
     avisoCadastrarProduto.innerText="O valor máximo é 100.";
     return;
  }

    //envia dados para servidor
    $.ajax({
      url: 'php/cadastrarProduto.php',
      method: 'post',
      data: new FormData(cadastrarProduto),
      cache: false,
      contentType: false,
      processData: false,
      success: function(retorno){
        var aviso=document.getElementById("formCadastrarProduto").querySelector("h2").querySelector("sub");
        if(100==retorno){
          aviso.classList.remove("error");
          aviso.classList.add("success");
          aviso.innerText="cadastrado com sucesso.";
          formReset();
        }else{
          aviso.classList.remove("success");
          aviso.classList.add("error");
          aviso.innerText=retorno;
        }
          aviso.classList.remove("desativado");
          return;

      }
    });

});
//-------------------

        //adiciona função de click para mostrar e desaparecer submenu
  var Menu = document.querySelectorAll(".menu > li >span");
  Menu.forEach(function(el){
     el.addEventListener("click",function(){
        var subMenu =  el.nextElementSibling;
        if(subMenu.classList.contains("desativado")){
          subMenu.classList.remove("desativado");
        }else{
          subMenu.classList.add("desativado");
        }        
      });
  });

  //limpa todos os formulários
  document.querySelectorAll("form").forEach(function(el){ el.reset(); });

 //Listar Fornecedor
 mostrarFormId("listarFornecedor","formListarFornecedor");

 //Procurar Fornecedor
 mostrarFormId("procurarFornecedor","formProcurarFornecedor");
 
 //configuração
 mostrarFormId("configuracao","formConfiguracao");

 //mostrar formulário de cadastro de produto
 mostrarFormId("cadastrarProduto","formCadastrarProduto");
 //adicionar função de mostrar listar produto
 mostrarFormId("listarProduto","formListarProduto");


 //obter os primeiros 20 produtos para mostrar no form lista 
//form listar Fornecedor
$(".confirmacao fechar").on("click",()=>$(".confirmacao fechar").parent(".confirmacao").addClass("desativado"));
$("fechar").on("click",()=>$(this).parent().addClass("desativado"));