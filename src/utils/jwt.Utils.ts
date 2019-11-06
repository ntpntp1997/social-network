import { resolve } from "path";
import { rejects } from "assert";
import { UserBusiness } from "../business/userBusiness";
const jwt = require("jsonwebtoken");

class JwtUtil {
  constructor() {}
  public verifyJwtToken(token, secretKey) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  }

  /**
   * getUserinfo
   */
  public getUserinfo(id) {
    return new Promise(async (resolve, reject) => {
      let userBusiness = new UserBusiness();
      await userBusiness.findById(id, (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
export = JwtUtil;
