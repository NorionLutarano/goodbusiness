//transforma cookies em um dicionário
const cookieParaDicionario=function(){
	let Dict = new Map();
	for(valor of document.cookie.split("; ")){
		[chave,novoValor]=valor.split('=');
			Dict.set(chave,novoValor);
	}
	return Dict;	
};


// setCookie para adicionar cookies e para apagar nome do cookie,-1
    function setCookie(name,exdays)    {

    var expires;

    var date; 
    var value;
    date = new Date(); //  criando o COOKIE com a data atual
    date.setTime(date.getTime()+(exdays*24*60*60*1000));
    expires = date.toUTCString();
    value = "TESTE123";
    document.cookie = name+"="+value+"; expires="+expires+"; path=/";
};