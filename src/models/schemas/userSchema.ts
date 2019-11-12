import DataAccess from "../../config/dataAccess/DataAccess";
import IUserModel = require("../interfaces/userModel");
import Constants from "../../config/constants/Constants";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {
  static get Schema(): any {
    var schema = (mongoose.Schema = {
      email: { type: String, required: true, unique: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      gender: { type: String, required: true },
      password: { type: String, required: true },
      phone: { type: String, default: null },
      address: { type: String, default: null },
      avatar: { type: String, default: "images/user.jpg" },
      role: [],
      permiss: [],
      create_at: { type: Number, default: Date.now },
      update_at: { type: Number, default: null },
      delete_at: { type: Number, default: null }
    });

    return schema;
  }
}
var schema = mongooseConnection.model<IUserModel>("User", UserSchema.Schema);
export = schema;
