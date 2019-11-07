import IBaseController from "./interfaces/base/BaseController";
import { StatusBusiness } from "../business/statusBussiness";
import IStatusModel from "../models/interfaces/statusModel";
import { UserBusiness } from "../business/userBusiness";
import IUserModel from "../models/interfaces/userModel";
import JwtUtil from "../utils/jwt.Utils";
import { transErrors } from "./../../lang/vi";
import * as express from "express";

interface userInfo {
  username: string;
  avatar: string;
  firstname: string;
  lastname: string;
}

class StatusController implements IBaseController<StatusBusiness> {
  constructor() {}

  async create(req: express.Request, res: express.Response) {
    try {
      var status: IStatusModel = <IStatusModel>req.body;
      var statusBusiness = new StatusBusiness();
      let utils = new JwtUtil();
      let user: IUserModel = <IUserModel>(
        await utils.getUserinfo(req["decoded"].id)
      );
      status.user_id = user._id;
      status.user_info = <userInfo>user;
      statusBusiness.create(status, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: transErrors.server_error });
        } else res.send({ success: "success" });
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: transErrors.server_error });
    }
  }
  update(req: express.Request, res: express.Response) {
    try {
      let status: IStatusModel = <IStatusModel>req.body;
      var _id: string = req.params._id;
      var statusBusiness = new StatusBusiness();
      statusBusiness.update(_id, status, (error, result) => {
        if (error) res.status(500).send({ error: transErrors.server_error });
        else res.send({ success: result });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  retrieve(req: express.Request, res: express.Response) {
    try {
      let statusBusiness = new StatusBusiness();
      statusBusiness.retrieve((err, result) => {
        if (err) res.status(500).send({ error: transErrors.server_error });
        else res.send(result);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: transErrors.server_error });
    }
  }
  findById(req: express.Request, res: express.Response) {
    try {
    } catch (error) {}
  }
  delete(req: express.Request, res: express.Response) {
    try {
    } catch (error) {}
  }
}
export = StatusController;
