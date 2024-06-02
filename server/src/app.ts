import express from 'express'
import routes from './router';

const app = express()

app.use(express.json())
routes(app)

export default app