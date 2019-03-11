var mongoose = require('mongoose');
var schema = mongoose.Schema;

var profissaoSchema = new schema({
    descricao: String
});

module.exports = mongoose.model('Profissao', profissaoSchema);