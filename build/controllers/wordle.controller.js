"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guessWord = void 0;
const services = require("services/wordle.service");
const utils_1 = require("utils");
const guessWord = async (guess) => {
    const randomWord = await services.getRandomWord();
    const result = (0, utils_1.compareWords)(randomWord, guess);
    const keyboard = (0, utils_1.buildKeyboardResponse)(result);
    return { result, keyboard };
};
exports.guessWord = guessWord;
//# sourceMappingURL=wordle.controller.js.map