
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
        $("#formListarProduto").children(".painel").html("");
        $("#formListarProduto .lista").remove();
     },
    success: function(sucesso){ 
        $(".setaBaixo").css({'display':'none'});
        let index=0;
        let painel=document.getElementById("formListarProduto").querySelector(".painel");
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
        $("#formListarProduto carregando").addClass("desativado");
        //adicionar as tag listas no painel
        for(let x=0;x<4;x++)painel.innerHTML+="<div class='lista'></div>";
          //adiciona os produtos a tabela
          sucesso.forEach(function(valor,key){
            adicionarProdutoPainel(valor,key,$("#formListarProduto .lista"),parseInt(index/5));
            ++index;
          });

          $('.itens').on("click",atualizarItem);

          if(20==$("#formListarProduto .itens").length )  {
            $("#formListarProduto .setaBaixo").css({"display":"flex"});
          }
      }
  });
});



$("#formListarProduto .setaBaixo").on("click",buscarMaisProduto);

