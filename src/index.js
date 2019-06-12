const express = require('express'); //base de tudo -> permite trabalhar com rotas, requisições, etc
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 

//cria um 'server'
const app = express();

const server = require('http').Server(app); //configura server para receber requisições HTTP
const io = require('socket.io')(server); //configura o server para receber requisições via web socket

//conexão com o mongoDB Atlas
mongoose.connect('mongodb+srv://root:root@cluster0-9wapn.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//criando um middleware para conseguir acessar o io de qualquer lugar e atualizar em real time a aplicação para todos os users logados
app.use((req, res, next) => {
    req.io = io;

    next();
});

//para permitir que a API seja usada por outros domínios
app.use(cors());

//rota para acessar arquivos estáticos (imagens)
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//define o arquivo de rotas
app.use(require('./routes'));

//define a porta que a aplicação usará
server.listen(3333);