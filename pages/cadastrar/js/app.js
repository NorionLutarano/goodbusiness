const senhaOk =()=>{
	if($(".confirmarSenha")[0].value==$(".senha")[0].value){
		return true
	}else{
		return false;
	}
};
$("#voltar").on("click",function(){
	if(indexAvancar==0)return;

	$(".etapa")[indexAvancar].classList.add("desativado");
	$(".etapa")[--indexAvancar].classList.remove("desativado");
	$(".avisoSenha").text("");

});let indexAvancar=0;

const verificaSeDadosForamInformados=()=>{
	for (let contador = 0; contador <  $(".etapa")[indexAvancar].children.length; contador++) {
		console.log(typeof $(".etapa")[indexAvancar].children[contador].value===undefined);
		if($(".etapa")[indexAvancar].children[contador].value===""){
			$(".avisoSenha").text("Informe todos os dados");
			return true;
		}
		
	}
};









const avisoSenha=function(){
	$(".avisoSenha").text("");
	if($(".etapa").length!=indexAvancar+1){
		$(".etapa")[indexAvancar].classList.add("desativado");
		$(".etapa")[++indexAvancar].classList.remove("desativado");
	}

};

$("#avançar").click(function(){
	if(verificaSeDadosForamInformados())return;

	if(1+indexAvancar==$(".etapa").length){
		if($(".senha")[0].value.length<8){
			$(".avisoSenha").text("Senha com mínimo 8 caracteres.");		
			return;
		}
		if(!senhaOk()){
			$(".avisoSenha").text("Senha não são iguais.");
			return;
		}		
		$("form").submit();
	}
	avisoSenha();


});
//cnpj só números
$("#cnpj").on("keyup",function(){
	this.value=this.value.soNum();
});

$(".cep").on("keyup",function(){
	this.value=this.value.soNum();
});