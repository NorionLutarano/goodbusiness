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
  $.ajax({
    url:"php/pesquisarMeuProduto.php",
    data:"produto="+$("#formListarProduto input")[0].value,
    cache:false,
    success: function(sucesso){
        $(".setaBaixo").css({'display':'none'});
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
            <h3>"+tratarString(valor.nome)+"</h3>\
          <div>";
          contador++;
          if(contador%5==0){index+=1;}
        });
      }
  });
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

