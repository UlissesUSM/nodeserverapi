var mongoose = require('mongoose');
var schema = mongoose.Schema;

var produtoSchema = new schema({
    nome: String,
    preco: Number,
    descricao: String,
    categoria: {
        descricao: String
    }
});

module.exports = mongoose.model('Produto', produtoSchema);