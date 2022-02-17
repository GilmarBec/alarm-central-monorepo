import { ControllerExceptionHandler } from '../../../common/decorators/controller.exception.handler.decorator';
import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import houseDao from '../../../common/dao/house.dao';
import { ErrorResponse } from '../../../common/exceptions/error.response';
import centralPingDao from '../../../common/dao/central.ping.dao';

@Controller('houses')
class AlarmController {
    @Post(':id/alarms')
    @ControllerExceptionHandler()
    async changeAlarmStatus(request: Request, response: Response) {
        const houseId = request.params.id

        const house = await houseDao.findById(houseId);
        if (!house) {
            throw ErrorResponse.DAO_DOCUMENT_NOT_FOUND
        }

        const ping = await centralPingDao.create(houseId)

        return response.status(201).json(ping);
    }
}

export default new AlarmController()
