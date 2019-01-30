#!/bin/bash
rm app.js
while [ 1 -lt 5 ]
 do
	cat function.js geral.js voltar.js avançar.js form.js > app.js
 	sleep 2
 done
