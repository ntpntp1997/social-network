import Mongoose = require("mongoose");
import Constants = require("./../constants/Constants");

class DataAccess {
  static mongooseInstance: any;
  static mongooseConnection: Mongoose.Connection;

  constructor() {
    DataAccess.connect();
  }

  static connect(): Mongoose.Connection {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = Mongoose.connection;
    this.mongooseConnection.once("open", () => {
      console.log("Kết nối Database Thành công");
    });

    this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    return this.mongooseInstance;
  }
}

DataAccess.connect();
export = DataAccess;
