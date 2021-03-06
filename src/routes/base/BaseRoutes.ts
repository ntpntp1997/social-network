import AuthRouter from '../authRoutes';
import StatusRoutes from '../statusRoutes';
import express = require('express');
import UserRoutes = require('../userRoutes');
import PassPortInit = require('../../config/passport/passport');
import LikeStatusRouter = require('../likeStatusRouter');
import RelationshipRouter from './../friendRouter';
import CommentRoutes from '../commentRoutes';
import NotificationRoutes from '../notificationRouter';
import MessageRoutes from '../messageRouter';
var app = express();
class BaseRoutes {
  get routes() {
    app.use('/', new UserRoutes().routes);
    app.use('/', new AuthRouter().routes);
    app.use('/', new StatusRoutes().routes);
    app.use('/', new LikeStatusRouter().routes);
    app.use('/', new RelationshipRouter().routes);
    app.use('/', new CommentRoutes().routes);
    app.use('/', new NotificationRoutes().routes);
    app.use('/', new MessageRoutes().routes);
    return app;
  }
}
export = BaseRoutes;
