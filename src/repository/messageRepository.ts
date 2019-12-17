import RepositoryBase = require('./base/baseRepository');
import IMessageModel = require('../models/interfaces/messageModel');
import MessagesSchema from './../models/schemas/messageSchema';

export class MessagesRepository extends RepositoryBase<IMessageModel> {
  constructor() {
    super(MessagesSchema);
  }
  findByRelationshipId(conversation_id) {
    return this._model.find({ conversation_id: conversation_id }).exec();
  }
}
