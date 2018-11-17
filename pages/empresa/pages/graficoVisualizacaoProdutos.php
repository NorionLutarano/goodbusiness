<?php
 function listaProdutos($produtos){
    foreach ($produtos as $nome){
        echo "<option>". $nome ."</option>";
    } 
 }
?>


<style type="text/css">
    
.chart{
    width: 700px;
    float:left;
}

.verViewProduto{
    float: right;
    width: 375px;
    height: 300px;
    position: relative;
}

.verViewProduto > h2{
    font-size: 1.2rem;
    font-family:arial;
    font-weight:100;
    cursor:default;
    text-align: left;
    color:#507987;
}


.verViewProduto  input{
    width: 370px;
    height:25px;
}
</style>
<div class="chart">
    <canvas id="bar-chart"> </canvas>
</div>
<div class="verViewProduto">
    <h2>Ver views de um produto</h2>
    <input
     class="awesomplete" list="meusProdutos" onchange="Produto(this.value);"/>
     <datalist id="meusProdutos">
      <?php listaProdutos(['coca-cola','apple']); ?>
     </datalist>
</div>
<form method="post" action="/pages/empresa/pages/graficoVisualizacaoProdutos.php" style="display: none;">
    <input type="text" name="produto">
</form>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<script type="text/javascript" src="../../js/grafico.js"></script>
<script type="text/javascript">
    var Produto = function(valor){
        document.querySelectorAll('option')
                .forEach(function(item){
                    if(valor.toLowerCase() == item.value){
                        document.querySelector('form > input').value=item.value;
                        document.forms[0].submit();
                    }
        });
    };
    window.onload=function(){
        grafico('bar-chart',['coca-cola','apple'],[2548,68],["#a57A98","#9F5A22"]);
    };
</script>