import express = require("express");
import RelationshipController from "../controllers/relationshipController";
import { checkJwt } from "../middleware/checkJwt.Middelware";
var router = express.Router();
class RelationshipRoutes {
  private _relationshipController: RelationshipController;

  constructor() {
    this._relationshipController = new RelationshipController();
  }
  get routes() {
    var controller = this._relationshipController;
    router.get("/friends", [checkJwt], controller.retrieve);
    router.post("/friends", [checkJwt], controller.create);
    router.put("/friends/:_id", [checkJwt], controller.update);
    router.get("/friends/:_id", [checkJwt], controller.findById);
    router.delete("/friends/:_id", [checkJwt], controller.delete);
    router.get("/list", [checkJwt], controller.friendlist);

    return router;
  }
}

Object.seal(RelationshipRoutes);
export = RelationshipRoutes;
