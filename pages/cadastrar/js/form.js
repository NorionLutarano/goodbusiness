//cnpj só números
$("#cnpj").on("keyup",function(){
	this.value=this.value.soNum();
});

$(".cep").on("keyup",function(){
	this.value=this.value.soNum();
});