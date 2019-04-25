import * as express from 'express';
import Sequelize from 'sequelize';
import { Request, Response } from 'express';
import * as GraphQLHTTP from 'express-graphql'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { createModels } from './models';
import { CatInstance } from './models/Cat';
import { schema } from './schema'

const Op = Sequelize.Op;

export const app: express.Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const dbUrl = process.env.DATABASE_URL

if (dbUrl === undefined) {
  throw 'ERROR: DATABASE_URL missing'
}

const db = createModels(dbUrl);
db.sequelize.sync();

app.use(express.static('client/build'))

app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({ message: 'welcome to cat api' });
});

app.get('/api/cats', (req: Request, res: Response) => {
  db.Cat.findAll()
    .then((cats: CatInstance[]) => res.status(200).json({ cats }))
    .catch(err => res.status(500).json({ err: err }));
});
app.get('/api/cats/search', (req: Request, res: Response) => {
  db.Cat.findAll({
    limit: 10,
    where: {
      name: {
        [Op.like]: `%${req.query.search}%`,
      }
    }
  })
    .then((cats: CatInstance[]) => res.status(200).json({ cats }))
    .catch(err => res.status(500).json({ err: err }));
});

app.post('/api/cats', (req: Request, res: Response) => {
  db.Cat.create({
    name: req.body.name,
    description: req.body.description,
    temperament: req.body.temperament,
    origin: req.body.origin,
  })
    .then(cat => res.status(201).json({ cat }))
    .catch(err => res.status(500).json({ err: err }))
})

app.get('/api/cats/:catId', (req: Request, res: Response) => {
  db.Cat.findById(req.params.catId)
    .then(cat => res.status(201).json({ cat }))
    .catch(err => res.status(500).json({ err: err }))
})
app.delete('/api/cats/:catId', (req: Request, res: Response) => {
  db.Cat.findById(req.params.catId)
    .then(cat => {
      if (!cat) {
        return res.status(400).send({
          message: 'Cat Not Found',
        })
      }
      return cat
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error))
    })
    .catch(err => res.status(500).json({ err: err }))
})


app.use(
  '/graphql',
  GraphQLHTTP({
    graphiql: true,
    schema: schema,
    pretty: true,
  }),
)

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
