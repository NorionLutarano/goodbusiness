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
}