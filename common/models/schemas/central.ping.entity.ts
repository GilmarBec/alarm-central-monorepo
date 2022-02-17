import { model, Schema } from 'mongoose';

export const CentralPingEntity = model('central-ping', new Schema({
    houseId: {
        type: String,
        required: [true, 'HouseId is mandatory'],
    },
    date: {
        type: String,
        required: [true, 'Date is mandatory'],
    },
}));
