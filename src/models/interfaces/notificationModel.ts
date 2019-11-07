import mongoose from "mongoose";
interface INotificationModel extends mongoose.Document {
  _id: any;
  sender_id: string;
  receiver_id: string;
  sender_info: {
    username: string;
    avatar: string;
    firstname: string;
    lastName: string;
  };
  type: string;
  content: string;
  is_read: boolean;
  create_at: number;
  read_at: number;
  update_at: number;
  delete_at: number;
}

export = INotificationModel;
