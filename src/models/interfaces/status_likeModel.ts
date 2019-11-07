import mongoose from "mongoose";
interface IStatusLikeModel extends mongoose.Document {
  _id: any;
  status_id: string;
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

export = IStatusLikeModel;
