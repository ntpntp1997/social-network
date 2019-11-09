import RepositoryBase from "./base/baseRepository";
import ICommentModel = require("../models/interfaces/commentModel");
import CommentSchema from "./../models/schemas/commentSchema";

export class CommentRepository extends RepositoryBase<ICommentModel> {
  constructor() {
    super(CommentSchema);
  }
  findByStatusId(statusId) {
    return this._model.find({ status_id: statusId }).exec();
  }
}

Object.seal(CommentRepository);
