import * as express from 'express';
import { checkJwt } from '../middleware/checkJwt.Middelware';
import MessageController = require('../controllers/messageController');
const router = express.Router();

export default class MessageRoutes {
  constructor() {}

  get routes() {
    const controller = new MessageController();
    router.get('/message/:_id', [checkJwt], controller.retrieve);
    router.post('/message', [checkJwt], controller.create);
    router.put('/message/:_id', [checkJwt], controller.update);
    return router;
  }
}
