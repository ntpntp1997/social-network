import IBaseController from "./interfaces/base/BaseController";
import { UserBusiness } from "../business/userBusiness";
export default class AuthController implements IBaseController<UserBusiness> {
  retrieve: import("express").RequestHandler<
    import("express-serve-static-core").ParamsDictionary
  >;
  findById: import("express").RequestHandler<
    import("express-serve-static-core").ParamsDictionary
  >;
  create: import("express").RequestHandler<
    import("express-serve-static-core").ParamsDictionary
  >;
  update: import("express").RequestHandler<
    import("express-serve-static-core").ParamsDictionary
  >;
  delete: import("express").RequestHandler<
    import("express-serve-static-core").ParamsDictionary
  >;

  constructor() {}
}
