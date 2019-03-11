const Profissao = require('../models/profession');

// LIST
exports.find = function (req, res) {
    Profissao.find(function(err,profs) {
        if (err)
            res.send(err);

        res.status(200).json({
            profissaos: profs
        })
    })
};

// FIND ONE
exports.findById = function (req, res) {
    Profissao.findById(req.params.professionId)
        .then(profession => {
            if(!profession) {
                return res.status(404).send({
                    message: "Profissao não encontrada com o id: " + req.params.professionId
                });            
            }
            res.send(profession);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Profissao não encontrada com o id: " + req.params.professionId
                });                
            }
            return res.status(500).send({
                message: "Ops! Ocorreu um erro ao recuperar a profissao: " + req.params.professionId
            });
        });
};

// CREATE
exports.create = function (req, res) {
    var profissao = new Profissao();
    profissao.descricao = req.body.descricao;

    profissao.save(function(error) {
        if (error)
            res.send("Erro ao tentar salvar a profissao");

        res.status(201).json({message: 'profissao salva com sucesso'});
    })
};

// UPDATE
exports.update = function (req, res) {
    // Valida se a requisição não esta vazia
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo da profissao não pode ser vazio"
        });
    }

    // Procura e atualiza o profissao especificado no body da requisição
    Profissao.findByIdAndUpdate(req.params.professionId, {
        descricao: req.body.descricao,
    }, {new: true})
    .then(profession => {
        if(!profession) {
            return res.status(404).send({
                message: "Profissao não encontrada com o id: " + req.params.professionId
            });
        }
        res.send(profession);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profissao não encontrada com o id: " + req.params.professionId
            });                
        }
        return res.status(500).send({
            message: "Ops! Ocorreu um erro ao atualizar id: " + req.params.professionId
        });
    });
};

// DELETE
exports.delete = function (req, res) {
    
    Profissao.findByIdAndRemove(req.params.professionId)
    .then(profession => {
        if(!profession) {
            return res.status(404).send({
                message: "Profissao não encontrada com o id: " + req.params.professionId
            });
        }
        res.send({message: "Profissao deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Profissao não encontrada com o id: " + req.params.professionId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar a profissao com id: " + req.params.professionId
        });
    });
};
