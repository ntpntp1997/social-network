import * as express from 'express';
import { checkJwt } from '../middleware/checkJwt.Middelware';
import CommentController = require('../controllers/commentController');
const router = express.Router();

export default class CommentRoutes {
  constructor() {}

  get routes() {
    const controller = new CommentController();
    router.post('/comment', [checkJwt], controller.create);
    router.put('/comment/:_id', [checkJwt], controller.update);
    router.get('/comment/status/:_id', [checkJwt], controller.findByStatusId);
    return router;
  }
}
