import { createServer } from 'http';
import { app } from './app';
import { Sequelize } from 'sequelize-typescript';
import * as express from 'express';
import { Cats } from './models/Cat';
import { schema } from './schema'
import { Request, Response } from 'express';
import * as GraphQLHTTP from 'express-graphql'

const dbUrl = process.env.DATABASE_URL

if (dbUrl === undefined) {
  throw 'ERROR: DATABASE_URL missing'
}

const Op = Sequelize.Op;

(async () => {
  const db = new Sequelize(dbUrl);
  db.addModels([Cats])
  await db.sync({ force: false });

  app.use(express.static('client/build'))

  app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({ message: 'welcome to cat api' });
  });

  app.get('/api/cats', async (req, res, next) => {
    try {
      const cats = await Cats.findAll()
      res.status(200).json(cats);
    } catch (e) {
      res.status(400).send(e)
    }
  });
  app.get('/api/cats/search', async (req: Request, res: Response, next) => {
    try {
      const cats = await Cats.findAll({
        limit: 10,
        where: {
          name: {
            [Op.like]: `%${req.query.search}%`,
          }
        }
      })
      res.status(200).json(cats);
    }
    catch (e) {
      res.status(400).send(e)
    }
  });

  app.post('/api/cats', async (req: Request, res: Response, next) => {
    try {
      const cats = await Cats.create({
        name: req.body.name,
        description: req.body.description,
        temperament: req.body.temperament,
        origin: req.body.origin,
      })
      res.status(201).json(cats);
    }
    catch (e) {
      next(e)
    }
  })

  app.get('/api/cats/:catId', async (req: Request, res: Response, next) => {
    try {
      const cat = await Cats.findByPk(req.params.catId)
      res.status(200).json(cat);
    }
    catch (e) {
      res.status(400).send(e)
    }
  })
  app.delete('/api/cats/:catId', async (req: Request, res: Response, next) => {
    try {
      const cat = await Cats.findByPk(req.params.catId)
      res.status(200).json(cat);
    }
    catch (e) {
      res.status(400).send(e)
    }
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

  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();