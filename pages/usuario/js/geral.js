//obter os primeiros 20 produtos para mostrar no form lista 
//form listar Fornecedor
$(".confirmacao fechar").on("click",()=>$(".confirmacao fechar").parent(".confirmacao").addClass("desativado"));
$("fechar").on("click",()=>$(this).parent().addClass("desativado"));
$(".nomeEmpresa").text(cookieParaDicionario().get('nomeEmpresa').replace("+"," "));


//obtem dicionário dos cookies
let cookie= cookieParaDicionario();


$("#infoProduto form").on("submit",function(e){
	e.preventDefault();
});