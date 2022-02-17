import { ControllerExceptionHandler } from '../../../common/decorators/controller.exception.handler.decorator';
import { Request, Response } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { HouseDto } from '../models/interfaces/house.dto';
import houseDao from '../dao/house.dao';

@Controller('houses')
class HouseController {
    @Post()
    @ControllerExceptionHandler()
    async register(request: Request, response: Response) {
        const houseDto: HouseDto = request.body;

        const house = await houseDao.create(houseDto);

        return response.status(201).json(house);
    }
}

export default new HouseController();
