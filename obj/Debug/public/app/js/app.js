
var tryLimit = 10,
    holes = 4,
    colors = 6;

function Guess(_array) {
    var self = this;
    self.array = ko.observableArray([]);
    for (var i = 0; i < holes; i++) {
        self.array.push(_array != null && _array[i] != null ? _array[i] : 0);
    }

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

    self.tryGuess = function () {
        if (self.tries().length > 0) { // todo: corrigir
            self.playerGuesses.push(new Guess(self.currentGuess().array()));
            self.tries.pop();
        }
    }
}

    // Activates knockout.js
ko.applyBindings(new AppViewModel());
ko.observableArray.fn.replaceIndex = function (index, newValue) {
    this.valueWillMutate();
    this()[index] = newValue;
    this.valueHasMutated();
};