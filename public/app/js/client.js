
var tryLimit = 10,
    holes = 4,
    colors = 6;

function Guess(_array) {
    var self = this;
    self.array = ko.observableArray([]);
    for (var i = 0; i < holes; i++) {
        self.array.push(_array != null && _array[i] != null ? _array[i] : 0);
    }

    self.eval = ko.observable({
        inp: ko.observable(0),
        out: ko.observable(0)
    });

    self.class = function (data) {
        return "btn-color" + data;
    };
    self.change = function (data, event) {
        var context = ko.contextFor(event.target);
        var index = context.$index();

        var oValue = self.array()[index];

        self.array.replaceIndex(index,
                                oValue + 1 >= colors ? 0 : oValue + 1);
    };
}

function AppViewModel() {

    var self = this;

    self.playerGuesses = ko.observableArray([]);

    self.currentGuess = ko.observable(new Guess())

    self.tries = ko.observableArray([])
    for (var i = 0; i < tryLimit - 1; i++) {
        self.tries.push(new Guess())
    }

    self.arrayToNum = function (array) {
        var num = 1111;
        for (var i = 0; i < holes; i++) {
            num += (holes - i) * array[i];
        }
        return num;
    }

    self.solution = ko.observable()

    self.tryGuess = function () {
        if (self.tries().length > 0) {
            var a = self.currentGuess().array();

            self.playerGuesses.push(new Guess(a));
            self.tries.pop();

            $.getJSON("/eval/" + publicKey + "/" + self.arrayToNum(a), function (data) {
                if (data.solution) {
                    self.solution(new Guess(data.solution))
                } else {
                    var index = self.playerGuesses().length - 1;

                    var lastGuess = self.playerGuesses()[index];

                    lastGuess.eval().inp(data.eval.inplace);
                    lastGuess.eval().out(data.eval.outplace);
                }
            });
        }
    }
}

var publicKey = null;

$.getJSON("/problem", function (data) {
    publicKey = data.publicKey;
    console.log('publicKey: '+publicKey);
});

    // Activates knockout.js
var de = new AppViewModel();
ko.applyBindings(de);
ko.observableArray.fn.replaceIndex = function (index, newValue) {
    this.valueWillMutate();
    this()[index] = newValue;
    this.valueHasMutated();
};
var range = function (size) {
    return new Array(size);
}