"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
let entityes = [{ id: '1', title: '1', description: 'd' }, { id: '2', title: '2', description: 'd' }, {
        id: '3',
        title: '3',
        description: 's'
    }, { id: '4', title: '4', description: 'f' }];
const parserMiddleware = (0, body_parser_1.default)({});
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.use(parserMiddleware);
app.get('/', (req, res) => {
    res.send('Hello!');
});
app.get('/entity', (req, res) => {
    let arrayQuery = Object.keys(req.query);
    if (arrayQuery.length !== 0) {
        const filteredEntityes = entityes.filter((entity) => {
            return arrayQuery.reduce((totalResult, currenQuery) => {
                // @ts-ignore
                if (currenQuery in entity && entity[currenQuery] === req.query[currenQuery]) {
                    return totalResult;
                }
                else {
                    return false;
                }
            }, true);
        });
        res.send(filteredEntityes);
    }
    else {
        res.send(entityes);
    }
});
app.post('/entity', (req, res) => {
    if (req.body.title) {
        const newEntity = { id: Date.now().toString(), title: req.body.title.toString(), description: '' };
        entityes.push(newEntity);
        res.send(newEntity);
    }
    else {
        res.status(404);
        res.send({ error: 'title is required' });
    }
});
app.get('/entity/:id', (req, res) => {
    const item = entityes.find((item) => item.id === req.params.id);
    if (item) {
        res.send(item);
    }
    else {
        res.status(404);
        res.send({ error: 'entity not found' });
    }
});
app.put('/entity/:id', (req, res) => {
    const item = entityes.find((item) => item.id === req.params.id);
    if (item) {
        if (req.body.title) {
            item.title = req.body.title.toString();
            res.send(item);
        }
        else {
            res.status(404);
            res.send({ error: 'title is required' });
        }
    }
    else {
        res.status(404);
        res.send({ error: 'entity not found' });
    }
});
app.delete('/entity/:id', (req, res) => {
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
app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`);
});
module.exports = app;
