/*--------Conta-------------*/
$("#conta").on('click',function(){
	$.ajax({
		url:'php/meusDados.php',
		success:function(resposta){
			if(isset(()=>resposta[0])) {
				aviso("Servidor em manutenção");
				return;
			}
			resposta=JSON.parse(resposta);
			$("#formConta input[name='nome']")[0].value=resposta.nome;
			$("#formConta input[name='estado']")[0].value=resposta.estado;
			$("#formConta input[name='bairro']")[0].value=resposta.bairro;
			$("#formConta input[name='endereco']")[0].value=resposta.endereco;
			$("#formConta input[name='tipo']")[0].value=resposta.tipo;
			$("#formConta input[name='descricao']")[0].value=resposta.descricao;
			$("#formConta input[name='observacao']")[0].value=resposta.observacao;
			$("#formConta input[name='categoria']")[0].value=resposta.categoria;

		}
	})
});


/*--------Conta-------------*/