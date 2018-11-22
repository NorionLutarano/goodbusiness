<?php
session_start();
session_regenerate_id();
require_once("../../autoload.php");
require_once("php/quantidadeProdutos.php");
conferirStatusLogin();
?>



<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Good Business</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap-reboot.css">
  <link rel="stylesheet" href="/pages/empresa/css/empresa.css">
   
</head>
<body>
  <header >
    <h1 class="titulo">Good Business<sub>alfa</sub></h1>
  </header>


  <main>
    <ul class="menu">
      <li >Home</li>
      <li>
           <span>Fornecedores</span>
           <ul class="subMenu desativado">
             <li id="procurarFornecedor">Procurar Fornecedor</li>
             <li id="listarFornecedor">Listar Fornecedor</li>
          </ul>
      </li>
      <li>
          <span>Produtos</span>
          <ul class="subMenu desativado">
           <li id="listarProduto">Listar Produtos</li>
           <li id="cadastrarProduto">Cadastrar Produto</li>
          </ul>
      </li>

      <li >Feed Back</li>
      <li id="configuracao">Configuração</li>
      <li>sair</li>
    </ul>


    <div id="infoGeral">
      <div class="infoEmpresa control">
         <h1 class="tituloGrafico">"Não tenha medo de desistir do bom para perseguir o ótimo"</h1>
         <span>– John D. Rockefeller, empreendedor</span>
      </div>


<!--Cadastrar produto-->
      <form class="control desativado" id="formCadastrarProduto">
        <h2>Cadastrar Produto<sub class="desativado"></sub></h2>
        <span>Nome do produto: <sub class="subAviso">obrigatório</sub></span>
        <input type="text" name="nome" placeholder="Informe o nome do produto" required />
        
        <span>Imagem para produto: <sub class="subAviso">arquivo menor que 2 megabyte</sub></span>
        <input type="file" name="imagem" placeholder="Informe a imagem do produto" required />
        
        <span>Descrição: <sub class="subAviso">obrigatório, total de caracteres <caracteres><digit>0</digit>/5000</caracteres></sub> </span>
        <textarea name="descricao" placeholder="descrever o produto, se houver promoção descreva aqui" required></textarea>
        
        <span>Valor: <sub class="subAviso">obrigatório</sub> </span>
        <input type="text" name="valor" placeholder="Informe o preço" required />
        
        <span>Máximo de parcelas: <sub class="subAviso">opcional</sub> </span>
        <input type="text" name="parcelamento" placeholder="se houver, informe o valor máximo do parcelamento"/>
        
        <span>Promoção: <sub class="subAviso">opcional</sub></span>
        <select name="promocao" >
          <option value="0">Selecione:</option>
          <option value="0">Não tem promoção</option>
          <option value="1">Tem promoção</option>
        </select>
       
        <span>Frete: <sub class="subAviso">opcional</sub></span>  
        <select name="frete" >
          <option value="0">Selecione:</option>
          <option value="0">Não tem frete</option>
          <option value="1">Tem frete</option>
        </select>

        <button>Cadastrar</button>
      </form>

<!--Listar produto-->
      <div class="control desativado" id="formListarProduto">
        <form class="pesquisa">
          <input type="text" name="produto" placeholder="nome do produto" />
          <button>Pesquisar</button>
        </form>
        <span class="spanEstilo1">Quantidade de produtos:
         <quantidadeProdutos>
          <?php quantidadeProdutos($_SESSION['empresa']['id_empresa']); ?>
         </quantidadeProdutos>
         cadastrado
        </span>
        <div class="painel">
          <!--<div class="lista">
            <div class="itens">
              <img src="">
                <h3>Nome do Produto</h3>
            </div>
          </div-->

      </div>
          <div class="setaBaixo">
            <img  src="/imgs/down-arrow.png">
          </div>
      </div>

<!--Procurar Fornecedor-->
      <div class="control desativado" id="formProcurarFornecedor">
        <form class="pesquisa">
          <input type="text" name="produto" placeholder="nome do produto" />
          <button>Pesquisar</button>
          <span class="spanEstilo1">Procura fornecedor pelo produto. </span>
        </form>
        <div class="painel desativado">
        </div>
      </div>      

<!--Listar Fornecedor-->
      <div class="control desativado" id="formListarFornecedor">
        <h2>Meus Fornecedores</h2>
        <span class="spanEstilo1">Quantidade de fornecedores: 0</span>
        <h1 class="nenhumResultado desativado">Nenhum fornecedor para esse produto está cadastrado ainda.</h1>
        <div class="painel desativado">
        <!--Código AJAX-->
      </div>
      </div>   

<!--Configuração-->   
      <form id="formConfiguracao" class="control desativado">
        <h2>Configuração<sub class="desativado"></sub></h2>
        <div>
          <span>Nome da empresa:</span>
          <input type="text" name="nome"  placeholder="nome">
        </div>
        <div>
          <span>Imagem da empresa: <sub>máximo de 2MB</sub> </span>
          <input type="file" name="imagem">
        </div>
        <div>
          <span>Estado:</span>
          <input type="text" name="estado" >
        </div>
        <div>
          <span>Bairro:</span>
          <input type="text" name="bairro">
        </div>
        <div>
          <span>Endereço:</span>
          <input type="text" name="endereco" > 
        </div>
        <select name="tipo">
          <option>fornecedor</option>
          <option>loja</option>
          <option>outros</option>
        </select>
        <div>
          <span>Descrição da empresa:</span>
          <textarea name="descricao" ></textarea>
        </div>
        <div>
          <span>Observação: horário de atendimento e etc.</span>
          <textarea name="observacao"></textarea>
        </div>
        <div>
          <span>Categoria:</span>
          <input type="text" name="categoria" placeholder="categoria: exemplo restaurante">
        </div>

        <div>
          <span>Senha atual:</span>
          <input type="password" name="senha">
        </div>
        
        <div>
          <span>Nova senha:</span>
          <input type="password" name="senha_resete" >
        </div>
        
        <div>
          <span>Confirmar senha:</span>
          <input type="password" name="confirmar_senha" >
        </div>
        <div>
          <button>enviar</button>
          <button>Visualizar dados atual</button>
        </div>
        <div>
        </div>

      </form>





    </div>
  </main>
  <footer></footer>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="js/app.js"></script> 
 
 
</body>
</html>