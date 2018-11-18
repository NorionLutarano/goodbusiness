 <?php 
 
  function moverArquivo($imagem,$diretorio,&$path){
    //verifica se algum arquivo foi enviado
    if(isset( $imagem[ 'name' ] ) && $imagem[ 'error' ] == 0 ){
      //verifica se a imagem é maior que 2 Mb
      if($imagem['size']>2097152){
         return 5;
      }
      //obtem path temporário do arquivo
      $arquivo_tmp=$imagem['tmp_name'];
      //obtem o nome do arquivo
      $nome=$imagem['name'];
      // Pega a extensão
        $extensao = pathinfo($nome, PATHINFO_EXTENSION );
      
        // Converte a extensão para minúsculo
        $extensao = strtolower($extensao);

        if(strstr('.jpg;.jpeg;.png',$extensao)){
          $novoNome=uniqid(time(),true).'.'.$extensao;
          //seta o diretório
          $destino = $diretorio.md5(time()).'/';
          //criar diretório
          mkdir($destino);
          //cria path arquivo
          $destino.=$novoNome;
          //tenta mover o arquivo para o destino
          if(@move_uploaded_file($arquivo_tmp, $destino)){
            $path=$destino;
            return 1;
          }else{
            return 2;//"Servidor está em Manutenção.";
          }
        }else{
          return 3; //"Você só pode enviar arquivos de imagem .jpeg, .jpg ou .png.";
        }


    }else{
      return 4;//"Você não enviou arquivo de imagem.";
    }
  }