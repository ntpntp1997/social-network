import IBaseController from "./interfaces/base/BaseController";
import NotificationBusiness from "./../business/notificationBusiness";
import * as express from "express";
import _ from "lodash";
import { transErrors, transSuccess } from "../lang/vi";
import INotificationModel = require("../models/interfaces/notificationModel");
import JwtUtil from "../utils/jwt.Utils";
import IUserInfo from "../entities/userInfo";
import IUserModel from "../models/interfaces/userModel";

class NotificationController implements IBaseController<NotificationBusiness> {
  constructor() {}

  async retrieve(req: express.Request, res: express.Response) {
    try {
      if (req["decoded"].id) {
        let notificationBusiness = new NotificationBusiness();
        let comment = await notificationBusiness.findByUserId(
          req["decoded"].id
        );
        if (_.size(comment) < 1) {
          return res.status(400).send(transErrors.comment_null);
        }
        return res.status(200).send(comment);
      } else {
        return res.status(500).send(transErrors.server_error);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  findById(req: express.Request, res: express.Response) {
    try {
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  async create(req: express.Request, res: express.Response) {
    try {
      if (req.body.receiver_id) {
        let item: INotificationModel = <INotificationModel>req.body;
        let senderId: string = req["decoded"].id;
        let util = new JwtUtil();
        let notificationBusiness = new NotificationBusiness();
        //get sender info
        let sender: IUserModel = <IUserModel>await util.getUserinfo(senderId);
        let senderInfo: IUserInfo = <IUserInfo>sender;

        item.sender_id = senderId;
        item.sender_info = senderInfo;

        notificationBusiness.create(item, (err, result) => {
          if (err) res.status(500).send({ message: transErrors.server_error });
          else res.status(200).send(result);
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  update(req: express.Request, res: express.Response) {
    try {
      let notiId = req.params._id;
      let notificationBusiness = new NotificationBusiness();
      notificationBusiness.findById(notiId, (e, r) => {
        if (e) {
          return res.status(500).send({ message: transErrors.server_error });
        } else {
          r.is_read = true;
          r.update_at = Date.now();
          r.read_at = Date.now();
          notificationBusiness.update(notiId, r, (e, r) => {
            if (e) res.status(500).send(transErrors.server_error);
            else res.status(200).send(transSuccess.success);
          });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
  delete(req: express.Request, res: express.Response) {
    try {
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
}

export = NotificationController;
