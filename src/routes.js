const express = require('express');
const PostController = require('./controllers/PostController');

const routes = new express.Router();

//-> route utilizando middleware => vai interceptar as requisições da API
    //=> utiliza-se o res para enviar respostas para o client-side
    //=> utiliza-se o req para receber requisições, parâmetros 
routes.get('/ola', (req, res) => {
    return res.send(`Olá ${req.query.name}`);
});

//cadastra Posts
routes.post('/posts', PostController.store);

module.exports = routes;
