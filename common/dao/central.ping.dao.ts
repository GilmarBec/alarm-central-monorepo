import { Mongo } from '../helpers/mongo';
import { HouseDto } from '../models/interfaces/house.dto';
import { CentralPingEntity } from '../models/schemas/central.ping.entity';
import { CentralPingDto } from '../models/interfaces/central.ping.dto';

class CentralPingDao {
    COLLECTION = 'central-pings';
    db: Mongo;

    constructor() {
        this.db = new Mongo(this.COLLECTION);
    }

    async create(houseId: string): Promise<HouseDto> {
        const house = new CentralPingEntity({
            houseId,
            date: String(new Date().toJSON()),
        });

        await this.db.addDocument(house);

        return house;
    }

    async findByHouseId(houseId: string): Promise<CentralPingDto[]> {
        return await this.db.findBy({ houseId: houseId });
    }
}

const instance = new CentralPingDao();
export default instance;
