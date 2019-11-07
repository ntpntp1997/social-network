import IRelationshipModel = require("../models/interfaces/relationshipModel");
import RepositoryBase = require("./base/baseRepository");
import RelationshipSchema from "./../models/schemas/relationshipSchema";

class RelationshipRepositpry extends RepositoryBase<IRelationshipModel> {
  constructor() {
    super(RelationshipSchema);
  }
  findByName(value: string) {
    this._model.find({
      $or: [
        { username: { $regex: value } },
        { firstname: { $regex: value } },
        { lastname: { $regex: value } }
      ]
    });
  }
}
export = RelationshipRepositpry;
