import { Alarm, AlarmStatus, HouseDto } from '../models/interfaces/house.dto';
import { HouseEntity } from '../models/schemas/house.entity';
import { Mongo } from '../helpers/mongo';

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

    async update(id: string, houseDto: Partial<HouseDto>) {
        await this.db.update(id, houseDto)
    }

    async findById(id: string) {
        return await this.db.findById(id)
    }
}

export default new HouseDao();
