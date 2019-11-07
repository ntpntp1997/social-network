import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { confToken } from "./../config/config";
import { transErrors } from "./../lang/vi";
import JwtUtil = require("../utils/jwt.Utils");

export const checkJwt = async (req, res: Response, next: NextFunction) => {
  try {
    //Get the jwt token from the head
    let token =
      <string>req.body.token ||
      req.query.token ||
      req.headers.authorization.split(" ")[1];
    // decode token

    if (token) {
      // Xác thực mã token và kiểm tra thời gian hết hạn của mã
      try {
        const decoded = await new JwtUtil().verifyJwtToken(
          token,
          confToken.secret
        );
        // Lưu thông tin giã mã được vào đối tượng req, dùng cho các xử lý ở sau
        req.decoded = decoded;
        next();
      } catch (err) {
        // Giải mã gặp lỗi: Không đúng, hết hạn...
        console.error(err);
        return res.status(401).json({
          message: transErrors.token_fail
        });
      }
    } else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: transErrors.no_token_provide
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: transErrors.no_token_provide
    });
  }
};
