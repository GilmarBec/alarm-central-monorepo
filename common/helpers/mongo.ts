import { MongoClient, ObjectId } from 'mongodb';
import { ConnectionStatusEnum } from '../models/enum/connection.status.enum';
import Logger from './logger';

export class Mongo {
    public DB_NAME = process.env.DB_NAME ?? '';
    public collection: string;
    public transactionStatus: ConnectionStatusEnum = ConnectionStatusEnum.INACTIVE;
    protected client: MongoClient;

    constructor(collection: string) {
        this.collection = collection;
        this.client = new MongoClient(process.env.MONGODB_URL ?? '');
    }

    async addDocument(object: any): Promise<void> {
        const connection = await this.connectionHandler();

        await this.client
            .db(this.DB_NAME)
            .collection(this.collection)
            .insertOne(object);

        await this.connectionHandler(connection);
    }

    async update(id: string, object: any): Promise<any> {
        const connection = await this.connectionHandler();

        await this.client
            .db(this.DB_NAME)
            .collection(this.collection)
            .updateOne({ _id: new ObjectId(id) }, { $set: { ...object } });

        await this.connectionHandler(connection);
    }

    async findById(id: string) {
        const connection = await this.connectionHandler();

        const docs = await this.client
            .db(this.DB_NAME)
            .collection(this.collection)
            .find({ _id: new ObjectId(id) }, { limit: 1 });

        const data = (await docs.toArray()).shift();

        await this.connectionHandler(connection);

        return data;
    }

    async startTransaction(): Promise<MongoClient> {
        if (this.transactionStatus === ConnectionStatusEnum.INACTIVE) {
            this.transactionStatus = ConnectionStatusEnum.ACTIVE;
            return this.client.connect();
        }

        Logger.warn('Transaction already started');
        return this.client;
    }

    async endTransaction(): Promise<void> {
        if (this.transactionStatus === ConnectionStatusEnum.ACTIVE) {
            this.transactionStatus = ConnectionStatusEnum.INACTIVE;
            return this.client.close();
        }

        Logger.warn('Transaction already closed');
    }

    async ping(): Promise<void> {
        try {
            await this.client.connect();
            await this.client.db('admin').command({ ping: 1 });
        } finally {
            await this.client.close();
        }
    }

    protected async connectionHandler(connection?: { shouldHandle: boolean }): Promise<{ shouldHandle: boolean }> {
        if (connection?.shouldHandle === false || (connection === undefined && this.transactionStatus)) {
            return { shouldHandle: false };
        }

        if (!this.transactionStatus) {
            await this.startTransaction();
            return { shouldHandle: true };
        }

        await this.endTransaction();
        return { shouldHandle: true };
    }
}
