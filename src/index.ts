// const express = require('express')

import express,{Request,Response} from "express"


const app = express()
const port = process.env.PORT|| 3003

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Wo rldaaa!')
})

app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`)})

module.exports = app