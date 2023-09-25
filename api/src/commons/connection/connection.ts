import mongoose from "mongoose";
import config from '../../config/env/config';

interface IConnectOptions {
    autoReconnect?: boolean;
    reconnectTries?: number; // Never stop trying to reconnect
    reconnectInterval?: number;
    loggerLevel ? : string;
    useNewUrlParser ? : boolean;
    useUnifiedTopology ? : boolean;
}

let connectOptions: IConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const addOptionConnect = () => {
    const additionalOption: IConnectOptions = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    }
    connectOptions.useUnifiedTopology == undefined? connectOptions = Object.assign(connectOptions, additionalOption) : "";
}

export const MONGO_URI: string = "mongodb://moetazhajji:GZQpOtNCsUhd0kVW@ac-bqvhmav-shard-00-00.1z9vs3f.mongodb.net:27017,ac-bqvhmav-shard-00-01.1z9vs3f.mongodb.net:27017,ac-bqvhmav-shard-00-02.1z9vs3f.mongodb.net:27017/buybuy?ssl=true&replicaSet=atlas-6xddqv-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
console.log(MONGO_URI)

addOptionConnect()
export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI);
export function init(): void {

// handlers
    db.on('connecting', () => {
        console.log('\x1b[32m', 'MongoDB :: connecting');
    });

    db.on('error', (error) => {
        console.log('\x1b[31m', `MongoDB :: connection ${error}`);
        mongoose.disconnect();
    });

    db.on('connected', () => {
        console.log('\x1b[32m', 'MongoDB :: connected');
    });

    db.once('open', () => {
        console.log('\x1b[32m', 'MongoDB :: connection opened');
    });

    db.on('reconnected', () => {
        console.log('\x1b[33m"', 'MongoDB :: reconnected');
    });

    db.on('reconnectFailed', () => {
        console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
    });

    db.on('disconnected', (res) => {
        console.log('\x1b[31m', `MongoDB :: disconnected ${res}`);
        mongoose.connection.close();
    });

    db.on('fullsetup', () => {
        console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d');
    });
}
