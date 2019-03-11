// var http = require('http');
// var server = http.createServer(function(request, response){
//     response.writeHead(200, {"Content-Type" : "text/html"});
//     response.write("<h1>Hello from server</h1>");
//     response.end();
// });

// server.listen(3000);

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

var moongose = require('mongoose');
var Produto = require('./app/models/product');

// Controller do produto
const product_controller = require('./app/controllers/product.controller');
const person_controller = require('./app/controllers/person.controller');
const profession_controller = require('./app/controllers/profession.controller');



// Conexão com o Mongodb
moongose.connect('mongodb://mongodb:27017/bdCrud');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//PORT
var port = process.env.port || 3000;

//ROUTES
var router = express.Router(); // intercept rotas;

//Middleware
router.use(function(req, res, next) {
    console.log("middleware");
    next();
});

router.get('/', (req, res) => res.json({"message": "rota workando aeHOO"}));

// PRODUCT ROUTES
router.get('/produtos', product_controller.find);
router.get('/produtos/:productId', product_controller.findById);
router.post('/produtos', product_controller.create);
router.post('/produtos/edit/:productId', product_controller.update);
router.get('/produtos/delete/:productId', product_controller.delete);
// END PRODUCT ROUTES

// PERSON ROUTES
router.get('/pessoas', person_controller.find);
router.get('/pessoas/:personId', person_controller.findById);
router.post('/pessoas', person_controller.create);
router.post('/pessoas/edit/:personId', person_controller.update);
router.get('/pessoas/delete/:personId', person_controller.delete);
// END PRODUCT ROUTES

// PROFESSION ROUTES
router.get('/profissoes', profession_controller.find);
router.get('/profissoes/:professionId', profession_controller.findById);
router.post('/profissoes', profession_controller.create);
router.post('/profissoes/edit/:professionId', profession_controller.update);
router.get('/profissoes/delete/:professionId', profession_controller.delete);
// END PRODUCT ROUTES

app.use('/api', router);

app.listen(port, () => {
    console.log('Server UP aeHOOOOO');
    
});