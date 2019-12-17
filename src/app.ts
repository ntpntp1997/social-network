import express, { Router } from 'express';
import DataAccess from './config/dataAccess/DataAccess';
import Constants from './config/constants/Constants';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import IRouterAPI from './routes/apiRouter';
import Middlewares from './middleware/base/MiddlewaresBase';
import passPort from 'passport';
import http from 'http';
import socketio from 'socket.io';
import configSocketIO from './config/socketio';
import passportSocketIo from 'passport.socketio';
import cookieParser from 'cookie-parser';
import events from 'events';
import session from './config/sessions/session';
export class App {
  public app: express.Application;
  public port: string;
  private route: IRouterAPI;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(port: string) {
    this.app = express();
    this.port = port;
  }
  public initConfigAll() {
    // config passportjs
    this.app.use(passPort.initialize());
    this.app.use(passPort.session());
    this.app.use(express.static('./src/public'));
  }
  public router() {
    this.app.use(Middlewares.configuration);
  }
  public listen() {
    // set max connection events listeners
    events.EventEmitter.defaultMaxListeners = 30;

    //init server with socketio && express
    let server = http.createServer(this.app);
    let io = socketio(server);
    //configSocketIO(io, passportSocketIo, cookieParser, session);
    server.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server đang hoạt động tại port ${this.port}`);
    });
  }
}
