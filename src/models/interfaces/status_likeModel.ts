import mongoose from "mongoose";
interface IStatusLikeModel extends mongoose.Document {
  _id: string;
  status_id: string;
  user_id: string;
  user_info: {
    username: string;
    avatar: string;
    firstname: string;
    lastName: string;
  };
  create_at: number;
  update_at: number;
  delete_at: number;
}

export = IStatusLikeModel;
