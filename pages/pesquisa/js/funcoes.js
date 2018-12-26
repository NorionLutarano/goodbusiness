
//--------------Funções------------------
//tratar string
const tratarString=(String="")=>{
  String=String.replace("/1#0/","#");
  String=String.replace("/3#0/","/*");
  String=String.replace("/4#0/","*/");
  String=String.replace("/5#0/","--");
  String=String.replace("/6#0/","=");
  String=String.replace("/7#0/","!");
  String=String.replace("/8#0/","or");
  String=String.replace("/9#0/","<script>");
  return String;
};



const tratarStringDoServidor=(Tag="")=>{
	if(Tag==""){
		console.log("Nenhum parametro passado, função tratarStringDoServidor.");
		return;
	}
	if(!Tag.length){return;}
	for (let i = 0; i <= Tag.length - 1; i++) {
		let texto=Tag[i].innerText;
		Tag[i].innerText="";
		Tag[i].innerText=tratarString(texto);
	}
};






//-------------Fim Funções-------------------