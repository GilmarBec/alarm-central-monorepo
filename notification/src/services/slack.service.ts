import { Slack } from '../../../common/helpers/slack';
import { AlertDto } from '../../../common/models/interfaces/alert.dto';
import { HouseDto } from '../../../common/models/interfaces/house.dto';

class SlackService extends Slack {
    protected buildMessage(alert: AlertDto, house: HouseDto) {
        const slackMsg: any = {
            blocks: [],
        };

        slackMsg.blocks.push({ 'type': 'divider' });
        slackMsg.blocks.push({
            type: 'header',
            text: {
                type: 'plain_text',
                text: ':warning: Alerta de sensor',
                emoji: true,
            },
        });
        slackMsg.blocks.push({ 'type': 'divider' });

        const section: any = {
            'type': 'section',
            'fields': [],
        };
        section.fields.push(this.buildField('House', house._id));
        section.fields.push(this.buildField('Sensor', alert.sensor));
        section.fields.push(this.buildField('Owner', house.ownerName));
        section.fields.push(this.buildField('Contact', house.phone));
        section.fields.push(this.buildField('Alert id', alert._id));
        section.fields.push(this.buildField('Date', alert.date));

        slackMsg.blocks.push(section);
        slackMsg.blocks.push({ 'type': 'divider' });

        return slackMsg;
    }
}

export default new SlackService();
