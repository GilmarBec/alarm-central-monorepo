import axios from 'axios';

export abstract class Slack {
    async sendMessage(...params: any): Promise<void> {console.log(3)
        const slackMsg = this.buildMessage(...params);console.log(4)

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
