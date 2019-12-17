import BaseBusiness = require('./base/BaseBusiness');
import IMessageModel = require('../../models/interfaces/messageModel');

interface IMessageBusiness extends BaseBusiness<IMessageModel> {}
export = IMessageBusiness;
