import express = require("express");
import bodyParser = require("body-parser");
import helmet from "helmet";
import cors from "cors";
import MethodOverride = require("./../MethodOverride");
import BaseRoutes from "./../../routes/base/BaseRoutes";
import passPort from "passport";
import PassPortInit = require("../../config/passport/passport");

class MiddlewaresBase {
  static get configuration() {
    var app = express();
    app.use(passPort.initialize());
    app.use(passPort.session());
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(MethodOverride.configuration());
    new PassPortInit().initPassPortLocal();
    app.use(new BaseRoutes().routes);
    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;
