import express, {Request, Response} from "express"
import bodyParser from "body-parser";
import {entityesRoutes} from "./routes/entityesRoutes";

const parserMiddleware = bodyParser({})
const app = express()
const port = process.env.PORT || 3003

app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello!')
})
app.use('/entity',entityesRoutes)

app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`)
})

module.exports = app