var express = require('express');
var router = express.Router();

var holes = 4;
var colors = 6;

var randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/problem', function(req, res) {
    var key = randomInt(1, 100000);
    var array = [];
    for (var i = 0; i < holes; i++) {
        array.push(randomInt(0, colors));
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ publicKey: key, problem: array }, null, 3));
});



module.exports = router;

    // Geracao problema

    // no server, gerar dois numeros random: seed(private-key), e public-key usar esse seed para gerar o problem_random
    // gerar um problema dinamico, usando o problem_random
    // gravar session, Session[public-key] = { seed, tentativas(20) }
    // escrever o public-key no cookie

    // Vlidar guess

    // client envia guess aberto, junto com public-key
    // server pega public-key, procura na session o seed
    // regerar problema com o seed
    // validar problema, descrescer tentativas
    // retornar guess validado
