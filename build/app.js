"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const wordle_controller_1 = require("./controllers/wordle.controller");
const handler = async (event) => {
    var _a, _b;
    return ({
        statusCode: 200,
        body: JSON.stringify((0, wordle_controller_1.guessWord)((_b = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.word) !== null && _b !== void 0 ? _b : ''))
    });
};
exports.handler = handler;
//# sourceMappingURL=app.js.map