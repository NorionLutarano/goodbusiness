//----- variável global
var infoGeral = document.getElementById("infoGeral");
var control = document.querySelectorAll(".control");

//variáveis do formulário de cadastro produto
var cadastrarProduto=document.getElementById("formCadastrarProduto");
var avisoCadastrarProduto=cadastrarProduto.querySelector("h2").querySelector("sub");





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



//mostrar e atualizar dados na lista de produtos da empresa
$("#listarProduto").on("click",function(){
   //mostrar o formulario
   mostrarFormId("listarProduto","formListarProduto");
  //verifica se o usuário já pesquisou todos os produtos
  if(parseInt($("quantidadeProdutos").text())==$(".itens").length){
    $(".setaBaixo").css({'display':'none'});
    return;
  }
  return;
});

//------- Funções
 
var mostrarFormId=function(id,form){
 //mostrar formulário de listar filial
 document.getElementById(id).addEventListener("click",function(){
  control.forEach(function(elemento){
    elemento.classList.add("desativado");
  });

  document.getElementById(form).classList.remove("desativado");
  document.querySelectorAll('sub').forEach(function(tag){
    tag.classList.add('desativado');
  });
  return;
 });  
};

var formReset=function(){
  document.querySelectorAll("form").forEach(function(form){
    form.reset();
  });
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
        if(sucesso==1){
          $(".setaBaixo").css({'display':'none'});
          return;
        }
        sucesso=JSON.parse(sucesso);
        var contador=index=0;
        var painel=document.getElementById("formListarProduto").querySelector(".painel");
        //limpa a tabela
        painel.innerHTML="";
        //adicionar as tag listas no painel
        for(let x=0;x<4;x++){painel.innerHTML+="<div class='lista'></div>";}
        //adiciona os produtos a tabela
        sucesso.forEach(function(valor,key){
           painel.querySelectorAll(".lista")[index].innerHTML+="\
           <div class='itens'>\
            <img src='"+valor.imagem.replace("/home/katy/sites/trabalhos/goodbusiness","")+"'>\
            <h3>"+valor.nome+"</h3>\
          <div>";
          contador++;
          if(contador%5==0){index+=1;}
        });
      }
   });
  };
  //adiciona função de click para mostrar e desaparecer submenu
  var Menu = document.querySelectorAll(".menu > li >span");
  Menu.forEach(function(el){
     el.addEventListener("click",function(t){
        let subMenu =  el.nextElementSibling;
        if(subMenu.classList.contains("desativado")){
          subMenu.classList.remove("desativado");
        }else{
          subMenu.classList.add("desativado");
        }        
      });
  });

 //Listar Fornecedor
 mostrarFormId("listarFornecedor","formListarFornecedor");

 //Procurar Fornecedor
 mostrarFormId("procurarFornecedor","formProcurarFornecedor");
 
 //configuração
 mostrarFormId("configuracao","formConfiguracao");

  //limpa todos os formulários
  document.querySelectorAll("form").forEach(function(el){ el.reset(); });

 //mostrar formulário de cadastro de produto
 mostrarFormId("cadastrarProduto","formCadastrarProduto");
//obter os primeiros 20 produtos para mostrar no form lista 
listarProdutos(20);