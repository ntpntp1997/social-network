import mongoose from "mongoose";
interface ICommentLikeModel extends mongoose.Document {
  _id: any;
  comment_id: string;
  user_id: string;
  user_info: {
    username: string;
    avatar: string;
    firstname: string;
    lastname: string;
  };
  create_at: number;
  update_at: number;
  delete_at: number;
}

export = ICommentLikeModel;
