import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
// const url = 'mongodb://192.168.68.123:27017/testash';
// const dbname = 'testash';
let client: MongoClient;

const connectDb = () => {
    const NODE_ENV = process.env['NODE_ENV'];

    const MONGO_FULLURL = process.env['MONGO_FULLURL'] as string;
    let mongoClient: MongoClient;
    switch (NODE_ENV) {
        case 'dev':
            mongoClient = new MongoClient(MONGO_FULLURL);
            break;
        case 'test':
            mongoClient = new MongoClient(MONGO_FULLURL);
            break;

        default:
            throw new Error('Invalid NODE_ENV');
    }

    return mongoClient;
};

export const getMongodb = async () => {

    if (!client) {
        client = connectDb();
        const mongoClient = await client.connect();
        const mongoDB = await mongoClient.db();
        return mongoDB;
    }

    const mongoClient = await client.connect();
    const mongoDB = await mongoClient.db();
    return mongoDB;
};

export const closeDB = async () => {
    if (client) {
        console.log('Client Closing');
        await client.close();
    }
};