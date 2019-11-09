import * as express from "express";
import { checkJwt } from "../middleware/checkJwt.Middelware";
import NotificationController = require("../\bcontrollers/notificationController");
const router = express.Router();

export default class NotificationRoutes {
  constructor() {}

  get routes() {
    const controller = new NotificationController();
    router.get("/notification", [checkJwt], controller.retrieve);
    router.post("/notification", [checkJwt], controller.create);
    router.put("/notification/:_id", [checkJwt], controller.update);
    return router;
  }
}
