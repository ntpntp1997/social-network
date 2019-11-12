import IRelationshipModel = require("../models/interfaces/relationshipModel");
import RepositoryBase = require("./base/baseRepository");
import RelationshipSchema from "./../models/schemas/relationshipSchema";

class RelationshipRepositpry extends RepositoryBase<IRelationshipModel> {
  constructor() {
    super(RelationshipSchema);
  }
  findByName(value: string) {
    return this._model.find({
      $or: [
        { username: { $regex: value } },
        { firstname: { $regex: value } },
        { lastname: { $regex: value } }
      ]
    });
  }
  friendstatus(friendid, userid) {
    return this._model.find({
      $or: [
        {
          $and: [{ friend_id: friendid }, { user_id: userid }]
        },
        {
          $and: [{ friend_id: userid }, { user_id: friendid }]
        }
      ]
    });
  }
  friendlist(id) {
    return this._model.find({
      $or: [
        {
          $and: [{ user_id: id }, { status: "friend" }]
        },
        {
          $and: [{ friend_id: id }, { status: "friend" }]
        }
      ]
    });
  }
  requestList(id) {
    return this._model.find({
      $and: [{ friend_id: id }, { status: "follow" }]
    });
  }
}
export = RelationshipRepositpry;
