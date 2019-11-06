import IUserModel = require("./interfaces/userModel");

export class UserModel {
  private _userModel: IUserModel;
  constructor(userModel: IUserModel) {
    this._userModel = userModel;
  }
  get username(): string {
    return this._userModel.username;
  }

  get email(): string {
    return this._userModel.email;
  }

  get password(): string {
    return this._userModel.password;
  }

  get firstName(): string {
    return this._userModel.firstName;
  }

  get lastname(): string {
    return this._userModel.lastName;
  }

  get role(): any {
    return this._userModel.role;
  }

  get permiss(): any {
    return this._userModel.permiss;
  }

  get phone(): string {
    return this._userModel.phone;
  }

  get address(): string {
    return this._userModel.address;
  }

  get createAt(): number {
    return this._userModel.createAt;
  }

  get updateAt(): number {
    return this._userModel.updateAt;
  }

  get deleteAt(): number {
    return this._userModel.deleteAt;
  }
}
Object.seal(UserModel);
