import StatusLikeController = require("../\bcontrollers/status_likeController");
import * as express from "express";
import { checkJwt } from "../middleware/checkJwt.Middelware";
const router = express.Router();

class LikeStatusRouter {
  private status_likeController: StatusLikeController;
  constructor() {
    this.status_likeController = new StatusLikeController();
  }

  get routes() {
    let controller = this.status_likeController;
    router.post("/like/status", [checkJwt], controller.create);
    return router;
  }
}
export = LikeStatusRouter;
