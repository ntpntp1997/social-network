import express = require("express");
import UserController from "../controllers/userController";
import { checkJwt } from "../middleware/checkJwt.Middelware";
var router = express.Router();
class UserRoutes {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }
  get routes() {
    var controller = this._userController;
    router.get("/users", [checkJwt], controller.retrieve);
    router.post("/users", controller.create);
    router.put("/users/:_id", [checkJwt], controller.update);
    router.get("/users/:_id", [checkJwt], controller.findById);
    router.get("/find/:value", [checkJwt], controller.findUser);
    router.delete("/users/:_id", [checkJwt], controller.delete);

    return router;
  }
}

Object.seal(UserRoutes);
export = UserRoutes;
