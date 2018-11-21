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
