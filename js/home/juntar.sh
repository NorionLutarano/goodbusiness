#!/bin/bash
rm app.js
while [ 1 -lt 5 ]
 do
	cat   funcao.js const.js menu.js geral.js> app.js
 	sleep 2
 	date
 done
