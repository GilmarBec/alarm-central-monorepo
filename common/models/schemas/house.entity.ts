import { model, Schema } from 'mongoose';

export const HouseEntity = model('house', new Schema({
    address: {
        type: String,
        required: [true, 'Address is mandatory'],
    },
    ownerName: {
        type: String,
        required: [true, 'Owner name is mandatory'],
        max: 255,
    },
    phone: {
        type: String,
        max: 50,
    },
    alarm: {
        type: Map,
        of: String,
        required: [true, 'Alarm object is mandatory'],
    },
}));
