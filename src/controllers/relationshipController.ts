import IBaseController from "./interfaces/base/BaseController";
import RelationshipBusiness from "./../business/relationshipBussiness";
import * as express from "express";
import IRelationshipModel from "../models/interfaces/relationshipModel";
import JwtUtil = require("../utils/jwt.Utils");
import IUserModel = require("../models/interfaces/userModel");
import IUserInfo from "../entities/userInfo";
import { transSuccess } from "../lang/vi";
interface updateStatus {}

class RelationshipController implements IBaseController<RelationshipBusiness> {
  constructor() {}

  async create(req: express.Request, res: express.Response) {
    try {
      let utils = new JwtUtil();
      let user: IUserModel = <IUserModel>(
        await utils.getUserinfo(req["decoded"].id)
      );
      let relation: IRelationshipModel = <IRelationshipModel>req.body;
      relation.user_id = req["decoded"].id;
      let friend: IUserModel = <IUserModel>(
        await utils.getUserinfo(relation.friend_id)
      );
      relation.friend_info = <IUserInfo>friend;
      relation.status = "follow";
      const relationshipBusiness = new RelationshipBusiness();
      relationshipBusiness.create(relation, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(result);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  retrieve(req: express.Request, res: express.Response) {
    try {
      const relationshipBusiness = new RelationshipBusiness();
      relationshipBusiness.retrieve((err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send(result);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  update(req: express.Request, res: express.Response) {
    try {
      let relationshipId = req.params._id;
      let relation_status: string = req.body.status;

      const relationshipBusiness = new RelationshipBusiness();
      relationshipBusiness.findById(relationshipId, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          result.status = relation_status;
          relationshipBusiness.update(relationshipId, result, (err, result) => {
            if (err) res.status(500).send(err);
            else res.status(200).send(transSuccess.success);
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  delete() {}
  findById() {}
}

export = RelationshipController;
