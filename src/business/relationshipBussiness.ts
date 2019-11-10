import IRelationshipBusiness = require("./interfaces/relationshipBusiness");
import IRelationshipModel = require("../models/interfaces/relationshipModel");
import RelationshipRepository from "./../repository/relationshipRepository";

class RelationshipBusiness implements IRelationshipBusiness {
  private _relationshipRepository: RelationshipRepository;

  constructor() {
    this._relationshipRepository = new RelationshipRepository();
  }

  create(
    item: IRelationshipModel,
    callback: (error: any, result: any) => void
  ) {
    this._relationshipRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._relationshipRepository.retrieve(callback);
  }

  update(
    _id: string,
    item: IRelationshipModel,
    callback: (error: any, result: any) => void
  ) {
    this._relationshipRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._relationshipRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._relationshipRepository.delete(_id, callback);
  }

  findById(
    _id: string,
    callback: (error: any, result: IRelationshipModel) => void
  ) {
    this._relationshipRepository.findById(_id, callback);
  }

  findBy(
    type: string,
    username: string,
    callback: (error: any, result: IRelationshipModel) => void
  ) {
    this._relationshipRepository.findUserName(username, callback);
  }
  friendlist(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        let list = await this._relationshipRepository.friendlist(id);
        resolve(list);
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }
}
export = RelationshipBusiness;
