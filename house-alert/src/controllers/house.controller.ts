import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { ControllerExceptionHandler } from '../../../common/decorators/controller.exception.handler.decorator';
import { AlertDto } from '../../../common/models/interfaces/alert.dto';
import alertDao from '../../../common/dao/alert.dao';
import axios from 'axios';
import houseDao from '../../../common/dao/house.dao';
import { ErrorResponse } from '../../../common/exceptions/error.response';
import { AlarmStatus } from '../../../common/models/interfaces/house.dto';

@Controller('houses')
class HouseController {
    @Post(':id/alert')
    @ControllerExceptionHandler()
    async alert(request: Request, response: Response) {
        const houseId: string = request.params.id;
        const { sensor }: Partial<AlertDto> = request.body;

        const house = await houseDao.findById(houseId);
        if (!house) {
            throw ErrorResponse.NOT_FOUND
        }

        // FIXME [Security flaw]: could be used to see if an alarm is active or not
        if (house.alarm?.status === AlarmStatus.INACTIVE) {
            response.status(200).send();
        }

        const alert = await alertDao.create({ houseId, sensor });
        await axios.post('http://localhost:8084/notifications', alert);

        return response.status(201).json(alert);
    }
}

export default new HouseController();
