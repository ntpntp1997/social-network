import { StatusRepository } from "../repository/statusRepository";
import IStatusModel from "../models/interfaces/statusModel";
import IStatusBusiness = require("./interfaces/StatusBusiness");

export class StatusBusiness implements IStatusBusiness {
  private _statusRepository: StatusRepository;
  private saltRounds = 7;

  constructor() {
    this._statusRepository = new StatusRepository();
  }

  create(item: IStatusModel, callback: (error: any, result: any) => void) {
    this._statusRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._statusRepository.retrieve(callback);
  }

  update(
    _id: string,
    item: IStatusModel,
    callback: (error: any, result: any) => void
  ) {
    this._statusRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._statusRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._statusRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IStatusModel) => void) {
    this._statusRepository.findById(_id, callback);
  }

  findBy(
    type: string,
    username: string,
    callback: (error: any, result: IStatusModel) => void
  ) {
    this._statusRepository.findUserName(username, callback);
  }
}
Object.seal(StatusBusiness);
