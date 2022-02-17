import { model, Schema } from 'mongoose';

export const AlertEntity = model('central-ping', new Schema({
    sensor: {
        type: String,
        required: [true, 'Sensor is mandatory'],
    },
    houseId: {
        type: String,
        required: [true, 'HouseId is mandatory'],
    },
    date: {
        type: String,
        required: [true, 'Date is mandatory'],
    },
}));
