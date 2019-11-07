import DataAccess = require("../../config/dataAccess/DataAccess");
import IRelationshipModel from "../interfaces/relationshipModel";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class RelationshipSchema {
  static get Schema(): any {
    let schema = (mongoose.Schema = {
      user_id: { type: String },
      friend_id: { type: String },
      friend_info: {
        username: { type: String },
        avatar: { type: String },
        firstname: { type: String },
        lastname: { type: String }
      },
      status: { type: String, default: "follow" }, // follow -> friend -> bestfriend
      create_at: { type: Number, default: Date.now },
      update_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });
    return schema;
  }
}

let schema = mongooseConnection.model<IRelationshipModel>(
  "Relationship",
  RelationshipSchema.Schema
);
export = schema;
