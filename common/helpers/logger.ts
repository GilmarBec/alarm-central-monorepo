import {Request} from "express"

const winston = require('winston');
const dirname = __dirname + '/../../logs'

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    levels: {
        emerg:      0, // System is unusable
        alert:      1, // Action must be taken immediately
        crit:       2, // Critical conditions
        error:      3, // Error conditions
        warning:    4, // Warning conditions
        notice:     5, // Normal but significant conditions
        info:       6, // Informational messages
        debug:      7  // Debug-level messages
    },
    transports: [
        new winston.transports.File({ filename: 'emerg.log',   level: "emerg", dirname: dirname }),
        new winston.transports.File({ filename: 'alert.log',   level: "alert", dirname: dirname }),
        new winston.transports.File({ filename: 'crit.log',    level: "crit", dirname: dirname }),
        new winston.transports.File({ filename: 'error.log',   level: "error", dirname: dirname }),
        new winston.transports.File({ filename: 'warning.log', level: "warning", dirname: dirname }),
        new winston.transports.File({ filename: 'notice.log',  level: "notice", dirname: dirname }),
        new winston.transports.File({ filename: 'info.log',    level: "info", dirname: dirname }),
        new winston.transports.File({ filename: 'debug.log',   level: "debug", dirname: dirname }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

logger.logRequest = (action: string, req: Request) => {
    let requestData = `\nBase URL: ${req.baseUrl + req.url}`
    requestData += `\nHeader: ${JSON.stringify(req.headers, undefined, 4)}`
    requestData += `\nBody: ${JSON.stringify(req.body, undefined, 4) ?? undefined}`
    logger.notice(`${action}\n${requestData}`)
}

export default logger;
