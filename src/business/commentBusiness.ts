import { CommentRepository } from "../repository/commentRepository";
import ICommentBusiness = require("./interfaces/commentBusiness");
import ICommentModel from "./../models/interfaces/commentModel";
import _ from "lodash";
import { transErrors } from "../lang/vi";

export class CommentBusiness implements ICommentBusiness {
  private _commentRepository: CommentRepository;
  constructor() {
    this._commentRepository = new CommentRepository();
  }

  create(item: ICommentModel, callback: (error: any, result: any) => void) {
    this._commentRepository.create(item, callback);
  }
  retrieve(callback: (error: any, result: any) => void) {
    this._commentRepository.retrieve(callback);
  }

  update(
    _id: string,
    item: ICommentModel,
    callback: (error: any, result: any) => void
  ) {
    this._commentRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._commentRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._commentRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: ICommentModel) => void) {
    this._commentRepository.findById(_id, callback);
  }

  findByStatusId(statusId) {
    return new Promise(async (resolve, reject) => {
      try {
        let item = await this._commentRepository.findByStatusId(statusId);
        if (_.size(item) < 1) {
          return reject(transErrors.comment_null);
        }
        resolve(item);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
Object.seal(CommentBusiness);
