import BaseBusiness = require("./base/BaseBusiness");
import IStatusLike = require("../../models/interfaces/status_likeModel");

interface StatusLikeBusiness extends BaseBusiness<IStatusLike> {}
export = StatusLikeBusiness;
