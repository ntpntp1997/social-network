import DataAccess = require("../../config/dataAccess/DataAccess");
import IStatusModel from "./../interfaces/statusModel";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class StatusSchema {
  static get Schema(): any {
    var schema = (mongoose.Schema = {
      user_id: { type: String },
      user_info: {
        username: { type: String },
        avatar: { type: String },
        firstname: { type: String },
        lastname: { type: String }
      },
      photo: { type: String, default: null },
      content: { type: String },
      comment_amount: { type: Number, default: 0 },
      like_amount: { type: Number, default: 0 },
      create_at: { type: Number, default: Date.now },
      update_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });

    return schema;
  }
}
var schema = mongooseConnection.model<IStatusModel>(
  "Status",
  StatusSchema.Schema
);
export = schema;
