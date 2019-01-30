//----- variável global
var infoGeral = document.getElementById("infoGeral");
var control = document.querySelectorAll(".control");

//variáveis do formulário de cadastro produto
var cadastrarProduto=document.getElementById("formCadastrarProduto");
var avisoCadastrarProduto=cadastrarProduto.querySelector("h2").querySelector("sub");



//------- Funções
const isset = accessor => {
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

const diminuirString=(dados)=>{
  if(dados.palavra.length<dados.tamanho)return dados.palavra;
 return dados.palavra.substring(0,dados.tamanho)+dados.addString;
}

const table = (classe='')=>{
  return "<table class='"+classe+"'></table>";
};

 const adicionarProdutoPainel=function(valor,key,painel,index){
  painel[index].innerHTML+="\
  <div class='itens'>\
    <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
    <h3>"+tratarString(valor.nome)+"</h3>\
    <ident class='desativado'>"+valor.ident+"</ident>\
    <modelo class='desativado'>"+valor.modelo+"</modelo>\
    <tipo class='desativado'>"+valor.tipo+"</tipo>\
    <fabricante class='desativado'>"+valor.fabricante+"</fabricante>\
    <descricao class='desativado'>"+tratarString(valor.descricao)+"</descricao>\
    <valor class='desativado' >"+tratarString(valor.valor)+" </valor>\
    <parcelamento class='desativado' >"+tratarString(valor.parcelamento)+"</parcelamento>\
    <promocao class='desativado' >"+tratarString(valor.promocao||'0')+"</promocao>\
    <frete class='desativado' >"+tratarString( (()=>(valor.frete)?"1":"0")() )+"</frete>\
  <div>";
};


const mostrarFormId=function(id,form){
 //mostrar formulário de listar filial
 document.getElementById(id).addEventListener("click",function(){
  //esconde todos os formulários, control constiável global
  control.forEach(function(elemento){
    elemento.classList.add("desativado");
  });

  document.getElementById(form).classList.remove("desativado");
 });  
 
};

const formReset=function(){
  document.querySelectorAll("form").forEach(function(form){
    form.reset();
  });
}

//tratar string
const tratarString=function(String=""){
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


const listarProdutos=function(info){
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

String.prototype.toCnpj=function(){return this.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");};


const buscarMaisProduto = function(){
  let itens  = $("#formListarProduto .itens");
  let painel = $("#formListarProduto .painel");
  let index  = itens.length; 
  $.ajax({
    url:"php/pesquisarMeuProduto.php",
    method:"post",
    data:$("#formListarProduto .pesquisa").serialize()+"&inicio="+itens.length,
    cache:false,
     beforeSend:()=>{
        $("#formListarProduto carregando").removeClass("desativado");
      },
    success:(sucesso)=>{
      sucesso=JSON.parse(sucesso);
      $("#formListarProduto carregando").addClass("desativado");
      //adiciona os produtos a tabela
      sucesso.forEach(function(valor,key){
        if(index/5==$("#formListarProduto .lista").length){
          painel[0].innerHTML+="<div class='lista'></div>";
        }
        adicionarProdutoPainel(valor,key,$("#formListarProduto .lista"),parseInt(index/5));
        ++index;
      });

      $('.itens').on("click",atualizarItem);

      if($("#formListarProduto .itens").length==parseInt($("quantidadeProdutos").text())){
        $(this).css({"display":"none"});
      }
    }
  });
};





const atualizarItem =function(){
  $("#infoProduto img").attr("src",$(this).children("img").attr("src"));
  $("#infoProduto .Cident")[0].value=$(this).children("ident").text();
  $("#infoProduto .Ctipo")[0].value=$(this).children("tipo").text();
  $("#infoProduto .Cmodelo")[0].value=$(this).children("modelo").text();
  $("#infoProduto .Cfabricante")[0].value=$(this).children("fabricante").text();
  $("#infoProduto .Cnome")[0].value=$(this).children("h3").text();
  $("#infoProduto .Cdescricao")[0].value=$(this).children("descricao").text();
  $("#infoProduto .Cvalor")[0].value=$(this).children("valor").text();
  $("#infoProduto .Cparcelamento")[0].value=$(this).children("parcelamento").text();
  $("#infoProduto .Cpromocao")[0].value=($(this).children("promocao").text()=="")?"0":$(this).children("promocao").text();
  $("#infoProduto .Cfrete")[0].value=($(this).children("frete").text()=="")?"0":$(this).children("frete").text();
  $("#formListarProduto").addClass("desativado");
  $("#infoProduto").removeClass("desativado");
}


const atualizarProduto = (dados,page) =>{
  $.ajax({
    url:page,
    method:"POST",
    data:dados,
    success:function(resposta){
      if(resposta==1){
        aviso("atualizado com sucesso!");

      }else{
        aviso("servidor em manutenção!");
      }
    }
  });
  $("#listarProduto").click();
};



const aviso = (texto,html=false)=>{
  $("#aviso").removeClass("desativado");
  $("#aviso h4").text(texto);
  $("#aviso #html").html("");
  if (html) {
    $("#aviso #html").html(html);
  }
}


const inputVazio=(form)=>{
 return form[0].value.length;
};


const adicionarItensFornecedor = (painel,valor,index)=>{
      painel.querySelectorAll(".lista")[index].innerHTML+="\
        <div class='itens'>\
          <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
          <h3>"+tratarString(valor.nome)+"</h3>\
          <h4>"+tratarString(valor.valor)+"</h4>\
            <idP class='desativado'>"+tratarString(valor.produto)+"</idP>\
            <idF class='desativado'>"+tratarString(valor.empresa)+"</idF>\
        <div>";
}

const adicionarButaoSeNecessario=(id)=>{
  if(!(document.querySelectorAll(".itens").length%20)){
    document.getElementById(id).querySelector(".setaBaixo").style.display="flex";
  }
}

const verProdutoFornecedor=function(){

    $.get("php/infoProdutoFornecedor.php",{idP:$(this).children("idP").text()},function(resposta){
      resposta=JSON.parse(resposta); 
      if(isset(()=>resposta.error)){
         aviso("Servidor em manutenção.");
         return;
      }
      $("#formAdicionarFornecedor .addF")[0].value=resposta[0].iddF;
      $("#formAdicionarFornecedor .addP")[0].value=resposta[0].iddP;
      $("#formAdicionarFornecedor nomeProduto span").text(resposta[0].nomeProduto||"Não informado");
      $("#formAdicionarFornecedor imagemProduto").html("<img src='"+resposta[0].imagemProduto.replace('/home/katy/sites/trabalhos/goodbusiness','')+"'/>");
      $("#formAdicionarFornecedor descricaoProduto").text(resposta[0].descricaoProduto||"Não informado");
      $("#formAdicionarFornecedor valor").text(resposta[0].valor||"Não informado");
      $("#formAdicionarFornecedor frete").text((()=>( resposta[0].frete)?"tem":"não tem")());
      $("#formAdicionarFornecedor parcelamento").text((resposta[0].parcelamento!="0")?resposta[0].parcelamento+"x":"Não tem");
      $("#formAdicionarFornecedor nomeEmpresa").text(resposta[0].nomeEmpresa||"Não informado");
      $("#formAdicionarFornecedor cnpj").text(resposta[0].cnpj.toCnpj()||"Não informado");
      $("#formAdicionarFornecedor categoria").text(resposta[0].categoria||"Não informado");
      $("#formAdicionarFornecedor estado").text(resposta[0].estado||"Não informado");
      $("#formAdicionarFornecedor bairro").text(resposta[0].bairro||"Não informado");
      $("#formAdicionarFornecedor endereco").text(resposta[0].endereco||"Não informado");
      $("#formAdicionarFornecedor descricaoEmpresa").text(resposta[0].descricaoEmpresa||"Não informado");
      $("#formAdicionarFornecedor observacao").text(resposta[0].observacao||"Não informado");
      $("#formAdicionarFornecedor contato").text(resposta[0].contato||"Não informado");
      $(".control").addClass("desativado");  
      $("#formAdicionarFornecedor").removeClass("desativado");
      $("info").addClass("desativado");   

    });
};


const criarDiv = (classe="")=>{
  return "<div class='"+classe+"'></div>"
}

const adicionarElemento=(recebedor,tag)=>{
  recebedor.html(recebedor.html()+tag);
}//transforma cookies em um dicionário
const cookieParaDicionario=function(){
	let Dict = new Map();
	for(valor of document.cookie.split("; ")){
		[chave,novoValor]=valor.split('=');
			Dict.set(chave,novoValor);
	}
	return Dict;	
};


// setCookie para adicionar cookies e para apagar nome do cookie,-1
    function setCookie(name,exdays)    {

    var expires;

    var date; 
    var value;
    date = new Date(); //  criando o COOKIE com a data atual
    date.setTime(date.getTime()+(exdays*24*60*60*1000));
    expires = date.toUTCString();
    value = "TESTE123";
    document.cookie = name+"="+value+"; expires="+expires+"; path=/";
};const quantidadeFornecedor=(tag)=>{
	$.ajax({
		url:"php/quantidadeMeusFornecedores.php",
	}).then(function(resposta){
			tag.text(resposta);
	});

};

const mostrarListaFornecedores=function(resposta,inicio=0){
	for (let i = inicio,x=0; i < (inicio+resposta.length); i++,x++) {
				adicionarElemento($("#formListarFornecedor .painel"),criarDiv("fornecedores"));
				adicionarElemento($("#formListarFornecedor .painel .fornecedores").last(),criarDiv("nomeFornecedor"));
				$(".nomeFornecedor")[i].innerText=resposta[x].nome;
				$(".nomeFornecedor")[i].innerHTML=$(".nomeFornecedor")[i].innerText+"<img src='/imgs/menu.png'/>";
				$(".nomeFornecedor")[i].setAttribute("idF",resposta[x].id);
				$(".nomeFornecedor")[i].setAttribute("buscar","0");
				$(".nomeFornecedor")[i].setAttribute("ativo","0");
			}
};

const setaBaixoFormFornecedor = function(){
	if(!($(".painel .fornecedores").length%10) && parseInt($("quantidadefornecedor").text())>10) {
		$("#formListarFornecedor .setaBaixo").css("display","flex");
	}
};

$("#listarFornecedor ").on("click",function(){
	quantidadeFornecedor($("quantidadeFornecedor"));
	$("#formListarFornecedor .painel").html("");
	$.ajax({
		url:"php/nomesFornecedores.php",
		success:function(resposta){
			if(!isset(()=>resposta)){ aviso("Servidor em manutenção."); return; }
			mostrarListaFornecedores(JSON.parse(resposta));
			$(".nomeFornecedor").on("click",nomeProdutosFornecedor);
		}
	});
	setTimeout(setaBaixoFormFornecedor,1000);

	
});



$("#formListarFornecedor .confirmacao button").on("click",function(){
	if(!isset(()=>$(this).attr("idP"))){
		$("#formListarFornecedor .confirmacao button").parent().find("h4").text("Error de carregamento.");
	}
	$("#formListarFornecedor .confirmacao ").addClass("desativado");
	$.post("php/excluirProdutoFornecedor.php",{idP:$(this).attr("idP")},()=>$("#listarFornecedor").click());
});



$("#formListarFornecedor .setaBaixo").on("click",function(){
	if($(".painel .fornecedores").length == parseInt($("quantidadefornecedor").text())) {
	 $(this).css("display","none");
	 return;
	}

	$.ajax({
		url:"php/nomesFornecedores.php",
		method:'get',
		data:'paginacao='+$(".fornecedores").length,
		success:function(resposta){
			resposta=JSON.parse(resposta);
			if(isset(()=>resposta.error)){
				aviso("Servidor em manutenção.");
			}
			mostrarListaFornecedores(resposta,$(".fornecedores").length);
			$(".nomeFornecedor").on("click",nomeProdutosFornecedor);
			setaBaixoFormFornecedor();
		}
	});
});

$("#formAdicionarFornecedor voltar").on("click",function(){
	$("#formProcurarFornecedor").removeClass("desativado");
	$("#formAdicionarFornecedor").addClass("desativado");
});const deletarProdutoFornecedor = function(){
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

$("#infoProduto .atualizar").on("click",function(){
	let form=document.getElementById("infoProduto").children[1];


	for(let x=0;x<form.length;x++){

		 switch(form[x].className){
		 	case "Cnome":
		 		if(!form[x].value){
			 		aviso("Informe o nome");
			 		return;
		 		}
		 	break;
		 	case "Cvalor":
		 		if(!form[x].value){
			 		aviso("Informe o valor");
			 		return;
		 		}
		 	break;
		 	case "Cparlamento":
		 		if(form[x].value && form[x].value=="0"){
		 			form[x].value="0";
		 		}
		 	break;
		 	case "Ctipo":
		 		if(!form[x].value){
		 			form[x].value="0";
		 		}
		 	break;
		 	case "Cmodelo":
		 		if(!form[x].value){
		 			form[x].value="0";
		 		}
		 	break;
		 	case "Cfabricante":
		 		if(!form[x].value){
		 			form[x].value="0";
		 		}
		 	break;		 			 			 	

		 }
	}


	$.ajax({
		url:"php/atualizarProduto.php",
		method:"post",
		cache: false,
	    contentType: false,
	    processData: false,
		data:new FormData(form),
		success:function(resposta){
			for (let x = 0; x< form.length; x++) {
				 switch(form[x].className){
				 	case "Cparlamento":
				 		if(form[x].value && form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;
				 	case "Ctipo":
				 		if(form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;
				 	case "Cmodelo":
				 		if(form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;
				 	case "Cfabricante":
				 		if(form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;		 			 			 	

				}		
		    } 
			aviso(resposta);
		}
	});


});
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
}$("#infoProduto .atualizar").on("click",function(){
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

formatarValor(document.querySelector("#infoProduto form"));$("#formAdicionarFornecedor").on("submit",function(e){
	e.preventDefault();
	$.get('php/cadastrarFornecedor.php',$("#formAdicionarFornecedor form").serialize(),function(resposta){
		$("info").removeClass("desativado");
		$("info").text("");
		if(resposta){
			aviso("Cadastrado com sucesso.");
		}else{
			aviso("Servidor em manutenção.");
		}

	});
});$("#aviso img").on("click",()=>$("#aviso").addClass("desativado"));$('#editarProduto').on("submit",(e)=>{

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
        $("#formListarProduto").children(".painel").html("");
        $("#formListarProduto .lista").remove();
     },
    success: function(sucesso){ 
        $(".setaBaixo").css({'display':'none'});
        let index=0;
        let painel=document.getElementById("formListarProduto").querySelector(".painel");
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
        $("#formListarProduto carregando").addClass("desativado");
        //adicionar as tag listas no painel
        for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";
          //adiciona os produtos a tabela
          sucesso.forEach(function(valor,key){
            adicionarProdutoPainel(valor,key,$("#formListarProduto .lista"),parseInt(index/5));
            ++index;
          });

          $('.itens').on("click",atualizarItem);

          if(20==$("#formListarProduto .itens").length )  {
            $("#formListarProduto .setaBaixo").css({"display":"flex"});
          }
      }
  });
});



$("#formListarProduto .setaBaixo").on("click",buscarMaisProduto);



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


$("#formCadastrarProduto img").on('click',function(){
  window.open("https://www.easy-resize.com/pt/", "__blank");
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

$("#listarProduto").on("click",function(){
  $("#formListarProduto input")[0].value="";
  $("#formListarProduto .lista").remove();
  $("#formListarProduto .itens").remove();
  $("#formListarProduto .setaBaixo").css({"display":"none"});
});


$("#procurarFornecedor").on("click",()=>{
    $("#formProcurarFornecedor .setaBaixo").css({"display":"none"});
    $("#formProcurarFornecedor .painel").html("");
    $("#formProcurarFornecedor .setaBaixo").removeClass("desativado");
    formReset();
});//obter os primeiros 20 produtos para mostrar no form lista 
//form listar Fornecedor
$(".confirmacao fechar").on("click",()=>$(".confirmacao fechar").parent(".confirmacao").addClass("desativado"));
$("fechar").on("click",()=>$(this).parent().addClass("desativado"));
$(".nomeEmpresa").text(cookieParaDicionario().get('nomeEmpresa').replace("+"," "));


//obtem dicionário dos cookies
let cookie= cookieParaDicionario();


$("#infoProduto form").on("submit",function(e){
	e.preventDefault();
});