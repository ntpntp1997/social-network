import multer from "multer";
import uuidv4 from "uuid/v4";
import fsExtra from "fs-extra";
import { validationResult } from "express-validator";
import { transErrors, transSuccess } from "../lang/vi";
import { app } from "../config/config";
import * as express from "express";
import { UserBusiness } from "../business/userBusiness";
import { userInfo } from "os";

let storageAvartar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, app.avatar_directory);
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type;
    if (math.indexOf(file.mimetype) === -1) {
      return callback(transErrors.avatar_type, null);
    }
    let avatar_name = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    callback(null, avatar_name);
  }
});

let uploadAvatar = multer({
  storage: storageAvartar,
  limits: { fileSize: app.avatar_limit_size }
}).single("avatar");

export class UploadController {
  constructor() {}

  UploadAvartar(req: express.Request, res: express.Response) {
    uploadAvatar(req, res, async error => {
      if (error) {
        if (error.message) {
          return res.status(500).send(transErrors.avatar_size);
        }
        return res.status(500).send(error);
      }
      try {
        let updateUserItem = {
          avatar: req["file"].filename,
          updateAt: Date.now()
        };
        //update user
        let userBusiness = new UserBusiness();

        let userUpdate = await userBusiness.updateUser(
          req["decoded"]._id,
          updateUserItem
        );

        //remove
        // await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`);
        let result = {
          message: transSuccess.avatar_updated,
          imageSrc: `/images/users/${req["file"].filename}`
        };
        return res.status(200).send(result);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    });
  }
}
