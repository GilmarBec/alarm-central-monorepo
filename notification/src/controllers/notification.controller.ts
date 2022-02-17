import { ControllerExceptionHandler } from '../../../common/decorators/controller.exception.handler.decorator';
import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { AlertDto } from '../../../common/models/interfaces/alert.dto';
import notificationService from '../services/notification.service';

@Controller('notifications')
class NotificationController {
    @Post()
    @ControllerExceptionHandler()
    async notify(request: Request, response: Response) {
        const alertDto: AlertDto = request.body;

        await notificationService.alert(alertDto)

        return response.status(200).json(alertDto);
    }
}

export default new NotificationController();
