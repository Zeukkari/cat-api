import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import express = require('express');
import * as GraphQLHTTP from 'express-graphql'
import { create, get, list, remove, search } from './routes'
import { schema } from './schema'

export const app = express();
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
    pretty: true,
    schema,
  }),
)

// REST API end points
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'welcome to cat api' });
});
app.get('/api/cats', list);
app.get('/api/cats/search', search);
app.post('/api/cats', create)
app.get('/api/cats/:catId', get)
app.delete('/api/cats/:catId', remove)

