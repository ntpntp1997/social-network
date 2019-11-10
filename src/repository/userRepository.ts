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
  findByName(value: string): any {
    return this._model.find({
      $or: [
        { username: { $regex: value, $options: "i" } },
        { firstname: { $regex: value, $options: "i" } },
        { lastname: { $regex: value, $options: "i" } }
      ]
    });
  }
  updateUser(id, item) {
    return this._model.findByIdAndUpdate(id, item).exec();
  }
}

Object.seal(UserRepository);
