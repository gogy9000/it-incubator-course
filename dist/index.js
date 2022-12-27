"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const entityesRoutes_1 = require("./routes/entityesRoutes");
const parserMiddleware = (0, body_parser_1.default)({});
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.use(parserMiddleware);
app.get('/', (req, res) => {
    res.send('Hello!');
});
app.use('/entity', entityesRoutes_1.entityesRoutes);
app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`);
});
module.exports = app;
