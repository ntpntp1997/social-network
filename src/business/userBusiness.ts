import { UserRepository } from "../repository/userRepository";
import { UserModel } from "../models/userModel";
import IUserModel from "../models/interfaces/userModel";
import IUserBusiness = require("./interfaces/UserBusiness");
import bcrypt from "bcrypt";
import { transErrors } from "../lang/vi";
import _ from "lodash";

export class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;
  private saltRounds = 7;

  constructor() {
    this._userRepository = new UserRepository();
  }

  hashPassword(password: string): string {
    let salt = bcrypt.genSaltSync(this.saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password: string, passwordMain: string): boolean {
    return bcrypt.compare(password, passwordMain); // return promise has result true or false
  }

  create(item: IUserModel, callback: (error: any, result: any) => void) {
    console.log(item.password);
    item.password = this.hashPassword(item.password);
    this._userRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._userRepository.retrieve(callback);
  }

  update(
    _id: string,
    item: IUserModel,
    callback: (error: any, result: any) => void
  ) {
    this._userRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._userRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IUserModel) => void) {
    this._userRepository.findById(_id, callback);
  }

  findBy(
    type: string,
    username: string,
    callback: (error: any, result: IUserModel) => void
  ) {
    this._userRepository.findUserName(username, callback);
  }

  findUser(value: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this._userRepository.findByName(value);
        if (!user || _.size(user) < 1) {
          return reject(transErrors.user_not_found);
        }
        resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
Object.seal(UserBusiness);
