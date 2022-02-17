import { MongoClient } from 'mongodb';
import { ConnectionStatusEnum } from '../models/enum/connection.status.enum';
import { DefaultEntity } from '../models/interfaces/default.entity';
import Logger from './logger';

export class Mongo {
    DB_NAME = process.env.DB_NAME ?? ''
    collection: string

    protected client: MongoClient;
    public transactionStatus: ConnectionStatusEnum = ConnectionStatusEnum.INACTIVE;

    constructor(collection: string) {
        this.collection = collection
        this.client = new MongoClient(process.env.MONGODB_URL ?? '');
    }

    async addDocument(object: DefaultEntity): Promise<void> {
        const connection = await this.connectionHandler();

        await this.client
            .db(this.DB_NAME)
            .collection(this.collection)
            .insertOne(object);

        await this.connectionHandler(connection);
    }

    async startTransaction(): Promise<MongoClient> {
        if (this.transactionStatus === ConnectionStatusEnum.INACTIVE) {
            this.transactionStatus = ConnectionStatusEnum.ACTIVE;
            return this.client.connect();
        }

        Logger.warn('Transaction already started');
        return this.client
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

    protected async connectionHandler(connection?: {shouldHandle: boolean}): Promise<{ shouldHandle: boolean }> {
        if (connection?.shouldHandle === false || (connection === undefined && this.transactionStatus)) {
            return { shouldHandle: false };
        }

        if(!this.transactionStatus) {
            await this.startTransaction();
            return { shouldHandle: true }
        }

        await this.endTransaction();
        return { shouldHandle: true }
    }
}
