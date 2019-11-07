import { StatusBusiness } from "../business/statusBusiness";
import { resolve } from "path";
import { StatusLikeBusiness } from "../business/status_likeBussiness";
class StatusService {
  constructor() {}

  /**
   * when user like status
   * +1 liked in status
   *
   */
  likeStatus(statusId) {
    return new Promise((resolve, reject) => {
      let _statusBusiness = new StatusBusiness();
      _statusBusiness.findById(statusId, (err, result) => {
        if (err) return reject(err);
        else {
          result.like_amount = result.like_amount + 1;
          _statusBusiness.update(statusId, result, (err, result) => {
            if (err) return reject(err);
            else resolve(result);
          });
        }
      });
    });
  }
  unlikeStatus(statusId) {
    return new Promise((resolve, reject) => {
      let _statusBusiness = new StatusBusiness();
      _statusBusiness.findById(statusId, (err, result) => {
        if (err) return reject(err);
        else {
          result.like_amount = result.like_amount - 1;
          _statusBusiness.update(statusId, result, (err, result) => {
            if (err) return reject(err);
            else resolve(result);
          });
        }
      });
    });
  }

  deleteStatusLike(likeId) {
    return new Promise((resolve, reject) => {
      let _statuslikeBusiness = new StatusLikeBusiness();
      _statuslikeBusiness.delete(likeId, (err, result) => {
        if (err) return reject(err);
        else return resolve(result);
      });
    });
  }
  commentStatus() {}
}

export = StatusService;
