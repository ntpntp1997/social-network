import session from 'express-session';
import connectMongo from 'connect-mongo';

import mongoose from 'mongoose';

export default class Session {
  constructor() {}
  config(app) {
    app.use(
      session({
        secret: process.env.APP_SECRET,
        store: this.sessionStore(),
        resave: true,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 // 86640000 sec = 1 day
        }
      })
    );
  }
  sessionStore() {
    const MongoStore = connectMongo(session);
    /**
     * this variable is where save session , in this case mongodb
     */
    let sessionStore = new MongoStore({
      url: process.env.SESSIONURI || 'mongodb://localhost:27017/sessionstore',
      autoReconnect: true
      // autoRemove: "native"
    });
    return sessionStore;
  }
}
