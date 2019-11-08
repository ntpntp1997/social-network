import * as express from "express";
const router = express.Router();
import StatusController from "./../controllers/statusController";
import { checkJwt } from "../middleware/checkJwt.Middelware";

interface status {
  _id: string;
  userId: string;
  content: string;
  comment_amount: number;
  likeAmoutn: number;
  create_time: number;
  update_time: number;
  delete_time: number;
}
export default class StatusRoutes {
  constructor() {}

  get routes() {
    const controller = new StatusController();

    router.get("/status", controller.retrieve);
    router.post("/status", [checkJwt], controller.create);
    // router.put("/status/:_id", controller.update);
    // router.get("/status/:_id", controller.findById);
    // router.delete("/status/:_id", controller.delete);
    return router;
  }
}
