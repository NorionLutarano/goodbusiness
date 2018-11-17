<?php
function formatar ($tipo = "", $string, $size = 10)
{
    $string = preg_replace("[^0-9]", "", $string);
    
    switch ($tipo)
    {
        case 'fone':
            if($size === 10){
             $string = '(' . substr($tipo, 0, 2) . ') ' . substr($tipo, 2, 4) 
             . '-' . substr($tipo, 6);
         }else
         if($size === 11){
             $string = '(' . substr($tipo, 0, 2) . ') ' . substr($tipo, 2, 5) 
             . '-' . substr($tipo, 7);
         }
         break;
        case 'cep':
            $string = substr($string, 0, 5) . '-' . substr($string, 5, 3);
         break;
        case 'cpf':
            $string = substr($string, 0, 3) . '.' . substr($string, 3, 3) . 
                '.' . substr($string, 6, 3) . '-' . substr($string, 9, 2);
         break;
        case 'cnpj':
            $string = substr($string, 0, 2) . '.' . substr($string, 2, 3) . 
                '.' . substr($string, 5, 3) . '/' . 
                substr($string, 8, 4) . '-' . substr($string, 12, 2);
         break;
        case 'rg':
            $string = substr($string, 0, 2) . '.' . substr($string, 2, 3) . 
                '.' . substr($string, 5, 3);
         break;
        default:
         $string = 'É ncessário definir um tipo(fone, cep, cpg, cnpj, rg)';
         break;
    }
    return $string;
}