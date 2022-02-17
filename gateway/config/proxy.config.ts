import { NextFunction, Request, Response } from 'express';
import httpProxy from 'express-http-proxy';

class ProxyConfig {
    house = { // house register
        regex: /^\/houses$/,
        target: 'http://127.0.0.1:8080',
        methods: ['POST'],
    }

    houseAlert = { // House DetectPresence
        regex: /^\/houses\/[A-z0-9]+\/alert$/,
        target: 'http://localhost:8081',
        methods: ['POST'],
    }

    alarmPut = { // Alarm On/Off
        regex: /^\/houses\/[A-z0-9]+\/alarms$/,
        target: 'http://localhost:8082',
        methods: ['PUT'],
    }

    alarmsStatus = { // Alarm Ping
        regex: /^\/houses\/[A-z0-9]+\/alarms$/,
        target: 'http://localhost:8083',
        methods: ['POST'],
    }

    configure (req: Request, res: Response, next: NextFunction) {
        const host = this.selectProxyHost(req);
        if (!host) {
            res.status(404).json({
                code: 'gateway-0001',
                message: 'Not found'
            })

            return
        }

        httpProxy(host)(req, res, next);
    }

    private selectProxyHost(req: Request): string | undefined {
        switch (true) {
            case this.matchPrefix(req, this.house.regex, this.house.methods):
                return this.house.target;
            case this.matchPrefix(req, this.houseAlert.regex, this.houseAlert.methods):
                return this.houseAlert.target;
            case this.matchPrefix(req, this.alarmPut.regex, this.alarmPut.methods):
                return this.alarmPut.target;
            case this.matchPrefix(req, this.alarmsStatus.regex, this.alarmsStatus.methods):
                return this.alarmsStatus.target;
            default:
                return undefined
        }
    }

    private matchPrefix (req: Request, regex: RegExp, methods: string[]): boolean {
        return req.path.match(regex) !== null && methods.includes(req.method)
    }
}


const instance = new ProxyConfig();

export const configure = instance.configure.bind(instance)
