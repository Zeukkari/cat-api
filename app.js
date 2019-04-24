const express = require('express')
const graphqlHTTP = require('express-graphql')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const schema = require('./schema')

dotenv.config()

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('client/build'))

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    pretty: true,
  }),
)

require('./server/routes')(app)
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }),
)

module.exports = app
