
$("#voltar").on("click",function(){
	if(indexAvancar==0)return;

	$(".etapa")[indexAvancar].classList.add("desativado");
	$(".etapa")[--indexAvancar].classList.remove("desativado");
	$(".avisoSenha").text("");

});