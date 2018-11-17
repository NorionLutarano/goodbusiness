  //----- variável
  var infoGeral = document.getElementById("infoGeral");
  var control = document.querySelectorAll(".control");

//variáveis do formulário de cadastro produto
var cadastrarProduto=document.getElementById("formCadastrarProduto");
var avisoCadastrarProduto=cadastrarProduto.querySelector("h2").querySelector("sub");

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







  //---- fim function



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



 //mostrar formulário de cadastro de produto
 mostrarFormId("cadastrarProduto","formCadastrarProduto");

 //listar produto
 mostrarFormId("listarProduto","formListarProduto");


 //Listar Fornecedor
 mostrarFormId("listarFornecedor","formListarFornecedor");

 //Procurar Fornecedor
 mostrarFormId("procurarFornecedor","formProcurarFornecedor");
 
 //configuração
  mostrarFormId("configuracao","formConfiguracao");

  //limpa todos os formulários
  document.querySelectorAll("form").forEach(function(el){ el.reset(); });


 //

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

  //verificar se os inputs estão vazios
  cadastrarProduto.querySelectorAll("input").forEach(function(valor){
    if(valor.value==""){
     avisoCadastrarProduto.classList.add("error");
     avisoCadastrarProduto.classList.remove("desativado");
     avisoCadastrarProduto.innerText="Preencha os campos obrigatórios.";
     return;
    }
  });

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
        console.log(retorno);
      },
    });

});
//-------------------

        
       