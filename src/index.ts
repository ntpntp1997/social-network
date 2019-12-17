import dotenv from 'dotenv';
import { App } from './app';
import Session from './config/sessions/session';
import express from 'express';

try {
  dotenv.config();
  const port: string = process.env.APP_PORT || '3000';
  const appa = new App(port);
  appa.router();
  const app = express();
  const session = new Session();

  session.config(app);

  appa.initConfigAll();

  appa.listen();
} catch (error) {
  console.log(error);
}
