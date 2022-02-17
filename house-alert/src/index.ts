import app from './app';
import Logger from '../../common/helpers/logger';
import { ExitStatus } from '../../common/models/enum/exit.status.enum';

const port = Number(process.env.PORT ?? 8000);

process.on('unhandledRejection', (reason, promise) => {
    Logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);

    throw reason;
});

process.on('uncaughtException', (error) => {
    Logger.error(`App exiting due to an uncaught exception: ${error}`);
    process.exit(ExitStatus.Failure);
});

app.start(port);
