"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomWord = void 0;
const axios_1 = __importDefault(require("axios"));
const getRandomWord = async () => {
    const response = await axios_1.default.get(`${process.env.API_HOST}/v4/words.json/randomWord`, {
        params: {
            api_key: process.env.API_KEY,
            hasDictionaryDef: 'true',
            minLength: '5',
            maxLength: '5'
        }
    });
    return response.data.word;
};
exports.getRandomWord = getRandomWord;
//# sourceMappingURL=wordle.service.js.map