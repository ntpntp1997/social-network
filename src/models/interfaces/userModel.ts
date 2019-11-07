import mongoose = require("mongoose");

interface IUserModel extends mongoose.Document {
  _id: any;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
  role: [];
  permiss: [];
  create_at: number;
  update_at: number;
  delete_at: number;
}

export = IUserModel;
