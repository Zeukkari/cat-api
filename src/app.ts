import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { schema } from './schema'
import { Request, Response } from 'express';
import * as GraphQLHTTP from 'express-graphql'
import { list, search, create, get, remove } from './routes'

export const app: express.Application = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Client
app.use(express.static('client/build'))

// GraphQL gateway
app.use(
  '/graphql',
  GraphQLHTTP({
    graphiql: true,
    schema: schema,
    pretty: true,
  }),
)

// REST API end points
app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({ message: 'welcome to cat api' });
});
app.get('/api/cats', list);
app.get('/api/cats/search', search);
app.post('/api/cats', create)
app.get('/api/cats/:catId', get)
app.delete('/api/cats/:catId', remove)

