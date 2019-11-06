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

  get router() {
    const controller = new StatusController();
    router.get("/status", (req, res) => {
      let status: status = {
        _id: "jsafh",
        userId: "this is a teest",
        content: "this is a teest",
        comment_amount: 12312412,
        likeAmoutn: 12312412,
        create_time: 12312412,
        update_time: 12312412,
        delete_time: 12312412
      };
      return res.json(status);
    });
    // router.post("/status", (req, res) => {
    //   console.log(req.body);
    //   let item: status = req.body;
    //   console.log(item);
    //   return res.json(item);
    // });
    // router.get("/status", controller.retrieve);
    router.post("/status", [checkJwt], controller.create);
    // router.put("/status/:_id", controller.update);
    // router.get("/status/:_id", controller.findById);
    // router.delete("/status/:_id", controller.delete);
    return router;
  }
}
