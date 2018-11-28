

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

      