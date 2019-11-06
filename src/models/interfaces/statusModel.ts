import mongoose from "mongoose";
interface StatusModel extends mongoose.Document {
  _id: any;
  user_id: string;
  user_info: {
    username: string;
    avatar: string;
    firstName: string;
    lastName: string;
  };
  content: string;
  comment_amount: number;
  likeAmoutn: number;
  create_time: number;
  update_time: number;
  delete_time: number;
}

export = StatusModel;
