
//-------------VerEmpresa------------

$(".produto").on("click",function(){
	$(".listaProdutos").css({"padding-top":"0","width":"1360px"});
	$(".filtro").addClass("desativado");
	$(".estande").css({"display":"none"});
	$("#info").removeClass("desativado");
	if($(".listaProdutos").height()>545){ $("header").css({"width":"1345px"}); }
});


$("#info img").on("click",function(){
	$(".listaProdutos").css({"padding-top":"3.2rem","width":"1100px"});
	$(".filtro").removeClass("desativado");
	$(".estande").css({"display":"block"});
	$("#info").addClass("desativado");
	if($(".listaProdutos").height()>545){ $("header").css({"width":"1345px"}); }
});
//-------------Fim verEmpresa---------