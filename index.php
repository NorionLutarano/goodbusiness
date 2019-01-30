<?php


 ?>
<html>
<head>
  <title>Good Businnes</title>
 
  <link href="https://fonts.googleapis.com/css?family=Poppins|Muli|Paytone+One|Roboto" rel="stylesheet">
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-reboot.css">
  <link rel="stylesheet" media="screen" type="text/css" href="css/home/index.css">
</head>
<body>
  <header>
  </header>

  <main>
    <div id="home">
        <h1>Lilium<sub>alfa</sub></h1>
        <div class="formulario">
          <form action="/pages/pesquisa/index.php" method="get">
          <input type="hidden" name="pesquisaPor" value="produto">
            <input type="text"   name="pesquisa"  placeholder="Pesquisar Produto"><!--
            --><button class="button btn-style-2" onclick="pesquisaNormal()">Pesquisar</button>
          </form>
        </div>
  </main>

  <!--footer>
    <span >Contato</span>
    <span  >Termos</span>
    <span>Planos</span>
    <span >Negócios</span>
  </footer-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript" src="/js/funcoes/cookie.js"></script>
  <script type="text/javascript" src="js/home/app.js"> </script>
</body>
</html>
