
if(estaLogado()){
	let nome = Cookie.get('nomeEmpresa').replace("+"," ");
	if(nome.length>11)nome=nome.substr(0,8)+"..."
	addElement({tag:$("header"),element:criarLink({href:"/pages/usuario",text:Cookie.get('nomeEmpresa').replace("+"," ")})});
}else{
	addElement({tag:$("header"),element:criarLink({href:"/pages/cadastrar",text:'Cadastrar'})});
	addElement({tag:$("header"),element:criarLink({class:"buttonLogin",href:"/pages/login",text:'Fazer Login'})});
}

