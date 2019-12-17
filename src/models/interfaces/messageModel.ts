import mongoose from "mongoose";
interface IMessageModel extends mongoose.Document {
  _id: any;
  sender_id: string;
  receiver_id: string;
  conversationType: string;
  messageType: string;
  sender_info: {
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
  };
  receiver_info: {
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
  };
  text: string;
  file: { data: Buffer; contentType: string; fileName: string };
  createdAt: null;
  updateAt: null;
  deleteAt: null;
}

export = IMessageModel;
