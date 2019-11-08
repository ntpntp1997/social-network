import BaseBusiness = require("./base/BaseBusiness");
import ICommentModel = require("../../models/interfaces/commentModel");

interface ICommentBusiness extends BaseBusiness<ICommentModel> {}
export = ICommentBusiness;
