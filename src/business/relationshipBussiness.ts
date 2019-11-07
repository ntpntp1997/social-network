import IRelationshipBusiness = require("./interfaces/relationshipBusiness");
import IRelationshipModel = require("../models/interfaces/relationshipModel");

class RelationshipBusiness implements IRelationshipBusiness {
  constructor() {}
  retrieve: (
    callback: (error: any, result: IRelationshipModel) => void
  ) => void;
  findById: (
    _id: string,
    callback: (error: any, result: IRelationshipModel) => void
  ) => void;
  create: (
    item: IRelationshipModel,
    callback: (error: any, result: any) => void
  ) => void;
  update: (
    _id: string,
    item: IRelationshipModel,
    callback: (error: any, result: any) => void
  ) => void;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
}
export = RelationshipBusiness;
