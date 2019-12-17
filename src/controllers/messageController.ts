import IBaseController from './interfaces/base/BaseController';
import MessageBusiness from '../business/messageBusiness';
import * as express from 'express';
import _ from 'lodash';
import { transErrors, transSuccess } from '../lang/vi';
import IMessageModel = require('../models/interfaces/messageModel');
import JwtUtil from '../utils/jwt.Utils';
import IUserInfo from '../entities/userInfo';
import IUserModel from '../models/interfaces/userModel';

class MessageController implements IBaseController<MessageBusiness> {
  constructor() {}

  async retrieve(req: express.Request, res: express.Response) {
    try {
      if (req.params._id) {
        let messageBusiness = new MessageBusiness();
        let comment = await messageBusiness.findByRelationshipId(
          req.params._id
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
        let item: IMessageModel = <IMessageModel>req.body;
        let senderId: string = req['decoded'].id;
        let util = new JwtUtil();
        let messageBusiness = new MessageBusiness();
        //get sender info
        let sender: IUserModel = <IUserModel>await util.getUserinfo(senderId);
        let senderInfo: IUserInfo = <IUserInfo>sender;

        let receiver: IUserModel = <IUserModel>(
          await util.getUserinfo(req.body.receiver_id)
        );
        let receiverInfo: IUserInfo = <IUserInfo>receiver;

        item.sender_id = senderId;
        item.sender_info = senderInfo;

        item.receiver_id = req.body.receiver_id;
        item.receiver_info = receiverInfo;

        messageBusiness.create(item, (err, result) => {
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
      let messageBusiness = new MessageBusiness();
      messageBusiness.findById(notiId, (e, r) => {
        if (e) {
          return res.status(500).send({ message: transErrors.server_error });
        } else {
          messageBusiness.update(notiId, r, (e, r) => {
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

export = MessageController;
