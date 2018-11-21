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

