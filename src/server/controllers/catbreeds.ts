import { Op } from 'sequelize'
import { CatBreed } from '../models/'

module.exports = {
  async retrieve({ req, res }: { req: any; res: any; }) {
    try {
      const cat = await CatBreed.findByPk(req.params.catId)
      if (!cat) {
        return res.status(404).send({
          message: 'Cat Not Found',
        })
      }
      return res.status(200).send(cat)
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async list(req: any, res: { status: { (arg0: number): { send: (arg0: CatBreed[]) => void; }; (arg0: number): { send: (arg0: any) => void; }; }; }) {
    try {
      const cats = await CatBreed.findAll({
        attributes: ['id', 'name', 'description', 'temperament', 'origin'],
      })
      return res.status(200).send(cats)
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async search({ req, res }: {
    req: {
      query: {
        search: any;
      };
    }; res: {
      status: {
        (arg0: number): {
          send: (arg0: CatBreed[]) => void;
        };
        (arg0: number): {
          send: (arg0: any) => void;
        };
      };
    };
  }) {
    try {
      const cats = await CatBreed.findAll({
        limit: 10,
        where: {
          name: {
            [Op.like]: `%${req.query.search}%`,
          },
        },
        attributes: ['id', 'name', 'description', 'temperament', 'origin'],
      })
      return res.status(200).send(cats)
    } catch (error) {
      return res.status(400).send(error)
    }
  },
}
