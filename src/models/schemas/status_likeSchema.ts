import DataAccess = require("../../config/dataAccess/DataAccess");
import IStatusLikeModel = require("../interfaces/status_likeModel");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class StatusLikeSchema {
  static get Schema(): any {
    var schema = (mongoose.Schema = {
      status_id: { type: String },
      user_id: { type: String },
      user_info: {
        username: { type: String },
        avatar: { type: String },
        firstname: { type: String },
        lastname: { type: String }
      },
      create_at: { type: Number, default: Date.now },
      update_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });

    return schema;
  }
}
var schema = mongooseConnection.model<IStatusLikeModel>(
  "StatusLike",
  StatusLikeSchema.Schema
);
export = schema;
