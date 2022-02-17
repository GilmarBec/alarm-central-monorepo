import { ControllerExceptionHandler } from '../../../common/decorators/controller.exception.handler.decorator';
import { Request, Response } from 'express';
import { Controller, Put } from '@overnightjs/core';
import houseDao from '../../../common/dao/house.dao';
import { AlarmStatus, HouseDto } from '../../../common/models/interfaces/house.dto';
import { AlarmErrorResponse } from '../exception/error.response';

@Controller('houses')
class AlarmController {
    @Put(':id/alarms')
    @ControllerExceptionHandler()
    async changeAlarmStatus(request: Request, response: Response) {
        const houseId = request.params.id
        const { status } = request.body;

        if (!Object.values(AlarmStatus).includes(status)) {
            throw AlarmErrorResponse.ALARM_STATUS_INVALID
        }

        const house: Partial<HouseDto> = {
            alarm: {
                status,
                lastChange: String(new Date().toJSON())
            }
        }

        await houseDao.update(houseId, house);

        return response.status(200).json(await houseDao.findById(houseId));
    }
}

export default new AlarmController()
