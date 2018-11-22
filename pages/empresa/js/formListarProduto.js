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

