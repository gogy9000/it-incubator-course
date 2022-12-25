"use strict";
// const express = require('express')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.get('/', (req, res) => {
    res.send('Hello Wo rldaaa!');
});
app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`);
});
module.exports = app;