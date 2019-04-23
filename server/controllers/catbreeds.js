const Sequelize = require('sequelize')
const Op = Sequelize.Op
const CatBreed = require('../models').CatBreed

module.exports = {
  retrieve(req, res) {
    return CatBreed.findByPk(req.params.catId)
      .then(cat => {
        if (!cat) {
          return res.status(404).send({
            message: 'Cat Not Found',
          })
        }
        return res.status(200).send(cat)
      })
      .catch(error => res.status(400).send(error))
  },
  list(req, res) {
    return CatBreed.findAll({
      attributes: ['id', 'name', 'description', 'temperament', 'origin'],
    })
      .then(cats => res.status(200).send(cats))
      .catch(error => res.status(400).send(error))
  },
  search(req, res) {
    return CatBreed.findAll({
      limit: 10,
      where: {
        name: {
          [Op.like]: `%${req.body.search}%`,
        },
      },
      attributes: ['id', 'name', 'description', 'temperament', 'origin'],
    })
      .then(cats => res.status(200).send(cats))
      .catch(error => res.status(400).send(error))
  },
  // Convenience methods
  create(req, res) {
    return CatBreed.create({
      name: req.body.name,
      description: req.body.description,
      temperament: req.body.temperament,
      origin: req.body.origin,
    })
      .then(catBreed => res.status(201).send(catBreed))
      .catch(error => res.status(400).send(error))
  },
  destroy(req, res) {
    return CatBreed.findByPk(req.params.catId)
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
      .catch(error => res.status(400).send(error))
  },
}
