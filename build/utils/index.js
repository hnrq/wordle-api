"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareWords = exports.buildKeyboardResponse = void 0;
var Alphabet;
(function (Alphabet) {
    Alphabet[Alphabet["A"] = 0] = "A";
    Alphabet[Alphabet["B"] = 1] = "B";
    Alphabet[Alphabet["C"] = 2] = "C";
    Alphabet[Alphabet["D"] = 3] = "D";
    Alphabet[Alphabet["E"] = 4] = "E";
    Alphabet[Alphabet["F"] = 5] = "F";
    Alphabet[Alphabet["G"] = 6] = "G";
    Alphabet[Alphabet["H"] = 7] = "H";
    Alphabet[Alphabet["I"] = 8] = "I";
    Alphabet[Alphabet["J"] = 9] = "J";
    Alphabet[Alphabet["K"] = 10] = "K";
    Alphabet[Alphabet["L"] = 11] = "L";
    Alphabet[Alphabet["M"] = 12] = "M";
    Alphabet[Alphabet["N"] = 13] = "N";
    Alphabet[Alphabet["O"] = 14] = "O";
    Alphabet[Alphabet["P"] = 15] = "P";
    Alphabet[Alphabet["Q"] = 16] = "Q";
    Alphabet[Alphabet["R"] = 17] = "R";
    Alphabet[Alphabet["S"] = 18] = "S";
    Alphabet[Alphabet["T"] = 19] = "T";
    Alphabet[Alphabet["U"] = 20] = "U";
    Alphabet[Alphabet["V"] = 21] = "V";
    Alphabet[Alphabet["W"] = 22] = "W";
    Alphabet[Alphabet["X"] = 23] = "X";
    Alphabet[Alphabet["Y"] = 24] = "Y";
    Alphabet[Alphabet["Z"] = 25] = "Z";
})(Alphabet || (Alphabet = {}));
const buildKeyboardResponse = (results) => (Object.assign(Object.assign({}, Object.keys(Alphabet).reduce((acc, letter) => (Object.assign(Object.assign({}, acc), { letter: 'unused' })), {})), results === null || results === void 0 ? void 0 : results.reduce((acc, result) => (Object.assign(Object.assign({}, acc), { [result.letter]: result.status })), {})));
exports.buildKeyboardResponse = buildKeyboardResponse;
const letterStatus = (target, letter, index) => {
    if (target.charAt(index) === letter)
        return 'correct';
    if (target.indexOf('letter') !== -1)
        return 'present';
    return 'absent';
};
const compareWords = (target, guess) => guess.split('').map((letter, index) => ({
    letter,
    index,
    status: letterStatus(target, letter, index)
}));
exports.compareWords = compareWords;
//# sourceMappingURL=index.js.map