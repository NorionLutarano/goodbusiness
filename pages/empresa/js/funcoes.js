//------- Funções
 
var mostrarFormId=function(id,form){
 //mostrar formulário de listar filial
 document.getElementById(id).addEventListener("click",function(){
  //esconde todos os formulários, control variável global
  control.forEach(function(elemento){
    elemento.classList.add("desativado");
  });

  document.querySelectorAll('sub').forEach(function(tag){
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


var listarProdutos=function(quantidade){
  $.ajax({
      url: 'php/listarProdutos.php',
      method: 'post',
      cache: true,
      data:"quantidade="+quantidade,
      contentType: false,
      processData: false,
      success: function(sucesso){
        var contador=index=0;
        var painel=document.getElementById("formListarProduto").querySelector(".painel");
        //limpa a tabela
        painel.innerHTML="";
        //formatar a string para json
        sucesso=JSON.parse(sucesso);
        //se não houver resultado informe ao usuário
        if(!sucesso.length){painel.innerHTML="<h1 style=\"font-family:Raleway,arial;font-size:1.7rem;\">Nenhum produto cadastrado :(</h1>"; return;}
        //verifica se servidor respondeu
        if(typeof sucesso == "string"){painel.innerHTML="<h1>"+sucesso+"</h1>"; return;}
        //adicionar as tag listas no painel
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
            <input name='frete' value='"+tratarString(valor.frete)+"' class='desativado'>\
          <div>";
          contador++;
          if(contador%5==0){index+=1;}
        });
      }
   });
  };
