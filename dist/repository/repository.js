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
exports.entityRepository = void 0;
const findItemsBySearchTerm_1 = require("../utils/findItemsBySearchTerm");
let entityList = [{ id: '1', title: '1', description: 'd' }, { id: '2', title: '2', description: 'd' }, {
        id: '3',
        title: '3',
        description: 's'
    }, { id: '4', title: '4', description: 'f' }];
const idDecorator = (props) => {
    return Object.assign(Object.assign({}, props), { id: Date.now().toString() });
};
exports.entityRepository = {
    getEntity: (searchTerms) => __awaiter(void 0, void 0, void 0, function* () {
        let arraySearchTerms = Object.keys(searchTerms);
        if (arraySearchTerms.length !== 0) {
            return (0, findItemsBySearchTerm_1.findItemsBySearchTerm)(searchTerms, entityList);
        }
        else {
            return entityList;
        }
    }),
    findEntityById: (EntityId) => new Promise((resolve, reject) => {
        const item = entityList.find((item) => item.id === EntityId);
        if (item) {
            resolve(item);
        }
        else {
            reject({ error: 'entity not found' });
        }
    }),
    createEntity: (entityModel) => new Promise((resolve, reject) => {
        if (entityModel.title) {
            const newEntity = idDecorator(entityModel);
            entityList.push(newEntity);
            resolve(newEntity);
        }
        else {
            reject({ error: 'title is required' });
        }
    }),
};
