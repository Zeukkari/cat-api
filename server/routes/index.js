const catsController = require('../controllers').catbreeds

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Cat API!',
    }),
  )

  app.get('/api/cats', catsController.list)
  app.get('/api/cats/search', catsController.search)
  app.post('/api/cats', catsController.create)
  app.get('/api/cats/:catId', catsController.retrieve)
  app.delete('/api/cats/:catId', catsController.destroy)
}
