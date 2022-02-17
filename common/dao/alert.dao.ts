import { Mongo } from '../helpers/mongo';
import { AlertEntity } from '../models/schemas/alert.entity';
import { AlertDto } from '../models/interfaces/alert.dto';

class AlertDao {
    COLLECTION = 'alerts';
    db: Mongo;

    constructor() {
        this.db = new Mongo(this.COLLECTION);
    }

    async create(alert: Partial<AlertDto>): Promise<AlertDto> {
        const { houseId, sensor } = alert

        const house = new AlertEntity({
            sensor,
            houseId,
            date: String(new Date().toJSON()),
        });

        await this.db.addDocument(house);

        return house;
    }

    async findById(id: string): Promise<AlertDto> {
        return this.db.findById(id);
    }

    async findByHouseId(houseId: string): Promise<AlertDto[]> {
        return this.db.findBy({ houseId: houseId });
    }
}

const instance = new AlertDao();
export default instance;
