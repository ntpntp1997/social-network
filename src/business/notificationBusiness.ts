import INotificationBusiness = require("./interfaces/notificationBusiness");
import INotificationModel = require("../models/interfaces/notificationModel");
import { NotificationRepository } from "../repository/notificationRepository";
import _ from "lodash";
import { transErrors } from "../lang/vi";

class NotificationBusiness implements INotificationBusiness {
  private _notificationRepository = new NotificationRepository();
  constructor() {}
  retrieve(callback: (error: any, result: any) => void) {
    this._notificationRepository.retrieve(callback);
  }
  findById(
    _id: string,
    callback: (error: any, result: INotificationModel) => void
  ) {
    this._notificationRepository.findById(_id, callback);
  }
  create(
    item: INotificationModel,
    callback: (error: any, result: any) => void
  ) {
    this._notificationRepository.create(item, callback);
  }
  update(
    _id: any,
    item: INotificationModel,
    callback: (error: any, result: any) => void
  ) {
    this._notificationRepository.update(_id, item, callback);
  }
  delete(_id: string, callback: (error: any, result: any) => void) {
    this._notificationRepository.delete(_id, callback);
  }
  findByUserId(user_id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let comment = await this._notificationRepository.findByUserId(user_id);
        console.log(comment);
        if (_.size(comment) < 1) {
          return reject(transErrors.noti_null);
        }
        resolve(comment);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
export = NotificationBusiness;
