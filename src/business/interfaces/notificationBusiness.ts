import BaseBusiness = require("./base/BaseBusiness");
import INotificationModel = require("../../models/interfaces/notificationModel");

interface INotificationBusiness extends BaseBusiness<INotificationModel> {}
export = INotificationBusiness;
