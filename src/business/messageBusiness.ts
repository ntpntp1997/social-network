import IMessageBusiness = require('./interfaces/messageBusiness');
import IMessageModel = require('../models/interfaces/messageModel');
import { MessagesRepository } from '../repository/messageRepository';
import _ from 'lodash';
import { transErrors } from '../lang/vi';

class MessageBusiness implements IMessageBusiness {
  private _messageRepository = new MessagesRepository();
  constructor() {}
  retrieve(callback: (error: any, result: any) => void) {
    this._messageRepository.retrieve(callback);
  }
  findById(_id: string, callback: (error: any, result: IMessageModel) => void) {
    this._messageRepository.findById(_id, callback);
  }
  create(item: IMessageModel, callback: (error: any, result: any) => void) {
    this._messageRepository.create(item, callback);
  }
  update(
    _id: any,
    item: IMessageModel,
    callback: (error: any, result: any) => void
  ) {
    this._messageRepository.update(_id, item, callback);
  }
  delete(_id: string, callback: (error: any, result: any) => void) {
    this._messageRepository.delete(_id, callback);
  }
  findByRelationshipId(conversation_id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let comment = await this._messageRepository.findByRelationshipId(
          conversation_id
        );
        console.log(comment);
        if (_.size(comment) < 1) {
          return reject(transErrors.noti_null);
        }
        resolve(comment);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
export = MessageBusiness;
