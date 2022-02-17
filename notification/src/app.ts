require('dotenv/config');

import { AbstractApplication } from '../../common/helpers/abstract.application';
import controller from './controllers/notification.controller';

class Application extends AbstractApplication {
    constructor() {
        super();
    }

    protected setupControllers(): void {
        super.addControllers([
            controller
        ]);
    }
}

export default new Application();
