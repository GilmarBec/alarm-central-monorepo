import { AlertDto } from '../../../common/models/interfaces/alert.dto';
import houseDao from '../../../common/dao/house.dao';
import slackService from './slack.service';

class NotificationService {
    async alert(alert: AlertDto) {
        const house = await houseDao.findById(alert.houseId);
        await slackService.sendMessage(alert, house);
    }
}

const instance = new NotificationService()
export default instance;
