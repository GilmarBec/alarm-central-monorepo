import axios from 'axios';

export abstract class Slack {
    async sendMessage(...params: any): Promise<void> {
        const slackMsg = this.buildMessage(...params);

        await axios.post(process.env.SLACK_NOTIFICATION ?? '', slackMsg);
    }

    protected abstract buildMessage(...params: any): object

    protected buildField(title: string, value: string) {
        title = title ? `*${title}:*\n` : ''
        return {
            "type": "mrkdwn",
            "text": `${title}${value}`
        }
    }
}
