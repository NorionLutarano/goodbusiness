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
