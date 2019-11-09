import RepositoryBase from "./base/baseRepository";
import INotificationModel = require("../models/interfaces/notificationModel");
import NotificationSchema from "./../models/schemas/notificationSchema";

export class NotificationRepository extends RepositoryBase<INotificationModel> {
  constructor() {
    super(NotificationSchema);
  }

  findByUserId(id) {
    return this._model.find({ receiver_id: id }).exec();
  }
}

Object.seal(NotificationRepository);
