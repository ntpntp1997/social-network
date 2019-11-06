import IBaseController from "./interfaces/base/BaseController";
import { StatusBusiness } from "../business/statusBussiness";
import IStatusModel from "../models/interfaces/statusModel";
import { UserBusiness } from "../business/userBusiness";
import IUserModel from "../models/interfaces/userModel";
import JwtUtil from "../utils/jwt.Utils";

interface userInfo {
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

class StatusController implements IBaseController<StatusBusiness> {
  constructor() {}

  async create(req, res) {
    try {
      var status: IStatusModel = <IStatusModel>req.body;
      var statusBusiness = new StatusBusiness();
      let utils = new JwtUtil();
      let user: IUserModel = <IUserModel>(
        await utils.getUserinfo(req.decoded.id)
      );
      status.user_id = user._id;
      status.user_info = <userInfo>user;
      statusBusiness.create(status, (error, result) => {
        if (error) {
          console.log(error);
          res.send({ error: "error" });
        } else res.send({ success: "success" });
      });
    } catch (e) {
      console.log(e);
      res.send({ error: "error in your request" });
    }
  }
  update(req, res) {
    try {
      let status: IStatusModel = <IStatusModel>req.body;
      return res.send(status);
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
  retrieve(req, res) {}
  findById(req, res) {}
  delete(req, res) {}
}
export = StatusController;
