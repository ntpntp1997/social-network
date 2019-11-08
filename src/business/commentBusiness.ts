import { CommentRepository } from "../repository/commentRepository";
import ICommentBusiness = require("./interfaces/commentBusiness");
import ICommentModel from "./../models/interfaces/commentModel";

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
}
Object.seal(CommentBusiness);
