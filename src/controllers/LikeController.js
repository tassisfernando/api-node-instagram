const Post = require('../models/Post');

module.exports = {
    //cadastra um post
    async store(req, res){
        const post = await Post.findById(req.params.id); //retorna do banco o registro com o id recebido, usando o Model Post

        post.likes += 1;

        await post.save();

        //quando der like todos os users logados vão receber ele em tempo real
        req.io.emit('like', post);

        return res.json(post);
    }
};