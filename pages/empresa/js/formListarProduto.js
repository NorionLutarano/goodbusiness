



//mostrar mais produtos no formulários de pesquisa produtos
$(".setaBaixo").on("click",function(){
  if(parseInt($("quantidadeProdutos").text())==$("#formListarProduto .itens").length){return;}
    //quantidade de pesquisa
   var quantidade=$(".itens").length;
   //listar produto
   listarProdutos({pesquisa:$("#formListarProduto .itens").length,form:"formListarProduto",url:"php/listarProdutos.php"});
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
      },
    success: function(sucesso){
        $(".setaBaixo").css({'display':'none'});
        var contador=index=0;
        var painel=document.getElementById("formListarProduto").querySelector(".painel");
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
        //adicionar as tag listas no painel
        for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";
        //adiciona os produtos a tabela
        sucesso.forEach(function(valor,key){adicionarProdutoPainel(valor,key,painel,index);});
        $("#formListarProduto carregando").addClass("desativado");
      }
  });
});


//mostrar e atualizar dados na lista de produtos da empresa
$("#listarProduto").on("click",function(){
   var painel=document.getElementById("formListarProduto").querySelector(".painel");
   //limpa a tabela
   painel.innerHTML="";
    //ver a quantidade de produtos existente
    $.ajax({
      url:"php/quantidadeProdutos.php",
      method:"post",
      cache:false,
      success: function(sucesso){
        document.querySelector("quantidadeProdutos").innerHTML="";
        document.querySelector("quantidadeProdutos").innerHTML=sucesso;
        return;
      }
    });
   //lista produtos
   listarProdutos({pesquisa:"quantidade=0",form:"formListarProduto",url:"php/listarProdutos.php",func:"editar",tag:"#formListarProduto carregando"});
  return;
});


