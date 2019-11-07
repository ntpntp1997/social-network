import DataAccess = require("../../config/dataAccess/DataAccess");
import ICommentLikeModel = require("../interfaces/comment_likeModel");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class CommentLikeSchema {
  static get Schema(): any {
    let schema = (mongoose.Schema = {
      comment_id: { type: String },
      user_id: { type: String },
      user_info: {
        username: { type: String },
        avatar: { type: String },
        firstName: { type: String },
        lastName: { type: String }
      },
      update_at: { type: Number, default: Date.now },
      create_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });
    return schema;
  }
}

let schema = mongooseConnection.model<ICommentLikeModel>(
  "CommentLike",
  CommentLikeSchema.Schema
);
export = schema;
