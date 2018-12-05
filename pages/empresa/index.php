<?php
session_start();
session_regenerate_id();
require_once("../../autoload.php");
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
      <li><a href="php/deslogar.php">sair</a> </li>
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
        <input  type="text" name="nome" placeholder="Informe o nome do produto" required />
        
        <span>Imagem para produto: <sub class="subAviso">arquivo menor que 2 megabyte</sub></span>
        <input type="file" name="imagem" placeholder="Informe a imagem do produto" required />
        
        <span>Descrição: <sub class="subAviso">obrigatório, total de caracteres <caracteres><digit>0</digit>/5000</caracteres></sub> </span>
        <textarea maxlength="5000" name="descricao" placeholder="descrever o produto, se houver promoção descreva aqui" required></textarea>
        
        <span>Valor: <sub class="subAviso">obrigatório</sub> </span>
        <input type="text" name="valor" placeholder="Informe o preço" required maxlength="13" />
        
        <span>Máximo de parcelas: <sub class="subAviso">opcional</sub> </span>
        <input maxlength="3" type="text" name="parcelamento" placeholder="se houver, informe o valor máximo do parcelamento"/>
        
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

<!--adicionar fornecedor-->
      <form class="control desativado" id="formAdicionarFornecedor">
        <input type="text" name="addProduto" class="desativado">
        <voltar></voltar>
        <nomeProduto></nomeProduto>
        <imagemProduto></imagemProduto>
        <descricaoProduto></descricaoProduto>
        <valor></valor>
        <frete></frete>
        <parcelamento></parcelamento>
        <nomeEmpresa></nomeEmpresa> 
        <imagemEmpresa></imagemEmpresa>
        <cnpj></cnpj>
        <categoria></categoria>
        <estado></estado>
        <bairro></bairro>
        <endereco></endereco>
        <descricaoEmpresa></descricaoEmpresa>
        <observacao></observacao>
        <contato></contato>
        <button>Adicionar</button>
      </form>
<!---->

<!--Listar produto-->
      <div class="control desativado" id="formListarProduto">
        <form class="pesquisa">
          <input style=" width:60rem;" type="text" name="produto" placeholder="nome do produto" />
          <button>Pesquisar</button>
        </form>
        <span class="spanEstilo1">
         <quantidadeProdutos></quantidadeProdutos>
         produtos cadastrados.         
        </span>
        <div class="painel">
          <!--<div class="lista">
            <div class="itens">
              <img src="">
                <h3>Nome do Produto</h3>
            </div>
          </div-->
      </div>
          <carregando class="desativado">Carregando...</carregando>
          <div class="setaBaixo desativado" >
            <img  src="/imgs/setaBaixo.png">
          </div>
      </div>
<!--editar produto-->
      <form class="control desativado" id="editarProduto">
        <h2>Editar Produto<sub class="desativado"></sub></h2>
        <span>Nome do produto: <sub class="subAviso">obrigatório</sub></span>
        <input type="text" name="nome" placeholder="Informe o nome do produto" required />
        
        <span>Imagem para produto: <sub class="subAviso">arquivo menor que 2 megabyte</sub></span>
        <input type="file" name="imagem" placeholder="Informe a imagem do produto" required />
        
        <span>Descrição: <sub class="subAviso">obrigatório, total de caracteres <caracteres><digit>0</digit>/5000</caracteres></sub> </span>
        <textarea maxlength="5000" name="descricao" placeholder="descrever o produto, se houver promoção descreva aqui" required></textarea>
        
        <span>Valor: <sub class="subAviso">obrigatório</sub> </span>
        <input type="text" name="valor" placeholder="Informe o preço" required maxlength="13" />
        
        <span>Máximo de parcelas: <sub class="subAviso">opcional</sub> </span>
        <input maxlength="3" type="text" name="parcelamento" placeholder="se houver, informe o valor máximo do parcelamento"/>
        
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
        <br />
        <button>Editar</button>
      </form>
<!--Procurar Fornecedor-->
      <div class="control desativado" id="formProcurarFornecedor">
        <form class="pesquisa">
          <input class="nome" type="text" name="nome" placeholder="nome do produto" style="border-right: 0; width: 54rem;" />
            <select  name="estado"  required>
             <option value="AC">AC</option>
             <option value="AL">AL</option>
             <option value="AP">AP</option>
             <option value="AM">AM</option>
             <option value="BA">BA</option>
             <option value="CE">CE</option>
             <option value="DF">DF</option>
             <option value="ES">ES</option>
             <option value="GO">GO</option>
             <option value="MA">MA</option>
             <option value="MT">MT</option>
             <option value="MS">MS</option>
             <option value="MG">MG</option>
             <option value="PA">PA</option>
             <option value="PB">PB</option>
             <option value="PR">PR</option>
             <option value="PE">PE</option>
             <option value="PI">PI</option>
             <option value="RJ">RJ</option>
             <option value="RN">RN</option>
             <option value="RS">RS</option>
             <option value="RO">RO</option>
             <option value="RR">RR</option>
             <option value="SC">SC</option>
             <option value="SP">SP</option>
             <option value="SE">SE</option>
             <option value="TO">TO</option>                             
           </select>
          <button>Pesquisar</button>
          <span class="spanEstilo1">Procura fornecedor pelo produto. </span>
        </form>
         <div class="painel">
        </div>
        <carregando class="desativado">Carregando...</carregando>
          <div class="setaBaixo" >
            <img  src="/imgs/setaBaixo.png">
          </div>
      </div>      


<!--mostrar dados do fornecedor-->

  <produto>
    
  </produto>



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