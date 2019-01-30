<?php
require_once("../../autoload.php");
if(!usuarioEstaLogado()){
  header("Location: /");
  exit();
}
require_once "php/quantidadeProdutos.php";

?>




<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Good Business</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap-reboot.css">
  <link rel="stylesheet" href="/pages/usuario/css/empresa.css">
   
</head>
<body>
  <header >
    <h1 class="titulo">Lilium<sub>alfa</sub></h1>
    <span class="nomeEmpresa"></span>
    <div id="menu" style="display: none;">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </header>


  <main>
    <ul class="menu">
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
      <li>ajuda</li>
      <li id="configuracaoconta">conta</li>
      <li><a href="php/deslogar.php">sair</a> </li>
    </ul>


    <div id="infoGeral" >
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
        <img src="/imgs/image.png">
        
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
        <span>tipo do produto: <sub class="subAviso">opcional</sub></span>
        <input type="text" name="tipo" placeholder="exemplo: piso, cortina, celular...">
        <span>modelo: <sub class="subAviso">opcional</sub></span>
        <input type="text" name="modelo" >
        <span>fabricante: <sub class="subAviso">opcional</sub></span>
        <input type="text" name="fabricante">
        <button>Cadastrar</button>
      </form>

<!--adicionar fornecedor-->
    <div class="control desativado" id="formAdicionarFornecedor">
      <form >
        <input type="text" name="addF" class="desativado addF">
        <input type="text" name="addP" class="desativado addP">
        <nomeProduto>
          <voltar><img src="/imgs/voltar.png"></voltar>
          <span>Casa</span>
        </nomeProduto>
        <table>
          <imagemProduto></imagemProduto>
          <tbody>
            <tr>
              <th>
                <span>Descrição do produto: </span>
              </th>
              <th>
                <descricaoProduto>muita boa com vista para</descricaoProduto>
              </th>
            </tr>
            
            <tr>
              <th>
                <span>Valor:</span>
              </th>
              <th>
                <valor>125.696,25</valor>
              </th>
            </tr>

            <tr>
              <th>
                <span>Frete:</span>
              </th>
              <th>
                <frete>possui</frete>
              </th>
            </tr>
            <tr>
              <th>
                <span>Parcelamento:</span>
              </th>
              <th>
                <parcelamento>12x</parcelamento>
              </th>
            </tr>
                
            <tr>
              <th>
                <span>Nome da empresa:</span>
              </th>
              <th>
                <nomeEmpresa>Imobiáliaria</nomeEmpresa>
              </th>
            </tr> 
            <tr>
              <th>
                <span>Cnpj:</span>
              </th>
              <th>
                <cnpj>127-985-787/20</cnpj>
              </th>
            </tr>
            <tr>
              <th>
                <span>Estado: </span>
              </th>
              <th>
                <estado>Rio de janeiro</estado>
              </th>
            </tr>
            <tr>
              <th>
                <span>Bairro:</span>
              </th>
              <th>
                <bairro>Cascadura</bairro>
              </th>
            </tr>
            <tr>
              <th>
                <span>Endereço:</span>
              </th>
              <th>
                <endereco>R° Marcelo de Alencar n° 12</endereco>
              </th>
            </tr>
            <tr>
              <th>
                <span>Descrição da empresa:</span>
              </th>
              <th>
                <descricaoEmpresa>Empresa de venda de imóveis desde 1901</descricaoEmpresa>
              </th>
            </tr>
            
            <tr>
              <th>
                <span>Contato:</span>
              </th>
              <th>
                <span> 21-12345-6789 </span>
                <span> 21-12345-9876 </span>
              </th>
            </tr>
          </tbody>
        </table>
        <button>Adicionar</button>
      </form>
    </div>
<!---->

<!--Listar produto-->
      <div class="control desativado" id="formListarProduto">
        <form class="pesquisa">
          <input style=" width:60rem;" type="text" name="produto" placeholder="nome do produto" />
          <button>Pesquisar</button>
        </form>
        <span class="spanEstilo1">
         produtos cadastrados.         
         <quantidadeProdutos><?php quantidadeProdutos(); ?></quantidadeProdutos>
        </span>
        <div class="painel"></div>
          <carregando class="desativado">Carregando...</carregando>
          <div class="setaBaixo" >
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
           </select><!--
           --><button>Pesquisar</button>
          <span class="spanEstilo1">Procura fornecedor pelo produto. </span>
        </form>
         <div class="painel">
        </div>
        <carregando class="desativado">Carregando...</carregando>
          <div class="setaBaixo" >
            <img  src="/imgs/setaBaixo.png">
          </div>
      </div>      






<!--Listar Fornecedor-->
      <div class="control desativado" id="formListarFornecedor">
        <div class="confirmacao desativado">
          <fechar></fechar>
          <span>Realmente deseja excluir esse produto?</span>
          <button>Excluir</button>
        </div>
        <h2>Meus Fornecedores</h2>
        <span class="spanEstilo1">Quantidade de fornecedores: <quantidadeFornecedor></quantidadeFornecedor></span>
        <h1 class="nenhumResultado desativado">Nenhum fornecedor para esse produto está cadastrado ainda.</h1>
        <div class="painel"></div>
        <div class="setaBaixo" style="display: none;">
          <img src="/imgs/setaBaixo.png">
        </div>
      </div>   

<!--Informação do produto do fornecedor-->
      <div id="contatoFornecedor" class="control desativado">
        <div class="nomeProduto">
          <voltar><img src="/imgs/voltar.png"/></voltar>
          <h4></h4>
        </div>
          <span>Descrição Produto</span>
          <div class="descricaoproduto"></div>
          <span>Parcelamento</span>
          <div class="parcelamento"></div>
          <span>Valor</span>
          <div class="valor"></div>
          <span>Razão social</span>
          <div class="razaosocial"></div>
          <span>Endereço</span>
          <div class="endereco"></div>
          <span>Bairro</span>
          <div class="bairro"></div>
          <span>Estado</span>
          <div class="estado"></div>
          <span>Cep</span>
          <div class="cep"></div>
          <span>Contato</span>
          <div class="contato"></div>
          <span>Email</span>
          <div class="email"></div>
          <span>Cpnj</span>
          <div class="cnpj"></div>
      </div>

<!--Configuração-->   
      <form id="formConta" class="control desativado">
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
          <button>atualizar</button>
        </div>
      </form>

<!--Aviso-->
    <div id="aviso" class="desativado">
     <div id="mensagem">
      <img src="/imgs/x.png">
      <h4></h4>
     </div>
      <div id="html"></div>
    </div>

<!--Mostrar Meus produtos-->
    <div id="infoProduto" class="control desativado">
      <img>
      <form>
        <span>nome:</span>
        <input type="hidden" class="Catualizar" name="atualizar">
        <input class="Cident" type="hidden" name="ident"  required>
        <input class="Cnome" type="text" name="nome" placeholder="nome" required>
        <span>descrição:</span>
        <textarea maxlength="5000" class="Cdescricao" name="descricao" placeholder="descrição" required></textarea>
        <span>valor:</span>
        <input class="Cvalor" type="text" name="valor" placeholder="valor" maxlength="13" required>
        <span>parcelamento:</span>
        <input class="Cparcelamento" type="text" name="parcelamento" placeholder="informe número máximo de parcelamento" required>
        <span>promoção:</span>
        <select name="promocao" class="Cpromocao">
          <option value="1">tem promoção</option>
          <option value="0">sem promoção</option>
        </select>
        <span>nova imagem se houver:</span>
        <input type="file" name="img" placeholder="imagem">
        <span >frete:</span>
        <select class="Cfrete" name="frete" >
          <option value="1">tem frete</option>
          <option value="0">sem frete</option>
        </select>
        <span>tipo do produto:</span>
        <input class="Ctipo" type="text" name="tipo" placeholder="exemplo: piso, cortina, celular...">
        <span>modelo:</span>
        <input class="Cmodelo" type="text" name="modelo" >
        <span>fabricante:</span>
        <input class="Cfabricante" type="text" name="fabricante">
      </form>
      <div class="butoes">  
        <button class="atualizar">atualizar</button>
        <button class="excluir">excluir</button>
      </div>
    </div>


    </div>
  </main>
  <footer></footer>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="js/app.js"></script> 
 
 
</body>
</html>