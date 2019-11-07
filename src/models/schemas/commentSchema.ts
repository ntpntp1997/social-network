import DataAccess = require("../../config/dataAccess/DataAccess");
import ICommentModel = require("../interfaces/commentModel");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class CommentSchema {
  static get Schema(): any {
    let schema = (mongoose.Schema = {
      status_id: { type: String },
      user_id: { type: String },
      user_info: {
        username: { type: String },
        avatar: { type: String },
        firstname: { type: String },
        lastname: { type: String }
      },
      like_amount: { type: Number, default: 0 },
      content: { type: String },
      update_at: { type: Number, default: Date.now },
      create_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });
    return schema;
  }
}

let schema = mongooseConnection.model<ICommentModel>(
  "Comment",
  CommentSchema.Schema
);
export = schema;
