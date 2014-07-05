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

var generateProblem = function () {
    var available = range(holes);
    var array = [];
    for (var i = 0; i < holes; i++) {

        var index = randomInt(0, available.length);

        array.push(available[index]);

        available.splice(index, 1);
    }
    return array;
};

var range = function (limit) {
    var rang = [];
    for (var i = 0; i < limit; i++)
        rang.push(i);
    return rang;
}

router.get('/problem', function (req, res) {
    var key = uuid.v4();
    var problemArray = generateProblem();

    var games = req.session.problems || {};

    games[key] = { problem: problemArray, tries: 10-1 };

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

var evalGuess = function (solution, guess) {
    var inp = 0;
    var out = 0;

    console.log('eval sol: ' + solution)
    console.log('eval gss: ' + guess)

    for (var i = 0; i < holes; i++) {
        if (solution[i] == guess[i]) {
            inp++;
        } else if (guess.indexOf(solution[i]) >= 0) {
            out++;
        }
    }

    console.log(JSON.stringify({ inplace: inp, outplace: out }))

    return { inplace: inp, outplace: out };
};

router.get('/eval/:key/:guess', function (req, res) {
    var key = req.param('key');
    var guess = req.param('guess') - 1111;
    var games = req.session.games || {};
    var result = null;

    var game = games[key]

    if (game.tries >= 0) {
        game.tries--;

        result = evalGuess(game.problem, numToArray(guess));
    } 

    var revealSolution = game.tries < 0 || result.inplace >= holes;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        tries: game.tries,
        triedGuess: numToArray(guess),
        eval: result,
        solution: revealSolution ? game.problem : null
    }, null, 3));
});

module.exports = router;