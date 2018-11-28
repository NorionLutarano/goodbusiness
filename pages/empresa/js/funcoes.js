//------- Funções
 
var mostrarFormId=function(id,form){
 //mostrar formulário de listar filial
 document.getElementById(id).addEventListener("click",function(){
  //esconde todos os formulários, control variável global
  control.forEach(function(elemento){
    elemento.classList.add("desativado");
  });

  document.querySelectorAll('sub').forEach(function(tag,index){
    if(!index)return;
    tag.classList.add('desativado');
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
  info.quantidade=(!!info.quantidade)?info.quantidade:0;
  info.tag=(!!info.tag)?info.tag:0;
  
  $.ajax({
      url: info.url,
      method: 'post',
      cache: true,
      data:"quantidade="+info.quantidade,
      beforeSend:()=>{
        $("#"+info.form+" .setaBaixo")[0].style.display="none";
        if(!info.tag)return;
        $(info.tag).removeClass("desativado");
      },
      success: function(sucesso){
        var contador=0;
        var index=$("#"+info.form+" .lista").length;
        var painel=document.getElementById(info.form).querySelector(".painel");
        //limpa a tabela
        if(!$("#"+info.form+" .lista").length){
          painel.innerHTML="";
        }
        //formatar a string para json
        sucesso=JSON.parse(sucesso);
        //se não houver resultado informe ao usuário
        if(!sucesso.length){
          $(".setaBaixo").css({'display':'none'});
          $(info.tag).addClass("desativado");
          painel.innerHTML="<h1 style=\"font-family:Raleway,arial;font-size:1.7rem;font-weight:100;\">Nenhum produto cadastrado :(</h1>";
          return;
        }
        //verifica se servidor respondeu
        if(typeof sucesso == "string"){painel.innerHTML="<h1>"+sucesso+"</h1>"; return;}
        //adicionar as info.tag nas listas no painel
        for(let x=0;x<4;x++){painel.innerHTML+="<div class='lista'></div>";}
        //adiciona os produtos a tabela
        sucesso.forEach(function(valor,key){
           painel.querySelectorAll(".lista")[index].innerHTML+="\
           <div class='itens'>\
            <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
            <h3>"+tratarString(valor.nome)+"</h3>\
           <textarea name='descricao'  class='desativado'>"+tratarString(valor.descricao)+"</textarea>\
            <input name='valor' value='"+tratarString(valor.valor)+"' class='desativado'>\
            <input name='parcelamento' value='"+tratarString(valor.parcelamento)+"' class='desativado'>\
            <input name='promocao' value='"+tratarString(valor.parcelamento)+"' class='desativado'>\
            <input name='frete' value='"+tratarString(valor.frete)+"' class='desativado'>\
          <div>";
          contador++;
          if(contador%5==0){index+=1;}
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
            $(".itens").on("click",function(){
              esconderForms("#editarProduto");
              $("#editarProduto input")[0].value=$(this).find("h3").text();
              $("#editarProduto textarea")[0].value=$(this).find("textarea").value;
              $("#editarProduto input")[2].value=$(this).find("input")[0].value;
              $("#editarProduto input")[3].value=$(this).find("input")[1].value;
              $("#editarProduto select")[0].value=$(this).find("input")[2].value||0;
              $("#editarProduto select")[1].value=$(this).find("input")[3].value||0;
            });
          break;
          case "adicionarFornecedor":
           $(".itens").on("click",function(){
              esconderForms("#editarProduto");
              $("#editarProduto input")[0].value=$(this).find("h3").text();
              $("#editarProduto textarea")[0].value=$(this).find("textarea").value;
              $("#editarProduto input")[2].value=$(this).find("input")[0].value;
              $("#editarProduto input")[3].value=$(this).find("input")[1].value;
              $("#editarProduto select")[0].value=$(this).find("input")[2].value||0;
              $("#editarProduto select")[1].value=$(this).find("input")[3].value||0;
            });
          break;
          default:
          return;
        }
      }
   });
  };





var esconderForms=function(form){
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

