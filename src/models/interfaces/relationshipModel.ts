import mongoose from "mongoose";
interface IRelationshipModel extends mongoose.Document {
  _id: any;
  user_id: string;
  friend_id: string;
  friend_info: {
    username: string;
    avatar: string;
    firstname: string;
    lastName: string;
  };
  status: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export = IRelationshipModel;
