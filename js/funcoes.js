
const reduzirString=function(tamanho,palavra=null,addString="..."){
	if(palavra==null) return;
	return palavra.substr(0,tamanho)+addString;
}

//buscar imagem
const buscarImagem = function(imagem=null){
	if(imagem==nul){return;}
	return "<img src="+imagem+"/>";
}


//só números
String.prototype.soNum = function(){
	return this.valueOf().replace(/[^0-9]/g,'');
}


