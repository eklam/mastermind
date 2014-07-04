var holes = 4;

var evalGuess = function (solution, guess) {
    var inp = 0;
    var out = 0;

    for (var i = 0; i < holes; i++) {
        if (solution[i] == guess[i]) {
            inp++;
        } else if (guess.indexOf(solution[i]) >= 0) {
            out++;
        }
    }

    return { inplace: inp, outplace: out };
};

console.log(evalGuess([0, 1, 2, 3], [0, 1, 2, 3]).inplace == holes ? 'ok' : 'no');
console.log(evalGuess([0, 1, 2, 4], [0, 1, 2, 4]).inplace == holes ? 'ok' : 'no');
console.log(evalGuess([0, 4, 2, 3], [0, 4, 2, 3]).inplace == holes ? 'ok' : 'no');
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 0, 0, 0]);
    console.log(e.inplace == 1 && e.outplace == 0 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 1, 0, 0]);
    console.log(e.inplace == 2 && e.outplace == 0 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 1, 2, 0]);
    console.log(e.inplace == 3 && e.outplace == 0 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 1, 2, 0]);
    console.log(e.inplace == 3 && e.outplace == 0 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 1, 3, 2]);
    console.log(e.inplace == 2 && e.outplace == 2 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 4, 3, 2]);
    console.log(e.inplace == 1 && e.outplace == 2 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [0, 0, 3, 2]);
    console.log(e.inplace == 1 && e.outplace == 2 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [5, 5, 3, 2]);
    console.log(e.inplace == 0 && e.outplace == 2 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([0, 1, 2, 3], [5, 5, 2, 4]);
    console.log(e.inplace == 1 && e.outplace == 0 ? 'ok' : 'no: ' + JSON.stringify(e));
})();
(function () {
    var e = evalGuess([1, 4, 3, 2], [4, 3, 1, 2]);
    console.log(e.inplace == 1 && e.outplace == 3 ? 'ok' : 'no: ' + JSON.stringify(e));
})();

    