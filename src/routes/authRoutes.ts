import * as express from 'express';
import UserController = require('../controllers/userController');
const router = express.Router();

export default class AuthRouter {
  constructor() {}

  get routes() {
    const controller = new UserController();
    router.post('/login', controller.login);
    router.post('/register', controller.create);
    return router;
  }
}
