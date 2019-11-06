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
        firstName: { type: String },
        lastName: { type: String }
      },
      content: { type: String },
      comment_amount: { type: Number, default: 0 },
      likeAmoutn: { type: Number, default: 0 },
      create_time: { type: Number, default: Date.now },
      update_time: { type: Number, default: null },
      delete_time: { type: Number, default: null }
    });

    return schema;
  }
}
var schema = mongooseConnection.model<IStatusModel>(
  "Status",
  StatusSchema.Schema
);
export = schema;
