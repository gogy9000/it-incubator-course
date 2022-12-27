import {findItemsBySearchTerm} from "../utils/findItemsBySearchTerm";

type EntityModel = {
    id: string
    title?: string|null
    description?: string|null
}
let entityList: EntityModel[] = [{id: '1', title: '1', description: 'd'}, {id: '2', title: '2', description: 'd'}, {
    id: '3',
    title: '3',
    description: 's'
}, {id: '4', title: '4', description: 'f'}]

const idDecorator =  (props:Partial<Omit<EntityModel, 'id'>>) => {
    return  {
        ...props,
        id:Date.now().toString(),
    }

}


export const entityRepository = {
    getEntity: async <T extends Record<string, any>>(searchTerms: T) => {
        let arraySearchTerms = Object.keys(searchTerms)
        if (arraySearchTerms.length !== 0) {
            return findItemsBySearchTerm<typeof entityList>(searchTerms, entityList)
        } else {
            return entityList
        }
    },
    findEntityById: (EntityId:string):Promise<EntityModel>=>new Promise((resolve, reject)=>{
        const item = entityList.find((item) => item.id === EntityId)
        if (item) {
            resolve(item)
        } else {
            reject({error: 'entity not found'})
        }
    }),
    createEntity: (entityModel: Partial<Omit<EntityModel, 'id'>>):Promise<EntityModel> =>
        new Promise((resolve, reject) => {
        if (entityModel.title) {
            const newEntity = idDecorator(entityModel)
            entityList.push(newEntity)
            resolve(newEntity)
        } else {
            reject({error: 'title is required'})
        }
    }),

}