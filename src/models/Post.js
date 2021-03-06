const mongoose = require('mongoose');

//representação da tabela Post no BD
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true, //gera os atributos created_at e updated_at
});

module.exports = mongoose.model('Post', PostSchema);