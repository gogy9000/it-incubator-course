import {Request, Response, Router} from "express"
import {entityRepository} from "../repository/repository";

export const entityesRoutes = Router({})

let entityes = [{id: '1', title: '1', description: 'd'}, {id: '2', title: '2', description: 'd'}, {
    id: '3',
    title: '3',
    description: 's'
}, {id: '4', title: '4', description: 'f'}]

entityesRoutes.get('/', async (req: Request, res: Response) => {
    const entityList = await entityRepository.getEntity(req.query)
    res.status(200)
    res.send(entityList)

})

entityesRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const response = await entityRepository.createEntity(req.body)
        res.send(response)
    } catch (e) {
        res.status(401)
        res.send(e)
    }
})
entityesRoutes.get('/:id', async (req: Request, res: Response) => {

    try {
        const item = await entityRepository.findEntityById(req.params.id)
        res.send(item)
    } catch (e) {
        res.status(404)
        res.send(e)
    }
})
entityesRoutes.put('/:id', (req: Request, res: Response) => {

    const item = entityes.find((item) => item.id === req.params.id)
    if (item) {
        if (req.body.title) {
            item.title = req.body.title.toString()
            res.send(item)
        } else {
            res.status(401)
            res.send({error: 'title is required'})
        }

    } else {
        res.status(404)
        res.send({error: 'entity not found'})
    }

})
entityesRoutes.delete('/:id', (req: Request, res: Response) => {

    const item = entityes.find((item) => item.id === req.params.id)
    if (item) {
        entityes = entityes.filter((item) => item.id !== req.params.id)
        res.send(item)
    } else {
        res.status(404)
        res.send({error: 'entity not found'})
    }
})