"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findItemsBySearchTerm = void 0;
function findItemsBySearchTerm(searchTerms, arrayTarget) {
    let arraySearchTerms = Object.keys(searchTerms);
    if (arraySearchTerms.length !== 0) {
        const filteredArrayBySearchTerm = arrayTarget.filter((targetItem) => {
            return arraySearchTerms.reduce((totalResult, currentSearchTerm) => {
                if (currentSearchTerm in targetItem && targetItem[currentSearchTerm] === searchTerms[currentSearchTerm]) {
                    return totalResult;
                }
                else {
                    return false;
                }
            }, true);
        });
        return filteredArrayBySearchTerm;
    }
    else {
        return arrayTarget;
    }
}
exports.findItemsBySearchTerm = findItemsBySearchTerm;
