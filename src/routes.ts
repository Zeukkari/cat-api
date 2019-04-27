
import { Sequelize } from 'sequelize-typescript';
import { Cats } from './models/Cat';
const Op = Sequelize.Op;

export async function list(req, res, next) {
  try {
    const cats = await Cats.findAll()
    res.status(200).json(cats);
  } catch (e) {
    res.status(400).send(e)
  }
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
  }
  catch (e) {
    res.status(400).send(e)
  }
}

export async function get(req, res, next) {
  try {
    const cat = await Cats.findByPk(req.params.catId)
    res.status(200).json(cat);
  }
  catch (e) {
    res.status(400).send(e)
  }
}

export async function create(req, res, next) {
  try {
    const cats = await Cats.create({
      description: req.body.description,
      name: req.body.name,
      origin: req.body.origin,
      temperament: req.body.temperament,
    })
    res.status(201).json(cats);
  }
  catch (e) {
    next(e)
  }
}

export async function remove(req, res) {
  try {
    const cat = await Cats.findByPk(req.params.catId)
    res.status(200).json(cat);
  }
  catch (e) {
    res.status(400).send(e)
  }
}