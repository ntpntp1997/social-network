import IBaseController from "./interfaces/base/BaseController";
import { CommentBusiness } from "../business/commentBusiness";
import * as express from "express";
import { transErrors } from "../lang/vi";
import ICommentModel from "../models/interfaces/commentModel";
import IUserInfo from "../entities/userInfo";
import JwtUtil from "./../utils/jwt.Utils";

class CommentCotroller implements IBaseController<CommentBusiness> {
  constructor() {}

  /**
   * user comment status
   */
  async create(req: express.Request, res: express.Response) {
    try {
      let item: ICommentModel = <ICommentModel>req.body;
      let commentBusiness = new CommentBusiness();
      let userId = req["decoded"].id;
      let utils = new JwtUtil();
      let user: IUserInfo = <IUserInfo>await utils.getUserinfo(userId);
      item.user_id = userId;
      item.user_info = user;
      commentBusiness.create(item, (err, result) => {
        if (err) res.status(500).send({ message: transErrors.server_error });
        else res.status(200).send(result);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: transErrors.server_error });
    }
  }

  /**
   * user edit comment
   */
  update(req: express.Request, res: express.Response) {
    let commentId = req.params._id;
    let item: ICommentModel = <ICommentModel>req.body;
    let userId = req["decoded"].id;
    let commentBusiness = new CommentBusiness();
    // check user can edit comment
    commentBusiness.findById(commentId, (err, result) => {
      if (err) {
        return res.status(500).send({ message: transErrors.server_error });
      } else {
        if (result.user_id == userId) {
          return res.status(500).send({ message: transErrors.user_expried });
        } else {
          commentBusiness.update(commentId, item, (err, resus) => {
            if (err) {
              res.status(500).send({ message: transErrors.server_error });
            } else res.status(200).send(resus);
          });
        }
      }
    });
  }

  /**
   * user get all comment of status comment
   */
  retrieve(req: express.Request, res: express.Response) {}

  /**
   * user delete them comment
   */
  delete(req: express.Request, res: express.Response) {}

  findById(req: express.Request, res: express.Response) {}
}
export = CommentCotroller;
