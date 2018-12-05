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
    <input name='frete' value='"+tratarString(valor.frete||'0')+"' class='desativado'>\
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
var tratarString=function(String){
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
