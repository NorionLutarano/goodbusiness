//----- variável global
var infoGeral = document.getElementById("infoGeral");
var control = document.querySelectorAll(".control");

//variáveis do formulário de cadastro produto
var cadastrarProduto=document.getElementById("formCadastrarProduto");
var avisoCadastrarProduto=cadastrarProduto.querySelector("h2").querySelector("sub");



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
        if(!sucesso.length){painel.innerHTML="<h1 style=\"font-family:Raleway,font-size:1.7rem;\">Nenhum produto cadastrado :(</h1>"; return;}
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
//mostrar mais produtos no formulários de pesquisa produtos
$(".setaBaixo").on("click",function(){
    //quantidade de pesquisa
   var quantidade=$(".itens").length+20;
   //listar produto
   listarProdutos(quantidade);
});

//pesquisar produto
$("#formListarProduto").on("submit",function(e){
  e.preventDefault();
  if(!$("#formListarProduto .pesquisa input")[0].value) {return;}
  $.ajax({
    url:"php/pesquisarMeuProduto.php",
    method:"post",
    data:$("#formListarProduto .pesquisa").serialize(),
    cache:false,
    success: function(sucesso){
        $(".setaBaixo").css({'display':'none'});
        var contador=index=0;
        var painel=document.getElementById("formListarProduto").querySelector(".painel");
        //limpa a tabela
        painel.innerHTML="";
        //formatar a string para json
        sucesso=JSON.parse(sucesso);
        //se não houver resultado informe ao usuário
        if(!sucesso.length){painel.innerHTML="<h1 style=\"font-family:Raleway,font-size:1.7rem;\">Nenhum produto cadastrado :(</h1>"; return;}
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
});


//mostrar e atualizar dados na lista de produtos da empresa
$("#listarProduto").on("click",function(){
   //lista produtos
   listarProdutos(20);
    //ver a quantidade de produtos existente
    $.ajax({
      url:"php/quantidadeProdutos.php",
      data:"atualizar="+1,
      method:"post",
      cache:false,
      success: function(sucesso){
        document.querySelector("quantidadeProdutos").innerHTML="";
        document.querySelector("quantidadeProdutos").innerHTML=sucesso;
        return;
      }
    });
  //verifica se o usuário já pesquisou todos os produtos
  if(parseInt($("quantidadeProdutos").text())==$("#formListarProduto .itens").length){
    $(".setaBaixo").css({'display':'none'});
    return;
  }else{$(".setaBaixo").css({'display':'block'});}
  return;
});



  //mostrar o máximo de caracteres na descrição do produto
  cadastrarProduto.querySelector("textarea[name='descricao']").addEventListener("keyup",function(value){
    if(this.value.length>5000){
      this.value=this.value.substring(0,5000);
      return;
    }
    document.querySelector("digit").innerText=this.value.length;
  });

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


 cadastrarProduto.querySelector("input[name='valor']").addEventListener("keyup",function(valor){
  this.value=this.value.replace(/[^\d]+/g,'');
  if(this.value.length>2){
    this.value="R$ "+this.value.substring(0,this.value.length-2)+"."+this.value.substring(this.value.length-2,this.value.length);
  }else{
    this.value="R$ "+this.value;
  }

  return;
 });

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

      //mostrar mais produtos no formulários de pesquisa produtos
$(".setaBaixo").on("click",function(){
    //quantidade de pesquisa
   var quantidade=$(".itens").length+20;
   //listar produto
   listarProdutos(quantidade);
});

//pesquisar produto
$("#formListarProduto").on("submit",function(e){
  e.preventDefault();
  if(!$("#formListarProduto .pesquisa input")[0].value) {return;}
  $.ajax({
    url:"php/pesquisarMeuProduto.php",
    method:"post",
    data:$("#formListarProduto .pesquisa").serialize(),
    cache:false,
    success: function(sucesso){
        $(".setaBaixo").css({'display':'none'});
        var contador=index=0;
        var painel=document.getElementById("formListarProduto").querySelector(".painel");
        //limpa a tabela
        painel.innerHTML="";
        //formatar a string para json
        sucesso=JSON.parse(sucesso);
        //se não houver resultado informe ao usuário
        if(!sucesso.length){painel.innerHTML="<h1 style=\"font-family:Raleway,font-size:1.7rem;\">Nenhum produto cadastrado :(</h1>"; return;}
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
});


//mostrar e atualizar dados na lista de produtos da empresa
$("#listarProduto").on("click",function(){
   //lista produtos
   listarProdutos(20);
    //ver a quantidade de produtos existente
    $.ajax({
      url:"php/quantidadeProdutos.php",
      data:"atualizar="+1,
      method:"post",
      cache:false,
      success: function(sucesso){
        document.querySelector("quantidadeProdutos").innerHTML="";
        document.querySelector("quantidadeProdutos").innerHTML=sucesso;
        return;
      }
    });
  //verifica se o usuário já pesquisou todos os produtos
  if(parseInt($("quantidadeProdutos").text())==$("#formListarProduto .itens").length){
    $(".setaBaixo").css({'display':'none'});
    return;
  }else{$(".setaBaixo").css({'display':'block'});}
  return;
});

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
 mostrarFormId("listarProduto","formListarProduto");//obter os primeiros 20 produtos para mostrar no form lista 
//listarProdutos(20);