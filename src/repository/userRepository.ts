import mongoose from "mongoose";
import UserModel = require("./../models/userModel");
import IUserModel = require("./../models/interfaces/userModel");
import UserSchema = require("./../models/schemas/userSchema");
import RepositoryBase = require("./base/baseRepository");

export class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
  updateRoleupdate(
    _id: mongoose.Types.ObjectId,
    item: IUserModel,
    callback: (error: any, result: any) => void
  ) {
    // tslint:disable-next-line:object-literal-shorthand
    this._model.updateOne({ _id: _id }, item, callback).exec();
  }
}

Object.seal(UserRepository);
