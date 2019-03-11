const Produto = require('../models/product');

// LIST
exports.find = function (req, res) {
    Produto.find(function(err,prods) {
        if (err)
            res.send(err);

        res.status(200).json({
            produtos: prods
        })
    })
};

// FIND ONE
exports.findById = function (req, res) {
    Produto.findById(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Produto não encontrado com o id: " + req.params.productId
                });            
            }
            res.send(product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Produto não encontrado com o id: " + req.params.productId
                });                
            }
            return res.status(500).send({
                message: "Ops! Ocorreu um erro ao recuperar o produto: " + req.params.productId
            });
        });
};

// CREATE
exports.create = function (req, res) {
    var produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;
    produto.categoria.descricao = req.body.categoria.descricao;

    produto.save(function(error) {
        if (error)
            res.send("Erro ao tentar salvar o produto");

        res.status(201).json({message: 'produto salvo com sucesso'});
    })
};

// UPDATE
exports.update = function (req, res) {
    // Valida se a requisição não esta vazia
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo do produto não pode ser vazio"
        });
    }

    // Procura e atualiza o produto especificado no body da requisição
    Produto.findByIdAndUpdate(req.params.productId, {
        nome: req.body.nome || "Sem nome",
        preco: req.body.preco, 
        descricao: req.body.descricao,
        categoria: {
            descricao: req.body.categoria.descricao
        }

    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Ops! Ocorreu um erro ao atualizar id: " + req.params.productId
        });
    });
};

// DELETE
exports.delete = function (req, res) {
    
    Produto.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.productId
            });
        }
        res.send({message: "Produto deletado com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar o produto com id: " + req.params.productId
        });
    });
};
