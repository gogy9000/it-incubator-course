export function findItemsBySearchTerm<T extends Array<Record<string, any>>>(searchTerms:Record<string, any>,arrayTarget:T):T|[]{
    let arraySearchTerms = Object.keys(searchTerms)
    if (arraySearchTerms.length !== 0) {
        const filteredArrayBySearchTerm = arrayTarget.filter((targetItem) => {
            return arraySearchTerms.reduce((totalResult, currentSearchTerm) => {
                if (currentSearchTerm in targetItem && targetItem[currentSearchTerm] === searchTerms[currentSearchTerm]) {
                    return totalResult
                } else {
                    return false
                }
            }, true)
        })
        return filteredArrayBySearchTerm as T
    } else {
        return arrayTarget
    }
}