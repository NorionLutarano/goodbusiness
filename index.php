<?php
  $logado  = isset($_SESSION['empresa'])? 'TRUE':'FALSE';
  $empresa = isset($_SESSION['empresa'])? $_SESSION['empresa']:'';
  
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
    <a href="#" class="linkPlanos">Planos</a>
    <a href="/pages/cadastrarEmpresa" >Cadastrar</a>
    <a class="buttonLogin" href="/pages/login" >Fazer Login</a>
    <a href="#" class="nomeEmpresa">
      <span></span>
    </a>
    <a href="#" class="imagemEmpresa"></a>
  </header>

  <main>
    <div id="planos">
      <h4>O Good Business no alfa é gratuito e você será avisado quando deixar de ser e caso não pague a conta ficará inativa somente voltará a ser ativa quando pagar a mensalidade sem juros ou qualquer outra taxa.</h4>
      <button>Pesquisar Produto</button>
    </div>
    <div id="home">
        <h1>Good Business<sub>alfa</sub></h1>
        <div class="formulario">
          <form action="/pages/pesquisa/index.php" method="get">
            <input type="text"   name="produto"  placeholder="Pesquisar Produto"><!--
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
  <script type="text/javascript">
                var pesquisaRapida= function(e){
                  e.preventDefault();
                  document.querySelectorAll("input")[1].value=1;
                  e.submit();
                };
                var pesquisaNormal= function(e){
                  e.preventDefault();
                  document.querySelectorAll("input")[1].value=0;
                  e.submit();
                };

                document.querySelector(".linkPlanos").onclick=function(){
                  document.getElementById("home").style.display="none";
                  document.getElementById("planos").style.display="block";
                };

                document.getElementById("planos").querySelector("button").onclick=function(){
                  document.getElementById("planos").style.display='none';
                  document.getElementById("home").style.display='block';
                };

  </script>
</body>
</html>
