import { Sequelize } from 'sequelize-typescript';
import { Cats } from './models/Cat';

const Op = Sequelize.Op;

export async function list(req, res, next) {
  const cats = await Cats.findAll()
  res.status(200).json(cats);
}

export async function search(req, res, next) {
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
  } catch(error) {
    res.status(400).json({error})
  }
}

export async function get(req, res) {
  try {
    const cat = await Cats.findByPk(req.params.catId)
    res.status(200).json(cat)
  }
  catch (e) {
    res.status(400).json({error: 'get failed'})
  }
}

export async function create(req, res) {
  try {
    if (!req.body.name) {
      throw {code: 400, msg: 'Property `name` is missing'}
    } else {
      const cats = await Cats.create({
        description: req.body.description,
        name: req.body.name,
        origin: req.body.origin,
        temperament: req.body.temperament,
      })
      res.status(201).json(cats);
    }
  } catch(e) {
    res.status(400).json({error: 'create failed'})
  }
}

export async function remove(req, res) {
  try {
    await Cats.destroy({
      where: {
        id: req.params.catId
      }
    })
    res.status(201).json({deleted: req.params.catId});

  }
  catch (e) {
    res.status(400).json({error: 'delete failed'})
  }
}
