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
<body ng-app="app">
  <header ng-controller="header">
    <a href="/pages/cadastrarEmpresa" ng-show="logado">Cadastrar</a>
    <a class="buttonLogin" href="/pages/login" ng-show="logado">Fazer Login</a>
    <a href="#" class="nomeEmpresa"   ng-show="!logado">
      <span ng-bind="empresa.nomeEmpresa"></span>
    </a>
    <a href="#" class="imagemEmpresa" ng-show="!logado" ng-bind="empresa.imagem"></a>
  </header>

  <main>
    <div id="home">
        <h1 style="color: #777;">Good Business</h1>
        <div class="formulario">
          <form action="/pages/pesquisa/index.php" method="get">
            <input type="text"   name="produto"  placeholder="Pesquisar Produto">
            <input type="hidden" name="rapido">
            <button class="button" onclick="pesquisaNormal()">Pesquisar</button>
            <button class="button" onclick="pesquisaRapida()">Pesquisa rápida</button>
          </form>
        </div>
  </main>

  <footer>
    <span >Contato</span>
    <span  >Termos</span>
    <span>Planos</span>
    <span >Negócios</span>
  </footer>
  <script type="text/javascript" src="node_modules/angular/angular.js"></script>
  <script type="text/javascript">
      angular.module("app",[])
             .controller("header",["$scope",function($scope){
                $scope.logado='<?php echo $logado; ?>';
                $scope.empresa= '<?php echo $logado; ?>'?'<?php echo $logado; ?>':{};
      }]);
  </script>
  <script type="text/javascript">
                var pesquisaRapida= function(e){
                  e.preventDefault();
                  document.querySelectorAll("input")[1].value=1;
                  e.submit();
                }
                var pesquisaNormal= function(e){
                  e.preventDefault();
                  document.querySelectorAll("input")[1].value=0;
                  e.submit();
                }

  </script>
</body>
</html>
