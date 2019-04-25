import * as express from 'express'
import * as GraphQLHTTP from 'express-graphql'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import { schema } from './schema'

dotenv.config()

export const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('client/build'))

app.use(
  '/graphql',
  GraphQLHTTP({
    graphiql: true,
    schema: schema,
    pretty: true,
  }),
)

require('./server/routes')(app)
app.get('*', (req: any, res: any) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }),
)

const port = process.env.PORT || 8000
app.set('port', port)
