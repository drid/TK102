var path      = require('path');

var Validator = require('validator.js');
var Assert    = Validator.Assert;
var validator = new Validator.Validator();




/**
 * Verifica se a variavel existe
 * 
 * @param variavel
 * @return boolean
 */
exports.isset = function (variavel)
{
   return (typeof variavel !== 'undefined');
};





/**
 * Se nenhum parametro for informado retorna o diretorio raiz
 * Se o primeiro parametro for informado retorna o diretorio solicitado
 * Se os dois parametros forem informados retorna um arquivo.
 * 
 * @param {object} obj {'endereco': 'arquivo'}
 * @return 
 */
exports.dirRaiz = function(endereco, arquivo)
{
    if(!this.isset(endereco)){
        endereco = null;
    }
    
    if(!this.isset(arquivo)){
        arquivo = null;
    }
    
    var retorno = validator.validate(
        {
            endereco: endereco,
            arquivo : arquivo
        }, 
        {
            'endereco' : [new Assert().NotBlank(), new Assert().NotNull()],
            'arquivo'  : [new Assert().NotBlank(), new Assert().NotNull()]
        }
    );
    
    
    if(retorno === true){
        return path.normalize(path.resolve(__dirname, '../../') +'/'+ endereco +'/'+ arquivo);
    }
    else{
        if(!this.isset(retorno.endereco)){
            return path.normalize(path.resolve(__dirname, '../../') +'/'+ endereco);
        }
    }
    
    return path.normalize(path.resolve(__dirname, '../../'));
};