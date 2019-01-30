

$("#infoProduto .atualizar").on("click",function(){
	let form=document.getElementById("infoProduto").children[1];


	for(let x=0;x<form.length;x++){

		 switch(form[x].className){
		 	case "Cnome":
		 		if(!form[x].value){
			 		aviso("Informe o nome");
			 		return;
		 		}
		 	break;
		 	case "Cvalor":
		 		if(!form[x].value){
			 		aviso("Informe o valor");
			 		return;
		 		}
		 	break;
		 	case "Cparlamento":
		 		if(form[x].value && form[x].value=="0"){
		 			form[x].value="0";
		 		}
		 	break;
		 	case "Ctipo":
		 		if(!form[x].value){
		 			form[x].value="0";
		 		}
		 	break;
		 	case "Cmodelo":
		 		if(!form[x].value){
		 			form[x].value="0";
		 		}
		 	break;
		 	case "Cfabricante":
		 		if(!form[x].value){
		 			form[x].value="0";
		 		}
		 	break;		 			 			 	

		 }
	}


	$.ajax({
		url:"php/atualizarProduto.php",
		method:"post",
		cache: false,
	    contentType: false,
	    processData: false,
		data:new FormData(form),
		success:function(resposta){
			for (let x = 0; x< form.length; x++) {
				 switch(form[x].className){
				 	case "Cparlamento":
				 		if(form[x].value && form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;
				 	case "Ctipo":
				 		if(form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;
				 	case "Cmodelo":
				 		if(form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;
				 	case "Cfabricante":
				 		if(form[x].value=="0"){
				 			form[x].value="";
				 		}
				 	break;		 			 			 	

				}		
		    } 
			aviso(resposta);
		}
	});


});
