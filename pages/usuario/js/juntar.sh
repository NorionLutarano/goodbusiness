#!/bin/bash
rm app.js
while [ 1 -lt 5 ]
 do
	cat variaveisGlobais.js  funcoes.js cookie.js formListarFornecedor.js produtosMeusFornecedores.js atualizarProduto.js excluirProduto.js infoProduto.js formAdicionarFornecedor.js avisoGeral.js editarProduto.js formListarProduto.js formProcurarFornecedor.js formEditarProduto.js formCadastrarProduto.js  menuLateral.js geral.js > app.js
 	sleep 2
 done

