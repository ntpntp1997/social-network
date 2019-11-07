import AuthRouter from "../authRoutes";
import StatusRoutes from "../statusRoutes";
import express = require("express");
import UserRoutes = require("../userRoutes");
import PassPortInit = require("../../config/passport/passport");
import LikeStatusRouter = require("../likeStatusRouter");
var app = express();
class BaseRoutes {
  get routes() {
    app.use("/", new UserRoutes().routes);
    app.use("/", new AuthRouter().routes);
    app.use("/", new StatusRoutes().router);
    app.use("/", new LikeStatusRouter().Router);
    return app;
  }
}
export = BaseRoutes;
