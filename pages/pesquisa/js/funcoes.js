
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




const isset = accessor => {
  try {
    // Note we're seeing if the returned value of our function is not
    // undefined
    return typeof accessor() !== 'undefined';
  } catch (e) {
    // And we're able to catch the Error it would normally throw for
    // referencing a property of undefined
    return false;
  }
};



const mostrarDadosTabela=function(){
  $(".listaProdutos").css({"padding-top":"0","width":"1360px"});
  $(".filtro").addClass("desativado");
  $(".estande").css({"display":"none"});
  $("#info").removeClass("desativado");
  if($(".listaProdutos").height()>545){ $("header").css({"width":"1345px"}); }
  if($("#info").height()<545){$("header").css({"width":"1360px"});}
  $("#info table").html("");

  $("#info a").attr("href","#"+$(this).attr("id"));
  $.get("php/obterDadosDetalhados.php",{data:$(this).attr("id"),cat:$(this).attr("data-cat")},function(resposta){
    if(typeof resposta ==="object"){
      $("#info table").html("<h1>Error de conexão.</h1>");
      return;
    }
    resposta=JSON.parse(resposta);
    key=Object.getOwnPropertyNames(resposta);
    tabela.addDadosTabela($("#info table"),"<caption>"+resposta.nome+"</caption>");   
    key.forEach(function(key,valor,array){
      switch(key){

        case "parcelamento":
          if (resposta.parcelamento==="0"){
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>sem parcelamento</td></tr>");   
          }else{
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>"+resposta[key]+"</td></tr>");
          }
          break;
        case "promoção":
          if (resposta.promoção==="0"){
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>sem promoção</td></tr>");   
          }else{
             tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>"+resposta[key]+"</td></tr>");
          }
        break;
        case "frete":
          if(resposta.frete==="0"){
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>sem frete</td></tr>");
          }else{
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>com frete</td></tr>");
          }
        break;
        case "valor":
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>R$ "+resposta[key]+"</td></tr>");         
        break;
        default:
          if(resposta[key]!=undefined && resposta[key]!=""){
          tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td>"+resposta[key]+"</td></tr>");
          }else{
            tabela.addDadosTabela($("#info table"),"<tr><td>"+key+": </td><td> Não informado.</td></tr>");
          }
        break;
      }
    });
    if($("#info").height()>545){
      $("header").css({"width":"1345px"});
    }

  });
};


//-------------Fim Funções-------------------