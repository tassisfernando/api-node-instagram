const Post = require('../models/Post');
const sharp = require('sharp'); //para manipular imagens
const path = require('path');
const fs = require('fs');

module.exports = {
    //retorna uma lista dos posts
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt'); //ordenando os posts por data mais recente

        return res.json(posts);
    },

    //cadastra um post
    async store(req, res){
        const { author, place, description, hashtags } = req.body; //Desestruturação => PESQUISAR
        const { filename: image } = req.file; //Pega apenas o filename do req.file e armazena com o nome 'image'

        const [name] = image.split('.'); //separando a variável image outras duas: uma com o nome e outra com a extensão

        const fileName = `${name}.jpg`;

        //redimensionando a imagem e salvando a nova versão na pasta resized
        await sharp(req.file.path)
            .resize(500)
            .jpeg( { quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        //excluido a imagem antiga
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //quando criar um novo post todos os users logados vão receber ele em tempo real
        req.io.emit('post', post);

        return res.json(post);
    }
};