import mongoose from "mongoose";
interface IStatusModel extends mongoose.Document {
  _id: any;
  user_id: string;
  user_info: {
    username: string;
    avatar: string;
    firstname: string;
    lastname: string;
  };
  photo: string;
  content: string;
  comment_amount: number;
  like_amount: number;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export = IStatusModel;
