const Pessoa = require('../models/person');

// LIST
exports.find = function (req, res) {
    Pessoa
    .find(function(err,persons) {
        
        //persons.select('Profissao');

        if (err)
            res.send(err);

        res.status(200).json({
            pessoas: persons
        })
    })
    .populate('profissao', 'descricao -_id')
    .select('nome cpf profissao');
};

// FIND ONE
exports.findById = function (req, res) {
    Pessoa
    .findById(req.params.personId)
    .populate('profissao', 'descricao -_id')
    .select('nome cpf profissao')
        .then(person => {
            if(!person) {
                return res.status(404).send({
                    message: "Pessoa não encontrada com o id: " + req.params.personId
                });            
            }
            res.send(person);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pessoa não encontrada com o id: " + req.params.personId
                });                
            }
            return res.status(500).send({
                message: "Ops! Ocorreu um erro ao recuperar a pessoa: " + req.params.personId
            });
        });
        
};

// CREATE
exports.create = function (req, res) {
    var pessoa = new Pessoa();
    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf;
    pessoa.profissao = req.body.profissao

    pessoa.save(function(error) {
        if (error)
            res.send("Erro ao tentar salvar a pessoa");

        res.status(201).json({message: 'pessoa salva com sucesso'});
    })
};

// UPDATE
exports.update = function (req, res) {
    // Valida se a requisição não esta vazia
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo da pessoa não pode ser vazio"
        });
    }

    // Procura e atualiza o pessoa especificado no body da requisição
    Pessoa.findByIdAndUpdate(req.params.personId, {
        nome: req.body.nome,
        cpf: req.body.cpf,
        profissao: req.body.profissao
                    
    }, {new: true})
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.personId
            });
        }
        res.send(person);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.personId
            });                
        }
        return res.status(500).send({
            message: "Ops! Ocorreu um erro ao atualizar id: " + req.params.personId
        });
    });
};

// DELETE
exports.delete = function (req, res) {
    
    Pessoa.findByIdAndRemove(req.params.personId)
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.personId
            });
        }
        res.send({message: "Pessoa deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.personId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar a pessoa com id: " + req.params.personId
        });
    });
};
