import DataAccess = require('../../config/dataAccess/DataAccess');
import IMessageModel = require('../interfaces/messageModel');

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class MessageSchema {
  static get Schema(): any {
    let schema = (mongoose.Schema = {
      sender_id: String,
      receiver_id: String,
      conversation_id: String, // friend
      messageType: String,
      sender_info: {
        username: String,
        firstname: String,
        lastname: String,
        avatar: String
      },
      receiver_info: {
        username: String,
        firstname: String,
        lastname: String,
        avatar: String
      },
      text: String,
      file: { data: Buffer, contentType: String, fileName: String },
      createdAt: { type: Number, default: Date.now },
      updateAt: { type: Number, default: null },
      deleteAt: { type: Number, default: null }
    });
    return schema;
  }
}

let schema = mongooseConnection.model<IMessageModel>(
  'Message',
  MessageSchema.Schema
);
export = schema;
