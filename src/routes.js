const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();

//Define as configurações de upload de arquivos da aplicação
const upload = multer(uploadConfig);

//-> route utilizando middleware => vai interceptar as requisições da API
    //=> utiliza-se o res para enviar respostas para o client-side
    //=> utiliza-se o req para receber requisições, parâmetros 
routes.get('/ola', (req, res) => {
    return res.send(`Olá ${req.query.name}`);
});

//retorna todos os posts
routes.get('/posts', PostController.index);

//cadastra Posts - utiliza o *multer* para receber multiforms data
routes.post('/posts', upload.single('image') ,PostController.store);

//permite dar like => id vem por params
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
