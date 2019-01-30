const criarLink = (dados)=>{
	if(typeof dados.str !="undefined"){
		console.log(" cria tag a passa um object com atributos: \n href para link \n class para classe \n id para id da tag \n text para texto para tag");
		return;
	}
	return "<a href="+dados.href+" class="+dados.class+" id="+ dados.id+">"+dados.text+"</a>";
}

const estaLogado=()=>{
	return typeof cookieParaDicionario().get('logado') != "undefined" ;
}

const addElement=(dados)=>{
	if(typeof dados.str !="undefined"){
			console.log(" passa object com dois atributos: \n tag que irá receber elemento \m element que é o elemento a ser inserido");
		return;
	}
	dados.tag.append(dados.element);
}