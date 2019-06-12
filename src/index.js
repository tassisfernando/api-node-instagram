const express = require('express');
const mongoose = require('mongoose');

//cria um 'server'
const app = express();

//conexão com o mongoDB Atlas
mongoose.connect('mongodb+srv://root:root@cluster0-9wapn.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//define o arquivo de rotas
app.use(require('./routes'));

//define a porta que a aplicação usará
app.listen(3333);