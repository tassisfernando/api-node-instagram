const multer = require('multer');
const path = require('path');

module.exports = {
    //informa como os dados serão salvos. No caso foi escolhida a opção de salvar no disco
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, callback){
            callback(null, file.originalname); //pega o nome da imagem original 
        },
    })
};