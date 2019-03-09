var mongoose = require('mongoose');
var schema = mongoose.Schema;

var produtoSchema = new schema({
    nome: String,
    preco: Number,
    descricao: String
});

module.exports = mongoose.model('Produto', produtoSchema);