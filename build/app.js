"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const wordle_controller_1 = require("controllers/wordle.controller");
const handler = async (event) => ({
    statusCode: 200,
    body: JSON.stringify((0, wordle_controller_1.guessWord)(event.pathParameters.word))
});
exports.handler = handler;
//# sourceMappingURL=app.js.map