import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

export const app: express.Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())