const Post = require('../models/Post');

module.exports = {
    //retorna uma lista dos posts
    async index(req, res) {
        
    },

    //cadastra um post
    async store(req, res){
        return res.json({ ok: true })
    }
};