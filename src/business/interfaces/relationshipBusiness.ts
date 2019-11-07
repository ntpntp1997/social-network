import BaseBusiness = require("./base/BaseBusiness");
import IRelationshipModel = require("../../models/interfaces/relationshipModel");

interface IRelationshipBusiness extends BaseBusiness<IRelationshipModel> {}
export = IRelationshipBusiness;
