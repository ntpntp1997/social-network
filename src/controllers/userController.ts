import express = require("express");
import IBaseController from "./interfaces/base/BaseController";
import { UserBusiness } from "../business/userBusiness";
import IUserModel from "../models/interfaces/userModel";
import jwt from "jsonwebtoken";
import passPort from "passport";
import { confToken } from "../config/config";
import UserModel from "../models/interfaces/userModel";

class UserController implements IBaseController<UserBusiness> {
  create(req: express.Request, res: express.Response): void {
    try {
      var user: IUserModel = <IUserModel>req.body;
      var userBusiness = new UserBusiness();
      userBusiness.create(user, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: "error" });
        } else res.send({ success: "success" });
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "error in your request" });
    }
  }
  update(req: express.Request, res: express.Response): void {
    try {
      var user: IUserModel = <IUserModel>req.body;
      console.log(user);
      delete user.username;
      delete user.role;
      delete user.permiss;
      var _id: string = req.params._id;
      var userBusiness = new UserBusiness();
      userBusiness.update(_id, user, (error, result) => {
        if (error) res.status(500).send({ error: "error" });
        else res.send({ success: result });
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "error in your request" });
    }
  }
  delete(req: express.Request, res: express.Response): void {
    try {
      var _id: string = req.params._id;
      var userBusiness = new UserBusiness();
      userBusiness.delete(_id, (error, result) => {
        if (error) res.status(500).send({ error: "error" });
        else res.send({ success: "success" });
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "error in your request" });
    }
  }
  retrieve(req: express.Request, res: express.Response): void {
    try {
      var userBusiness = new UserBusiness();
      userBusiness.retrieve((error, result) => {
        if (error) res.status(500).send({ error: "error" });
        else res.send(result);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "error in your request" });
    }
  }
  findById(req: express.Request, res: express.Response): void {
    try {
      var _id: string = req.params._id;
      var userBusiness = new UserBusiness();
      userBusiness.findById(_id, (error, result) => {
        if (error) {
          console.log(error);
          res.send({ error: "error" });
        } else res.send(result);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "error in your request" });
    }
  }
  async findUser(req: express.Request, res: express.Response) {
    try {
      let value: string = req.params.value;
      const userBusiness = new UserBusiness();
      let user = await userBusiness.findUser(value);
      console.log(user);
      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
  login(req, res, next) {
    passPort.authenticate("local", (err, user, info) => {
      var token;
      var userBusiness = new UserBusiness();
      // neu xay ra loi
      if (err) {
        return res.status(500).send(err.message);
      }

      // neu user khong ton tai
      // console.log(user)
      if (!user) {
        return res.status(404).send("user not found");
      }

      // thuc thien dang nhap va tao session
      req.logIn(user, async err => {
        // neu co loi trong qua trinh thuc hien
        if (err) {
          return next(err);
        }
        console.log(confToken.secret);
        // Đăng nhập thành công, tạo mã token cho user
        let data = {
          id: user._id,
          username: user.username,
          role: user.role
        };
        const token = jwt.sign(data, confToken.secret, {
          expiresIn: confToken.tokenLife
        });
        let tokenVerify = jwt.verify(token, confToken.secret);
        console.log(tokenVerify["exp"]);
        let tokenExpTime = tokenVerify["exp"];
        // Tạo một mã token khác - Refresh token
        const refreshToken = jwt.sign(data, confToken.refreshTokenSecret, {
          expiresIn: confToken.refreshTokenLife
        });
        let refreshTokenVerify = jwt.verify(
          refreshToken,
          confToken.refreshTokenSecret
        );
        // let refreshTokenExpTime = refreshTokenVerify.exp;
        // try {
        //     await auth.createOAuth(refreshToken, data, refreshTokenExpTime)
        // } catch (error) {
        //     return res.status(500).send(error)
        // }
        return res.status(200).json({
          token: token,
          exp: tokenExpTime,
          refreshToken: refreshToken
        });
      });
    })(req, res, next);
  }
}
export = UserController;
