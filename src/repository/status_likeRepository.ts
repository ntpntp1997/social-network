import RepositoryBase from "./base/baseRepository";
import IStatusLikeModel from "./../models/interfaces/status_likeModel";
import StatusLikeSchema from "./../models/schemas/status_likeSchema";
import mongoose from "mongoose";
export class StatusLikeRepository extends RepositoryBase<IStatusLikeModel> {
  constructor() {
    super(StatusLikeSchema);
  }
  checkUserLikeStatus(status_id: String, user_id: String) {
    // tslint:disable-next-line:object-literal-shorthand
    return this._model
      .findOne({
        $and: [{ status_id: status_id }, { user_id: user_id }]
      })
      .exec();
  }
}

Object.seal(StatusLikeRepository);
