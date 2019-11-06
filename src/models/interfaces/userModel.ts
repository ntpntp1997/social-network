import mongoose = require("mongoose");

interface IUserModel extends mongoose.Document {
  _id: any;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
  role: [];
  permiss: [];
  createAt: number;
  updateAt: number;
  deleteAt: number;
}

export = IUserModel;
