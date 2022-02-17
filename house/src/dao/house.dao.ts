import { Alarm, AlarmStatus, HouseDto } from '../models/interfaces/house.dto';
import { HouseEntity } from '../models/schemas/house.entity';
import { Mongo } from '../../../common/helpers/mongo';

class HouseDao {
    COLLECTION = 'houses';
    db: Mongo;

    constructor() {
        this.db = new Mongo(this.COLLECTION);
    }

    async create(houseDto: HouseDto): Promise<HouseDto> {
        const { address, ownerName, phone } = houseDto;
        const alarm: Alarm = {
            status: AlarmStatus.INACTIVE,
            lastChange: String(new Date().toJSON()),
        };

        const house = new HouseEntity({
            address,
            ownerName,
            phone,
            alarm,
        });

        await this.db.addDocument(house);

        return house;
    }
}

export default new HouseDao();
