import IStatusLikeBusiness from "./interfaces/status_likeBusiness";
import { StatusLikeRepository } from "../repository/status_likeRepository";
import IStatusLikeModel from "../models/interfaces/status_likeModel";
export class StatusLikeBusiness implements IStatusLikeBusiness {
  private _statuslikeRepository: StatusLikeRepository;

  constructor() {
    this._statuslikeRepository = new StatusLikeRepository();
  }

  create(item: IStatusLikeModel, callback: (error: any, result: any) => void) {
    this._statuslikeRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._statuslikeRepository.retrieve(callback);
  }

  update(
    _id: string,
    item: IStatusLikeModel,
    callback: (error: any, result: any) => void
  ) {
    this._statuslikeRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._statuslikeRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._statuslikeRepository.delete(_id, callback);
  }

  findById(
    _id: string,
    callback: (error: any, result: IStatusLikeModel) => void
  ) {
    this._statuslikeRepository.findById(_id, callback);
  }

  findBy(
    type: string,
    username: string,
    callback: (error: any, result: IStatusLikeModel) => void
  ) {
    this._statuslikeRepository.findUserName(username, callback);
  }

  checkHadLike(status_id: String, user_id: String) {
    return new Promise((resolve, reject) => {
      try {
        let result = this._statuslikeRepository.checkUserLikeStatus(
          status_id,
          user_id
        );
        resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
