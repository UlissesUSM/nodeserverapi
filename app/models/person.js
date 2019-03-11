var mongoose = require('mongoose');
var schema = mongoose.Schema;

var pessoaSchema = new schema({
    nome: String,
    cpf: String,
    profissao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissao'
    }
});

module.exports = mongoose.model('Pessoa', pessoaSchema);