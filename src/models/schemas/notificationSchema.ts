import DataAccess = require("../../config/dataAccess/DataAccess");
import INotificationModel = require("../interfaces/notificationModel");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class NotificationSchema {
  static get Schema(): any {
    let schema = (mongoose.Schema = {
      sender_id: { type: String },
      receiver_id: { type: String },
      sender_info: {
        username: { type: String },
        avatar: { type: String },
        firstname: { type: String },
        lastName: { type: String }
      },
      type: { type: String },
      content: { type: String },
      is_read: { type: Boolean, default: false },
      create_at: { type: Number, default: Date.now },
      read_at: { type: Number, default: null },
      update_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });
    return schema;
  }
}

let schema = mongooseConnection.model<INotificationModel>(
  "Notification",
  NotificationSchema.Schema
);
export = schema;
