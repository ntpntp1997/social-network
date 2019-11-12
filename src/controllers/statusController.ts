import IBaseController from "./interfaces/base/BaseController";
import { StatusBusiness } from "../business/statusBusiness";
import IStatusModel from "../models/interfaces/statusModel";
import { UserBusiness } from "../business/userBusiness";
import IUserModel from "../models/interfaces/userModel";
import JwtUtil from "../utils/jwt.Utils";
import { transErrors, transValidation } from "./../lang/vi";
import * as express from "express";
import _ from "lodash";
import multer from "multer";
import uuidv4 from "uuid/v4";
import fsExtra from "fs-extra";
import { validationResult } from "express-validator";
import { app } from "../config/config";

let storageAvartar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directory);
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type;
    if (math.indexOf(file.mimetype) === -1) {
      return callback(transErrors.avatar_type, null);
    }
    let avatar_name = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, avatar_name);
  }
});

let uploadPhoto = multer({
  storage: storageAvartar
}).single("file");
interface userInfo {
  username: string;
  avatar: string;
  firstname: string;
  lastname: string;
}

class StatusController implements IBaseController<StatusBusiness> {
  constructor() {}

  async create(req: express.Request, res: express.Response) {
    uploadPhoto(req, res, async error => {
      var status: IStatusModel = <IStatusModel>req.body;
      if (req["file"]) {
        if (error) {
          if (error.message) {
            console.log(error);
            return res.status(500).send(transErrors.avatar_size);
          }
          return res.status(500).send(error);
        }
        status.photo = `uploads/${req["file"].filename}`;
      }
      try {
        if (status.content) {
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
            } else res.send(result);
          });
        } else {
          res.status(500).send({ error: transValidation.ticket_text });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    });
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
        else
          res.send(
            _.sortBy(result, [
              item => {
                return -item.createdAt;
              }
            ])
          );
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
  async getbyuserId(req: express.Request, res: express.Response) {
    try {
      let id = req.params._id;
      let statusBusiness = new StatusBusiness();
      let item = await statusBusiness.getbyUserId(id);
      return res.status(200).send(item);
    } catch (error) {
      console.log(error);
      return res.status(200).send(error);
    }
  }
}
export = StatusController;
