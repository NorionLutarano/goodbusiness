
var reduzirString=function(tamanho,palavra=null,addString="..."){
	if(palavra==null) return;
	return palavra.substr(0,tamanho)+addString;
}

//buscar imagem
var buscarImagem = function(imagem=null){
	if(imagem==nul){return;}
	return "<img src="+imagem+"/>";
}