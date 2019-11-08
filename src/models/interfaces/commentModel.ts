import mongoose from "mongoose";
interface ICommentModel extends mongoose.Document {
  _id: any;
  status_id: string;
  user_id: string;
  user_info: {
    username: string;
    avatar: string;
    firstname: string;
    lastname: string;
  };
  like_amount: number;
  content: string;
  update_at: number;
  create_at: number;
  delete_at: number;
}

export = ICommentModel;
