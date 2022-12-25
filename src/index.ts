import express, {Request, Response} from "express"
import bodyParser from "body-parser";


let entityes = [{id: '1', title: '1', description: 'd'}, {id: '2', title: '2', description: 'd'}, {
    id: '3',
    title: '3',
    description: 's'
}, {id: '4', title: '4', description: 'f'}]
const parserMiddleware = bodyParser({})
const app = express()
const port = process.env.PORT || 3003
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello!')
})
app.get('/entity', (req: Request, res: Response) => {
    let arrayQuery = Object.keys(req.query)
    if (arrayQuery.length !== 0) {
        const filteredEntityes = entityes.filter((entity) => {
            return arrayQuery.reduce((totalResult, currenQuery) => {
                // @ts-ignore
                if (currenQuery in entity && entity[currenQuery] === req.query[currenQuery]) {
                    return totalResult
                } else {
                    return false
                }
            }, true)
        })
        res.send(filteredEntityes)
    } else {
        res.send(entityes)
    }


})

app.post('/entity', (req: Request, res: Response) => {

    if (req.body.title) {
        const newEntity = {id: Date.now().toString(), title: req.body.title.toString(),description:''}
        entityes.push(newEntity)
        res.send(newEntity)
    } else {
        res.status(404)
        res.send({error: 'title is required'})
    }
})
app.get('/entity/:id', (req: Request, res: Response) => {

    const item = entityes.find((item) => item.id === req.params.id)
    if (item) {
        res.send(item)
    } else {
        res.status(404)
        res.send({error: 'entity not found'})
    }
})
app.put('/entity/:id', (req: Request, res: Response) => {

    const item = entityes.find((item) => item.id === req.params.id)
    if (item) {
        if (req.body.title) {
            item.title = req.body.title.toString()
            res.send(item)
        } else {
            res.status(404)
            res.send({error: 'title is required'})
        }

    } else {
        res.status(404)
        res.send({error: 'entity not found'})
    }

})
app.delete('/entity/:id', (req: Request, res: Response) => {

    const item = entityes.find((item) => item.id === req.params.id)
    if (item) {
        entityes = entityes.filter((item) => item.id !== req.params.id)
        res.send(item)
    } else {
        res.status(404)
        res.send({error: 'entity not found'})
    }
})

app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`)
})

module.exports = app