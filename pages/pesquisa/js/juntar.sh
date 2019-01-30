#!/bin/bash
rm app.js
while [ 1 -lt 5 ]
 do
	cat funcoes.js geral.js form.js filtro.js paginacao.js header.js tabela.js > app.js
 	sleep 4
 done
