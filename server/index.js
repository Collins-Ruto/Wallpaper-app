import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoutes from './routes/users.js'

dotenv.config()
const app = express();

const port = process.env.PORT || 8000

app.use(bodyParser.json({limit: "30mb",extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}))
app.use(cors())

app.use('/users', userRoutes)

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => {
    console.log(`listening on ${port}`)
}))
.catch((e) => console.log(e.message))

app.get('/', (req, res) => {
    res.send("hello")
})



