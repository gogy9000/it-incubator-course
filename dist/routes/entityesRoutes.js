"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityesRoutes = void 0;
const express_1 = require("express");
const repository_1 = require("../repository/repository");
exports.entityesRoutes = (0, express_1.Router)({});
let entityes = [{ id: '1', title: '1', description: 'd' }, { id: '2', title: '2', description: 'd' }, {
        id: '3',
        title: '3',
        description: 's'
    }, { id: '4', title: '4', description: 'f' }];
exports.entityesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityList = yield repository_1.entityRepository.getEntity(req.query);
    res.status(200);
    res.send(entityList);
}));
exports.entityesRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield repository_1.entityRepository.createEntity(req.body);
        res.send(response);
    }
    catch (e) {
        res.status(401);
        res.send(e);
    }
}));
exports.entityesRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield repository_1.entityRepository.findEntityById(req.params.id);
        res.send(item);
    }
    catch (e) {
        res.status(404);
        res.send(e);
    }
}));
exports.entityesRoutes.put('/:id', (req, res) => {
    const item = entityes.find((item) => item.id === req.params.id);
    if (item) {
        if (req.body.title) {
            item.title = req.body.title.toString();
            res.send(item);
        }
        else {
            res.status(401);
            res.send({ error: 'title is required' });
        }
    }
    else {
        res.status(404);
        res.send({ error: 'entity not found' });
    }
});
exports.entityesRoutes.delete('/:id', (req, res) => {
    const item = entityes.find((item) => item.id === req.params.id);
    if (item) {
        entityes = entityes.filter((item) => item.id !== req.params.id);
        res.send(item);
    }
    else {
        res.status(404);
        res.send({ error: 'entity not found' });
    }
});
