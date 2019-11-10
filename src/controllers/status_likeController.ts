import { StatusLikeBusiness } from "../business/status_likeBussiness";
import * as express from "express";
import { transErrors, transSuccess } from "../lang/vi";
import BaseController = require("./interfaces/base/BaseController");
import IStatusLikeModel = require("../models/interfaces/status_likeModel");
import StatusService = require("../services/statusService");
import JwtUtil = require("../utils/jwt.Utils");
import IUserModel = require("../models/interfaces/userModel");
import IUserInfo from "../entities/userInfo";
import { ObjectID } from "mongodb";

class StatusLikeController implements BaseController<StatusLikeBusiness> {
  constructor() {}

  // like controller
  async create(req: express.Request, res: express.Response) {
    try {
      let utils = new JwtUtil();
      let user: IUserModel = <IUserModel>(
        await utils.getUserinfo(req["decoded"].id)
      );
      let item: IStatusLikeModel = <IStatusLikeModel>req.body;
      item.user_id = req["decoded"].id;
      item.user_info = <IUserInfo>user;
      let _statuslikeBusiness = new StatusLikeBusiness();
      let statusService = new StatusService();
      let checkLiked: IStatusLikeModel = <IStatusLikeModel>(
        await _statuslikeBusiness.checkHadLike(item.status_id, item.user_id)
      );
      if (checkLiked) {
        let likeId = checkLiked["_id"];
        await statusService.unlikeStatus(item.status_id);
        await statusService.deleteStatusLike(likeId);
        return res.status(200).send({ message: transSuccess.unlike });
      }
      await statusService.likeStatus(item.status_id);
      _statuslikeBusiness.create(item, (err, result) => {
        if (err) res.status(500).send({ error: transErrors.server_error });
        else res.status(200).send({ message: transSuccess.success });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: transErrors.server_error });
    }
  }
  async checklike(req: express.Request, res: express.Response) {
    let _statuslikeBusiness = new StatusLikeBusiness();
    let statusService = new StatusService();
    let user_id = req["decoded"].id;
    let status_id = req.body.status_id;
    let checkLiked: IStatusLikeModel = <IStatusLikeModel>(
      await _statuslikeBusiness.checkHadLike(status_id, user_id)
    );
    if (checkLiked) {
      return res.send(true);
    }
    return res.send(false);
  }

  update(req: express.Request, res: express.Response) {}
  findById(req: express.Request, res: express.Response) {}
  retrieve(req: express.Request, res: express.Response) {}
  delete(req: express.Request, res: express.Response) {}
}
export = StatusLikeController;
