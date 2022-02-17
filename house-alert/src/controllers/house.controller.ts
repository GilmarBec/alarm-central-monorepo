import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { ControllerExceptionHandler } from '../../../common/decorators/controller.exception.handler.decorator';
import { AlertDto } from '../../../common/models/interfaces/alert.dto';
import alertDao from '../../../common/dao/alert.dao';
import axios from 'axios';

@Controller('houses')
class HouseController {
    @Post(':id/alert')
    @ControllerExceptionHandler()
    async alert(request: Request, response: Response) {
        const houseId: string = request.params.id;
        const { sensor }: Partial<AlertDto> = request.body;

        const alert = await alertDao.create({ houseId, sensor });
        await axios.post('http://localhost:8084/notifications', alert);

        return response.status(201).json(alert);
    }
}

export default new HouseController();
