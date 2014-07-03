var express = require('express');
var router = express.Router();


var uuid = require('node-uuid');

var holes = 4;
var colors = 6;

var randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var generateProblem = function() {
    var array = [];
    for (var i = 0; i < holes; i++) {
        array.push(randomInt(0, colors));
    }
    return array;
};

router.get('/problem', function (req, res) {
    var key = uuid.v4();
    var problemArray = generateProblem();

    var games = req.session.problems || {};

    games[key] = { problem: problemArray, tries: 10 };

    req.session.games = games;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ publicKey: key }, null, 3));
});

var numToArray = function (num) {

    var array = [];
    var div = Math.pow(10, holes - 1);

    while (div >= 1) {
        var n = Math.floor(num / div);
        array.push(n);

        num -= n*div;
        div /= 10;
    }

    return array;
};

/* taken from https://packages.debian.org/jessie/gnome-mastermind */
var evalGuess = function (solution, guess) {
    var inp = 0;
    var out = 0;
    var tmp = [];
    for (var i = 0; i < holes; i++)
        tmp.push(solution[i]);

    for (var i = 0; i < holes; i++) {
        if (tmp[i] == guess[i]) {
            inp++;
            tmp[i] = -1;
            guess[i] = -2;
        } 
    }
    for (var i = 0; i < holes; i++) {
        for (var j = 0; j < holes; j++) {
            if (guess[i] == tmp[j]) {
                out++;
                guess[i] = -2;
                tmp[j] = -1;
            }
        }
    }

    return {inplace: inp, outplace: out};
};

router.get('/eval/:key/:guess', function (req, res) {
    var key = req.param('key');
    var guess = req.param('guess') - 1111;
    var games = req.session.games || {};
    var result = null;

    var game = games[key]

    if (game.tries > 0) {
        game.tries--;

        result = evalGuess(game.problem, numToArray(guess));
    } 

    var revealSolution = result.inplace >= holes || games.tries == 0;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        tries: game.tries,
        triedGuess: numToArray(guess),
        eval: result,
        solution: revealSolution ? game.problem : null
    }, null, 3));
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
